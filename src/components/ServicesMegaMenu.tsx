import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { serviceGroups } from '../data/services';
import { cn } from '../lib/cn';

interface ServicesMegaMenuProps {
  open: boolean;
  /** Mobile renders the menu inline inside the drawer instead of as an overlay. */
  variant?: 'desktop' | 'mobile';
  id?: string;
  onNavigate?: () => void;
}

export function ServicesMegaMenu({
  open,
  variant = 'desktop',
  id,
  onNavigate,
}: ServicesMegaMenuProps) {
  const [activeTab, setActiveTab] = useState(serviceGroups[0].slug);
  const current =
    serviceGroups.find((group) => group.slug === activeTab) ?? serviceGroups[0];

  return (
    <div
      id={id}
      className={cn(
        'mega-menu',
        variant === 'mobile' && 'is-mobile',
        open && 'is-open'
      )}
      aria-hidden={!open}
    >
      <div className={variant === 'desktop' ? 'container-zf' : ''}>
        <div className="mega-menu-grid">
          <div className="mega-menu-tabs" role="tablist" aria-label="Service categories">
            {serviceGroups.map((group) => (
              <button
                key={group.slug}
                type="button"
                role="tab"
                id={`tab-${group.slug}`}
                aria-selected={group.slug === activeTab}
                aria-controls={`panel-${group.slug}`}
                tabIndex={open ? 0 : -1}
                className={cn('mega-tab', group.slug === activeTab && 'is-active')}
                onMouseEnter={() => setActiveTab(group.slug)}
                onFocus={() => setActiveTab(group.slug)}
                onClick={() => setActiveTab(group.slug)}
              >
                <span className="text-[16px] leading-6 font-semibold text-white">
                  {group.tabLabel}
                </span>
                {group.comingSoon && <span className="badge">Coming soon</span>}
              </button>
            ))}
          </div>

          <div
            className="mega-panel"
            role="tabpanel"
            id={`panel-${current.slug}`}
            aria-labelledby={`tab-${current.slug}`}
          >
            {current.href && (
              <Link
                to={current.href}
                className="col-span-full flex items-center justify-between rounded-md border border-white/15 px-5 py-3.5 text-[16px] font-semibold leading-6 text-white transition-colors duration-300 hover:bg-white/5"
                tabIndex={open ? 0 : -1}
                onClick={() => onNavigate?.()}
              >
                Explore {current.tabLabel}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            )}
            {current.cards.map((card) => (
              <Link
                key={card.title}
                to={`/contact?service=${encodeURIComponent(card.title)}`}
                className="service-item-card"
                tabIndex={open ? 0 : -1}
                onClick={() => onNavigate?.()}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <card.icon size={20} className="text-primary" aria-hidden="true" />
                </span>
                <span>
                  <span className="flex items-center gap-2">
                    <span className="block text-[16px] leading-6 font-semibold text-white">
                      {card.title}
                    </span>
                    {current.comingSoon && <span className="badge">Coming soon</span>}
                  </span>
                  <span className="mt-1 block text-[16px] leading-6 font-normal text-white/70">
                    {card.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
