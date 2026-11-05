// Full-screen wipe navigation (adapted from the Hyperiux Vault component supplied for this project).
import gsap from 'gsap';
import type { MouseEvent, ReactNode, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { InstagramIcon, TiktokIcon, XIcon } from '../SocialIcons';

/* ------------------------------------------------------------------ *
 * Focus trap: keeps keyboard focus inside the open menu and restores it
 * to the trigger on close.
 * ------------------------------------------------------------------ */

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const isVisible = (element?: HTMLElement | null): boolean => {
  if (!element || element.hidden) return false;
  const style = window.getComputedStyle(element);
  if (style.visibility === 'hidden' || style.visibility === 'collapse') return false;
  return element.getClientRects().length > 0;
};

const getFocusableElements = (container?: HTMLElement | null): HTMLElement[] => {
  if (!container) return [];
  return (Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[]).filter(isVisible);
};

interface UseFocusTrapParams {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onEscape?: () => void;
}

function useFocusTrap({ active, containerRef, initialFocusRef, onEscape }: UseFocusTrapParams) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusInitial = () => {
      const target = initialFocusRef?.current ?? getFocusableElements(container)[0] ?? container;
      if (!(target instanceof HTMLElement)) return;
      if (target === container && !container.hasAttribute('tabindex')) container.setAttribute('tabindex', '-1');
      target.focus();
    };
    const focusFrame = requestAnimationFrame(focusInitial);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusableElements(container);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !container.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }
      if (activeElement === last || !container.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && document.contains(previouslyFocused)) previouslyFocused.focus();
    };
  }, [active, containerRef, initialFocusRef]);
}

/* ------------------------------------------------------------------ *
 * FullscreenNav: fixed header (brand + toggle) and a fixed panel that
 * wipes open with clip-path from `clipOrigin`.
 * ------------------------------------------------------------------ */

const CLIPS = {
  bottom: {
    closedInitial: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    open: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    closedFinal: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
  },
  top: {
    closedInitial: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    open: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    closedFinal: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
  },
  left: {
    closedInitial: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    open: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    closedFinal: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
  },
  right: {
    closedInitial: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
    open: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    closedFinal: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
  },
};

const REDUCED_MOTION_FADE_DURATION = 0.2;

export interface FullscreenNavProps {
  brand?: ReactNode;
  brandLabel?: string;
  brandHref?: string;
  clipOrigin?: keyof typeof CLIPS;
  overlayBg?: string;
  headerClassName?: string;
  /** Header background while the panel is closed; it turns transparent when open. */
  headerClosedBg?: string;
  openDuration?: number;
  closeDuration?: number;
  ease?: string;
  /** Header text and hamburger colour while the panel is open. */
  headerOpenColor?: string;
  /** Header text and hamburger colour while the panel is closed. */
  headerClosedColor?: string;
  onOpen?: () => void;
  onClose?: () => void;
  children: (isOpen: boolean, close: () => void) => ReactNode;
}

