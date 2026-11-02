import { Link } from 'react-router-dom';
import { clientLogos, type ClientLogo } from '../data/content';

/**
 * Infinite logo marquee. The list is rendered twice and the track is
 * translated by -50%, which loops seamlessly at any content width. Logos are
 * forced to white by CSS (see `.logo-white--*` in index.css); each one links
 * to its case study. Motion stops for visitors who prefer reduced motion.
 */
// Full class names written out so Tailwind keeps them in the build.
const toneClass = {
  alpha: 'logo-white--alpha',
  'on-dark': 'logo-white--on-dark',
  'on-light': 'logo-white--on-light',
} as const;

function Logo({ logo, hidden }: { logo: ClientLogo; hidden: boolean }) {
  const inner = logo.text ? (
    <span className="font-display text-[24px] font-semibold leading-none tracking-tight text-white">
      {logo.text}
    </span>
  ) : (
    <img
      src={logo.src}
      alt={hidden ? '' : logo.alt}
      width={logo.width}
      height={logo.height}
      loading="lazy"
      decoding="async"
      className={`logo-white ${toneClass[logo.tone ?? 'alpha']} h-8 w-auto max-w-none object-contain`}
    />
  );

  return logo.href ? (
    <Link
      to={logo.href}
      className="opacity-80 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
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

  const loop = [...clientLogos, ...clientLogos];

  return (
    <div className="marquee">
      <div className="container-zf overflow-hidden">
        <p className="text-center font-inter text-[14px] font-medium uppercase leading-none text-white">
          Brands we&rsquo;ve built for
        </p>

        <div className="mt-6 py-5" aria-label="Brands we have worked with">
          <div className="marquee-track">
            {loop.map((logo, i) => (
              <div
                className="marquee-item"
                key={`${logo.alt}-${i}`}
                aria-hidden={i >= clientLogos.length}
              >
                <Logo logo={logo} hidden={i >= clientLogos.length} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
