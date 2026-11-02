import type { Variants } from 'framer-motion';

/** Shared scroll-reveal preset: a short fade with a small upward drift. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const revealTransition = {
  duration: 0.55,
  ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
};

/** Props to spread onto a `motion` element for a one-shot reveal. */
export function reveal(delay = 0) {
  return {
    variants: revealUp,
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport: { once: true, amount: 0.2 },
    transition: { ...revealTransition, delay },
  };
}
