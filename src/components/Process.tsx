import { useEffect, useRef, useState } from 'react';
import { Route, LayoutGrid, MousePointerClick, PenTool, Search, ShieldCheck, type LucideIcon } from 'lucide-react';
import { processSteps } from '../data/content';
import { SectionHeading } from './SectionHeading';
import { cn } from '../lib/cn';

const icons: Record<string, LucideIcon> = {
  Discovery: Search,
  Flows: Route,
  Wireframes: LayoutGrid,
  Mockups: PenTool,
  Prototyping: MousePointerClick,
  Testing: ShieldCheck,
};

/** Vertical timeline: the line fills as the reader scrolls and each stage lights up when reached. */
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const line = window.innerHeight * 0.5;
      list.style.setProperty('--fill', `${Math.min(Math.max(line - rect.top, 0), rect.height)}px`);
      let next = 0;
      itemRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top + 40 <= line) next = i;
      });
      setReached(next);
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

        <ol className="tl" ref={listRef}>
          <span className="tl-fill" aria-hidden="true" />
          {processSteps.map((step, i) => {
            const Icon = icons[step.title] ?? Search;
            const done = i <= reached;
            return (
              <li
                key={step.index}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={cn('tl-item', i % 2 === 1 && 'tl-item-flip', done && 'is-done')}
              >
                <span className="tl-node" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div className="tl-body">
                  <h3 className="tl-title">{step.title}</h3>
                  <h4 className="tl-tag font-inter">{step.tag}</h4>
                  <p className="tl-desc font-inter">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
