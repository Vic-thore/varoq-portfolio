import {
  Compass,
  MessageCircleQuestion,
  Megaphone,
  Package,
  Palette,
  Shapes,
  Tag,
  TrendingDown,
} from 'lucide-react';
import type { FaqItem } from '../components/FaqAccordion';
import type {
  IconItem,
  ProcessStep,
  ServiceConcept,
  ServicePackage,
} from '../components/service-page/types';

/** What poor branding costs: the "problem" section. */
export const brandingProblems: IconItem[] = [
  {
    icon: Shapes,
    title: 'Nothing quite matches',
    description:
      'A logo from one freelancer, a website from another, social posts in a third style. Customers notice, even when they can’t say why.',
  },
  {
    icon: MessageCircleQuestion,
    title: 'The message is muddy',
    description:
      'If people can’t tell in a few seconds what you do and who it’s for, they move on to someone who makes it obvious.',
  },
  {
    icon: TrendingDown,
    title: 'You look smaller than you are',
    description:
      'Strong businesses with weak branding get compared on price, because nothing else tells them apart.',
  },
];

/** The services that make up a branding engagement. */
export const brandingIncludes: IconItem[] = [
  {
    icon: Compass,
    title: 'Brand strategy & positioning',
    description:
      'Who you’re for, what you stand for, and how you’re different, written down so every decision has something to lean on.',
  },
  {
    icon: Tag,
    title: 'Naming & trademark screening',
    description:
      'Names checked for availability before you fall in love with one.',
  },
  {
    icon: Shapes,
    title: 'Logo & identity system',
    description:
      'A mark and a full set of supporting elements that still work at 16px and on the side of a truck.',
  },
  {
    icon: Palette,
    title: 'Color & typography',
    description:
      'A palette and type scale built for consistency across every touchpoint.',
  },
  {
    icon: Megaphone,
    title: 'Tone of voice',
    description:
      'How your brand sounds: the words, the rhythm, and examples your team can copy.',
  },
  {
    icon: Package,
    title: 'Brand applications',
    description:
      'Social templates, stationery, packaging, and signage: the brand working where people actually meet it.',
  },
];

export const brandingSteps: ProcessStep[] = [
  {
    title: 'Audit & discovery',
    description:
      'We look at where your brand stands today, your competitors, and your customers, then agree what success looks like.',
  },
  {
    title: 'Strategy',
    description:
      'Positioning, audience, personality, and message, written into a short strategy you sign off before any design starts.',
  },
  {
    title: 'Identity exploration',
    description:
      'Logo and visual directions that answer the strategy, presented with the reasoning behind them.',
  },
  {
    title: 'Refinement',
    description:
      'You choose a direction and we develop it: color, type, layouts, and the details that make it feel finished.',
  },
  {
    title: 'Guidelines',
    description:
      'Everything documented so anyone on your team, or any agency after us, can use the brand correctly.',
  },
  {
    title: 'Launch & rollout',
    description:
      'Files handed over, templates ready, and support applying the brand across your website, social, and print.',
  },
];

/** Concept projects: original work made to show how we approach a brand. */
export const brandingConcepts: ServiceConcept[] = [
  {
    name: 'Ember',
    category: 'Specialty coffee roaster',
    image: '/images/branding/concept-ember.svg',
    alt: 'Ember concept brand board: a flame-in-a-ring logo, coffee bag packaging, an espresso and amber color palette, and serif typography',
    brief:
      'A neighborhood roaster that wanted to look as considered as its coffee.',
    approach:
      'A flame set inside a ring, a warm palette pulled from the roast itself, and an italic serif wordmark that feels handwritten.',
    delivered: ['Logo suite', 'Color & type', 'Packaging'],
  },
  {
    name: 'Northline',
    category: 'Freight & logistics',
    image: '/images/branding/concept-northline.svg',
    alt: 'Northline concept brand board: a bold geometric N logo, shipping box packaging, a navy and signal gold color palette, and sans-serif typography',
    brief:
      'A B2B carrier competing with bigger names on trust rather than price.',
    approach:
      'A bold geometric N that reads at a glance on a box, a truck, or a tracking screen, in deep navy and signal gold.',
    delivered: ['Logo suite', 'Shipping & stationery', 'Guidelines'],
  },
  {
    name: 'Lumen',
    category: 'Skincare',
    image: '/images/branding/concept-lumen.svg',
    alt: 'Lumen concept brand board: a glowing orb logo, bottle and jar packaging, a plum and rose color palette, and light sans-serif typography',
    brief:
      'A gentle skincare line for people tired of loud beauty branding.',
    approach:
      'A glowing orb inside a fine ring, soft blush gradients, and a light, widely spaced wordmark.',
    delivered: ['Logo suite', 'Packaging', 'Social templates'],
  },
];

