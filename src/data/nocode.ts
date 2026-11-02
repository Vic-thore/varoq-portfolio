import {
  ArrowLeftRight,
  Clock,
  FlaskConical,
  GraduationCap,
  Layers3,
  Palette,
  ShieldOff,
  Sparkles,
  Wallet,
  Zap,
} from 'lucide-react';
import type { FaqItem } from '../components/FaqAccordion';
import type {
  IconItem,
  ProcessStep,
  ServiceConcept,
  ServicePackage,
} from '../components/service-page/types';

/** What "wait for a developer" costs: the "problem" section. */
export const nocodeProblems: IconItem[] = [
  {
    icon: Clock,
    title: 'Custom builds take too long',
    description:
      'Not every project needs months of engineering. Waiting eight weeks for a marketing site or an internal tool costs momentum you don’t get back.',
  },
  {
    icon: Wallet,
    title: 'A full build costs more than it should',
    description:
      'Custom development is the right call for some projects, but plenty of others don’t need that price tag to look and work great.',
  },
  {
    icon: ShieldOff,
    title: 'You’re locked out of your own site',
    description:
      'When only a developer can make a change, small updates turn into tickets, invoices, and waiting.',
  },
];

/** The platforms and project types we build with. */
export const nocodeIncludes: IconItem[] = [
  {
    icon: Zap,
    title: 'Webflow websites',
    description:
      'Responsive, CMS-driven marketing sites and portfolios your team can edit.',
  },
  {
    icon: Layers3,
    title: 'Framer sites',
    description:
      'Design-forward, animated sites and landing pages, launched fast.',
  },
  {
    icon: Sparkles,
    title: 'Lovable app building',
    description: 'An idea turned into a working, AI-powered web app quickly.',
  },
  {
    icon: Layers3,
    title: 'Bubble apps',
    description:
      'Full web applications with logic, databases, and user accounts, built without code.',
  },
  {
    icon: FlaskConical,
    title: 'MVPs & prototypes',
    description:
      'A testable product before you commit to a full engineering build.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Site migrations',
    description:
      'Moving a WordPress or legacy site onto Webflow or Framer, without losing your content or SEO.',
  },
  {
    icon: GraduationCap,
    title: 'CMS setup & training',
    description:
      'Your team trained to run and update the site without calling us.',
  },
];

export const nocodeSteps: ProcessStep[] = [
  {
    title: 'Discovery',
    description:
      'We learn what you need the site or app to do, and pick the right no-code platform for the job.',
  },
  {
    title: 'Structure & content',
    description:
      'Pages, data, and content modeled up front, so the CMS fits how your team actually works.',
  },
  {
    title: 'Design',
    description:
      'Screens designed to match your brand, reviewed with you before anything is built.',
  },
  {
    title: 'Build',
    description:
      'The site or app built directly in the platform, with interactions and logic wired up.',
  },
  {
    title: 'Review & launch',
    description:
      'Tested across devices, then published to your domain.',
  },
  {
    title: 'Training & handover',
    description:
      'A walkthrough of the editor, so your team can make changes without us.',
  },
];

/** Concept projects. Real no-code work lives in src/data/projects.ts. */
export const nocodeConcepts: ServiceConcept[] = [];

export const nocodeDeliverables = [
  'The finished, published site or app, live on your domain',
  'Editor access to the platform, so your team can make changes',
  'A trained team, ready to manage day-to-day content',
  'Documentation for how the site or app is structured',
  'Analytics and forms connected',
  'A handover guide and a training session',
];

export const nocodePackages: ServicePackage[] = [
  {
    name: 'Launch Site',
    blurb: 'A Webflow or Framer site to get a business online fast.',
    features: [
      'Custom design in Webflow or Framer',
      'CMS set up for your content',
      'Mobile-first, responsive layouts',
      'Forms and analytics connected',
      'Launch and handover',
    ],
  },
  {
    name: 'Full Build',
    blurb: 'A complete site or app, with your team trained to run it.',
    badge: 'Most complete',
    highlight: true,
    features: [
      'Everything in Launch Site',
      'Multiple page templates and collections',
      'Custom interactions and animation',
      'Third-party integrations',
      'Team training session',
      'Documentation',
    ],
  },
  {
    name: 'MVP Sprint',
    blurb: 'A working prototype or app, built to test an idea quickly.',
    features: [
      'Discovery and scoping call',
      'Built in Bubble or Lovable',
      'User accounts and core logic',
      'A working link to test with real users',
      'A plan for what comes next',
    ],
  },
];

export const nocodeWhyUs: IconItem[] = [
  {
    icon: Clock,
    title: 'Days and weeks, not months',
    description:
      'No-code platforms let us build and launch far faster than a custom codebase, without cutting corners.',
  },
  {
    icon: Palette,
    title: 'Still designed properly',
    description:
      'Fast doesn’t mean generic. Every build gets the same design attention as a custom project.',
  },
  {
    icon: GraduationCap,
    title: 'You’re not locked out',
    description:
      'We train your team to use the platform, so you’re never waiting on us for a small change.',
  },
];

export const nocodeFaqs: FaqItem[] = [
  {
    question: 'How is no-code different from a custom-built website?',
    answer: [
      'No-code platforms like Webflow, Framer, and Bubble let us build fast, visually, without writing the underlying code by hand. For most marketing sites, MVPs, and internal tools, the result looks and performs just as well as a custom build, at a fraction of the time and cost.',
    ],
  },
  {
    question: 'Which platform is right for my project?',
    answer: [
      'It depends on what you need. Webflow suits content-heavy marketing sites, Framer suits design-forward landing pages, and Bubble or Lovable suit apps with logic, accounts, or a database. We’ll recommend the right one after the discovery call.',
    ],
  },
  {
    question: 'Will I be able to edit the site myself?',
    answer: [
      'Yes. Every build includes editor access and a training session, so your team can update content without needing a developer.',
    ],
  },
  {
    question: 'Can you migrate our existing WordPress site?',
    answer: [
      'Yes. We can move your content, structure, and SEO across to Webflow or Framer, so you keep your rankings and gain an easier site to manage.',
    ],
  },
  {
    question: 'Is no-code a good fit for an MVP?',
    answer: [
      'Often, yes. Building an MVP in Bubble or Lovable lets you test an idea with real users before committing to a full engineering build.',
    ],
  },
  {
    question: 'What if we outgrow the no-code platform later?',
    answer: [
      'It happens, and it’s a good problem to have. We can plan for that from the start, and when the time comes, we also do custom web development.',
    ],
  },
];
