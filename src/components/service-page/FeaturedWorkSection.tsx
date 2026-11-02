import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '../SectionHeading';
import { CoverImage } from '../CoverImage';
import { caseStudies } from '../../data/caseStudies';
import { reveal } from '../../hooks/useReveal';

/** Up to three real projects for a service, linking to their case studies. */
export function FeaturedWorkSection({
  serviceId,
  idPrefix,
  title,
  description = 'A few recent projects. See the full portfolio for more.',
}: {
  serviceId: string;
  idPrefix: string;
  title: string;
  description?: string;
}) {
  const items = caseStudies.filter((c) => c.serviceId === serviceId).slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="section-pad" aria-labelledby={`${idPrefix}-work-heading`}>
      <div className="container-zf">
        <SectionHeading
          id={`${idPrefix}-work-heading`}
          className="max-w-[760px]"
          eyebrow="Selected work"
          title={title}
          description={description}
        />
        <ul className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 max-[575px]:mt-8 max-[575px]:gap-6">
          {items.map((item, i) => (
            <motion.li key={item.slug} {...reveal(i * 0.06)} className="group min-w-0">
              <Link to={`/work/${item.slug}`} className="block">
                <div className="overflow-hidden rounded-3xl border border-ink-400 bg-ink-800 transition-colors duration-300 group-hover:border-white/30">
                  <CoverImage fallbackSrc={item.imageFallback}
                    src={item.image}
                    alt={item.alt}
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/2] w-full object-cover object-top"
                  />
                </div>
                <p className="mt-5 font-inter text-[12px] font-medium uppercase tracking-wide text-gray-495">
                  {item.category}
                </p>
                <h3 className="mt-2 font-display text-[26px] font-bold leading-none tracking-tight text-white">
                  {item.name}
                </h3>
                <p className="mt-3 font-inter text-[15px] leading-6 text-gray-495">{item.brief}</p>
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" className="h-12 gap-2 rounded-lg px-8 text-base">
            <Link to="/work">
              See all work
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
