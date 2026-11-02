import { SITE_NAME } from '../lib/assets';

/* ---------------- Hero ---------------- */
export const typewriterWords = [
  'stunning',
  'intuitive',
  'scalable',
  'human',
  'bold',
];


/* ---------------- Client logos ---------------- */
// Logos of sites built for real clients (see src/data/projects.ts). They are
// drawn in white on the dark page by CSS, using `tone`:
//   alpha    transparent background  -> flattened to white
//   on-dark  baked-in dark background -> grey-scaled, background blended out
//   on-light baked-in white background -> inverted, background blended out
// If a logo looks wrong on the live site, change its `tone` here, or host a
// clean white version and point `src` at it.
export interface ClientLogo {
  alt: string;
  src?: string;
  /** Text wordmark, for brands whose logo is plain type. */
  text?: string;
  width: number;
  height: number;
  tone?: 'alpha' | 'on-dark' | 'on-light';
  href?: string;
}

export const clientLogos: ClientLogo[] = [
  {
    alt: 'Groupaway',
    src: 'https://cdn.prod.website-files.com/65e9429884be0d5dedc55700/69b27b1fe975fbcabb8eddb4_Group%2098%20(1).avif',
    width: 130, height: 32, tone: 'on-dark', href: '/work/groupaway',
  },
  {
    alt: 'Dente',
    src: 'https://cdn.prod.website-files.com/69681c28279e71cf89ba90c4/69681c28279e71cf89ba90d1_Dente.158C%20(1).avif',
    width: 100, height: 32, tone: 'alpha', href: '/work/dente',
  },
  {
    alt: 'Stache.haus',
    src: 'https://cdn.prod.website-files.com/65c674fcfa3c61cb18e16461/6a14b20bc68a2682a03001cc_Wordmark%20(Cream)%E2%80%94%20Stachehaus%C2%AE.svg',
    width: 130, height: 32, tone: 'alpha', href: '/work/stache-haus',
  },
  {
    alt: 'The Padel Club',
    src: 'https://www.thepadelclubfe.it/wp-content/uploads/2024/02/Logo-the-padel-club-1024x501.png',
    width: 66, height: 32, tone: 'alpha', href: '/work/the-padel-club',
  },
  {
    alt: 'ArkBM',
    src: 'https://www.arkbm.com/_next/image?url=%2Fbrand%2Farkbm-logo-v3-on-white.png&w=640&q=75',
    width: 110, height: 32, tone: 'on-light', href: '/work/arkbm',
  },
  {
    alt: 'Game Dev Essentials',
    src: 'https://gamedevessentials.com/wp-content/uploads/2025/10/Group-9-1.png',
    width: 130, height: 32, tone: 'alpha', href: '/work/gamedevessentials',
  },
  {
    alt: 'Yahweh Yasad Nursing Home',
    src: 'https://yahwehyasad.com/wp-content/uploads/2023/04/logo-8.svg',
    width: 82, height: 32, tone: 'alpha', href: '/work/yahweh-yasad-nursing-home',
  },
  { alt: 'Everscribn', text: 'Everscribn', width: 110, height: 32, href: '/work/everscribn' },
];

/* ---------------- Service rows ---------------- */
export interface ServiceRow {
  eyebrow: string;
  title: string;
  href: string;
}

export const serviceRows: ServiceRow[] = [
  {
    eyebrow: 'FOR VISUAL STORYTELLERS',
    title: 'Branding',
    href: '/services/branding',
  },
  {
    eyebrow: 'FOR DIGITAL EXPERIENCES',
    title: 'UI/UX Design',
    href: '/services/ui-ux-design',
  },
  {
    eyebrow: 'FOR BUSINESSES ONLINE',
    title: 'Web Development',
    href: '/services/web-development',
  },
  {
    eyebrow: 'FOR RAPID APP BUILDERS',
    title: 'No-Code Development',
    href: '/services/no-code-development',
  },
  {
    eyebrow: 'FOR LEAN, SCALING TEAMS',
    title: 'Automation',
    href: '/contact',
  },
  {
    eyebrow: 'FOR BEING FOUND ONLINE',
    title: 'SEO',
    href: '/services/seo',
  },
];

/* ---------------- Process ---------------- */
export interface ProcessStepData {
  index: string;
  title: string;
  tag: string;
  description: string;
  image: string;
}

