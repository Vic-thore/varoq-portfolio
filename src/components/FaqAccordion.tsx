import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { AccentTitle } from './SectionHeading';
import { reveal } from '../hooks/useReveal';
import { cn } from '../lib/cn';

export interface FaqItem {
  question: string;
  answer: string[];
}

interface FaqAccordionProps {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Defaults to opening the first item, matching the homepage FAQ. */
  defaultOpenIndex?: number | null;
}

/** Reusable accordion — the homepage FAQ and the Services page FAQ both use this. */
export function FaqAccordion({
  eyebrow,
  title,
  description,
  items,
  ctaLabel,
  ctaHref = '/#contact',
  defaultOpenIndex = 0,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const baseId = useId();

  return (
    <div className="flex gap-x-12 gap-y-8 max-[768px]:flex-wrap">
      <motion.div {...reveal()} className="w-full max-w-[409px]">
        <span className="eyebrow text-primary">{eyebrow}</span>
        <h2 className="mb-3 mt-8 font-display text-[clamp(28px,3.4vw,44px)] font-bold capitalize leading-[1.1] tracking-[-0.03em] text-white">
          <AccentTitle text={title} />
        </h2>
        <p className="section-sub text-gray-495">{description}</p>
        {ctaLabel && (
          <div className="mt-8 flex items-center gap-8 max-[575px]:flex-wrap">
            <a href={ctaHref} className="btn btn-light btn-swap font-inter">
              <span className="swap-out">{ctaLabel}</span>
              <svg
                className="swap-out"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path d="M14.5833 5.41699L5 15.0003" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.66666 5H15V13.3333" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="swap-in">Lets Talk</span>
            </a>
          </div>
        )}
      </motion.div>

      <div className="flex grow flex-col gap-4">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={item.question}
              {...reveal(Math.min(i, 4) * 0.04)}
              className={cn('accordion', isOpen && 'is-open')}
            >
              <h3>
                <button
                  type="button"
                  className="accordion-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`${baseId}-panel-${i}`}
                  id={`${baseId}-trigger-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="grow text-left font-display text-[16px] font-medium leading-normal text-white">
                    {item.question}
                  </span>
                  <span className="accordion-icon" aria-hidden="true">
                    <svg className="plus-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2.66699V13.3337" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.66663 8H13.3333" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg className="minus-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2.66663 8H13.3333" stroke="#515050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </h3>

              <div
                className="accordion-body"
                id={`${baseId}-panel-${i}`}
                role="region"
                aria-labelledby={`${baseId}-trigger-${i}`}
              >
                {item.answer.map((paragraph, p) => (
                  <p key={p} className="font-inter text-[16px] leading-6 text-gray-495">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
