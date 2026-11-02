import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

/*
 * Adapted from the "hero-01" agency hero block. The block's own Header and
 * BrandSlider are kept as separate files (see ./header.tsx is intentionally
 * not used here — this site already has its own header/nav) and
 * brand-slider.tsx below. The original's `avatarList` prop showed stock
 * photos of people as a "trusted by" signal; since there are no real
 * clients to show yet, this version shows the platforms the work is
 * actually built on instead, labelled honestly as "Built with".
 */

export interface PlatformBadge {
  icon: LucideIcon;
  label: string;
}

export interface HeroSectionProps {
  eyebrow?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  primaryCta: React.ReactNode;
  secondaryCta?: React.ReactNode;
  /** Small "Built with" badge row, replacing the original's avatar stack. */
  badges?: PlatformBadge[];
  preview?: { src: string; alt: string; width: number; height: number };
  headingId?: string;
  className?: string;
}

export function HeroSection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  badges,
  preview,
  headingId,
  className,
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? undefined : { opacity: 0, y: 12 };

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative flex min-h-[calc(100svh-var(--header-height))] flex-col items-center justify-center overflow-hidden bg-background px-6 py-16 text-center max-[575px]:py-10',
        className,
      )}
    >
      <motion.div
        initial={initial}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        {eyebrow && (
          <p className="mb-5 inline-block rounded-full border border-ink-400 bg-white/5 px-4 py-1.5 font-inter text-sm font-medium text-white/80 backdrop-blur-sm">
            {eyebrow}
          </p>
        )}

        <h1
          id={headingId}
          className="mx-auto max-w-3xl text-balance font-display text-4xl font-bold leading-[1.1] tracking-tighter text-white sm:text-5xl md:text-6xl"
        >
          {title}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-balance font-inter text-base leading-normal text-white/80 md:text-lg">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {primaryCta}
          {secondaryCta}
        </div>

        {badges && badges.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 font-inter text-[13px] text-white/50">
              Built with
            </span>
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-400 bg-white/5 px-3 py-1.5 font-inter text-[13px] font-medium text-white/80"
              >
                <Icon size={14} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {preview && (
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="mt-14 w-full max-w-5xl overflow-hidden rounded-2xl border border-ink-400 shadow-2xl max-[575px]:mt-10"
        >
          <img
            src={preview.src}
            alt={preview.alt}
            width={preview.width}
            height={preview.height}
            loading="eager"
            className="h-auto w-full"
          />
        </motion.div>
      )}
    </section>
  );
}
