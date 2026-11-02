import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ProjectData } from '../data/content';
import { reveal } from '../hooks/useReveal';
export function ProjectCard({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  return (
    <motion.article {...reveal((index % 2) * 0.08)} className="portfolio-card">
      <Link to={`/work/${project.slug}`} className="block group">
        <div className="portfolio-thumb">
          <img
            src={project.image}
            alt={project.title}
            width={600}
            height={450}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[14px] font-semibold leading-none text-white max-[575px]:text-[16px] max-[575px]:leading-[25px]">
              {project.client}
            </p>
            <h3 className="text-[24px] font-bold leading-normal text-white max-[575px]:font-bold">
              {project.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
