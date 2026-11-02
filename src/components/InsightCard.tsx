import { motion } from 'framer-motion';
import type { InsightData } from '../data/content';
import { reveal } from '../hooks/useReveal';

export function InsightCard({
  insight,
  index,
}: {
  insight: InsightData;
  index: number;
}) {
  return (
    <motion.a
      {...reveal(Math.min(index, 3) * 0.06)}
      href={insight.href}
      className="insight-card"
    >
      <div className="insight-thumb">
        <img
          src={insight.image}
          alt={insight.title}
          width={397}
          height={196}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="insight-body">
        <span className="category-pill">{insight.category}</span>
        <h3 className="clamp-2 text-[16px] leading-[22px] text-gray-02 transition-colors font-bold">
          {insight.title}
        </h3>
        <p className="clamp-2 mt-2 text-[14px] leading-5 text-gray-muted-light">
          {insight.excerpt}
        </p>
      </div>
    </motion.a>
  );
}
