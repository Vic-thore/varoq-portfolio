import { ArrowUpRight } from 'lucide-react';
import { Reveal, SplitReveal } from './Reveal';

/** Facts below come from the public Behance profile (behance.net/v-tech). Edit freely. */
const FACTS = [
  { label: 'Based in', value: 'Lagos, Nigeria' },
  { label: 'Experience', value: '4+ years in UI/UX' },
  { label: 'Webflow', value: 'All current certification badges' },
  { label: 'Availability', value: 'Freelance and full-time' },
];

const LINKS = [
  { label: 'Behance', href: 'https://www.behance.net/v-tech' },
  { label: 'Webflow portfolio', href: 'https://vtechportfolio.webflow.io' },
  { label: 'Résumé', href: 'https://www.behance.net/v-tech/resume' },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-12 bg-ink py-24 font-tight max-[575px]:py-16" aria-labelledby="about-heading">
      <div className="container-zf grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">About</p>
          <SplitReveal id="about-heading" text="Hi, I'm Oluwasegun." className="mt-4 text-[clamp(36px,5vw,60px)] font-medium leading-[1.05] tracking-tight text-white" />
          <Reveal as="p" delay={0.2} className="mt-5 text-[17px] leading-relaxed text-white/65">
            Webflow developer and UI/UX designer in Lagos.
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="space-y-5 text-[18px] leading-[1.7] text-white/80">
            <p>
              I&apos;m a Webflow developer and UI/UX designer with over four years of experience, focused on building
              visually striking websites that feel seamless to use.
            </p>
            <p>
              I design the interface, then build it myself in Webflow, so what you approve is what ships. I&apos;ve earned
              every current Webflow certification badge, and I work with brands that want a site they can edit and grow
              on their own.
            </p>
            <p>I&apos;m open to freelance projects and full-time roles. Tell me what you&apos;re building.</p>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {FACTS.map((f) => (
              <div key={f.label} className="bg-ink p-5">
                <dt className="text-[12px] uppercase tracking-[0.14em] text-white/50">{f.label}</dt>
                <dd className="mt-1.5 text-[18px] text-white">{f.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-wrap gap-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-2.5 font-inter text-[15px] text-white transition hover:bg-white hover:text-[#05070B]"
                >
                  {l.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
