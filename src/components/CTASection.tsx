import { motion } from 'framer-motion';
import { AccentTitle } from './SectionHeading';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GridVignetteBackground } from '@/components/ui/vignette-grid-background';
import { reveal } from '../hooks/useReveal';

/** Closing call-to-action: a centred message over a vignetted grid. */
export function CTASection() {
  return (
    <section
      className="relative isolate overflow-hidden border-y border-ink-400 bg-ink py-[100px] max-[575px]:py-16"
      aria-labelledby="cta-heading"
    >
      {/* Decorative. The component defaults to `fixed` (full-viewport), so it
          is switched to `absolute` to stay inside this band. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <GridVignetteBackground
          className="absolute opacity-80"
          size={48}
          x={50}
          y={50}
          intensity={100}
          horizontalVignetteSize={55}
          verticalVignetteSize={80}
        />
      </div>

      <div className="container-zf relative">
        <motion.div
          {...reveal()}
          className="mx-auto flex max-w-[720px] flex-col items-center gap-4 text-center font-tight"
        >
          <h2
            id="cta-heading"
            className="font-display text-[clamp(30px,4vw,48px)] font-bold leading-[1.12] tracking-[-0.03em] text-white [text-wrap:balance]"
          >
            <AccentTitle text="Your next great product decision starts with one *conversation*." />
          </h2>
          <p className="text-[16px] leading-6 text-muted-foreground">
            If your product isn&apos;t where you want it to be, 30 minutes with
            us might tell you why. And more often than not, we&apos;re exactly
            the team to fix it.
          </p>
          <Button
            asChild
            className="mt-4 h-11 gap-2 rounded-full px-6 hover:bg-primary-2"
          >
            <a href="/#contact">
              Book a Free Discovery Call
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
