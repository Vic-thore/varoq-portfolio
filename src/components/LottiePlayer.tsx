import { useEffect, useRef } from 'react';

interface LottiePlayerProps {
  /** Path to the animation JSON under /public. */
  src: string;
  /** Accessible description (the animation is decorative-but-informative). */
  label: string;
  /** Frame to hold when the visitor prefers reduced motion. */
  restFrame?: number;
  className?: string;
}

/**
 * Lazy Lottie player: the player library loads only when the animation is
 * about to scroll into view, plays while visible, pauses off-screen, and
 * shows a single finished frame for visitors who prefer reduced motion.
 */
export function LottiePlayer({ src, label, restFrame = 100, className }: LottiePlayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let anim: import('lottie-web').AnimationItem | undefined;
    let io: IntersectionObserver | undefined;
    let cancelled = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const start = async () => {
      const lottie = (await import('lottie-web/build/player/lottie_light')).default;
      if (cancelled) return;
      anim = lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: !reduced,
        autoplay: false,
        path: src,
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
      });
      anim.addEventListener('DOMLoaded', () => {
        if (reduced) anim?.goToAndStop(restFrame, true);
      });
      if (!reduced) {
        io = new IntersectionObserver(
          ([entry]) => (entry.isIntersecting ? anim?.play() : anim?.pause()),
          { threshold: 0.25 }
        );
        io.observe(el);
      }
    };

    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loader.disconnect();
          void start();
        }
      },
      { rootMargin: '300px' }
    );
    loader.observe(el);

    return () => {
      cancelled = true;
      loader.disconnect();
      io?.disconnect();
      anim?.destroy();
    };
  }, [src, restFrame]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={className}
      style={{ aspectRatio: '3 / 2' }}
    />
  );
}
