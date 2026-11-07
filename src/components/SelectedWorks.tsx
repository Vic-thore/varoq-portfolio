import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Columns2, LayoutGrid, Rows3 } from 'lucide-react';
import { ImageReveal, Reveal, SplitReveal } from './Reveal';
import { caseStudies } from '../data/caseStudies';

type View = 'slider' | 'grid' | 'stack';

const items = caseStudies.filter((c) => c.image).slice(0, 8);
const pad = (n: number) => String(n + 1).padStart(2, '0');

const views: { id: View; label: string; Icon: typeof Columns2 }[] = [
  { id: 'slider', label: 'Slider view', Icon: Columns2 },
  { id: 'grid', label: 'Grid view', Icon: LayoutGrid },
  { id: 'stack', label: 'Stacked view', Icon: Rows3 },
];

function Meta({ i, c }: { i: number; c: (typeof items)[number] }) {
  return (
    <div className="mt-4 border-t border-white/15 pt-4">
      <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-white/55">
        <span>{pad(i)}</span>
        <span>{c.serviceLabel}</span>
        {c.year && <span className="ml-auto">{c.year}</span>}
      </div>
      <h3 className="mt-2 flex items-center gap-2 font-tight text-[22px] leading-tight text-white">
        {c.name}
        <ArrowUpRight className="h-5 w-5 translate-y-0.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
      </h3>
    </div>
  );
}

export function SelectedWorks() {
  const [view, setView] = useState<View>('slider');
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  const updateActive = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestD = Infinity;
    Array.from(el.children).forEach((ch, i) => {
      const n = ch as HTMLElement;
      const d = Math.abs(n.offsetLeft + n.offsetWidth / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    if (view === 'slider') updateActive();
  }, [view, updateActive]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const next = Math.min(items.length - 1, Math.max(0, active + dir));
    const n = el.children[next] as HTMLElement;
    el.scrollTo({ left: n.offsetLeft - (el.clientWidth - n.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <section id="work" className="relative bg-ink py-24 font-tight max-[575px]:py-16" aria-labelledby="sw-heading">
      <div className="container-zf text-center">
        <SplitReveal id="sw-heading" text="Selected works" className="text-[clamp(40px,6vw,72px)] font-medium leading-[1.05] tracking-tight text-white" />
        <Reveal as="p" delay={0.15} className="mx-auto mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/65">
          A hand-picked set of recent builds, designed and shipped end to end.
        </Reveal>

        <Reveal delay={0.25} className="mt-12">
        <div className="flex items-center justify-center gap-3" role="toolbar" aria-label="Selected works controls">
          {view === 'slider' && (
            <>
              <button type="button" aria-label="Previous project" onClick={() => go(-1)} disabled={active === 0}
                className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition hover:bg-white/10 disabled:opacity-30">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button type="button" aria-label="Next project" onClick={() => go(1)} disabled={active === items.length - 1}
                className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition hover:bg-white/10 disabled:opacity-30">
                <ArrowRight className="h-5 w-5" />
              </button>
              <span className="mx-1 h-6 w-px bg-white/20" aria-hidden="true" />
            </>
          )}
          {views.map(({ id, label, Icon }) => (
            <button key={id} type="button" aria-label={label} aria-pressed={view === id} onClick={() => setView(id)}
              className={`grid h-10 w-10 place-items-center rounded-full transition ${
                view === id ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}>
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
        </Reveal>
      </div>

      {view === 'slider' && (
        <Reveal delay={0.1}>
        <div ref={track} onScroll={updateActive}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[max(16px,calc((100vw-1200px)/2))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((c, i) => (
            <Link key={c.slug} to={`/work/${c.slug}`} className="group w-[82vw] max-w-[430px] shrink-0 snap-center sm:w-[40vw]">
              <div className={`aspect-[16/10] overflow-hidden rounded-[10px] border-2 transition ${
                i === active ? 'border-white' : 'border-transparent'}`}>
                <img src={c.image} alt={c.alt} loading="lazy" decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <Meta i={i} c={c} />
            </Link>
          ))}
        </div>
        </Reveal>
      )}

      {view === 'grid' && (
        <div className="container-zf mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
            <Link to={`/work/${c.slug}`} className="group block">
              <ImageReveal className="aspect-[16/10] overflow-hidden rounded-[10px]">
                <img src={c.image} alt={c.alt} loading="lazy" decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </ImageReveal>
              <Meta i={i} c={c} />
            </Link>
            </Reveal>
          ))}
        </div>
      )}

      {view === 'stack' && (
        <div className="container-zf mt-12">
          {items.map((c, i) => (
            <Link key={c.slug} to={`/work/${c.slug}`}
              style={{ top: `${88 + i * 14}px` }}
              className="group sticky mb-10 block rounded-[18px] border border-white/10 bg-[#0d1117] p-4 shadow-[0_-12px_40px_rgba(0,0,0,0.45)] sm:p-6">
              <div className="flex items-center gap-3 pb-4 text-[12px] uppercase tracking-[0.14em] text-white/55">
                <span>{pad(i)}</span>
                <span>{c.serviceLabel}</span>
                <span className="ml-auto flex items-center gap-2 text-[14px] normal-case tracking-normal text-white">
                  {c.name}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <ImageReveal className="aspect-[16/9] overflow-hidden rounded-[10px] max-[575px]:aspect-[4/3]">
                <img src={c.image} alt={c.alt} loading="lazy" decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              </ImageReveal>
            </Link>
          ))}
        </div>
      )}

      <div className="container-zf mt-12 text-center">
        <Link to="/work" className="btn btn-light">
          View all work
          <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
