import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';
import { DEFAULT_OG_ALT, DEFAULT_OG_IMAGE, metaForPath } from '../lib/meta';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Keeps head tags in step with the current route while the visitor navigates.
 * The first response already carries the right tags (see scripts/prerender.mjs);
 * this covers client-side navigation.
 *
 * Absolute URLs are built from the canonical link the build baked into the page,
 * so no domain is hard-coded here. If the build had no site URL, canonical and
 * og:url are left alone.
 */
export function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaForPath(pathname);
    document.title = meta.title;
    trackPageView(pathname, meta.title);
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.indexable ? 'index, follow' : 'noindex, follow');
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    let origin = '';
    try {
      if (canonical?.href) origin = new URL(canonical.href).origin;
    } catch {
      /* ignore */
    }
    if (origin) {
      const url = origin + (meta.notFound ? pathname : meta.path);
      if (meta.indexable || !meta.notFound) canonical?.setAttribute('href', url);
      setMeta('property', 'og:url', url);
      const img = meta.image ?? DEFAULT_OG_IMAGE;
      const abs = /^https?:/.test(img) ? img : origin + img;
      setMeta('property', 'og:image', abs);
      setMeta('property', 'og:image:alt', meta.imageAlt ?? DEFAULT_OG_ALT);
      setMeta('name', 'twitter:image', abs);
    }
  }, [pathname]);

  return null;
}
