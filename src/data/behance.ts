import type { CaseStudy } from './caseStudies';

/**
 * UI/UX projects from the Behance portfolio (behance.net/v-tech).
 * Covers load from Behance's CDN; to self-host, save each cover into
 * /public/images/projects and change `image` to the local path.
 *
 * Only what the Behance profile page shows is filled in (title, cover, link).
 * Add `challenge`, `tools`, `year`, `gallery` etc. per project to enrich a page;
 * anything left out is hidden. Set `isConcept: false` for real client work.
 */
const COVER = 'https://mir-s3-cdn-cf.behance.net/projects/404';
// Behance serves each cover in several sizes; 808 is sharper on retina screens.
// If that size is ever unavailable the page falls back to the 404 one.
const COVER_HD = 'https://mir-s3-cdn-cf.behance.net/projects/808';
const uiux = { serviceId: 'ui-ux-design', serviceLabel: 'UI/UX', href: '/services/ui-ux-design' };

type Behance = Omit<CaseStudy, 'slug' | 'isConcept'> & { isConcept?: boolean };

const base = {
  ...uiux,
  role: 'UI/UX Designer',
  approachLabel: 'The project',
};

export const behanceProjects: Behance[] = [
  {
    ...base,
    name: 'Oluko',
    category: 'Language learning',
    image: `${COVER_HD}/243288253592721.Y3JvcCwxNTE2LDExODYsMTE3OCww.png`,
    imageFallback: `${COVER}/243288253592721.Y3JvcCwxNTE2LDExODYsMTE3OCww.png`,
    alt: 'Cover of the Olùkọ project: interface design for a Yorùbá language learning platform',
    brief: 'Interface design for Olùkọ, a Yorùbá language learning platform.',
    approach: 'UI/UX design for a platform that helps people learn the Yorùbá language.',
    delivered: ['UI design'],
    behanceUrl: 'https://www.behance.net/gallery/253592721/Oluko',
    gallery: [
      { src: '/images/projects/oluko-1-website-hero.webp', alt: 'Olùkọ website hero: "Learn Yorùbá. Reconnect with Your Roots." over a textured portrait of five men in traditional dress', wide: true },
      { src: '/images/projects/oluko-2-home-grow.webp', alt: 'Olùkọ "How would you like to grow?" section with the app home screen, a mission card and a portrait' },
      { src: '/images/projects/oluko-3-mission-steps.webp', alt: 'Olùkọ mission section: a phone showing the Learn screen beside three steps, from the proficiency test to tracking progress' },
      { src: '/images/projects/oluko-4-app-download.webp', alt: 'Olùkọ app download banner: "Take Olùkọ everywhere you go" with streak, learn, profile and badge screens on a green background', wide: true },
    ],
    isConcept: false,
  },
  {
    ...base,
    name: 'Health Vital',
    category: 'Healthcare',
    image: `${COVER_HD}/b4f2ef254376397.Y3JvcCw2NTI3LDUxMDYsMzIzLDA.png`,
    imageFallback: `${COVER}/b4f2ef254376397.Y3JvcCw2NTI3LDUxMDYsMzIzLDA.png`,
    alt: 'Cover of the Health Vital healthcare dashboard UI/UX concept',
    brief: 'A healthcare dashboard UI/UX concept.',
    approach: 'A concept for a healthcare dashboard, designed to make patient and health data easy to scan.',
    delivered: ['Dashboard UI', 'UX concept'],
    behanceUrl: 'https://www.behance.net/gallery/254376397/Health-Vital-Healthcare-Dashboard-UIUX-Concept',
    gallery: [
      { src: '/images/projects/health-vital-1-dashboard.webp', alt: 'Health Vital doctor dashboard: patient cards, schedule timeline and recent activity', wide: true },
      { src: '/images/projects/health-vital-2-tablet-hand.webp', alt: 'The Health Vital dashboard shown on a tablet held in a bright living room' },
      { src: '/images/projects/health-vital-3-tablet-night.webp', alt: 'The Health Vital dashboard on a tablet in a dim room, with a person reaching toward the screen' },
    ],
  },
  {
    ...base,
    name: 'Modern Interior Décor Landing Page',
    category: 'Interior design',
    image: `${COVER_HD}/55c0c6236541269.Y3JvcCwyNzAwLDIxMTEsMCwyNg.png`,
    imageFallback: `${COVER}/55c0c6236541269.Y3JvcCwyNzAwLDIxMTEsMCwyNg.png`,
    alt: 'Cover of a modern interior décor landing page design',
    brief: 'A landing page design for a modern interior décor brand.',
    approach: 'A landing page design that shows interior décor with clean layouts and generous space.',
    delivered: ['Landing page design'],
    behanceUrl: 'https://www.behance.net/gallery/236541269/Modern-Interior-Dcor-Landing-Page-Design',
  },
  {
    ...base,
    name: 'Modern Interior Décor Landing Page (Alternate)',
    category: 'Interior design',
    image: `${COVER_HD}/1ae470236539735.Y3JvcCwyNzE2LDIxMjQsMCwyNg.png`,
    imageFallback: `${COVER}/1ae470236539735.Y3JvcCwyNzE2LDIxMjQsMCwyNg.png`,
    alt: 'Cover of an alternate modern interior décor landing page design',
    brief: 'A second take on the modern interior décor landing page.',
    approach: 'An alternate direction for the interior décor landing page, exploring a different layout.',
    delivered: ['Landing page design'],
    behanceUrl: 'https://www.behance.net/gallery/236539735/Modern-Interior-Dcor-Landing-Page-Design',
  },
  {
    ...base,
    name: 'Premium Wristwatch Store',
    category: 'Retail',
    image: `${COVER_HD}/c7a9e0236539467.Y3JvcCwxMzUwLDEwNTUsMCwxMw.png`,
    imageFallback: `${COVER}/c7a9e0236539467.Y3JvcCwxMzUwLDEwNTUsMCwxMw.png`,
    alt: 'Cover of a premium wristwatch store landing page design',
    brief: 'A landing page design for a premium wristwatch store.',
    approach: 'A landing page design for a premium watch brand.',
    delivered: ['Landing page design'],
    behanceUrl: 'https://www.behance.net/gallery/236539467/Premium-Wristwatch-Store-Landing-Page-Design',
  },
  {
    ...base,
    name: 'Mercedes-Benz Hero Concept',
    category: 'Automotive',
    image: `${COVER_HD}/65518f236538989.Y3JvcCwyNzAwLDIxMTEsMCwyNg.png`,
    imageFallback: `${COVER}/65518f236538989.Y3JvcCwyNzAwLDIxMTEsMCwyNg.png`,
    alt: 'Cover of a landing page hero design concept for an automotive brand',
    brief: 'A landing page hero design concept. A self-initiated concept, not affiliated with the brand.',
    approach: 'A hero section concept for an automotive landing page.',
    delivered: ['Hero design'],
    behanceUrl: 'https://www.behance.net/gallery/236538989/Mercedes-Benz-Landing-Page-Hero-Design',
  },
  {
    ...base,
    name: 'Architecture Website',
    category: 'Architecture',
    image: `${COVER_HD}/ac8098225573945.Y3JvcCwxMjM4LDk2OCwwLDA.png`,
    imageFallback: `${COVER}/ac8098225573945.Y3JvcCwxMjM4LDk2OCwwLDA.png`,
    alt: 'Cover of an architecture website design',
    brief: 'A website design for an architecture practice.',
    approach: 'Website design for an architecture practice.',
    delivered: ['Website design'],
    behanceUrl: 'https://www.behance.net/gallery/225573945/Architecture-website',
    gallery: [
      { src: '/images/projects/architecture-website-1-pages.webp', alt: 'Architecture website pages: "Architecture that defines space" hero, recent projects, services over a house photo, testimonial and footer', wide: true },
      { src: '/images/projects/architecture-website-2-laptop.webp', alt: 'The architecture website hero, "Architectural Coastal Design", shown on a laptop on a dark desk', wide: true },
    ],
  },
  {
    ...base,
    name: 'Redflag',
    category: 'UI design',
    image: `${COVER_HD}/da2e3a226125141.Y3JvcCwzNTI4LDI3NjAsNzgsMA.png`,
    imageFallback: `${COVER}/da2e3a226125141.Y3JvcCwzNTI4LDI3NjAsNzgsMA.png`,
    alt: 'Cover of the Redflag UI/UX project',
    brief: 'A UI/UX design project.',
    approach: 'UI/UX design for the Redflag project.',
    delivered: ['UI design'],
    behanceUrl: 'https://www.behance.net/gallery/226125141/Redflag',
  },
  {
    ...base,
    name: 'Fence Repair Company',
    category: 'Home services',
    image: `${COVER_HD}/6f92b8205776133.Y3JvcCwxNDAwLDEwOTUsMCwxNTI.png`,
    imageFallback: `${COVER}/6f92b8205776133.Y3JvcCwxNDAwLDEwOTUsMCwxNTI.png`,
    alt: 'Cover of a landing page design for a fence repair company',
    brief: 'A landing page design for a fence repair company.',
    approach: 'A landing page design for a local home-services company.',
    delivered: ['Landing page design'],
    behanceUrl: 'https://www.behance.net/gallery/205776133/landing-page-for-a-fence-repair-company',
  },
  {
    ...base,
    name: 'Off-Road Rally Tour',
    category: 'Events and travel',
    image: `${COVER_HD}/630ef7205137469.Y3JvcCwxNDAwLDEwOTUsMCwxNTI.png`,
    imageFallback: `${COVER}/630ef7205137469.Y3JvcCwxNDAwLDEwOTUsMCwxNTI.png`,
    alt: 'Cover of an off-road rally tour landing page design',
    brief: 'A landing page design for an off-road rally tour.',
    approach: 'A landing page design for an off-road rally tour experience.',
    delivered: ['Landing page design'],
    behanceUrl: 'https://www.behance.net/gallery/205137469/off-road-rally-tour-landing-page',
  },
  {
    ...base,
    name: 'Car Rental',
    category: 'Car rental',
    image: `${COVER_HD}/266d68189139635.Y3JvcCwxNDAwLDEwOTUsMCww.png`,
    imageFallback: `${COVER}/266d68189139635.Y3JvcCwxNDAwLDEwOTUsMCww.png`,
    alt: 'Cover of a car rental landing page design',
    brief: 'A landing page design for a car rental service.',
    approach: 'A landing page design for a car rental service.',
    delivered: ['Landing page design'],
    behanceUrl: 'https://www.behance.net/gallery/189139635/a-car-rental-landing-page',
  },
];
