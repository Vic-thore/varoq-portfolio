import { useState } from 'react';
import SmoothScrollHero from './ui/smooth-scroll-hero';

/**
 * The scroll-parallax video hero, with a cursor-tracking "All Works" pill
 * overlaid on top — same interaction the old Showreel section had.
 */
export function WorkPreviewHero() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  return (
    <SmoothScrollHero
      video="/videos/hero-showreel.mp4"
      poster="/videos/hero-showreel-poster.webp"
      scrollHeight={600}
      initialClipPercentage={25}
      finalClipPercentage={75}
    >
      <div
        className="absolute inset-0"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Keyboard and screen-reader route to the same destination as the
            cursor-following pill, which is decorative only. */}
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-20 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          View all works
        </a>

        <span
          className="btn btn-light pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
          style={{ left: pos.x, top: pos.y, opacity: hovered ? 1 : 0 }}
          aria-hidden="true"
        >
          All Works
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path d="M14.5833 5.41699L5 15.0003" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.66666 5H15V13.3333" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </SmoothScrollHero>
  );
}
