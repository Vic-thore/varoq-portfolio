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

/** Headline whose words rise into view one after another when scrolled to. */
export function SplitReveal({ text, className, id, as: Tag = 'h2', delay = 0 }: { text: string; className?: string; id?: string; as?: 'h1' | 'h2' | 'h3' | 'p'; delay?: number }) {
  const words = text.split(' ');
  return (
    <Tag id={id} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: delay + i * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
