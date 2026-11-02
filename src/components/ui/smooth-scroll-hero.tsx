import * as React from 'react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';

interface SmoothScrollHeroProps {
  /** Height of the scroll section in pixels. @default 1500 */
  scrollHeight?: number;
  /** Background image URL for desktop view (ignored when `video` is set). */
  desktopImage?: string;
  /** Background image URL for mobile view (ignored when `video` is set). */
  mobileImage?: string;
  /**
   * Background video URL, used for both mobile and desktop. When set, this
   * takes over from `desktopImage`/`mobileImage` entirely — video needs an
   * actual <video> element, not a CSS background-image.
   */
  video?: string;
  /** Still frame shown until the video has loaded. */
  poster?: string;
  /** Initial clip path percentage. @default 25 */
  initialClipPercentage?: number;
  /** Final clip path percentage. @default 75 */
  finalClipPercentage?: number;
  /** Optional content overlaid on top of the sticky background (e.g. a CTA). */
  children?: React.ReactNode;
}

interface SmoothScrollHeroBackgroundProps extends SmoothScrollHeroProps {
  scrollHeight: number;
  initialClipPercentage: number;
  finalClipPercentage: number;
}

const SmoothScrollHeroBackground: React.FC<
  SmoothScrollHeroBackgroundProps
> = ({
  scrollHeight,
  desktopImage,
  mobileImage,
  video,
  poster,
  initialClipPercentage,
  finalClipPercentage,
  children,
}) => {
  const { scrollY } = useScroll();

  // The video is only requested once the section is near the viewport, so it
  // never competes with the hero for bandwidth on first load.
  const holderRef = React.useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = React.useState(false);
  React.useEffect(() => {
    if (!video || loadVideo) return;
    const el = holderRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setLoadVideo(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoadVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video, loadVideo]);

  const clipStart = useTransform(
    scrollY,
    [0, scrollHeight],
    [initialClipPercentage, 0]
  );
  const clipEnd = useTransform(
    scrollY,
    [0, scrollHeight],
    [finalClipPercentage, 100]
  );

  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, scrollHeight + 500],
    ['170%', '100%']
  );
  const videoScale = useTransform(scrollY, [0, scrollHeight + 500], [1.7, 1]);

  return (
    <motion.div
      ref={holderRef}
      className="sticky top-0 h-screen w-full overflow-hidden bg-black"
      style={{
        clipPath,
        willChange: 'transform, opacity',
      }}
    >
      {video ? (
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale: videoScale }}
          src={loadVideo ? video : undefined}
          poster={poster}
          preload="none"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <>
          {/* Mobile background */}
          <motion.div
            className="absolute inset-0 md:hidden"
            style={{
              backgroundImage: mobileImage ? `url(${mobileImage})` : undefined,
              backgroundSize,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Desktop background */}
          <motion.div
            className="absolute inset-0 hidden md:block"
            style={{
              backgroundImage: desktopImage ? `url(${desktopImage})` : undefined,
              backgroundSize,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </>
      )}
      {children}
    </motion.div>
  );
};

/**
 * A smooth scroll hero component with a parallax background effect.
 * Pass `video` for a video background, or `desktopImage`/`mobileImage` for
 * the original image-based behavior.
 */
const SmoothScrollHero: React.FC<SmoothScrollHeroProps> = ({
  scrollHeight = 1500,
  desktopImage,
  mobileImage,
  video,
  poster,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  children,
}) => {
  return (
    <div
      style={{ height: `calc(${scrollHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <SmoothScrollHeroBackground
        scrollHeight={scrollHeight}
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        video={video}
        poster={poster}
        initialClipPercentage={initialClipPercentage}
        finalClipPercentage={finalClipPercentage}
      >
        {children}
      </SmoothScrollHeroBackground>
    </div>
  );
};

export default SmoothScrollHero;
