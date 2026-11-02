import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { typewriterWords } from '../data/content';
import { useTypewriter } from '../hooks/useTypewriter';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ClientLogos } from './ClientLogos';
import { reveal } from '../hooks/useReveal';

// Dynamically imported so three.js (~500kB) ships in its own chunk instead
// of bloating the main bundle everyone downloads on first paint.
const ParticleWave = lazy(() =>
  import('./ui/particle-wave').then((m) => ({ default: m.ParticleWave }))
);

function HeroBgImg() {
  // Was the remote home-hero-bg-mobile.webp asset, but that image has the
  // original site's yellow glow baked directly into its pixels — no way to
  // recolor a raster image we don't host. A flat token-matched background
  // keeps the Suspense fallback (and the permanent reduced-motion view)
  // consistent with the rest of the site instead of flashing yellow-on-white.
  return <div aria-hidden="true" className="hero-bg-img bg-ink" />;
}

/**
 * True once the page has finished loading and the browser is idle, so the
 * decorative WebGL background never competes with the headline for the first
 * paint or with early interaction. Stays false when the visitor has asked to
 * save data.
 */
function useWhenIdle() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData;
    if (saveData) return;
    let cancelled = false;
    let handle: number | undefined;
    let idleUsed = false;
    const go = () => {
      const run = () => !cancelled && setReady(true);
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      };
      if (w.requestIdleCallback) {
        handle = w.requestIdleCallback(run, { timeout: 2500 });
        idleUsed = true;
      } else {
        handle = window.setTimeout(run, 1200);
      }
    };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', go);
      if (handle !== undefined) {
        const w = window as Window & { cancelIdleCallback?: (h: number) => void };
        if (idleUsed && w.cancelIdleCallback) w.cancelIdleCallback(handle);
        else window.clearTimeout(handle);
      }
    };
  }, []);
  return ready;
}

export function Hero() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const idle = useWhenIdle();
  const word = useTypewriter(typewriterWords, !reducedMotion);

  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-heading">
      {/* Background. Absolutely positioned and aria-hidden, so the layout
          is unaffected if the effect fails to init. The animated particle
          wave replaces the static photo background; reduced-motion users
          get that original static image instead of a continuous WebGL
          animation. */}
      {reducedMotion || !idle ? (
        <HeroBgImg />
      ) : (
        <Suspense fallback={<HeroBgImg />}>
          <ParticleWave className="hero-bg-img" />
        </Suspense>
      )}
      <div className="hero-bg-overlay" aria-hidden="true" />

      <div className="container-zf">
        <div className="hero-content-wrap">
          <div className="relative mx-auto w-full max-w-hero">
            {/* Decorative star, bottom-left of the composition */}
            <div className="hero-star pointer-events-none select-none" aria-hidden="true">
              <motion.img
                src="/svgs/hero-star.svg"
                alt=""
                width={73}
                height={80}
                animate={
                  reducedMotion
                    ? undefined
                    : { y: [0, -10, 0], rotate: [0, 6, 0] }
                }
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Trust badge */}
            <motion.div {...reveal(0)} className="trusted-craft above-glow">
              <div className="flex items-center gap-3">
                <span className="power-icon">
                  <img
                    src="/svgs/shield.svg"
                    alt=""
                    width={20}
                    height={20}
                    decoding="async"
                  />
                </span>
                <p className="font-inter text-[16px] leading-none text-white">
                  Design and build in Figma, Webflow, Framer and Lovable
                </p>
              </div>
            </motion.div>

            {/* Headline + the rotated lime "No Code" tag */}
            <motion.div {...reveal(0.08)} className="relative mx-auto w-fit">
              <h1 id="hero-heading" className="main-heading">
                Creative Intelligence in Every Pixel
              </h1>
              <span className="no-code-tag">No Code</span>
            </motion.div>

            <motion.p
              {...reveal(0.14)}
              className="mx-auto mt-3 text-center font-inter text-[20px] capitalize leading-normal text-white"
            >
              We craft{' '}
              <span className="inline-block text-left align-bottom text-primary" aria-live="polite">
                <span>{word}</span>
                <span className="typewriter-caret" aria-hidden="true">
                  |
                </span>
              </span>{' '}
              designs for businesses worldwide.
            </motion.p>

            <motion.div
              {...reveal(0.2)}
              className="mt-12 flex flex-wrap justify-center gap-5 max-[575px]:mt-6"
            >
              <a
                href="#contact"
                className="btn btn-light btn-slide-in font-inter"
              >
                {/* Keeps the button at its natural width while both
                    label states are absolutely positioned. */}
                <span className="invisible">Schedule Call</span>
                <span className="default-text">Schedule Call</span>
                <span className="hover-content flex w-full items-center justify-start gap-4 px-[3px]">
                  <img src="/svgs/avatar-mark.svg" alt="" aria-hidden="true" />
                  <span className="hover-text">Lets Talk 🤙</span>
                </span>
              </a>

              <a
                href="#work"
                className="btn btn-outlined anim-translate font-inter"
              >
                <span className="anim-translate-content">See our work</span>
                <span className="anim-translate-slice flex items-center gap-2">
                  Open
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12.5 12.5C13.8807 12.5 15 11.3807 15 10C15 8.61929 13.8807 7.5 12.5 7.5C11.1193 7.5 10 8.61929 10 10C10 11.3807 11.1193 12.5 12.5 12.5Z"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 17.5C8.88075 17.5 10 16.3807 10 15V12.5H7.5C6.11929 12.5 5 13.6192 5 15C5 16.3807 6.11929 17.5 7.5 17.5Z"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 7.5V12.5H7.5C6.11929 12.5 5 11.3807 5 10C5 8.61925 6.11929 7.5 7.5 7.5H10Z"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 2.5V7.5H7.5C6.11929 7.5 5 6.38071 5 5C5 3.61929 6.11929 2.5 7.5 2.5H10Z"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 2.5V7.5H12.5C13.8807 7.5 15 6.38071 15 5C15 3.61929 13.8807 2.5 12.5 2.5H10Z"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <ClientLogos />
    </section>
  );
}
