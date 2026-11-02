import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';
import { ServicesMegaMenu } from './ServicesMegaMenu';
import { primaryNav, trailingNav } from '../data/navigation';
import { SITE_NAME } from '../lib/assets';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { cn } from '../lib/cn';

/** The original's asymmetric hamburger: 10-20 / 4-20 / 4-14. */
function BurgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M10 5H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close everything when crossing the desktop breakpoint so the two
  // navigation modes never end up open at the same time.
  useEffect(() => {
    setDrawerOpen(false);
    setServicesOpen(false);
  }, [isDesktop]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [servicesOpen]);

  const closeAll = () => {
    setDrawerOpen(false);
    setServicesOpen(false);
  };

  const navLinks = (onClick?: () => void) => (
    <>
      {primaryNav.map((item) => {
        const active = pathname === item.href;
        return (
          <li key={item.label}>
            <Link
              to={item.href}
              onClick={onClick}
              className={cn('nav-link', active && 'is-active')}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}

      <li
        ref={dropdownRef}
        className="relative"
        onMouseEnter={isDesktop ? () => setServicesOpen(true) : undefined}
        onMouseLeave={isDesktop ? () => setServicesOpen(false) : undefined}
      >
        <div className="flex items-center justify-center">
          <Link to="/services" onClick={onClick} className="nav-link pr-2">
            Services
          </Link>
          <button
            type="button"
            aria-label="Toggle services menu"
            aria-expanded={servicesOpen}
            aria-controls="services-mega-menu"
            onClick={() => setServicesOpen((v) => !v)}
            className="flex h-6 min-w-6 items-center justify-center border-0 bg-transparent p-1 pl-0.5 cursor-pointer"
          >
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={cn(
                'text-white transition-transform duration-300',
                servicesOpen && 'rotate-180'
              )}
            />
          </button>
        </div>

        {!isDesktop && (
          <ServicesMegaMenu
            id="services-mega-menu"
            open={servicesOpen}
            variant="mobile"
            onNavigate={closeAll}
          />
        )}
      </li>

      {trailingNav.map((item) => (
        <li key={item.label}>
          <Link to={item.href} onClick={onClick} className="nav-link">
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header className="zf-header">
      <div className="container-zf">
        <nav aria-label="Main" className="flex items-center justify-between">
          <Link
            to="/"
            aria-label={`${SITE_NAME} home`}
            className="flex shrink-0 items-center gap-2"
          >
            <img
              src="/svgs/logo-mark.svg"
              alt=""
              aria-hidden="true"
              width={50}
              height={30}
              className="h-[30px] w-auto"
            />
            <span className="font-display text-[26px] font-semibold leading-none tracking-tight text-primary">
              Varoq
            </span>
          </Link>

          {/* Desktop navigation */}
          {isDesktop && (
            <ul className="flex list-none items-center gap-3">{navLinks()}</ul>
          )}

          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              className="btn btn-header hidden font-inter text-[14px] font-medium leading-5 xs:inline-flex"
            >
              <span className="flex items-center gap-3">
                <span>Work with us</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4.19617 11.7628L3.5 11.0667L10.0603 4.5H4.09617V3.5H11.7628V11.1667H10.7628V5.2025L4.19617 11.7628Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </a>

            {!isDesktop && (
              <button
                type="button"
                aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
                onClick={() => setDrawerOpen((v) => !v)}
                className="border-0 bg-transparent p-1 text-white"
              >
                {drawerOpen ? <X size={24} aria-hidden="true" /> : <BurgerIcon />}
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Desktop mega menu overlay, rendered outside the nav row so it can
          span the full viewport width like the original. */}
      {isDesktop && (
        <div
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <ServicesMegaMenu id="services-mega-menu" open={servicesOpen} />
        </div>
      )}

      {/* Mobile drawer */}
      {!isDesktop && (
        <div
          id="mobile-drawer"
          className={cn('mobile-drawer', drawerOpen && 'is-open')}
          // `inert` takes the closed drawer out of the tab order and the
          // accessibility tree (aria-hidden alone leaves its links focusable).
          {...(drawerOpen ? {} : ({ inert: '' } as Record<string, string>))}
        >
          <ul className="flex list-none flex-col gap-4 text-center">
            {navLinks()}
          </ul>
          <a
            href="/#contact"
            onClick={closeAll}
            className="btn btn-primary mt-2 self-center xs:hidden"
          >
            Work with us
          </a>
        </div>
      )}
    </header>
  );
}
