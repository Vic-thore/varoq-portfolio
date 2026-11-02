import { Link, useParams } from 'react-router-dom';
import { CoverImage } from '../components/CoverImage';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CTASection } from '../components/CTASection';
import { adjacentStudies, caseStudies, getCaseStudy } from '../data/caseStudies';
import { reveal } from '../hooks/useReveal';

export default function CaseStudy() {
  const { slug = '' } = useParams();
  const study = getCaseStudy(slug);

  if (!study) {
    return (
      <section className="section-pad pt-[160px] text-center">
        <div className="container-zf">
          <h1 className="section-title text-white">Project not found</h1>
          <p className="mt-4 font-inter text-gray-495">
            That project doesn’t exist, or it has moved.
          </p>
          <Button asChild className="mt-8 h-12 rounded-lg px-8">
            <Link to="/work">See all work</Link>
          </Button>
        </div>
      </section>
    );
  }

  const { prev, next } = adjacentStudies(study.slug);
  const more = caseStudies
    .filter((c) => c.serviceId === study.serviceId && c.slug !== study.slug)
    .slice(0, 2);
  const label = study.isConcept ? 'Concept project' : 'Project';

  const meta = [
    { k: 'Type', v: label },
    { k: 'Industry', v: study.category },
    { k: 'Service', v: study.serviceLabel },
    ...(study.role ? [{ k: 'My role', v: study.role }] : []),
    ...(study.year ? [{ k: 'Year', v: study.year }] : []),
  ];

  return (
    <>
      {/* Hero */}
      <section className="section-pad pb-0 pt-[160px] max-[575px]:pt-[120px]" aria-labelledby="cs-heading">
        <div className="container-zf">
          <Link
            to="/work"
            className="inline-flex min-h-6 items-center gap-2 font-inter text-[14px] text-gray-495 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden="true" /> All work
          </Link>
          <motion.div {...reveal()} className="mt-8 max-w-[820px]">
            <p className="eyebrow text-primary">
              {label} · {study.serviceLabel}
            </p>
            <h1
              id="cs-heading"
              className="mt-3 font-display text-[64px] font-semibold leading-none tracking-tight text-white max-[575px]:text-[clamp(30px,9vw,44px)] [overflow-wrap:anywhere]"
            >
              {study.name}
            </h1>
            <p className="mt-6 font-inter text-[20px] leading-8 text-gray-495 max-[575px]:text-[17px] max-[575px]:leading-7">
              {study.brief}
            </p>
            {(study.liveUrl || study.behanceUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {study.liveUrl && (
                  <Button asChild className="h-12 gap-2 rounded-lg px-8 text-base">
                    <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visit live site
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </Button>
                )}
                {study.behanceUrl && (
                  <Button asChild variant={study.liveUrl ? 'outline' : 'default'} className="h-12 gap-2 rounded-lg px-8 text-base">
                    <a href={study.behanceUrl} target="_blank" rel="noopener noreferrer">
                      View on Behance
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </motion.div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-ink-400 py-6 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="font-inter text-[12px] uppercase tracking-wide text-gray-495">{m.k}</dt>
                <dd className="mt-1 font-inter text-[16px] text-white">{m.v}</dd>
              </div>
            ))}
          </dl>

          <motion.div
            {...reveal()}
            className="mt-12 overflow-hidden rounded-3xl border border-ink-400 bg-ink-800"
          >
            <CoverImage fallbackSrc={study.imageFallback}
              src={study.image}
              alt={study.alt}
              width={1200}
              height={800}
              decoding="async"
              className="mx-auto h-auto max-h-[80vh] w-full object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* Challenge + approach */}
      <section className="section-pad" aria-label="Challenge and approach">
        <div className="container-zf grid grid-cols-1 gap-12 lg:grid-cols-2 max-[575px]:gap-10">
          {study.challenge && (
            <motion.div {...reveal()}>
              <p className="eyebrow text-primary">The challenge</p>
              <p className="mt-4 font-inter text-[18px] leading-8 text-white">{study.challenge}</p>
            </motion.div>
          )}
          <motion.div {...reveal(0.06)}>
            <p className="eyebrow text-primary">{study.approachLabel ?? 'Our approach'}</p>
            <p className="mt-4 font-inter text-[18px] leading-8 text-white">{study.approach}</p>
          </motion.div>
        </div>
      </section>

      {/* Delivered + tools */}
      <section className="pb-[100px] max-[575px]:pb-16" aria-label="What we delivered">
        <div className="container-zf grid grid-cols-1 gap-12 lg:grid-cols-2 max-[575px]:gap-10">
          <motion.div {...reveal()}>
            <p className="eyebrow text-primary">What we delivered</p>
            <ul className="mt-5 flex flex-col gap-3">
              {study.delivered.map((d) => (
                <li key={d} className="flex items-center gap-3 font-inter text-[16px] text-white">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
                    <Check size={12} aria-hidden="true" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
          {study.tools && study.tools.length > 0 && (
            <motion.div {...reveal(0.06)}>
              <p className="eyebrow text-primary">Tools</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {study.tools.map((t) => (
                  <li key={t} className="rounded-full bg-ink-800 px-4 py-2 font-inter text-[14px] text-gray-495">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery (optional) */}
      {study.gallery && study.gallery.length > 0 && (
        <section className="pb-[100px] max-[575px]:pb-16" aria-label="Gallery">
          <div className="container-zf grid grid-cols-1 gap-6 md:grid-cols-2">
            {study.gallery.map((g) => (
              <div key={g.src} className="overflow-hidden rounded-3xl border border-ink-400 bg-ink-800">
                <img src={g.src} alt={g.alt} loading="lazy" decoding="async" className="h-auto w-full" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results (optional: only shown when there are real numbers) */}
      {study.results && study.results.length > 0 && (
        <section className="bg-cream section-pad" aria-label="Results">
          <div className="container-zf grid grid-cols-2 gap-8 md:grid-cols-4">
            {study.results.map((r) => (
              <div key={r.label}>
                <p className="font-display text-[48px] font-semibold leading-none text-black">{r.value}</p>
                <p className="mt-2 font-inter text-[15px] text-gray-muted-light">{r.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonial (optional) */}
      {study.testimonial && (
        <section className="section-pad" aria-label="Client feedback">
          <div className="container-zf max-w-[820px] text-center">
            <Quote className="mx-auto text-primary" size={32} aria-hidden="true" />
            <blockquote className="mt-6 font-tight text-[28px] leading-10 text-white max-[575px]:text-[22px] max-[575px]:leading-8">
              “{study.testimonial.quote}”
            </blockquote>
            <p className="mt-6 font-inter text-[15px] text-gray-495">
              {study.testimonial.name}, {study.testimonial.role}
            </p>
          </div>
        </section>
      )}

      {study.isConcept && (
        <p className="container-zf pb-10 text-center font-inter text-[14px] leading-6 text-gray-495">
          {study.name} is an original concept made to show our approach, not work for a named client.
        </p>
      )}

      {/* More from this service */}
      {more.length > 0 && (
        <section className="section-pad border-t border-ink-400" aria-label={`More ${study.serviceLabel} work`}>
          <div className="container-zf">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-tight text-[28px] text-white font-bold">More {study.serviceLabel} work</h2>
              <Link to={study.href} className="inline-flex min-h-6 items-center font-inter text-[14px] text-primary underline">
                About our {study.serviceLabel} service
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link to={`/work/${m.slug}`} className="group block">
                    <div className="overflow-hidden rounded-3xl border border-ink-400 bg-ink-800 transition-colors group-hover:border-white/30">
                      <img src={m.image} alt={m.alt} width={1200} height={800} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover object-top" />
                    </div>
                    <h3 className="mt-4 font-display text-[24px] font-bold text-white">{m.name}</h3>
                    <p className="mt-1 font-inter text-[15px] text-gray-495">{m.brief}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Prev / next */}
      <nav aria-label="Project navigation" className="border-y border-ink-400">
        <div className="container-zf grid grid-cols-2">
          <Link to={`/work/${prev.slug}`} className="flex items-center gap-3 py-8 pr-4 font-inter text-white transition-colors hover:text-primary">
            <ArrowLeft size={18} aria-hidden="true" />
            <span>
              <span className="block text-[12px] uppercase tracking-wide text-gray-495">Previous</span>
              {prev.name}
            </span>
          </Link>
          <Link to={`/work/${next.slug}`} className="flex items-center justify-end gap-3 py-8 pl-4 text-right font-inter text-white transition-colors hover:text-primary">
            <span>
              <span className="block text-[12px] uppercase tracking-wide text-gray-495">Next</span>
              {next.name}
            </span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <CTASection />
    </>
  );
}
