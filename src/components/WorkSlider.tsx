import { InfiniteSlider } from './ui/infinite-slider-horizontal';
import { projects } from '../data/content';

/**
 * The auto-scrolling strip of portfolio screenshots itself, without a section
 * wrapper, so it can sit under the homepage hero and inside the About hero.
 * Pauses on hover so a project title stays readable if someone's looking.
 */
export function WorkStrip({ className }: { className?: string }) {
  return (
    <InfiniteSlider
      gap={24}
      duration={35}
      durationOnHover={70}
      className={className}
    >
      {projects.map((project) => (
        <div
          key={project.client}
          className="h-[220px] w-[320px] shrink-0 overflow-hidden rounded-2xl bg-ink-800"
        >
          <img
            src={project.image}
            alt={project.title}
            width={320}
            height={220}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </InfiniteSlider>
  );
}

/** Portfolio strip directly beneath the homepage hero. */
export function WorkSlider() {
  return (
    <section className="bg-ink py-10" aria-label="Selected work preview">
      <WorkStrip />
    </section>
  );
}
