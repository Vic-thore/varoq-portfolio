import { useState } from 'react';
import { Blocks, Check, ChevronDown, Code2, LayoutTemplate, Palette, type LucideIcon } from 'lucide-react';
import { cn } from '../lib/cn';

interface Service {
  title: string;
  text: string;
  chips: string[];
  Icon: LucideIcon;
}

const services: Service[] = [
  {
    title: 'Branding',
    text: 'Logo, colour and typography systems and brand guidelines that make your business look credible from the first impression.',
    chips: ['Logo', 'Colour', 'Typography', 'Guidelines'],
    Icon: Palette,
  },
  {
    title: 'UI/UX Design',
    text: 'Research-led design for websites and apps: user flows, wireframes, prototypes and polished interfaces ready for development.',
    chips: ['User flows', 'Wireframes', 'Prototypes', 'UI'],
    Icon: LayoutTemplate,
  },
  {
    title: 'Web Development',
    text: 'Fast, accessible, search-friendly websites and web apps, easy to use and easy for your team to maintain.',
    chips: ['React', 'Accessibility', 'Performance', 'Search-friendly'],
    Icon: Code2,
  },
  {
    title: 'No-Code Development',
    text: 'Websites and stores on Webflow, Framer, Shopify and WordPress that you can edit yourself, with a clean handover.',
    chips: ['Webflow', 'Framer', 'Shopify', 'WordPress', 'CMS', 'Handover'],
    Icon: Blocks,
  },
];

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="section-pad above-glow relative bg-ink" aria-labelledby="services-heading">
      <div className="container-zf">
        <p className="eyebrow">What I do</p>
        <h2 id="services-heading" className="section-title mt-4 max-w-[760px]">
          Design, build, and grow your business online
        </h2>
        <p className="mt-5 max-w-[520px] font-inter text-[16px] leading-[26px] text-white/70">
          Branding, UI/UX, web development and no-code under one roof.
        </p>

        <ul className="sv-list">
          {services.map(({ title, text, chips, Icon }, i) => {
            const isOpen = open === i;
            return (
              <li key={title} className={cn('sv-item', isOpen && 'is-open')}>
                <h3 className="sv-head">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`sv-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="sv-btn"
                  >
                    <span className="sv-title">
                      <span className="sv-icon" aria-hidden="true">
                        <Icon size={20} strokeWidth={1.75} />
                      </span>
                      {title}
                    </span>
                    <span className="sv-text font-inter">{text}</span>
                    <ChevronDown className="sv-chev" size={18} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`sv-panel-${i}`} role="region" aria-label={`${title} includes`} hidden={!isOpen} className="sv-panel">
                  <ul className="sv-chips">
                    {chips.map((c) => (
                      <li key={c} className="font-inter">
                        <Check size={13} aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
