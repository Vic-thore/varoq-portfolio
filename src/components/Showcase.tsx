import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/content';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { SITE_NAME } from '../lib/assets';
import { reveal } from '../hooks/useReveal';

export function Showcase() {
  return (
    <section
      id="work"
      className="section-pad above-glow relative bg-ink font-tight"
      aria-labelledby="showcase-heading"
    >
      <div className="container-zf">
        <SectionHeading
          id="showcase-heading"
          eyebrow="Recent projects"
          title="Selected work"
          description="We have become experts in creating top-notch digital products. We design beautifully and develop excellently. And we care deeply about what we do."
        />

        <div className="portfolio-grid mt-16 max-[575px]:mt-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.client} project={project} index={i} />
          ))}
        </div>

        <motion.div {...reveal()} className="book-discovery-call">
          <div className="mx-auto max-w-[494px] text-center">
            <h3 className="text-[24px] font-bold leading-normal text-white">
              Your project here
            </h3>
            <p className="mb-6 mt-4 font-inter text-[15px] leading-normal text-gray-495 max-[575px]:text-[14px]">
              See how we think. Browse{' '}
              <Link to="/work" className="font-bold text-primary underline">
                {SITE_NAME}&apos;s work
              </Link>{' '}
              to learn how our product development services can transform your
              business.
            </p>
            <div className="flex justify-center">
              <a
                href="#contact"
                className="btn btn-primary btn-swap font-inter"
              >
                <span className="swap-out">Book a discovery call</span>
                <svg
                  className="swap-out"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M15.0833 5.41699L5.5 15.0003" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.16663 5H15.5V13.3333" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="swap-in">Lets Talk</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
