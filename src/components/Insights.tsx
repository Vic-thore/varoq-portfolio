import { motion } from 'framer-motion';
import { insights } from '../data/content';
import { InsightCard } from './InsightCard';
import { reveal } from '../hooks/useReveal';

export function Insights() {
  return (
    <section
      id="insights"
      className="section-pad above-glow relative bg-cream"
      aria-labelledby="insights-heading"
    >
      <div className="container-zf">
        <motion.div
          {...reveal()}
          className="flex justify-between gap-4 max-[575px]:flex-wrap max-[575px]:justify-center max-[575px]:text-center"
        >
          <div className="max-w-[755px]">
            <span className="eyebrow text-gray-900">Our Insights</span>
            <h2
              id="insights-heading"
              className="mt-8 text-[36px] font-bold leading-10 text-gray-800 max-[575px]:text-[28px]"
            >
              Insights That Inspire Vision Forward
            </h2>
          </div>

          <a
            href="#insights"
            className="btn btn-black btn-swap h-fit"
          >
            <span className="swap-out">Explore More</span>
            <svg
              className="swap-out"
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0.696167 8.26283L0 7.56667L6.56033 1H0.596167V0H8.26283V7.66667H7.26283V1.7025L0.696167 8.26283Z"
                fill="#FFFFFF"
              />
            </svg>
            <span className="swap-in">See More</span>
          </a>
        </motion.div>

        <div className="insights-grid">
          {insights.map((insight, i) => (
            <InsightCard key={insight.title} insight={insight} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
