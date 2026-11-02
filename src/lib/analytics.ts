/**
 * Optional Google Analytics 4 with consent mode.
 *
 * Nothing loads, and nothing is sent, unless VITE_GA_MEASUREMENT_ID is set in
 * the hosting environment. When it is set, analytics storage starts denied and
 * only switches on after the visitor accepts the notice (ConsentBanner).
 */
export const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || '';
const KEY = 'varoq-analytics-consent';

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export type Consent = 'granted' | 'denied' | null;

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

let loaded = false;

function load() {
  if (!GA_ID || loaded || typeof document === 'undefined') return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js requires the Arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  // page_view is sent per route by PageMeta, so skip the automatic one.
  window.gtag('config', GA_ID, { send_page_view: false, anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
}

/** Call once on startup: loads GA only when configured and previously accepted. */
export function initAnalytics() {
  if (!GA_ID) return;
  load();
  if (getConsent() === 'granted') window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
}

export function setConsent(choice: 'granted' | 'denied') {
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    /* private mode: the choice just lasts for this visit */
  }
  load();
  window.gtag?.('consent', 'update', { analytics_storage: choice });
}

export function trackPageView(path: string, title: string) {
  if (!GA_ID || getConsent() !== 'granted') return;
  window.gtag?.('event', 'page_view', { page_path: path, page_title: title, page_location: location.href });
}

/** Conversion and engagement events: enquiry_submitted, whatsapp_click, email_click. */
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (!GA_ID || getConsent() !== 'granted') return;
  window.gtag?.('event', name, params);
}
