import { caseStudies, getCaseStudy, type CaseStudy } from '../data/caseStudies';
import { SITE_NAME } from './assets';

/**
 * Single source of truth for page metadata.
 *
 * Used in two places:
 *  - at runtime (src/components/PageMeta.tsx) to keep <title>, description,
 *    canonical, robots and social tags correct when the visitor navigates;
 *  - at build time (scripts/prerender.mjs) to write a real HTML file per route
 *    with the same tags in the initial response, plus sitemap.xml.
 *
 * This file must stay free of browser-only code.
 */

export interface PageMeta {
  /** Full <title>. Keep under ~60 characters. */
  title: string;
  /** Meta description, aim for 120 to 155 characters. */
  description: string;
  /** Canonical path, e.g. "/services/seo". */
  path: string;
  /** Path or absolute URL of the social share image. */
  image?: string;
  imageAlt?: string;
  /** Indexable pages appear in the sitemap; others get noindex. */
  indexable: boolean;
  /** Breadcrumb trail (excluding Home), used for BreadcrumbList. */
  breadcrumbs?: { name: string; path: string }[];
  /** Set for service pages to emit Service structured data. */
  service?: { name: string; type: string };
  /** HTTP-style status the page represents (404 for the not-found page). */
  notFound?: boolean;
}

export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_OG_ALT =
  'Varoq: branding, web design and development';

const home: PageMeta = {
  path: '/',
  title: 'Varoq | Branding, Web Design & Development Agency',
  description:
    'Varoq is a digital agency for branding, UI/UX design, web and no-code development. See our work and book a free discovery call.',
  indexable: true,
};

const staticPages: PageMeta[] = [
  home,
  {
    path: '/work',
    title: 'Our Work | Websites, Branding & UI/UX Projects | Varoq',
    description:
      'Selected websites, brand identities and UI/UX projects by Varoq, with the role we played and what we delivered on each.',
    indexable: true,
    breadcrumbs: [{ name: 'Work', path: '/work' }],
  },
];

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: `Page not found | ${SITE_NAME}`,
  description: 'The page you were looking for does not exist. Try the home page or the work page.',
  indexable: false,
  notFound: true,
};

/**
 * Only real client projects are indexed. Concepts (original work, written up
 * like a project but not made for a named client) and imported Behance covers
 * stay noindex and out of the sitemap, so search results show verifiable work.
 * To index a concept later, return true for it here.
 */
export const isIndexableStudy = (s: CaseStudy) => !s.isConcept || Boolean(s.liveUrl);

/** Trim to a meta-description length on a word boundary. */
function clip(text: string, max = 155) {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return t.slice(0, max).replace(/\s+\S*$/, '').replace(/[.,;:\s]+$/, '') + '…';
}

function studyMeta(s: CaseStudy): PageMeta {
  const kind = s.isConcept ? 'Concept' : 'Case study';
  return {
    path: `/work/${s.slug}`,
    title: `${s.name}: ${s.category} | ${SITE_NAME}`,
    description: clip(`${kind}: ${s.brief} ${s.approach}`),
    image: s.image,
    imageAlt: s.alt,
    indexable: isIndexableStudy(s),
    breadcrumbs: [
      { name: 'Work', path: '/work' },
      { name: s.name, path: `/work/${s.slug}` },
    ],
  };
}

/** Every real route, in sitemap order. */
export const allPageMeta = (): PageMeta[] => [
  ...staticPages,
  ...caseStudies.map(studyMeta),
];

const normalise = (pathname: string) => {
  const p = pathname.split('?')[0].split('#')[0];
  return p.length > 1 ? p.replace(/\/+$/, '') : p || '/';
};

/** Metadata for a URL path; unknown paths get the not-found metadata. */
export function metaForPath(pathname: string): PageMeta {
  const path = normalise(pathname);
  const fixed = staticPages.find((p) => p.path === path);
  if (fixed) return fixed;
  const m = path.match(/^\/work\/([^/]+)$/);
  if (m) {
    const study = getCaseStudy(m[1]);
    if (study) return studyMeta(study);
  }
  return notFoundMeta;
}
