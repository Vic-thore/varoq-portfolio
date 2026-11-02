import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/cn"

interface SaasHeroProps {
  /** Content of the small pill above the headline. */
  tagline: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  /** Call-to-action(s) rendered under the copy. */
  actions?: React.ReactNode
  /** Product / site preview shown beneath the copy. */
  preview: { src: string; alt: string; width: number; height: number }
  /** id for the <h1>, so the section can be labelled by it. */
  headingId?: string
  className?: string
}

/*
 * Adapted from the "SaaS template" hero. The template's own fixed navigation,
 * global font override and remote images are left out: the site already has a
 * header, its own fonts, and the preview is supplied by the page.
 */
export function SaasHero({
  tagline,
  title,
  description,
  actions,
  preview,
  headingId,
  className,
}: SaasHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "relative flex min-h-[calc(100svh-var(--header-height))] flex-col items-center justify-start overflow-hidden bg-background px-6 py-16 md:py-24",
        className
      )}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex w-full flex-col items-center"
      >
        <aside className="relative z-10 mb-8 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-ink-400 bg-white/5 px-4 py-2 backdrop-blur-sm">
          {tagline}
        </aside>

        <h1
          id={headingId}
          className="relative z-10 mb-6 max-w-3xl bg-gradient-to-b from-white via-white to-white/60 bg-clip-text px-2 text-center font-display text-4xl font-semibold leading-tight tracking-tighter text-transparent md:text-5xl lg:text-6xl"
        >
          {title}
        </h1>

        <p className="relative z-10 mb-10 max-w-2xl px-2 text-center font-inter text-sm text-muted-foreground md:text-base">
          {description}
        </p>

        {actions && (
          <div className="relative z-10 mb-16 flex items-center gap-4">
            {actions}
          </div>
        )}

        <div className="relative w-full max-w-5xl pb-20">
          {/* Soft horizon glow behind the top of the preview */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-full left-1/2 z-0 aspect-[16/6] w-[92%] -translate-x-1/2 translate-y-[70px]"
          >
            <div
              className="absolute inset-0 blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse 60% 85% at 50% 100%, rgba(99,102,241,0.85), rgba(56,189,248,0.4) 42%, transparent 74%)",
              }}
            />
            <div className="absolute inset-x-[4%] bottom-0 top-[22%] rounded-[50%] border-t border-white/40 opacity-80 blur-[1px]" />
          </div>

          <div className="relative z-10">
            <img
              src={preview.src}
              alt={preview.alt}
              width={preview.width}
              height={preview.height}
              className="h-auto w-full rounded-lg"
              loading="eager"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
