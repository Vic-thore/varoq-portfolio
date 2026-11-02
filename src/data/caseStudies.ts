import { workItems, type WorkItem } from './work';
import { pastProjects } from './projects';
import { behanceProjects } from './behance';

/**
 * Case studies are rendered by one template (src/pages/CaseStudy.tsx) from the
 * records below, so every project page has the same structure.
 *
 * To publish a new project, add its concept/project to the relevant service
 * data file (e.g. src/data/branding.ts) so it appears on /work, then add an
 * entry to `details` below keyed by its name. Anything left out is simply
 * hidden on the page, so a record can start small and grow:
 *
 *   challenge   the problem the client faced
 *   results     real, measurable outcomes: [{ value: '+42%', label: 'Organic traffic' }]
 *   testimonial a real quote with name and role
 *   gallery     extra images: [{ src, alt }]
 *   tools       stack or software used
 *   year        '2026'
 *   isConcept   false for real work (changes the labels); past projects live in
 *               src/data/projects.ts
 */
export interface CaseStudyDetails {
  challenge?: string;
  results?: { value: string; label: string }[];
  testimonial?: { quote: string; name: string; role: string };
  gallery?: { src: string; alt: string }[];
  tools?: string[];
  year?: string;
  isConcept?: boolean;
  /** Your role on the project, shown in the details row. */
  role?: string;
  /** Link to the live site; shows a "Visit live site" button. */
  liveUrl?: string;
  /** Used if `image` fails to load (e.g. a lower-resolution copy). */
  imageFallback?: string;
  /** Link to the project on Behance; shows a "View on Behance" button. */
  behanceUrl?: string;
  /** Heading above the description. Defaults to "Our approach". */
  approachLabel?: string;
}

export interface CaseStudy extends WorkItem, CaseStudyDetails {
  slug: string;
  isConcept: boolean;
}

const details: Record<string, CaseStudyDetails> = {
  Ember: {
    challenge:
      'In a crowded market of rustic kraft-paper bags, a small roaster needed an identity that looked premium on the shelf without losing its neighborhood warmth.',
    tools: ['Figma', 'Illustrator'],
  },
  Northline: {
    challenge:
      'Larger carriers won on name recognition. Northline had to signal reliability instantly, on a truck, a box and a tracking page, without a big-brand budget.',
    tools: ['Figma', 'Illustrator'],
  },
  Lumen: {
    challenge:
      'Skincare shelves are loud. The goal was a brand that felt calm and trustworthy to people who are tired of exaggerated claims and busy packaging.',
    tools: ['Figma', 'Illustrator'],
  },
  Kilnworks: {
    challenge:
      'The pieces were handmade and warm, but the old shop felt generic. The new store had to show the craft while still being fast and easy to buy from.',
    tools: ['React', 'TypeScript', 'Tailwind'],
  },
  'Meridian Legal': {
    challenge:
      'Clients judge a law firm in seconds. The website needed to carry the same credibility as the office, and make it simple to book a consultation.',
    tools: ['React', 'TypeScript', 'Tailwind'],
  },
  Fieldnote: {
    challenge:
      'Field teams worked from paper and messages. The app had to work on a phone, on a weak connection, with one hand.',
    tools: ['React', 'TypeScript', 'Node.js'],
  },
  'Harbor & Pine': {
    challenge:
      'Each café competed with the others and with big chains for the same nearby searches, with inconsistent listings and few reviews.',
    tools: ['Google Business Profile', 'Search Console'],
  },
  Stackwell: {
    challenge:
      'Paid ads were the only source of visitors and the cost kept rising. The company needed content that earned traffic from the questions customers already ask.',
    tools: ['Search Console', 'Analytics'],
  },
  Loomhouse: {
    challenge:
      'Slow, near-duplicate product pages confused search engines and frustrated shoppers. The fixes had to be ordered by what would help most, first.',
    tools: ['Search Console', 'PageSpeed Insights'],
  },
};

export const slugify = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const withSlug = (isConcept: boolean) => (item: WorkItem & CaseStudyDetails): CaseStudy => ({
  ...item,
  isConcept,
  slug: slugify(item.name),
});

/** Real past projects, then Behance UI/UX projects, then original concepts. */
export const caseStudies: CaseStudy[] = [
  ...pastProjects.map(withSlug(false)),
  ...behanceProjects.map((p) => withSlug(p.isConcept ?? true)(p)),
  ...workItems.map((item) => ({ ...item, ...details[item.name] })).map(withSlug(true)),
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

/** Previous / next in the full list, wrapping round. */
export function adjacentStudies(slug: string) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return {
    prev: caseStudies[(i - 1 + caseStudies.length) % caseStudies.length],
    next: caseStudies[(i + 1) % caseStudies.length],
  };
}
