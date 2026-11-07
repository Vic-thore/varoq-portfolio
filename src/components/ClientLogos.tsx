import { Link } from 'react-router-dom';
import { clientLogos, type ClientLogo } from '../data/content';

/**
 * Infinite logo marquee. The list is rendered twice and the track is
 * translated by -50%, which loops seamlessly at any content width. Logos are
 * forced to white by CSS (see `.logo-white--*` in index.css); each one links
 * to its case study. Motion stops for visitors who prefer reduced motion.
 */
// Full class names written out so Tailwind keeps them in the build.

function Logo({ logo, hidden }: { logo: ClientLogo; hidden: boolean }) {
  const inner = (
    <span className="whitespace-nowrap font-inter text-[15px] font-medium uppercase leading-none tracking-[0.12em] text-[#05070B]">
      {logo.alt}
    </span>
  );

  return logo.href ? (
    <Link
      to={logo.href}
      className="opacity-90 transition-opacity duration-200 hover:opacity-60 focus-visible:opacity-60"
      aria-label={hidden ? undefined : `${logo.alt} case study`}
      tabIndex={hidden ? -1 : undefined}
    >
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function ClientLogos() {
  if (clientLogos.length === 0) return null;

  // Four copies so each half of the track is wider than any screen; the -50% loop then never shows a gap.
  const loop = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <div className="marquee bg-white !py-0" aria-label="Brands I have worked with">
      <div className="overflow-hidden py-[26px]">
        <div className="marquee-track">
          {loop.map((logo, i) => (
            <div
              className="marquee-item"
              key={`${logo.alt}-${i}`}
              aria-hidden={i >= clientLogos.length}
            >
              <Logo logo={logo} hidden={i >= clientLogos.length} />
              <span aria-hidden="true" className="ml-[56px] inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-[#05070B]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
