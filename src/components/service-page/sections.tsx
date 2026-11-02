import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Blocks,
  Check,
  Globe,
  LayoutGrid,
  Palette,
  TrendingUp,
  Workflow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaqAccordion, type FaqItem } from '../FaqAccordion';
import { LottiePlayer } from '../LottiePlayer';
import { SectionHeading, AccentTitle } from '../SectionHeading';
import { serviceGroups } from '../../data/services';
import { reveal } from '../../hooks/useReveal';
import { cn } from '../../lib/cn';
import type {
  DeepDive,
  IconItem,
  PageImage,
  ProcessStep,
  ServiceConcept,
  ServicePackage,
} from './types';

/*
 * Building blocks shared by the service pages (Branding, UI/UX, ...). Each
 * page supplies its own copy and artwork; the layout, spacing and behaviour
 * live here so every service page stays consistent.
 *
 * `idPrefix` namespaces the heading ids ("branding" -> "branding-problem-heading").
 */

interface HeadingProps {
  idPrefix: string;
  eyebrow: string;
  title: string;
  description?: string;
}

/** 1. The problem: an illustration next to three plain-language problems. */
export function ProblemSection({
  idPrefix,
  eyebrow,
  title,
  description,
  image,
  items,
}: HeadingProps & { image: PageImage; items: IconItem[] }) {
  return (
    <section
      className="section-pad bg-cream"
      aria-labelledby={`${idPrefix}-problem-heading`}
    >
      <div className="container-zf">
        <SectionHeading
          id={`${idPrefix}-problem-heading`}
          className="max-w-[760px]"
          eyebrow={eyebrow}
          title={title}
          description={description}
          tone="light"
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.25fr_1fr] max-[575px]:mt-8 max-[575px]:gap-8">
          <motion.div
            {...reveal()}
            className="overflow-hidden rounded-3xl border border-[var(--border-light)] bg-white shadow-sm"
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </motion.div>

          <ul className="flex flex-col gap-8">
            {items.map((item, i) => (
              <motion.li
                key={item.title}
                {...reveal(i * 0.06)}
                className="flex gap-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <item.icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-tight text-[22px] leading-normal text-black font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 font-inter text-[15px] leading-6 text-gray-muted-light">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** 2. What's included: a grid of the service's components. */
export function IncludesSection({
  idPrefix,
  eyebrow,
  title,
  description,
  items,
}: HeadingProps & { items: IconItem[] }) {
  return (
    <section
      className="section-pad"
      aria-labelledby={`${idPrefix}-includes-heading`}
    >
      <div className="container-zf">
        <SectionHeading
          id={`${idPrefix}-includes-heading`}
          className="max-w-[760px]"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-[575px]:mt-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              {...reveal(Math.min(i, 3) * 0.05)}
              className="group rounded-2xl border border-ink-400 bg-ink-800 p-8 transition-colors duration-300 hover:border-white/30"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink-400 bg-ink text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                <item.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-tight text-[22px] leading-normal text-white font-bold">
                {item.title}
              </h3>
              <p className="mt-2 font-inter text-[15px] leading-6 text-gray-495">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 3. Process: a sticky intro beside a numbered vertical timeline. */
export function ProcessSection({
  idPrefix,
  eyebrow,
  title,
  description,
  steps,
}: HeadingProps & { steps: ProcessStep[] }) {
  return (
    <section
      className="section-pad bg-cream"
      aria-labelledby={`${idPrefix}-process-heading`}
    >
      <div className="container-zf">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[360px_1fr] lg:items-start lg:gap-20">
          <motion.div {...reveal()} className="lg:sticky lg:top-28">
            <p className="eyebrow text-gray-muted-dark">{eyebrow}</p>
            <h2
              id={`${idPrefix}-process-heading`}
              className="section-title section-title-md mt-6 text-left text-black font-bold"
            >
              <AccentTitle text={title} tone="light" />
            </h2>
            <p className="mt-4 font-inter text-[16px] leading-7 text-gray-muted-light">
              {description}
            </p>
          </motion.div>

          <ol>
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                {...reveal(Math.min(i, 3) * 0.05)}
                className={cn(
                  'relative pl-16',
                  i < steps.length - 1 &&
                    'pb-10 after:absolute after:bottom-0 after:left-[19px] after:top-12 after:w-px after:bg-black/15',
                )}
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-black font-display text-[14px] font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="pt-1.5 font-tight text-[24px] leading-normal text-black font-bold">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[560px] font-inter text-[15px] leading-6 text-gray-muted-light">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** 4. Concept work: alternating image / text rows. */
export function ConceptWorkSection({
  idPrefix,
  eyebrow,
  title,
  description,
  concepts,
}: HeadingProps & { concepts: ServiceConcept[] }) {
  return (
    <section className="section-pad" aria-labelledby={`${idPrefix}-work-heading`}>
      <div className="container-zf">
        <SectionHeading
          id={`${idPrefix}-work-heading`}
          className="max-w-[760px]"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-16 flex flex-col gap-20 max-[575px]:mt-8 max-[575px]:gap-14">
          {concepts.map((concept, i) => (
            <motion.article
              key={concept.name}
              {...reveal()}
              className={cn(
                'grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14',
                i % 2 === 1 && 'lg:[&>div:first-child]:order-2',
              )}
            >
              <div className="overflow-hidden rounded-3xl border border-ink-400 bg-ink-800">
                <img
                  src={concept.image}
                  alt={concept.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full"
                />
              </div>

              <div>
                <span className="inline-block rounded-full border border-ink-400 bg-white/5 px-3 py-1 font-inter text-[12px] font-medium uppercase tracking-wide text-gray-495">
                  Concept · {concept.category}
                </span>
                <h3 className="mt-5 font-display text-[40px] font-bold leading-none tracking-tight text-white max-[575px]:text-[32px]">
                  {concept.name}
                </h3>
                <p className="mt-5 font-inter text-[16px] leading-7 text-white">
                  {concept.brief}
                </p>
                <p className="mt-3 font-inter text-[15px] leading-6 text-gray-495">
                  {concept.approach}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {concept.delivered.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-ink-800 px-3.5 py-1.5 font-inter text-[13px] text-gray-495"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 5. What you receive: a mockup beside a checklist and file formats. */
export function DeliverablesSection({
  idPrefix,
  eyebrow,
  title,
  description,
  image,
  items,
  formatsLabel = 'Delivered as',
  formats = [],
}: HeadingProps & {
  image: PageImage;
  items: string[];
  formatsLabel?: string;
  formats?: string[];
}) {
  return (
    <section
      className="section-pad bg-cream"
      aria-labelledby={`${idPrefix}-deliverables-heading`}
    >
      <div className="container-zf">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            {...reveal()}
            className="overflow-hidden rounded-3xl border border-[var(--border-light)] shadow-sm"
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </motion.div>

          <motion.div {...reveal(0.08)}>
            <p className="eyebrow text-gray-muted-dark">{eyebrow}</p>
            <h2
              id={`${idPrefix}-deliverables-heading`}
              className="section-title section-title-md mt-6 text-left text-black font-bold"
            >
              <AccentTitle text={title} tone="light" />
            </h2>
            <p className="mt-4 font-inter text-[16px] leading-7 text-gray-muted-light">
              {description}
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <Check size={14} aria-hidden="true" />
                  </span>
                  <span className="font-inter text-[16px] leading-6 text-black">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {formats.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="mr-1 font-inter text-[13px] text-gray-muted-light">
                  {formatsLabel}
                </span>
                {formats.map((format) => (
                  <span
                    key={format}
                    className="rounded-md border border-[var(--border-light)] bg-white px-2.5 py-1 font-inter text-[12px] font-semibold text-black"
                  >
                    {format}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** 6. Packages: three ways to engage, with a highlighted middle tier. */
export function PackagesSection({
  idPrefix,
  serviceName,
  eyebrow,
  title,
  description,
  packages,
}: HeadingProps & { serviceName: string; packages: ServicePackage[] }) {
  return (
    <section
      className="section-pad"
      aria-labelledby={`${idPrefix}-packages-heading`}
    >
      <div className="container-zf">
        <SectionHeading
          id={`${idPrefix}-packages-heading`}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-16 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 max-[575px]:mt-8">
          {packages.map((tier, i) => (
            <motion.div
              key={tier.name}
              {...reveal(i * 0.06)}
              className={cn(
                'relative flex flex-col rounded-3xl border p-8',
                tier.highlight
                  ? 'border-white bg-white text-black'
                  : 'border-ink-400 bg-ink-800 text-white',
              )}
            >
              {tier.badge && (
                <span className="absolute right-6 top-6 rounded-full bg-black px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-wide text-white">
                  {tier.badge}
                </span>
              )}
              <h3 className="font-display text-[26px] font-bold leading-tight">
                {tier.name}
              </h3>
              <p
                className={cn(
                  'mt-2 font-inter text-[15px] leading-6',
                  tier.highlight ? 'text-gray-muted-light' : 'text-gray-495',
                )}
              >
                {tier.blurb}
              </p>

              <ul className="mt-8 flex flex-1 flex-col gap-3.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={cn(
                        'mt-0.5 shrink-0',
                        tier.highlight ? 'text-black' : 'text-white',
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        'font-inter text-[15px] leading-6',
                        tier.highlight ? 'text-black' : 'text-gray-495',
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={cn(
                  'mt-8 h-11 gap-2 rounded-full px-6',
                  tier.highlight
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'hover:bg-primary-2',
                )}
              >
                <Link
                  to={`/contact?service=${encodeURIComponent(`${serviceName}: ${tier.name}`)}`}
                >
                  Request a quote
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 7. Why us: three principles under a big statement. */
export function WhySection({
  idPrefix,
  eyebrow,
  title,
  items,
}: Omit<HeadingProps, 'description'> & { items: IconItem[] }) {
  return (
    <section
      className="section-pad bg-cream"
      aria-labelledby={`${idPrefix}-why-heading`}
    >
      <div className="container-zf">
        <SectionHeading
          id={`${idPrefix}-why-heading`}
          eyebrow={eyebrow}
          title={title}
          tone="light"
          className="max-w-[760px]"
        />

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 max-[575px]:mt-8 max-[575px]:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              {...reveal(i * 0.06)}
              className="border-t border-black/15 pt-6"
            >
              <item.icon size={28} className="text-black" aria-hidden="true" />
              <h3 className="mt-5 font-tight text-[22px] leading-normal text-black font-bold">
                {item.title}
              </h3>
              <p className="mt-2 font-inter text-[15px] leading-6 text-gray-muted-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 8. FAQ: the shared accordion inside a glowing dark band. */
export function FaqSection({
  eyebrow,
  title,
  description,
  items,
  ariaLabel,
  ctaLabel = 'Book a free call',
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
  ariaLabel: string;
  ctaLabel?: string;
}) {
  return (
    <section
      className="section-pad above-glow relative bg-ink"
      aria-label={ariaLabel}
    >
      <div className="container-zf">
        <FaqAccordion
          eyebrow={eyebrow}
          title={title}
          description={description}
          items={items}
          ctaLabel={ctaLabel}
        />
      </div>
    </section>
  );
}

const relatedIcons: Record<string, LucideIcon> = {
  branding: Palette,
  'ui-ux-design': LayoutGrid,
  'web-development': Globe,
  'no-code-development': Blocks,
  automation: Workflow,
  seo: TrendingUp,
};

/** 9. Related services: links onward to other service pages. */
export function RelatedSection({
  idPrefix,
  eyebrow,
  title,
  description,
  slugs,
}: HeadingProps & { slugs: string[] }) {
  const groups = serviceGroups.filter((group) => slugs.includes(group.slug));
  return (
    <section
      className="section-pad bg-cream"
      aria-labelledby={`${idPrefix}-related-heading`}
    >
      <div className="container-zf">
        <SectionHeading
          id={`${idPrefix}-related-heading`}
          className="max-w-[760px]"
          eyebrow={eyebrow}
          title={title}
          description={description}
          tone="light"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 max-[575px]:mt-8">
          {groups.map((group, i) => {
            const Icon = relatedIcons[group.slug] ?? LayoutGrid;
            return (
              <motion.div key={group.slug} {...reveal(i * 0.06)}>
                <Link
                  to={group.href ?? `/services#${group.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border-light)] p-8 transition-colors duration-300 hover:bg-white"
                >
                  <Icon size={28} className="text-black" aria-hidden="true" />
                  <h3 className="mt-5 font-tight text-[22px] leading-normal text-black font-bold">
                    {group.tabLabel}
                  </h3>
                  <p className="mt-2 font-inter text-[15px] leading-6 text-gray-muted-light">
                    {group.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-inter text-[14px] font-medium text-black">
                    Learn more
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Alternating image/text deep-dives into each part of the service. */
export function DeepDiveSection({
  idPrefix,
  items,
}: {
  idPrefix: string;
  items: DeepDive[];
}) {
  return (
    <section aria-label="In depth" className="section-pad">
      <div className="container-zf flex flex-col gap-24 max-[575px]:gap-16">
        {items.map((item, i) => (
          <div
            key={item.title}
            className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 max-[575px]:gap-8"
          >
            <motion.div
              {...reveal()}
              className={cn(
                'overflow-hidden rounded-3xl border border-ink-400 bg-ink-800',
                i % 2 === 1 && 'lg:order-2'
              )}
            >
              {item.lottie ? (
                <LottiePlayer
                  src={item.lottie}
                  label={item.image.alt}
                  className="w-full"
                />
              ) : (
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full"
                />
              )}
            </motion.div>

            <div>
              <SectionHeading
                id={`${idPrefix}-dive-${i}-heading`}
                className="!mx-0 !max-w-none !text-left"
                eyebrow={item.eyebrow}
                title={item.title}
                description={item.description}
              />
              <ul className="mt-8 flex flex-col gap-6">
                {item.points.map((p, j) => (
                  <motion.li key={p.title} {...reveal(j * 0.06)} className="flex gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black">
                      <Check size={14} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-tight text-[20px] leading-normal text-white font-bold">
                        {p.title}
                      </h3>
                      <p className="mt-1 font-inter text-[15px] leading-6 text-gray-495">
                        {p.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** A picture beside a short pitch and a button: used for mid-page nudges. */
export function SplitCalloutSection({
  idPrefix,
  eyebrow,
  title,
  description,
  points,
  cta,
  image,
  lottie,
  light = false,
  flip = false,
}: HeadingProps & {
  points?: string[];
  cta: { label: string; to: string };
  image: PageImage;
  /** Animation shown instead of the image; the image's alt text still labels it. */
  lottie?: string;
  light?: boolean;
  flip?: boolean;
}) {
  return (
    <section
      className={cn('section-pad', light && 'bg-cream')}
      aria-labelledby={`${idPrefix}-callout-heading`}
    >
      <div className="container-zf">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 max-[575px]:gap-8">
          <motion.div
            {...reveal()}
            className={cn(
              'mx-auto w-full max-w-[560px] overflow-hidden rounded-3xl',
              flip && 'lg:order-2'
            )}
          >
            {lottie ? (
              <LottiePlayer src={lottie} label={image.alt} className="w-full" />
            ) : (
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            )}
          </motion.div>

          <div>
            <SectionHeading
              id={`${idPrefix}-callout-heading`}
              className="!mx-0 !max-w-none !text-left"
              eyebrow={eyebrow}
              title={title}
              description={description}
              tone={light ? 'light' : 'dark'}
            />
            {points && (
              <ul className="mt-8 flex flex-col gap-3">
                {points.map((p) => (
                  <li
                    key={p}
                    className={cn(
                      'flex items-center gap-3 font-inter text-[15px]',
                      light ? 'text-black' : 'text-white'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                        light ? 'bg-black text-white' : 'bg-white text-black'
                      )}
                    >
                      <Check size={12} aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}
            <Button
              asChild
              className={cn(
                'mt-10 h-12 gap-2 rounded-lg px-8 text-base transition-all hover:scale-105 active:scale-95',
                light && 'bg-black text-white hover:bg-black/85'
              )}
            >
              <Link to={cta.to}>
                {cta.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Tabs of use cases, each with a short pitch and a three-step flow. */
export function UseCaseTabsSection({
  idPrefix,
  eyebrow,
  title,
  description,
  tabs,
  cta,
}: HeadingProps & {
  tabs: {
    id: string;
    label: string;
    title: string;
    description: string;
    points: string[];
    flow: string[];
  }[];
  cta: { label: string; to: string };
}) {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];
  return (
    <section className="section-pad" aria-labelledby={`${idPrefix}-tabs-heading`}>
      <div className="container-zf">
        <SectionHeading
          id={`${idPrefix}-tabs-heading`}
          className="max-w-[760px]"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div
          role="tablist"
          aria-label={title}
          className="mt-12 flex flex-wrap justify-center gap-2.5 max-[575px]:mt-8"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              id={`${idPrefix}-tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls={`${idPrefix}-panel-${t.id}`}
              onClick={() => setActive(t.id)}
              className={cn(
                'rounded-full border px-5 py-2 font-inter text-[14px] transition-colors duration-200',
                active === t.id
                  ? 'border-white bg-white text-black'
                  : 'border-ink-400 text-gray-495 hover:border-white/40 hover:text-white'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${idPrefix}-panel-${tab.id}`}
          aria-labelledby={`${idPrefix}-tab-${tab.id}`}
          className="mt-10 grid grid-cols-1 gap-10 rounded-3xl border border-ink-400 bg-ink-800 p-8 lg:grid-cols-2 lg:p-12 max-[575px]:p-6"
        >
          <div>
            <h3 className="font-tight text-[28px] leading-9 text-white font-bold">{tab.title}</h3>
            <p className="mt-3 font-inter text-[16px] leading-7 text-gray-495">{tab.description}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {tab.points.map((p) => (
                <li key={p} className="flex items-center gap-3 font-inter text-[15px] text-white">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
                    <Check size={12} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 h-12 gap-2 rounded-lg px-8 text-base">
              <Link to={cta.to}>
                {cta.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-col justify-center gap-3" aria-label="Example flow">
            {tab.flow.map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex w-full items-center gap-4 rounded-2xl border px-5 py-4 font-inter text-[15px] text-white',
                    i === 1 ? 'border-primary bg-primary/15' : 'border-ink-400 bg-ink'
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-inter text-[13px] font-semibold text-black">
                    {i + 1}
                  </span>
                  {step}
                </div>
                {i < tab.flow.length - 1 && (
                  <span className="h-5 w-px bg-ink-400" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** The tools and platforms we work with, grouped. */
export function ToolsSection({
  idPrefix,
  eyebrow,
  title,
  description,
  groups,
}: HeadingProps & { groups: { label: string; items: string[] }[] }) {
  return (
    <section className="section-pad" aria-labelledby={`${idPrefix}-tools-heading`}>
      <div className="container-zf">
        <SectionHeading
          id={`${idPrefix}-tools-heading`}
          className="max-w-[760px]"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-[575px]:mt-8">
          {groups.map((g, i) => (
            <motion.div
              key={g.label}
              {...reveal(i * 0.05)}
              className="rounded-2xl border border-ink-400 bg-ink-800 p-6"
            >
              <h3 className="font-inter text-[13px] uppercase tracking-wide text-gray-495 font-bold">{g.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <li key={t} className="rounded-full bg-ink px-3.5 py-1.5 font-inter text-[14px] text-white">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
