import { motion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { reveal } from '../hooks/useReveal';

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'p' | 'li' | 'section' | 'h3' }) {
  const Tag = motion[as] as ElementType;
  return (
    <Tag {...reveal(delay)} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Headline with a line-sweep reveal: a white bar sweeps across each word, then peels away to uncover it.
 * Words are staggered so the line reads left to right.
 */
export function SplitReveal({ text, className, id, as: Tag = 'h2', delay = 0 }: { text: string; className?: string; id?: string; as?: 'h1' | 'h2' | 'h3' | 'p'; delay?: number }) {
  const words = text.split(' ');
  const ease = [0.65, 0, 0.35, 1] as [number, number, number, number];
  return (
    <Tag id={id} className={className} aria-label={text}>
      {words.map((w, i) => {
        const d = delay + i * 0.09;
        return (
          <span key={i} className="relative inline-block align-bottom" aria-hidden="true">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.01, delay: d + 0.28 }}
            >
              {w}
            </motion.span>
            <motion.span
              className="pointer-events-none absolute inset-x-0 bottom-[0.06em] top-[0.1em] bg-white"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 100%)'] }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.75, delay: d, ease, times: [0, 0.45, 1] }}
            />
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </Tag>
  );
}

/** Image that unmasks from the bottom and settles from a slight zoom when scrolled into view. */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(12% 0 0 0 round 10px)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0 0 0 round 10px)', opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
