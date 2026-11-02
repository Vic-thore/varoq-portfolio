import { useState } from 'react';
import { GA_ID, getConsent, setConsent } from '../lib/analytics';

/** Asks before any analytics runs. Renders nothing unless analytics is configured. */
export function ConsentBanner() {
  const [choice, setChoice] = useState(getConsent());
  if (!GA_ID || choice) return null;

  const pick = (c: 'granted' | 'denied') => {
    setConsent(c);
    setChoice(c);
  };

  return (
    <div
      role="region"
      aria-label="Analytics notice"
      className="fixed inset-x-4 bottom-4 z-[1100] mx-auto flex max-w-[640px] flex-wrap items-center gap-3 rounded-2xl border border-ink-400 bg-ink-800 p-4 text-sm text-white shadow-lg"
    >
      <p className="m-0 flex-1 basis-[260px] font-inter leading-5">
        We use privacy-friendly analytics to see which pages are useful. Allow it?
      </p>
      <div className="flex gap-2">
        <button type="button" className="btn btn-outlined" onClick={() => pick('denied')}>
          No thanks
        </button>
        <button type="button" className="btn btn-primary" onClick={() => pick('granted')}>
          Allow
        </button>
      </div>
    </div>
  );
}