export const processSteps: ProcessStepData[] = [
  {
    index: '01',
    title: 'Discovery',
    tag: 'Research & Domain Analysis',
    description:
      "Don't ignore the crucial step of Research & Development in the UX Design Process! Discover and solve user problems to launch a successful product. Gather data on the target audience and analyze customer feedback. Improve user experience",
    image: '/images/process/discovery.webp',
  },
  {
    index: '02',
    title: 'Flows',
    tag: 'User Journey Map Sitemap',
    description:
      'Create successful user flows for your product in the UX design process by mapping user journeys and interactions. Define product ideas and goals, tailored to user needs, behavior, and expectations. Test with real users for optimization.',
    image: '/images/process/flows.webp',
  },
  {
    index: '03',
    title: 'Wireframes',
    tag: 'Low - Fidelity Design',
    description:
      'Define the content and functionality of your product with wireframes in the UX Design process. Brainstorm multiple ideas, get feedback, and refine for high fidelity wireframes. Enhance the user interface for a natural and intuitive look.',
    image: '/images/process/wireframes.webp',
  },
  {
    index: '04',
    title: 'Mockups',
    tag: 'High - Fidelity Design',
    description:
      "Visualize your product's appearance with mockups in the UX Design. Detailed design for every screen gets reviewed by stakeholders and the design team. Get it tested with users for improved design based on their needs and expectations.",
    image: '/images/process/mockups.webp',
  },
  {
    index: '05',
    title: 'Prototyping',
    tag: 'Interaction Design',
    description:
      'UX Designers create clickable prototypes for your product using tools like Invision to assess product functionality. Gather user feedback and collaborate with development team to create improved version of the design for implementation.',
    image: '/images/process/prototyping.webp',
  },
  {
    index: '06',
    title: 'Testing',
    tag: 'Usability Testing',
    description:
      'UX designers focus on improving product usability by testing with real users. Define the testing goals and scenarios and recruit a target audience. Conduct usability tests, analyze results, and make changes for optimal user experience.',
    image: '/images/process/testing.webp',
  },
];

/* ---------------- Portfolio ---------------- */
import { caseStudies } from './caseStudies';

export interface ProjectData {
  client: string;
  title: string;
  image: string;
  slug: string;
}

/** Featured work for the homepage; the full set lives on /work. */
export const projects: ProjectData[] = ['Everscribn', 'Groupaway', 'Dente', 'Stache.haus']
  .map((n) => caseStudies.find((c) => c.name === n))
  .filter((c): c is NonNullable<typeof c> => Boolean(c))
  .map((c) => ({
    client: c.isConcept ? `${c.name} · Concept` : c.name,
    title: c.brief,
    image: c.image,
    slug: c.slug,
  }));

/* ---------------- FAQ ---------------- */
export interface FaqData {
  question: string;
  answer: string[];
}

export const faqs: FaqData[] = [
  {
    question: 'What is UI UX design, and why is it important?',
    answer: [
      'UX design, or user experience design, is designing digital products that are easy to use and provide a positive experience for the user. It is important because a good UX design can increase user satisfaction, engagement, and conversions.',
    ],
  },
  {
    question: 'What is the UX design process, and how long does it take?',
    answer: [
      "UI design, or user interface design, is the visual design of digital products, including the layout, colors, typography, and other elements. It differs from UX design, focusing more on the product's aesthetic appeal and visual aspects. In contrast, UX design focuses on the overall experience of the user.",
    ],
  },
  {
    question: `What services does ${SITE_NAME} offer?`,
    answer: [
      'We offer six services: branding, UI/UX design, web development, no-code development, automation, and SEO. You can start with one or combine several — we work closely with you to understand your goals and recommend the right mix.',
    ],
  },
  {
    question: `How does ${SITE_NAME} differ from other design studios?`,
    answer: [
      `${SITE_NAME} treats every engagement as a data-driven partnership rather than a template. We start by digging into the actual problem your users have, not just the brief, and we close the loop with real user testing instead of guessing at what "good" looks like.`,
      "That means user research, flows, wireframes, and prototypes are all treated as one continuous conversation with your users, not separate hand-offs, so the final product actually matches how people want to use it.",
    ],
  },
  {
    question: `Can I see ${SITE_NAME}'s past work or client feedback?`,
    answer: [
      `Yes — a sample of our case studies is in the Showcase section above, and a few client quotes are further down the page. We're happy to walk through more detail on a call once we understand what you're building.`,
    ],
  },
];

/* ---------------- Insights ---------------- */
export interface InsightData {
  category: string;
  title: string;
  excerpt: string;
  href: string;
  image: string;
}

// No articles yet. The Insights section is hidden until real posts are added;
// the template placeholders (and their hotlinked images) were removed.
export const insights: InsightData[] = [];


/* ---------------- Footer ---------------- */
export const footerColumns = [
  {
    heading: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/#work' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Branding', href: '/services/branding' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design' },
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'No-Code Development', href: '/services/no-code-development' },
      { label: 'Automation', href: '/#services' },
      { label: 'SEO', href: '/services/seo' },
    ],
  },
];

export const industries = [
  'Technology',
  'Education',
  'FinTech',
  'Crypto',
  'HealthCare',
  'Real Estate',
];

// Third-party certification/review badges (ISO, Clutch, GoodFirms, etc.)
// were removed here — those accreditations belong to the site this was
// cloned from, not to Varoq, so showing them would misrepresent
// credentials Varoq doesn't actually hold.
export const awards: { src: string; alt: string; width: number; height: number }[] = [];

// Placeholder until Varoq's real social accounts exist.
export const socialLinks = [
  { label: 'Dribbble', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: 'https://www.instagram.com/varoqstudio' },
  { label: 'X', href: 'https://x.com/Varoqstudio' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@varoqstudio' },
];