function FullscreenNav({
  brand = 'Brand',
  brandLabel,
  brandHref = '/',
  clipOrigin = 'bottom',
  overlayBg = '#000000',
  headerClassName = '',
  headerClosedBg = 'transparent',
  openDuration = 1.2,
  closeDuration = 1.2,
  ease = 'power4.inOut',
  headerOpenColor = '#ffffff',
  headerClosedColor = '#000000',
  onOpen,
  onClose,
  children,
}: FullscreenNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLElement | null>(null);
  const linksWrapperRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const isAnimatingRef = useRef(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const isReducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;

  const { closedInitial, open: openClipPath, closedFinal } = CLIPS[clipOrigin] ?? CLIPS.bottom;
  const barColor = isOpen ? headerOpenColor : headerClosedColor;

  const onOpenMenu = () => {
    setIsOpen(true);
    timelineRef.current?.kill();
    gsap.set(overlayRef.current, { clipPath: closedInitial });
    gsap.set(linksWrapperRef.current, { opacity: 1, scale: 1 });

    if (isReducedMotion) {
      gsap.set(overlayRef.current, { clipPath: openClipPath, autoAlpha: 0 });
      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: REDUCED_MOTION_FADE_DURATION,
        ease: 'power2.out',
        onStart: () => { isAnimatingRef.current = true; },
        onComplete: () => { isAnimatingRef.current = false; onOpen?.(); },
      });
      return;
    }

    const timeline = gsap.timeline({
      onStart: () => { isAnimatingRef.current = true; },
      onComplete: () => { isAnimatingRef.current = false; onOpen?.(); },
    });
    timelineRef.current = timeline;
    timeline.to(overlayRef.current, { clipPath: openClipPath, duration: openDuration, delay: 0.2, ease });
  };

  const onCloseMenu = () => {
    setIsOpen(false);
    timelineRef.current?.kill();

    if (isReducedMotion) {
      gsap.set(linksWrapperRef.current, { scale: 1, opacity: 1 });
      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: REDUCED_MOTION_FADE_DURATION,
        ease: 'power2.out',
        onStart: () => { isAnimatingRef.current = true; },
        onComplete: () => {
          isAnimatingRef.current = false;
          gsap.set(overlayRef.current, { clipPath: closedFinal });
          onClose?.();
        },
      });
      gsap.set(overlayRef.current, { clipPath: closedFinal });
      return;
    }

    const timeline = gsap.timeline({
      onStart: () => { isAnimatingRef.current = true; },
      onComplete: () => { isAnimatingRef.current = false; onClose?.(); },
    });
    timelineRef.current = timeline;
    timeline
      .to(linksWrapperRef.current, { scale: 0.9, opacity: 0.5, duration: 0.7, ease: 'power2.in' })
      .to(overlayRef.current, { clipPath: closedFinal, duration: closeDuration, ease }, '<');
  };

  const onToggleMenu = () => {
    if (isAnimatingRef.current) return;
    if (isOpen) onCloseMenu();
    else onOpenMenu();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useFocusTrap({ active: isOpen, containerRef: rootRef, initialFocusRef: toggleButtonRef, onEscape: onCloseMenu });

  return (
    <div ref={rootRef}>
      <header className={`fixed left-0 right-0 top-0 z-[70] flex h-20 items-center justify-between px-8 transition-colors duration-500 max-[575px]:px-5 ${headerClassName}`}
        style={{ backgroundColor: isOpen ? 'transparent' : headerClosedBg }}
      >
        <a
          href={brandHref}
          aria-label={brandLabel}
          className="cursor-pointer transition-colors duration-300 motion-reduce:transition-none"
          style={{ color: barColor }}
        >
          {brand}
        </a>

        <button
          ref={toggleButtonRef}
          onClick={onToggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5"
        >
          <span
            style={{ backgroundColor: barColor }}
            className={`block h-0.5 w-full transition-all duration-700 ease-in-out motion-reduce:transition-none ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span
            style={{ backgroundColor: barColor }}
            className={`block h-0.5 w-full transition-all duration-500 motion-reduce:transition-none ${isOpen ? 'scale-x-0 opacity-0' : ''}`}
          />
          <span
            style={{ backgroundColor: barColor }}
            className={`block h-0.5 w-full transition-all duration-700 ease-in-out motion-reduce:transition-none ${isOpen ? '-translate-y-[9px] -rotate-45' : ''}`}
          />
        </button>
      </header>

      <nav
        ref={overlayRef}
        style={{ clipPath: closedInitial, backgroundColor: overlayBg }}
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-2 overflow-y-auto ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!isOpen}
        aria-label="Main"
      >
        <div ref={linksWrapperRef} className="flex min-h-screen w-screen flex-col items-center justify-center motion-reduce:opacity-100">
          {children(isOpen, onCloseMenu)}
        </div>
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * CustomNavbar: the panel content (links, image row, name and tagline,
 * socials). Its reveal animation is keyed off `isOpen`.
 * ------------------------------------------------------------------ */

const SOCIAL_ICONS: Record<string, ReactNode> = {
  instagram: <InstagramIcon size={24} />,
  twitter: <XIcon size={22} />,
  tiktok: <TiktokIcon size={22} />,
};

const DEFAULT_LINK_Y_OFFSET = 30;
const DEFAULT_LINK_DURATION = 0.8;
const DEFAULT_LINK_STAGGER = 0.07;
const DEFAULT_LINK_CHAR_STAGGER = 0.015;
const IMAGE_INITIAL_SCALE = 0.7;
const DEFAULT_IMAGE_START_SCALE = 0.8;
const DEFAULT_IMAGE_DURATION = 0.9;
const DEFAULT_IMAGE_STAGGER = 0.02;
const DEFAULT_SOCIAL_Y_OFFSET = 14;
const DEFAULT_SOCIAL_DURATION = 0.5;
const DEFAULT_SOCIAL_STAGGER = 0.06;
const HEADER_Y_OFFSET = -12;
const LOCATION_Y_OFFSET = 10;
const DELAY_OFFSET = 0.2;
const TAGLINE_DELAY_OFFSET = 0.08;
const IMAGE_DELAY_OFFSET = 0.1;
const SOCIAL_DELAY_OFFSET = 0.2;
const LOCATION_DELAY_OFFSET = 0.25;

/** Each character slides up out of view on hover while a copy slides in beneath it. Plain text for reduced motion. */
function NavLinkHover({
  label,
  href,
  charStagger,
  reduced,
  onClick,
}: {
  label: string;
  href: string;
  charStagger: number;
  reduced: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  if (reduced) {
    return (
      <a href={href} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <a href={href} onClick={onClick} className="group/link-hover inline-block no-underline">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="relative inline-block overflow-hidden align-middle leading-[1.08]">
        {[...label].map((char, index) => (
          <span
            key={index}
            className="relative inline-block whitespace-pre transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover/link-hover:-translate-y-[1.2em] group-focus-visible/link-hover:-translate-y-[1.2em]"
            style={{ textShadow: '0 1.2em currentColor', transitionDelay: `${index * charStagger}s` }}
          >
            {char}
          </span>
        ))}
      </span>
    </a>
  );
}

export interface CustomNavbarLink {
  label: string;
  href: string;
}

export interface CustomNavbarSocial {
  type: string;
  href: string;
  label?: string;
}

export interface CustomNavbarProps {
  links?: CustomNavbarLink[];
  images?: { src: string; alt: string }[];
  agencyName?: string;
  socials?: CustomNavbarSocial[];
  location?: string;
  tagline?: string;
  isOpen?: boolean;
  overlayBg?: string;
  delay?: number;
  /** Called when a link is clicked, so the menu can close. */
  onLinkClick?: () => void;
  /** When set, link clicks are handled in-app instead of by the browser. */
  onNavigate?: (href: string) => void;
  linkOffsetY?: number;
  linkDuration?: number;
  linkStagger?: number;
  linkCharStagger?: number;
  imageStartScale?: number;
  imageDuration?: number;
  imageStagger?: number;
  socialOffsetY?: number;
  socialDuration?: number;
  socialStagger?: number;
}

function CustomNavbar({
  links = [],
  images = [],
  agencyName = '',
  socials = [],
  location = '',
  tagline = '',
  isOpen = false,
  overlayBg = '#000000',
  delay = 1,
  onLinkClick,
  onNavigate,
  linkOffsetY = DEFAULT_LINK_Y_OFFSET,
  linkDuration = DEFAULT_LINK_DURATION,
  linkStagger = DEFAULT_LINK_STAGGER,
  linkCharStagger = DEFAULT_LINK_CHAR_STAGGER,
  imageStartScale = DEFAULT_IMAGE_START_SCALE,
  imageDuration = DEFAULT_IMAGE_DURATION,
  imageStagger = DEFAULT_IMAGE_STAGGER,
  socialOffsetY = DEFAULT_SOCIAL_Y_OFFSET,
  socialDuration = DEFAULT_SOCIAL_DURATION,
  socialStagger = DEFAULT_SOCIAL_STAGGER,
}: CustomNavbarProps) {
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const agencyRef = useRef<HTMLHeadingElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const locationRef = useRef<HTMLSpanElement | null>(null);
  const reduceMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
  const isReducedMotion = reduceMotion();

  useEffect(() => {
    gsap.killTweensOf([...linksRef.current, ...imagesRef.current, ...socialsRef.current, agencyRef.current, taglineRef.current, locationRef.current]);
    if (!isOpen) return;

    gsap.set(linksRef.current, { y: linkOffsetY, opacity: 0 });
    gsap.set(imagesRef.current, { scale: IMAGE_INITIAL_SCALE, opacity: 0 });
    gsap.set(socialsRef.current, { y: socialOffsetY, opacity: 0 });
    gsap.set(agencyRef.current, { y: HEADER_Y_OFFSET, opacity: 0 });
    gsap.set(taglineRef.current, { y: HEADER_Y_OFFSET, opacity: 0 });
    gsap.set(locationRef.current, { y: LOCATION_Y_OFFSET, opacity: 0 });

    if (reduceMotion()) {
      gsap.set([agencyRef.current, taglineRef.current, ...linksRef.current, ...socialsRef.current, locationRef.current], { y: 0, opacity: 1 });
      gsap.set(imagesRef.current, { scale: 1, opacity: 1 });
      return;
    }

    const d = Math.max(delay - DELAY_OFFSET, 0);
    gsap.fromTo(agencyRef.current, { y: HEADER_Y_OFFSET, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: d });
    gsap.fromTo(taglineRef.current, { y: HEADER_Y_OFFSET, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: d + TAGLINE_DELAY_OFFSET });
    gsap.fromTo(linksRef.current, { y: linkOffsetY, opacity: 0 }, { y: 0, opacity: 1, duration: linkDuration, ease: 'power2.out', stagger: linkStagger, delay: d });
    gsap.fromTo(imagesRef.current, { scale: imageStartScale, opacity: 0 }, { scale: 1, opacity: 1, duration: imageDuration, ease: 'power3.out', stagger: imageStagger, delay: d + IMAGE_DELAY_OFFSET });
    gsap.fromTo(socialsRef.current, { y: socialOffsetY, opacity: 0 }, { y: 0, opacity: 1, duration: socialDuration, ease: 'power2.out', stagger: socialStagger, delay: d + SOCIAL_DELAY_OFFSET });
    gsap.fromTo(locationRef.current, { y: LOCATION_Y_OFFSET, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: d + LOCATION_DELAY_OFFSET });
  }, [delay, imageDuration, imageStagger, imageStartScale, isOpen, linkDuration, linkOffsetY, linkStagger, socialDuration, socialOffsetY, socialStagger]);

  const handleLink = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
      event.preventDefault();
      onNavigate(href);
    }
    onLinkClick?.();
  };

  return (
    <div style={{ backgroundColor: overlayBg }} className="flex min-h-screen w-full flex-col justify-between gap-10 px-28 pb-10 pt-28 text-white max-[1025px]:px-6 max-[1025px]:py-20">
      {(agencyName || tagline) && (
        <div className="flex flex-col gap-1">
          {agencyName && (
            <p ref={agencyRef} className="text-sm font-medium uppercase tracking-[0.2em] opacity-90">
              {agencyName}
            </p>
          )}
          {tagline && (
            <p ref={taglineRef} className="text-sm opacity-60">
              {tagline}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between gap-10 max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-[4.5rem]">
        <ul className="flex flex-col gap-0">
          {links.map((link, index) => (
            <li
              key={link.label}
              ref={(el) => { linksRef.current[index] = el as unknown as HTMLDivElement | null; }}
              className="z-[60] font-display text-[5vw] font-bold max-[1025px]:text-[9vw]"
              style={{ opacity: 0, transform: `translateY(${linkOffsetY}px)` }}
            >
              <NavLinkHover label={link.label} href={link.href} charStagger={linkCharStagger} reduced={isReducedMotion} onClick={handleLink(link.href)} />
            </li>
          ))}
        </ul>

        {images.length > 0 && (
          <div className="flex items-end gap-8 max-[1025px]:w-full max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-3">
            {images.slice(0, 4).map((image, index) => (
              <div
                key={image.src}
                ref={(el) => { imagesRef.current[index] = el; }}
                style={{ opacity: 0, transform: `scale(${IMAGE_INITIAL_SCALE})` }}
                className="relative h-[18vw] w-[25vw] overflow-hidden rounded-xl max-[1025px]:h-[30vw] max-[1025px]:w-[60vw] max-[1025px]:rounded-md"
              >
                <img src={image.src} alt={image.alt} className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105 motion-reduce:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between max-[1025px]:pb-10">
        <div className="flex items-end gap-6">
          {socials.map((social, index) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label ?? social.type}
              ref={(el) => { socialsRef.current[index] = el; }}
              style={{ opacity: 0, transform: `translateY(${socialOffsetY}px)` }}
            >
              {SOCIAL_ICONS[social.type]}
            </a>
          ))}
        </div>
        {location && (
          <span ref={locationRef} className="text-sm opacity-60">
            {location}
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const NAV_CONFIG: Partial<FullscreenNavProps> = {
  brand: 'Brand',
  brandHref: '/',
  clipOrigin: 'bottom',
  overlayBg: '#000000',
  headerOpenColor: '#ffffff',
  headerClosedColor: '#000000',
  openDuration: 1.2,
  closeDuration: 1.2,
};

export interface ImmersiveFullscreenNavProps {
  navConfig?: Partial<FullscreenNavProps>;
  navContent?: Partial<CustomNavbarProps>;
}

/**
 * A fixed header (brand + hamburger) that wipes a full-screen panel open via
 * clip-path, then reveals the links, an image row and socials in sequence.
 * Respects prefers-reduced-motion: the wipe becomes a fade and the reveals
 * become instant.
 */
export default function ImmersiveFullscreenNav({ navConfig, navContent }: ImmersiveFullscreenNavProps) {
  const config = { ...NAV_CONFIG, ...navConfig };
  return (
    <FullscreenNav {...config}>
      {(isOpen, close) => (
        <CustomNavbar {...navContent} isOpen={isOpen} overlayBg={config.overlayBg} delay={config.openDuration} onLinkClick={close} />
      )}
    </FullscreenNav>
  );
}
