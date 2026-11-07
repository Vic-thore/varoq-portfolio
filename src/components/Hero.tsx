import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeQuestionMark, Heart } from 'lucide-react';
import { BehanceIcon, InstagramIcon } from './SocialIcons';
import { caseStudies } from '../data/caseStudies';
import { reveal } from '../hooks/useReveal';

const cover = caseStudies.find((c) => c.image);

/** Giant stacked headline. Size scales with the viewport so the longest line (DESIGN ♥ CODE) always fits. */
const H = 'font-inter font-extralight leading-[0.95] tracking-[0.05em] text-white text-[clamp(32px,10.2vw,190px)]';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-ink pb-16 pt-[104px]" aria-labelledby="hero-title">
      {/* dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:20px_20px]"
      />

      <div className="relative mx-auto w-full max-w-[1800px] px-4 md:px-6">
        <h1 id="hero-title" className="sr-only">
          Digital products, design and code by Veetech
        </h1>

        <div aria-hidden="true" className="flex flex-col items-center gap-2 md:gap-4">
          <motion.div {...reveal(0.05)} className="flex flex-col items-center gap-3 md:flex-row md:gap-8">
            <p className="max-w-[240px] text-center font-inter text-[13px] leading-5 text-white/60 md:text-right md:text-[14px]">
              I&apos;m a digital product designer and Webflow developer based in Lagos, Nigeria.
            </p>
            <span className={H}>DIGITAL</span>
          </motion.div>

          <motion.div {...reveal(0.12)} className="flex flex-col items-center gap-3 md:flex-row md:gap-8">
            <span className={`${H} flex items-center`}>
              <span>PR</span>
              <BadgeQuestionMark className="mx-[0.16em] h-[1.1em] w-[1.1em] text-white" strokeWidth={1} />
              <span>DUCTS</span>
            </span>
            <p className="max-w-[240px] pt-2 text-center font-inter text-[13px] leading-5 text-white/60 md:text-left md:text-[14px]">
              Open to freelance projects and full-time roles, wherever you are.
            </p>
          </motion.div>

          <motion.div {...reveal(0.2)}>
            <span className={`${H} flex items-center`}>
              <span>DESIGN</span>
              <Heart className="mx-[0.15em] h-[1.3em] w-[1.3em] fill-[#f43f5e] text-[#f43f5e]" strokeWidth={1.5} />
              <span>CODE</span>
            </span>
          </motion.div>
        </div>

        <motion.div {...reveal(0.28)} className="mx-auto mt-10 flex max-w-none flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <div className="h-px w-full flex-1 bg-white/20" />
          <span className="whitespace-nowrap font-inter text-[12px] uppercase tracking-[0.14em] text-white/60 md:text-[13px]">
            Lagos, Nigeria
          </span>
          <span className="flex items-end gap-3 whitespace-nowrap">
            <span className="font-tight text-[24px] font-light text-white md:text-[34px]">DESIGNER</span>
            <span className="font-tight text-[28px] font-bold italic text-white md:text-[44px]">Veetech</span>
          </span>
        </motion.div>

        <motion.div
          {...reveal(0.36)}
          className="mx-auto mt-12 flex max-w-none flex-col items-start gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8">
            {cover && (
              <a
                href="#work"
                className="block h-[170px] w-[290px] max-w-full overflow-hidden rounded-md border border-white/15 shadow-lg"
                aria-label="See selected works"
              >
                <img src={cover.image} alt={cover.alt} className="h-full w-full object-cover" loading="eager" decoding="async" />
              </a>
            )}
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn btn-light font-inter">
                Schedule Call
              </a>
              <a href="#work" className="btn btn-outlined font-inter">
                See my work
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-5 text-white/80">
            <a href="https://www.behance.net/v-tech" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="transition hover:text-white">
              <BehanceIcon size={24} />
            </a>
            <a href="https://www.instagram.com/lycan_x__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition hover:text-white">
              <InstagramIcon size={22} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
