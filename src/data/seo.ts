import {
  ClipboardCheck,
  EyeOff,
  FileText,
  Gauge,
  Layers,
  Link2,
  MapPin,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
} from 'lucide-react';
import type { FaqItem } from '../components/FaqAccordion';
import type {
  DeepDive,
  IconItem,
  ProcessStep,
  ServiceConcept,
  ServicePackage,
} from '../components/service-page/types';

/** What poor search visibility costs: the "problem" section. */
export const seoProblems: IconItem[] = [
  {
    icon: EyeOff,
    title: 'Invisible where it counts',
    description:
      'If people searching for what you offer never see you, they buy from whoever they do see.',
  },
  {
    icon: Target,
    title: 'Traffic that never becomes enquiries',
    description:
      'Ranking for the wrong searches brings visitors who were never going to buy.',
  },
  {
    icon: ClipboardCheck,
    title: 'No one can say what’s working',
    description:
      'Without clear reporting tied to leads, SEO turns into a monthly invoice and a guess.',
  },
];

/** The parts of an SEO engagement. */
export const seoIncludes: IconItem[] = [
  {
    icon: Gauge,
    title: 'Technical SEO audit',
    description:
      'Find and fix the crawling, speed, and indexing issues holding your rankings back.',
  },
  {
    icon: Search,
    title: 'Keyword & competitor research',
    description:
      'Find the searches your buyers actually make, and where your rivals are winning.',
  },
  {
    icon: FileText,
    title: 'On-page & content optimization',
    description:
      'Page titles, structure, and copy tuned to rank and to convert.',
  },
  {
    icon: MapPin,
    title: 'Local SEO',
    description:
      'Show up when people nearby search for what you offer, on the map and in the results.',
  },
  {
    icon: Link2,
    title: 'Authority & link building',
    description:
      'Earn links from sites your customers already trust, without shortcuts that risk a penalty.',
  },
  {
    icon: TrendingUp,
    title: 'Reporting & analytics',
    description:
      'Clear monthly reporting tied to enquiries and revenue, not vanity rankings.',
  },
];

export const seoSteps: ProcessStep[] = [
  {
    title: 'Discovery & goals',
    description:
      'We learn your business, your customers, and what a good result looks like, so the work is aimed at enquiries, not just traffic.',
  },
  {
    title: 'Audit & research',
    description:
      'A full technical audit, plus keyword and competitor research, to see where you stand and where the opportunity is.',
  },
  {
    title: 'Strategy & roadmap',
    description:
      'A prioritised plan: what to fix first, what to write, and which pages matter most, with the reasoning behind each.',
  },
  {
    title: 'Fixes & optimization',
    description:
      'Technical fixes and on-page improvements made to your site, or handed to your developer with clear instructions.',
  },
  {
    title: 'Content & authority',
    description:
      'New and improved pages that answer real searches, supported by links earned from relevant, trusted sites.',
  },
  {
    title: 'Reporting & refinement',
    description:
      'Regular reporting in plain English, and a strategy that keeps adapting to what the data shows.',
  },
];

/** Concept projects: original work made to show our approach. */
export const seoConcepts: ServiceConcept[] = [
  {
    name: 'Harbor & Pine',
    category: 'Local SEO',
    image: '/images/seo/concept-harbor.svg',
    alt: 'Harbor & Pine concept: a local visibility dashboard with a map of ranked locations and a list of nearby businesses, plus a mobile business profile with call and directions buttons',
    brief:
      'A group of neighbourhood cafés that wanted to be the first place people found when searching nearby.',
    approach:
      'Complete business profiles, location pages for each café, a steady flow of genuine reviews, and tracking for how each location shows up on the map.',
    delivered: ['Local SEO', 'Location pages', 'Review strategy'],
  },
  {
    name: 'Stackwell',
    category: 'Content SEO',
    image: '/images/seo/concept-stackwell.svg',
    alt: 'Stackwell concept: an organic growth dashboard with a rising visits chart and a ranked list of top pages, plus a mobile guide article with a table of contents',
    brief:
      'An accounting software company that needed a steady flow of the right visitors without relying on paid ads.',
    approach:
      'A content plan built around the questions customers actually ask, with guides structured to rank and to lead naturally into the product.',
    delivered: ['Keyword strategy', 'Content plan', 'On-page optimization'],
  },
  {
    name: 'Loomhouse',
    category: 'Technical SEO',
    image: '/images/seo/concept-loomhouse.svg',
    alt: 'Loomhouse concept: a site health dashboard with a score ring and a list of fixed issues, plus a fast-loading mobile product page',
    brief:
      'An online homeware store whose product pages were slow, duplicated, and hard for search engines to understand.',
    approach:
      'A full technical audit, then fixes to speed, duplicate pages, redirects, and product markup, ordered by what would help most first.',
    delivered: ['Technical audit', 'Speed fixes', 'Structured data'],
  },
];

export const seoDeliverables = [
  'A technical SEO audit with prioritised fixes',
  'A keyword map matched to your pages',
  'On-page changes made, or handed to your developer',
  'A content plan for the next three months',
  'Search Console and analytics set up and verified',
  'A walkthrough call, and reporting tied to enquiries',
];

export const seoPackages: ServicePackage[] = [
  {
    name: 'SEO Audit',
    blurb: 'A one-off deep dive that shows exactly what to fix and where to focus.',
    features: [
      'Full technical SEO audit',
      'Keyword and competitor research',
      'Prioritised action roadmap',
      'Quick-win fixes identified',
      'Walkthrough call',
    ],
  },
  {
    name: 'Growth Retainer',
    blurb: 'Ongoing SEO that compounds, with a team accountable for the results.',
    badge: 'Most complete',
    highlight: true,
    features: [
      'Everything in the SEO Audit',
      'Ongoing on-page optimization',
      'Monthly content and page improvements',
      'Authority and link-earning outreach',
      'Monthly reporting and strategy call',
      'Priority support',
    ],
  },
  {
    name: 'Local Visibility',
    blurb: 'For businesses that win customers in a particular area.',
    features: [
      'Business profile setup and optimization',
      'Local listings and consistency checks',
      'Location and service-area pages',
      'Review request process',
      'Local ranking tracking and reports',
    ],
  },
];

