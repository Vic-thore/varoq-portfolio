import { motion } from 'framer-motion';
import { BadgeQuestionMark, Heart } from 'lucide-react';
import { reveal } from '../hooks/useReveal';

/** Giant stacked headline. Size scales with the viewport so the longest line (DESIGN ♥ CODE) always fits. */
const H = 'font-inter font-extralight leading-[0.95] tracking-[0.05em] text-white text-[clamp(32px,8.6vw,138px)]';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-ink pb-20 pt-[112px]" aria-labelledby="hero-title">
      {/* dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:20px_20px]"
      />

      <div className="container-zf relative">
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

        <motion.div {...reveal(0.28)} className="mx-auto mt-10 flex max-w-[1100px] flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <div className="h-px w-full flex-1 bg-white/20" />
          <span className="whitespace-nowrap font-inter text-[12px] uppercase tracking-[0.14em] text-white/60 md:text-[13px]">
            Lagos, Nigeria
          </span>
          <span className="flex items-end gap-3 whitespace-nowrap">
            <span className="font-tight text-[24px] font-light text-white md:text-[34px]">DESIGNER</span>
            <span className="font-tight text-[28px] font-bold italic text-white md:text-[44px]">Veetech</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
