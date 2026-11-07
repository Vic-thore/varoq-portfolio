import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router doesn't scroll for you. On every navigation, jump to the
 * hash target if the URL has one (e.g. a footer link to "/#work" clicked
 * from a different page), otherwise reset to the top of the new page.
 */
export function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  const prevPath = useRef<string | null>(null);

  // Stop the browser restoring an old scroll position on reload/back.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  useLayoutEffect(() => {
    // html has scroll-behavior: smooth, which would animate this jump and get
    // cut short while a lazy page loads. Force an instant jump instead.
    const jump = (top: number) => {
      if (window.__lenis) window.__lenis.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo({ top, left: 0, behavior: 'instant' as ScrollBehavior });
    };
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        const samePage = prevPath.current === pathname && window.__lenis;
        prevPath.current = pathname;
        if (samePage) window.__lenis!.scrollTo(el, { offset: -40, duration: 1.4 });
        else jump(el.getBoundingClientRect().top + window.scrollY);
        return;
      }
      // Target not rendered yet (lazy route): retry once it mounts.
      const t = window.setTimeout(() => {
        const late = document.getElementById(hash.slice(1));
        if (late) jump(late.getBoundingClientRect().top + window.scrollY);
      }, 300);
      return () => window.clearTimeout(t);
    }
    prevPath.current = pathname;
    jump(0);
  }, [pathname, hash, key]);

  return null;
}