export const seoWhyUs: IconItem[] = [
  {
    icon: Layers,
    title: 'Search built in, not bolted on',
    description:
      'Design, development, and SEO are handled together, so your site is built to be found from the start.',
  },
  {
    icon: TrendingUp,
    title: 'Reporting you can actually read',
    description:
      'Plain-English updates that connect the work to enquiries and revenue, not a wall of metrics.',
  },
  {
    icon: ShieldCheck,
    title: 'No shortcuts that backfire',
    description:
      'We use methods that last. No link schemes, no keyword stuffing, nothing that puts your site at risk.',
  },
];

export const seoFaqs: FaqItem[] = [
  {
    question: 'How long does SEO take to work?',
    answer: [
      'Technical fixes can show an effect within weeks, but meaningful growth in rankings and enquiries usually takes a few months, and it builds from there. How quickly depends on your market, your competition, and the state of your site today. We’ll give you an honest expectation after the audit.',
    ],
  },
  {
    question: 'Can you guarantee a #1 ranking?',
    answer: [
      'No, and be wary of anyone who does. Search engines decide rankings, not agencies. What we can promise is a clear plan, sound methods, regular reporting, and work aimed at the searches that bring you customers.',
    ],
  },
  {
    question: 'Do I need a new website for SEO?',
    answer: [
      'Not usually. Many sites can be improved as they are. If the site is slow, hard to update, or built in a way that holds search performance back, we’ll tell you plainly, and can rebuild it as part of our web development work.',
    ],
  },
  {
    question: 'What access do you need?',
    answer: [
      'Typically your analytics, Search Console, and a way to make changes to the site, whether that’s your CMS or a developer. If you don’t have these set up yet, we can do it for you.',
    ],
  },
  {
    question: 'How is SEO different from paid ads?',
    answer: [
      'Ads bring visitors while you’re paying for them. SEO takes longer to start, but the results keep building and don’t stop the moment a budget does. Many businesses use both, and we can help you decide the right mix.',
    ],
  },
  {
    question: 'Can you target specific cities, countries, or languages?',
    answer: [
      'Yes. We can focus on a single city, several regions, or whole countries, and plan content in more than one language where your customers need it.',
    ],
  },
];

const dive = (name: string, alt: string) => ({
  src: `/images/seo/dive-${name}.svg`,
  alt,
  width: 600,
  height: 400,
});

/** Deep-dives into the four parts of an SEO engagement. */
export const seoDeepDives: DeepDive[] = [
  {
    eyebrow: 'Keyword research',
    title: 'Target the searches that bring buyers',
    description:
      'We map what your customers actually type, how hard each term is to win, and which ones are worth your time.',
    points: [
      {
        title: 'Research with the right tools',
        description:
          'Search volume, difficulty and intent, checked across the major SEO platforms, then sorted by commercial value.',
      },
      {
        title: 'Competitor and content gap analysis',
        description:
          'We find where rivals rank and you don’t, and which pages would close the gap fastest.',
      },
    ],
    image: dive('keywords', 'A keyword search typing in, with keyword rows growing and a rankings line climbing'),
    lottie: '/lottie/keywords.json',
  },
  {
    eyebrow: 'Authority',
    title: 'Earn trust from sites your customers already read',
    description:
      'Links from relevant, respected sites tell search engines you’re worth ranking. We earn them the slow, safe way.',
    points: [
      {
        title: 'Finding the right sites',
        description:
          'A shortlist of relevant publications, directories and partners, vetted for quality before we reach out.',
      },
      {
        title: 'Outreach and relationships',
        description:
          'Personal outreach and useful content, never link schemes or paid networks that risk a penalty.',
      },
    ],
    image: dive('authority', 'A brand at the centre of a network, with trusted sites linking in one by one'),
    lottie: '/lottie/authority.json',
  },
  {
    eyebrow: 'Conversion',
    title: 'Turn visitors into enquiries',
    description:
      'Traffic only matters if people act on it. We improve the pages and journeys that sit between a search and a sale.',
    points: [
      {
        title: 'Landing pages that convert',
        description:
          'Clearer messages, stronger calls to action and faster pages on the places visitors land.',
      },
      {
        title: 'A smoother experience',
        description:
          'Better navigation, mobile layout and forms, so the next step is always obvious.',
      },
    ],
    image: dive('conversion', 'Visitors dropping through a funnel and ending in a completed enquiry'),
    lottie: '/lottie/conversion.json',
  },
  {
    eyebrow: 'Local visibility',
    title: 'Be the obvious choice nearby',
    description:
      'For businesses that win customers in a particular area, local search is often the quickest route to new enquiries.',
    points: [
      {
        title: 'A complete Google Business Profile',
        description:
          'Accurate details, photos, services and a steady stream of genuine reviews, managed properly.',
      },
      {
        title: 'Consistent local citations',
        description:
          'Your name, address and phone number matched across the directories that count.',
      },
    ],
    image: dive('local', 'A map with location pins dropping in, a ripple from the top result, and five review stars'),
    lottie: '/lottie/local.json',
  },
];

export const seoTrustFacts = [
  'Free audit, no obligation',
  'Plain-English reports',
  'Reply within 24 hours',
  'No lock-in contracts',
];
