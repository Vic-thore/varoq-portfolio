/**
 * Post-build step: turns the single-page build into one real HTML file per
 * route, with the right <title>, description, canonical, robots, social tags
 * and JSON-LD already in the response, then writes sitemap.xml and robots.txt.
 *
 * The React app still renders the page in the browser; this only fixes what
 * crawlers and link previews see first. No dependencies beyond what Vite
 * already installs (esbuild).
 *
 * Site URL: set SITE_URL (e.g. https://varoq.com) in the hosting environment.
 * On Vercel, VERCEL_PROJECT_PRODUCTION_URL is used when SITE_URL is not set.
 * GOOGLE_SITE_VERIFICATION adds the Search Console token to the home page.
 * With neither, pages still get titles/descriptions, but canonical, og:url,
 * structured data URLs and the sitemap are skipped rather than guessed.
 */
import { build } from 'esbuild';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const rawSite = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || '';
const SITE = rawSite
  ? (/^https?:\/\//.test(rawSite) ? rawSite : `https://${rawSite}`).replace(/\/+$/, '')
  : '';

const ORG = {
  name: 'Varoq',
  email: 'varoqstudio@email.com',
  telephone: '+2349067328783',
  logo: '/images/brand/varoq-profile.png',
  sameAs: ['https://www.instagram.com/varoqstudio', 'https://x.com/Varoqstudio', 'https://www.tiktok.com/@varoqstudio'],
};

// ---- load the shared metadata module (TypeScript) -------------------------
const outfile = join(tmpdir(), `varoq-meta-${process.pid}.mjs`);
await build({
  entryPoints: [join(root, 'src/lib/meta.ts')],
  outfile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  logLevel: 'error',
  alias: { '@': join(root, 'src') },
  loader: { '.svg': 'dataurl', '.png': 'dataurl', '.webp': 'dataurl', '.jpg': 'dataurl' },
});
const meta = await import(pathToFileURL(outfile).href);
await rm(outfile, { force: true });

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => (/^https?:/.test(p) ? p : `${SITE}${p}`);
const jsonLd = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

function structuredData(page) {
  if (!SITE || page.notFound) return [];
  const orgId = `${SITE}/#organization`;
  const out = [];
  if (page.path === '/') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': orgId,
      name: ORG.name,
      url: `${SITE}/`,
      logo: abs(ORG.logo),
      email: ORG.email,
      telephone: ORG.telephone,
      sameAs: ORG.sameAs,
      description: page.description,
    });
    out.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: ORG.name,
      publisher: { '@id': orgId },
      inLanguage: 'en',
    });
  }
  if (page.service) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.service.name,
      serviceType: page.service.type,
      description: page.description,
      url: abs(page.path),
      provider: { '@type': 'Organization', '@id': orgId, name: ORG.name, url: `${SITE}/` },
    });
  }
  if (page.breadcrumbs?.length) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '/' }, ...page.breadcrumbs].map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: abs(b.path),
      })),
    });
  }
  return out;
}

function headBlock(page) {
  const image = page.image ?? meta.DEFAULT_OG_IMAGE;
  const imageAlt = page.imageAlt ?? meta.DEFAULT_OG_ALT;
  const lines = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="${page.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
  ];
  if (SITE && !page.notFound) lines.push(`<link rel="canonical" href="${esc(abs(page.path))}" />`);
  lines.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Varoq" />`,
    `<meta property="og:locale" content="en" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`
  );
  if (SITE) {
    if (!page.notFound) lines.push(`<meta property="og:url" content="${esc(abs(page.path))}" />`);
    lines.push(
      `<meta property="og:image" content="${esc(abs(image))}" />`,
      `<meta property="og:image:alt" content="${esc(imageAlt)}" />`
    );
  }
  if (page.path === '/' && process.env.GOOGLE_SITE_VERIFICATION) {
    lines.push(`<meta name="google-site-verification" content="${esc(process.env.GOOGLE_SITE_VERIFICATION)}" />`);
  }
  lines.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`
  );
  if (SITE) lines.push(`<meta name="twitter:image" content="${esc(abs(image))}" />`);
  for (const ld of structuredData(page)) lines.push(jsonLd(ld));
  return lines.map((l) => `    ${l}`).join('\n');
}

const NAV = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/services/branding', 'Branding'],
  ['/services/ui-ux-design', 'UI/UX design'],
  ['/services/web-development', 'Web development'],
  ['/services/no-code-development', 'No-code development'],
  ['/services/automation', 'Automation'],
  ['/services/seo', 'SEO'],
  ['/ai-solutions', 'AI solutions'],
  ['/work', 'Work'],
  ['/contact', 'Contact'],
];

// Plain-HTML fallback for visitors and crawlers without JavaScript.
const noscript = (page) =>
  `<noscript><h1>${esc(page.title.replace(/\s*\|\s*Varoq$/, ''))}</h1><p>${esc(page.description)}</p><nav aria-label="Main">${NAV.map(
    ([h, l]) => `<a href="${h}">${esc(l)}</a>`
  ).join(' ')}</nav></noscript>`;

const template = await readFile(join(dist, 'index.html'), 'utf8');
const START = '<!--seo:start-->';
const END = '<!--seo:end-->';
if (!template.includes(START) || !template.includes(END)) {
  throw new Error('index.html is missing the <!--seo:start--> / <!--seo:end--> markers');
}

function render(page) {
  const a = template.indexOf(START);
  const b = template.indexOf(END) + END.length;
  let html = `${template.slice(0, a)}${START}\n${headBlock(page)}\n    ${END}${template.slice(b)}`;
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscript(page)}`);
  return html;
}

const pages = meta.allPageMeta();
let written = 0;
for (const page of pages) {
  const file = page.path === '/' ? join(dist, 'index.html') : join(dist, page.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, render(page));
  written++;
}
await writeFile(join(dist, '404.html'), render(meta.notFoundMeta));

// ---- sitemap + robots -----------------------------------------------------
const indexable = pages.filter((p) => p.indexable);
if (SITE) {
  const urls = indexable
    .map((p) => `  <url><loc>${esc(abs(p.path === '/' ? '/' : p.path))}</loc></url>`)
    .join('\n');
  await writeFile(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
}
await writeFile(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n${SITE ? `\nSitemap: ${SITE}/sitemap.xml\n` : ''}`
);

console.log(
  `prerender: ${written} pages + 404.html, ${indexable.length} indexable` +
    (SITE ? `, site ${SITE}` : ', NO SITE URL (set SITE_URL): canonical, structured data and sitemap skipped')
);
if (!existsSync(join(dist, 'og-image.png'))) console.warn('prerender: og-image.png missing from dist');
