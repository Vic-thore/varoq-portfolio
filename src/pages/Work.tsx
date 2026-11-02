import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CTASection } from '../components/CTASection';
import { SectionHeading } from '../components/SectionHeading';
import { CoverImage } from '../components/CoverImage';
import { workFilters, workKindFilters } from '../data/work';
import { caseStudies } from '../data/caseStudies';
import { reveal } from '../hooks/useReveal';
import { cn } from '../lib/cn';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const shown = caseStudies.filter((w) =>
    filter === 'all'
      ? true
      : filter === 'past'
        ? !w.isConcept
        : filter === 'concept'
          ? w.isConcept
          : w.serviceId === filter
  );

  return (
    <>
      <section className="section-pad pt-[160px] max-[575px]:pt-[120px]" aria-labelledby="work-heading">
        <div className="container-zf">
          <SectionHeading
            id="work-heading"
            as="h1"
            className="max-w-[760px]"
            eyebrow="Our work"
            title="Selected work"
            description="Projects I’ve built for clients, alongside original concepts that show how we approach branding, design, web, no-code and SEO."
          />

          <div
            role="group"
            aria-label="Filter by service"
            className="mt-12 flex flex-wrap justify-center gap-2.5 max-[575px]:mt-8"
          >
            {[...workFilters, ...workKindFilters].map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-full border px-5 py-2 font-inter text-[14px] transition-colors duration-200',
                  filter === f.id
                    ? 'border-white bg-white text-black'
                    : 'border-ink-400 bg-transparent text-gray-495 hover:border-white/40 hover:text-white'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <ul className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 max-[575px]:mt-8 max-[575px]:gap-6">
            {shown.map((item, i) => (
              <motion.li
                key={item.name}
                layout
                {...reveal((i % 2) * 0.06)}
                className="group min-w-0"
              >
                <Link to={`/work/${item.slug}`} className="block">
                  <div className="overflow-hidden rounded-3xl border border-ink-400 bg-ink-800 transition-colors duration-300 group-hover:border-white/30">
                    <CoverImage fallbackSrc={item.imageFallback}
                      src={item.image}
                      alt={item.alt}
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[3/2] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-inter text-[12px] font-bold uppercase tracking-wide text-gray-495">
                        {item.isConcept ? 'Concept' : 'Project'} · {item.serviceLabel} · {item.category}
                      </p>
                      <h2 className="mt-2 font-display text-[30px] font-bold leading-none tracking-tight text-white">
                        {item.name}
                      </h2>
                      <p className="mt-3 font-inter text-[15px] leading-6 text-gray-495">
                        {item.brief}
                      </p>
                    </div>
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-400 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                      <ArrowRight size={18} aria-hidden="true" />
                    </span>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.delivered.map((d) => (
                      <li
                        key={d}
                        className="rounded-full bg-ink-800 px-3.5 py-1.5 font-inter text-[13px] text-gray-495"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </Link>
              </motion.li>
            ))}
          </ul>

          <p className="mx-auto mt-14 max-w-[560px] text-center font-inter text-[14px] leading-6 text-gray-495">
            Projects marked “Concept” are original work made to show our approach, not
            work for a named client.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
