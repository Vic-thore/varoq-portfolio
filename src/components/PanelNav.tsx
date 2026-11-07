import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { StatusPill } from './StatusPill';
import { BehanceIcon, InstagramIcon } from './SocialIcons';
import { CONTACT_EMAIL } from '../lib/contact';
import { cn } from '../lib/cn';

const LINKS = [
  { label: 'Home', to: '/', hash: '' },
  { label: 'Work', to: '/work', hash: '' },
  { label: 'Process', to: '/', hash: '#process' },
  { label: 'Services', to: '/', hash: '#services' },
  { label: 'About', to: '/', hash: '#about' },
  { label: 'Contact', to: '/', hash: '#contact' },
];

const SOCIALS = [
  { label: 'Behance', href: 'https://www.behance.net/v-tech', Icon: BehanceIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/lycan_x__/', Icon: InstagramIcon },
];

const FOCUSABLE = 'a[href], button:not([disabled])';

/** Wordmark for the portfolio owner. */
function Logo() {
  return (
    <Link to="/" aria-label="Veetech, home" className="flex items-center gap-2 text-white">
      <span className="font-display text-[22px] font-bold leading-none tracking-tight">
        Veetech<span className="text-white/50">.</span>
      </span>
    </Link>
  );
}

/**
 * Header with a "Menu" pill. The menu is a rounded card that grows out of the top-right corner over a dimmed
 * page, with large links, a contact block and social buttons.
 */
export function PanelNav() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const openMenu = () => {
    const panel = panelRef.current;
    const scrim = scrimRef.current;
    if (!panel || !scrim) return;
    setOpen(true);
    gsap.killTweensOf([panel, scrim, ...panel.querySelectorAll('[data-reveal]')]);
    gsap.set([panel, scrim], { visibility: 'visible' });
    if (reduced()) {
      gsap.set(panel, { clipPath: 'inset(0 0 0 0 round 20px)', opacity: 1 });
      gsap.set(scrim, { opacity: 1 });
      gsap.set(panel.querySelectorAll('[data-reveal]'), { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.fromTo(
      panel,
      { clipPath: 'inset(0 0 100% 100% round 20px)', opacity: 1 },
      { clipPath: 'inset(0 0 0% 0% round 20px)', duration: 0.65, ease: 'power3.out' }
    );
    gsap.fromTo(
      panel.querySelectorAll('[data-reveal]'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.05, delay: 0.25 }
    );
  };

  const closeMenu = () => {
    const panel = panelRef.current;
    const scrim = scrimRef.current;
    if (!panel || !scrim) return;
    setOpen(false);
    gsap.killTweensOf([panel, scrim]);
    const hide = () => gsap.set([panel, scrim], { visibility: 'hidden' });
    if (reduced()) return hide();
    gsap.to(scrim, { opacity: 0, duration: 0.35, ease: 'power2.in' });
    gsap.to(panel, { clipPath: 'inset(0 0 100% 100% round 20px)', duration: 0.45, ease: 'power3.in', onComplete: hide });
  };

  // Scroll lock, Escape to close, keep Tab inside the panel while open, return focus to the trigger on close.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      window.__lenis?.start();
      triggerRef.current?.focus();
    };
  }, [open]);

  const isActive = (l: (typeof LINKS)[number]) =>
    l.to === '/work' ? pathname.startsWith('/work') : pathname === '/' && hash === l.hash;

  const go = (l: (typeof LINKS)[number]) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    closeMenu();
    navigate(l.to + l.hash);
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[70] flex h-20 items-center justify-between bg-[#05070B] px-8 max-[575px]:px-5">
        <Logo />
        <StatusPill className="absolute left-1/2 hidden -translate-x-1/2 md:block" />
        <button
          ref={triggerRef}
          type="button"
          onClick={openMenu}
          aria-expanded={open}
          aria-controls="site-menu"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 font-inter text-[15px] font-medium text-[#0A0A0B] transition-colors hover:bg-white/85"
        >
          <Menu size={18} aria-hidden="true" />
          Menu
        </button>
      </header>

      <div
        ref={scrimRef}
        onClick={closeMenu}
        aria-hidden="true"
        className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-[2px]"
        style={{ visibility: 'hidden', opacity: 0 }}
      />

      <div
        ref={panelRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className="fixed right-2 top-2 z-[1010] flex max-h-[calc(100dvh-16px)] w-[min(760px,calc(100vw-16px))] flex-col overflow-y-auto rounded-[20px] bg-[#FAFAFA] px-6 pb-8 pt-4 text-[#0A0A0B] shadow-2xl min-[576px]:px-10"
        style={{ visibility: 'hidden', clipPath: 'inset(0 0 100% 100% round 20px)' }}
      >
        <div className="flex items-center justify-between" data-reveal>
          <button
            ref={closeRef}
            type="button"
            onClick={closeMenu}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-black/15 px-5 font-inter text-[15px] font-medium transition-colors hover:bg-black/5"
          >
            <X size={18} aria-hidden="true" />
            Close
          </button>
        </div>

        <p className="mt-8 font-inter text-[13px] text-black/60" data-reveal>
          Navigate
        </p>
        <ul className="mt-3 flex flex-col">
          {LINKS.map((l) => {
            const active = isActive(l);
            return (
              <li key={l.label} data-reveal>
                <a
                  href={l.to + l.hash}
                  onClick={go(l)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group inline-flex items-center gap-3 font-display text-[clamp(38px,7vw,64px)] font-bold leading-[1.1] tracking-tight transition-colors',
                    active ? 'text-[#0A0A0B]' : 'text-black/45 hover:text-[#0A0A0B]'
                  )}
                >
                  {l.label}
                  {active && <span className="h-2.5 w-2.5 rounded-full bg-[#0A0A0B]" aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>

        <hr className="my-8 border-black/15" data-reveal />

        <p className="font-inter text-[13px] text-black/60" data-reveal>
          Start a project
        </p>
        <div className="mt-3 flex items-center justify-between gap-4" data-reveal>
          <a href={`mailto:${CONTACT_EMAIL}`} className="min-w-0 break-all font-display text-[clamp(20px,3.2vw,30px)] font-semibold">
            {CONTACT_EMAIL}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label="Email me"
            className="grid h-12 w-12 flex-none place-items-center rounded-full bg-[#0A0A0B] text-white transition-transform hover:scale-105"
          >
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>

        <p className="mt-8 font-inter text-[13px] text-black/60" data-reveal>
          Elsewhere
        </p>
        <ul className="mt-3 flex gap-3" data-reveal>
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-12 w-12 place-items-center rounded-full bg-[#0A0A0B] text-white transition-transform hover:scale-105"
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
