import type { LucideIcon } from 'lucide-react';
import { InfiniteSlider } from '../infinite-slider-horizontal';

/*
 * Adapted from the "hero-01" block's BrandSlider. The original scrolled a
 * row of client logo images (`image` / `lightimg`). With no real client
 * logos to show, this scrolls the platforms the studio builds on instead —
 * reusing the site's existing InfiniteSlider rather than a new marquee
 * implementation.
 */

export interface BrandItem {
  icon: LucideIcon;
  name: string;
  colorClassName?: string;
}

export function BrandSlider({ items }: { items: BrandItem[] }) {
  return (
    <div className="border-y border-ink-400 bg-ink py-8">
      <InfiniteSlider gap={56} duration={30} durationOnHover={60}>
        {items.map(({ icon: Icon, name, colorClassName }) => (
          <div
            key={name}
            className="flex shrink-0 items-center gap-2.5 font-inter text-[17px] font-semibold text-gray-200"
          >
            <Icon
              size={20}
              className={colorClassName ?? 'text-gray-200'}
              aria-hidden="true"
            />
            {name}
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
