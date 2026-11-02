import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import { getCaseStudy } from '../data/caseStudies';
import { reveal } from '../hooks/useReveal';
import { SectionHeading } from './SectionHeading';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

/**
 * Grid of client quotes. Renders nothing until src/data/testimonials.ts has
 * real entries, so the home page never shows placeholder praise.
 */
export function TestimonialWall() {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="section-pad above-glow relative"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-zf">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Client words"
          title="What the people we've built for say"
        />

        <ul className="testimonial-wall mt-16 grid list-none grid-cols-1 gap-5 max-[575px]:mt-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const study = t.project ? getCaseStudy(t.project) : undefined;
            return (
              <motion.li key={`${t.name}-${i}`} {...reveal(i * 0.05)} className="testimonial-card">
                <figure className="flex h-full flex-col justify-between gap-8">
                  <blockquote className="font-inter text-[16px] leading-7 text-white">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span aria-hidden="true" className="testimonial-avatar">
                      {initials(t.name)}
                    </span>
                    <span className="min-w-0 font-inter">
                      <span className="block text-[15px] font-semibold text-white">{t.name}</span>
                      <span className="block text-[13px] leading-5 text-gray-495">{t.role}</span>
                      {(study || t.source) && (
                        <span className="mt-1 flex flex-wrap gap-x-4 text-[13px]">
                          {study && (
                            <Link to={`/work/${study.slug}`} className="text-brand-bright underline-offset-4 hover:underline">
                              {study.name}
                            </Link>
                          )}
                          {t.source && (
                            <a
                              href={t.source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-495 underline-offset-4 hover:text-white hover:underline"
                            >
                              {t.source.label}
                            </a>
                          )}
                        </span>
                      )}
                    </span>
                  </figcaption>
                </figure>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
