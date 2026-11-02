import {
  Boxes,
  Code,
  FlaskConical,
  Filter,
  Layers,
  LayoutGrid,
  PenTool,
  Route,
  Search,
  SearchX,
} from 'lucide-react';
import type { FaqItem } from '../components/FaqAccordion';
import type {
  IconItem,
  ProcessStep,
  ServiceConcept,
  ServicePackage,
} from '../components/service-page/types';

/** What poor UX costs: the "problem" section. */
export const uiuxProblems: IconItem[] = [
  {
    icon: SearchX,
    title: 'People can’t find what they came for',
    description:
      'Cluttered navigation and unclear labels send visitors hunting, and most of them give up before they find it.',
  },
  {
    icon: Filter,
    title: 'Sign-ups and checkouts leak',
    description:
      'Every extra field, confusing step, or unclear button is a place where a willing customer drops off.',
  },
  {
    icon: Layers,
    title: 'Every screen feels a little different',
    description:
      'Without a consistent system, products grow patchwork: slower to build and harder to trust.',
  },
];

/** The parts of a UI/UX engagement. */
export const uiuxIncludes: IconItem[] = [
  {
    icon: Search,
    title: 'UX research',
    description:
      'Interviews, competitor review, and analytics to understand what users actually need and do.',
  },
  {
    icon: Route,
    title: 'Information architecture',
    description:
      'User flows and navigation that make every task obvious, mapped before anything is drawn.',
  },
  {
    icon: PenTool,
    title: 'Wireframes & prototypes',
    description:
      'Low-fidelity screens and clickable prototypes to test ideas before they’re designed or built.',
  },
  {
    icon: LayoutGrid,
    title: 'UI design',
    description:
      'High-fidelity interfaces in Figma, with clear hierarchy, spacing, and every state accounted for.',
  },
  {
    icon: Boxes,
    title: 'Design systems',
    description:
      'Reusable components and tokens that keep every screen consistent and speed up the build.',
  },
  {
    icon: FlaskConical,
    title: 'Usability testing',
    description:
      'Real flows tested with real users, then refined before launch, while changes are still cheap.',
  },
];

export const uiuxSteps: ProcessStep[] = [
  {
    title: 'Discovery',
    description:
      'We learn your product, your users, and your business goals, and agree what success looks like.',
  },
  {
    title: 'Research',
    description:
      'User interviews plus competitor and analytics review turn assumptions into evidence.',
  },
  {
    title: 'Flows & structure',
    description:
      'Information architecture and user flows map every path a person can take through the product.',
  },
  {
    title: 'Wireframes & prototype',
    description:
      'Low-fidelity screens and a clickable prototype let you test the idea before it’s polished.',
  },
  {
    title: 'UI design',
    description:
      'High-fidelity screens and a design system bring it to life, reviewed with you at every step.',
  },
  {
    title: 'Test & handoff',
    description:
      'Usability testing, refinements, and developer-ready files, with support while it’s built.',
  },
];

/** Concept projects. Real UI/UX work now lives in src/data/behance.ts. */
export const uiuxConcepts: ServiceConcept[] = [];

export const uiuxDeliverables = [
  'Research findings and user flows',
  'Wireframes and a clickable prototype',
  'High-fidelity UI screens for every state',
  'A design system and component library',
  'Developer-ready specs and exported assets',
  'The working design files, handed over at the end',
];

export const uiuxFileFormats = ['Figma', 'PDF', 'PNG', 'SVG'];

export const uiuxPackages: ServicePackage[] = [
  {
    name: 'UX Audit',
    blurb: 'For products that exist but aren’t performing.',
    features: [
      'Expert review of your key user flows',
      'Analysis of your analytics and user feedback',
      'A prioritized list of problems and fixes',
      'Annotated screens with recommendations',
      'A walkthrough call to talk it through',
    ],
  },
  {
    name: 'Product Design',
    blurb: 'From research to polished, test-ready screens for a defined scope.',
    badge: 'Most complete',
    highlight: true,
    features: [
      'User research and discovery',
      'User flows and wireframes',
      'A clickable prototype',
      'High-fidelity UI design',
      'A round of usability testing',
      'Developer handoff',
    ],
  },
  {
    name: 'Design Partner',
    blurb: 'Ongoing design support as your product grows.',
    features: [
      'Continuous design and iteration',
      'Design system upkeep',
      'New features designed as you build',
      'Regular reviews and testing',
      'Working alongside your developers',
    ],
  },
];

export const uiuxWhyUs: IconItem[] = [
  {
    icon: Search,
    title: 'Research before pixels',
    description:
      'Decisions come from how real people behave, not from taste or trend.',
  },
  {
    icon: Code,
    title: 'Design that gets built',
    description:
      'Clean handoff, and we can build it too: web development and no-code are part of what we do.',
  },
  {
    icon: FlaskConical,
    title: 'Tested before it ships',
    description:
      'Prototypes go in front of real users, so problems get fixed while they’re cheap.',
  },
];

export const uiuxFaqs: FaqItem[] = [
  {
    question: 'How long does a UI/UX project take?',
    answer: [
      'It depends on scope. Redesigning a few key flows is much quicker than designing a new product from scratch. We’ll give you a realistic timeline after the discovery call, before you commit to anything.',
    ],
  },
  {
    question: 'Do you do research with real users?',
    answer: [
      'Yes. Depending on the project that can mean user interviews, surveys, competitor analysis, and a review of your analytics, followed by usability testing on our prototypes.',
    ],
  },
  {
    question: 'What tools do you design in?',
    answer: [
      'We design in Figma, so you can comment on work in progress and your team can inherit the files at the end.',
    ],
  },
  {
    question: 'Can you redesign an existing product?',
    answer: [
      'Yes. We start with an audit of what’s there, keep what works, and redesign what doesn’t, so your users aren’t forced to relearn everything.',
    ],
  },
  {
    question: 'Will you work with our developers?',
    answer: [
      'Yes. We hand over developer-ready files and specs, and we’re available for questions while the design is being built.',
    ],
  },
  {
    question: 'Can you build it as well as design it?',
    answer: [
      'Yes. Web development, no-code builds, and automation are part of what we offer, so the design can go straight into production.',
    ],
  },
];