export const brandingDeliverables = [
  'Your logo suite in every format you’ll need',
  'A brand guidelines document your whole team can use',
  'Color and typography specifications',
  'Templates for social media and stationery',
  'Source and working files',
  'Final assets and usage rights handed over at the end',
];

export const brandingFileFormats = ['SVG', 'PNG', 'PDF', 'JPG'];

export const brandingPackages: ServicePackage[] = [
  {
    name: 'Essentials',
    blurb: 'For new businesses that need a solid foundation.',
    features: [
      'Discovery session',
      'Logo design with concept directions',
      'Color palette and typography',
      'Logo files in all formats',
      'One-page brand quick guide',
    ],
  },
  {
    name: 'Full Identity',
    blurb: 'A complete visual identity and the rules for using it.',
    badge: 'Most complete',
    highlight: true,
    features: [
      'Everything in Essentials',
      'Brand strategy and positioning',
      'Naming support, if you need it',
      'Extended identity system: patterns, icons, image style',
      'Full brand guidelines document',
      'Stationery and social templates',
    ],
  },
  {
    name: 'Identity + Rollout',
    blurb: 'Your brand, applied where customers meet it.',
    features: [
      'Everything in Full Identity',
      'Packaging and print applications',
      'Website design or refresh',
      'Launch support and team handover',
    ],
  },
];

export const brandingWhyUs: IconItem[] = [
  {
    icon: Compass,
    title: 'Strategy before decoration',
    description:
      'Every visual choice traces back to who you’re for and what you stand for.',
  },
  {
    icon: Package,
    title: 'Brand, web, and search under one roof',
    description:
      'Your identity is built into your website and your SEO, not handed to someone else to interpret.',
  },
  {
    icon: Megaphone,
    title: 'Honest scoping',
    description:
      'We’ll tell you plainly what you need, and what you don’t.',
  },
];

export const brandingFaqs: FaqItem[] = [
  {
    question: 'How long does a branding project take?',
    answer: [
      'It depends on scope. A focused logo and identity project moves faster than a full engagement with strategy, naming, and rollout. We’ll give you a realistic timeline after the discovery call, before you commit to anything.',
    ],
  },
  {
    question: 'How many logo concepts and revisions do I get?',
    answer: [
      'You’ll see a small number of considered directions rather than a wall of options, and we refine your chosen direction through rounds of feedback built into the project. The exact numbers are set out in your proposal.',
    ],
  },
  {
    question: 'Who owns the final files?',
    answer: [
      'Final approved assets and usage rights are handed over at the end of the project, and the terms are spelled out in your agreement.',
    ],
  },
  {
    question: 'What do you need from me to get started?',
    answer: [
      'An honest conversation about your business, your customers, and the brands you admire or want to avoid, plus any existing assets. We handle the rest.',
    ],
  },
  {
    question: 'Do you help with naming?',
    answer: [
      'Yes, as part of the strategy stage. We develop options and screen them for availability before you commit to one.',
    ],
  },
  {
    question: 'Can you build the website too?',
    answer: [
      'Yes. Web development, UI/UX design, no-code builds, and SEO are all part of what we do, so the brand carries straight through to your site.',
    ],
  },
];
