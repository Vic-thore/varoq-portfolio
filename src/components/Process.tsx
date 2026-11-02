import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { processSteps } from '../data/content';
import { SectionHeading } from './SectionHeading';
import { ProcessStep } from './ProcessStep';
import { useMediaQuery } from '../hooks/useMediaQuery';

export function Process() {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      // The reading line sits ~40% down the viewport; the lime rail fills
      // to wherever that line has reached inside the list.
      const line = window.innerHeight * 0.4;
      const filled = Math.min(Math.max(line - rect.top, 0), rect.height);
      list.style.setProperty('--scroll-height', `${filled}px`);

      let next = 0;
      itemRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });
      setActiveIndex(next);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="section-pad" id="process" aria-labelledby="process-heading">
      <div className="container-zf">
        <SectionHeading
          id="process-heading"
          eyebrow="Our process, Your Advantage"
          title="From Idea To Execution"
          description="We have become experts in creating top-notch digital products. We design beautifully and develop excellently. And we care deeply about what we do."
        />

        <div className="mt-16 max-[575px]:mt-8">
          <div className="process-layout">
            <div className="process-list-wrap" ref={listRef}>
              <ol className="process-list">
                {processSteps.map((step, i) => (
                  <ProcessStep
                    key={step.index}
                    step={step}
                    active={i === activeIndex}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                  />
                ))}
              </ol>
            </div>

            <div className="process-image-wrap hidden md:block">
              <div className="relative h-[506px] w-[527px] max-w-full overflow-hidden rounded-2xl bg-ink-800">
                <AnimatePresence>
                  <motion.img
                    key={processSteps[activeIndex].index}
                    src={processSteps[activeIndex].image}
                    alt={`${processSteps[activeIndex].title} — ${processSteps[activeIndex].tag}`}
                    width={527}
                    height={506}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
