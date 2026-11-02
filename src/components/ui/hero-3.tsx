import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  /** id for the <h1>, so the section can be labelled by it. */
  headingId?: string;
  /** Scrolling strip rendered along the bottom of the hero (e.g. a carousel). */
  children?: React.ReactNode;
  className?: string;
}

const FADE_IN_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  headingId,
  children,
  className,
}) => {
  // Reduced-motion visitors get the finished state straight away.
  const reducedMotion = useReducedMotion();
  const initial = reducedMotion ? "show" : "hidden";

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "relative flex min-h-[calc(100svh-var(--header-height))] w-full flex-col overflow-hidden bg-background",
        className
      )}
    >
      <div className="z-10 flex flex-1 flex-col items-center justify-center px-4 pb-10 pt-16 text-center max-[575px]:pt-10">
        {/* Tagline */}
        <motion.div
          initial={initial}
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-4 inline-block rounded-full border border-ink-400 bg-white/5 px-4 py-1.5 font-inter text-sm font-medium text-muted-foreground backdrop-blur-sm"
        >
          {tagline}
        </motion.div>

        {/* Main title */}
        <motion.h1
          id={headingId}
          initial={initial}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tighter text-white sm:text-5xl md:text-6xl"
        >
          {typeof title === "string"
            ? title.split(" ").map((word, i) => (
                <Fragment key={i}>
                  <motion.span
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>{" "}
                </Fragment>
              ))
            : title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={initial}
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-xl font-inter text-lg text-muted-foreground"
        >
          {description}
        </motion.p>
      </div>

      {/* Scrolling strip, faded out at both edges */}
      {children && (
        <div className="pb-12 max-[575px]:pb-8 [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {children}
        </div>
      )}
    </section>
  );
};
