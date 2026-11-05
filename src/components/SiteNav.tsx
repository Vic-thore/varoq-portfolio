import { useNavigate } from 'react-router-dom';
import ImmersiveFullscreenNav from '@/components/ui/immersive-full-screen-nav';
import { SITE_NAME } from '../lib/assets';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Contact', href: '/#contact' },
];

const images = [
  { src: '/images/projects/everscribn.webp', alt: 'Everscribn website' },
  { src: '/images/projects/groupaway.webp', alt: 'Groupaway website' },
];

/** Site header: logo plus a hamburger that opens the full-screen menu. */
export function SiteNav() {
  const navigate = useNavigate();
  return (
    <ImmersiveFullscreenNav
      navConfig={{
        brand: <span className="font-display text-[22px] font-bold tracking-tight">{SITE_NAME}</span>,
        brandLabel: `${SITE_NAME}, home`,
        brandHref: '/',
        overlayBg: '#07142F',
        clipOrigin: 'bottom',
        headerOpenColor: '#ffffff',
        headerClosedColor: '#ffffff',
        headerClosedBg: '#05070B',
      }}
      navContent={{
        agencyName: SITE_NAME,
        tagline: 'Branding, web design and automation.',
        links,
        images,
        socials: [
          { type: 'instagram', href: 'https://www.instagram.com/varoqstudio', label: 'Instagram' },
          { type: 'twitter', href: 'https://x.com/Varoqstudio', label: 'X' },
          { type: 'tiktok', href: 'https://www.tiktok.com/@varoqstudio', label: 'TikTok' },
        ],
        onNavigate: (href) => navigate(href),
      }}
    />
  );
}
