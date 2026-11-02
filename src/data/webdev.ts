import {
  Building2,
  Gauge,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Pencil,
  Rocket,
  ShoppingCart,
  Smartphone,
  Wrench,
} from 'lucide-react';
import type { FaqItem } from '../components/FaqAccordion';
import type {
  IconItem,
  ProcessStep,
  ServiceConcept,
  ServicePackage,
} from '../components/service-page/types';

/** What a poor website costs: the "problem" section. */
export const webdevProblems: IconItem[] = [
  {
    icon: Gauge,
    title: 'Slow to load, quick to leave',
    description:
      'Visitors don’t wait. A heavy, sluggish site loses people before they’ve seen a single thing you offer.',
  },
  {
    icon: Smartphone,
    title: 'It falls apart on phones',
    description:
      'Most visitors arrive on a phone. If your site is awkward there, they’ll go to one that isn’t.',
  },
  {
    icon: Wrench,
    title: 'Only a developer can change it',
    description:
      'When every small edit means an invoice or a wait, your site stops keeping up with your business.',
  },
];

/** The kinds of build we take on. */
export const webdevIncludes: IconItem[] = [
  {
    icon: Rocket,
    title: 'Landing pages',
    description: 'Focused, fast-loading pages built to move one metric.',
  },
  {
    icon: Building2,
    title: 'Business & corporate sites',
    description:
      'Multi-page sites that hold up to scrutiny from a real buyer.',
  },
  {
    icon: ShoppingCart,
    title: 'Ecommerce stores',
    description:
      'Online shops designed around checkout, not just browsing.',
  },
  {
    icon: LayoutDashboard,
    title: 'Web apps & dashboards',
    description:
      'Portals, dashboards, and internal tools built to fit how your team works.',
  },
  {
    icon: Pencil,
    title: 'Content management',
    description:
      'Sites your team can update themselves, without calling a developer.',
  },
  {
    icon: LifeBuoy,
    title: 'Care plans & maintenance',
    description:
      'Security, backups, updates, and SEO maintenance after launch.',
  },
];

export const webdevSteps: ProcessStep[] = [
  {
    title: 'Discovery & scope',
    description:
      'We agree your goals, audience, pages, and features, and what “done” looks like, before any build starts.',
  },
  {
    title: 'Design',
    description:
      'Layouts and interactions designed with you, on a system that scales as your site grows.',
  },
  {
    title: 'Development',
    description:
      'Clean, fast, accessible code, built to the approved designs and reviewed as it takes shape.',
  },
  {
    title: 'Content & integrations',
    description:
      'Your copy, images, forms, payments, and analytics connected and working together.',
  },
  {
    title: 'Testing',
    description:
      'Checked across devices, browsers, and connection speeds before anyone else sees it.',
  },
  {
    title: 'Launch & support',
    description:
      'Deployment, handover, and training, with ongoing care available as you grow.',
  },
];

/** Concept projects: original work made to show our approach. */
export const webdevConcepts: ServiceConcept[] = [
  {
    name: 'Kilnworks',
    category: 'Ecommerce store',
    image: '/images/web/concept-kilnworks.svg',
    alt: 'Kilnworks concept: a ceramics online store with a hero banner and product grid in a browser, plus a mobile product page',
    brief:
      'A ceramics studio that wanted its online shop to feel as warm as its pieces.',
    approach:
      'An image-led storefront with a fast product grid, a clear product page, and a short, friction-free checkout.',
    delivered: ['Ecommerce build', 'Content management', 'Payments'],
  },
  {
    name: 'Meridian Legal',
    category: 'Corporate website',
    image: '/images/web/concept-meridian.svg',
    alt: 'Meridian Legal concept: a law firm website with a serif headline, practice area cards, and a mobile enquiry form',
    brief:
      'A law firm that needed to look as credible online as it does in person.',
    approach:
      'A calm, authoritative multi-page site with clear practice areas and an enquiry form that takes seconds.',
    delivered: ['Corporate site', 'Content management', 'Enquiry forms'],
  },
  {
    name: 'Fieldnote',
    category: 'Web app',
    image: '/images/web/concept-fieldnote.svg',
    alt: 'Fieldnote concept: a job-management web app with a route map and job list, plus a mobile job checklist',
    brief:
      'A web app for field teams to plan, track, and complete jobs from the road.',
    approach:
      'A dashboard that shows today’s jobs at a glance, with a mobile view that makes ticking off a job effortless.',
    delivered: ['Web app', 'Accounts & roles', 'Integrations'],
  },
];

export const webdevDeliverables = [
  'The finished, tested website, live on your domain',
  'Full source code and repository access',
  'A content management system your team can use',
  'Hosting, domain, and DNS set up',
  'Analytics and search tools connected',
  'A handover guide and a training session',
];

export const webdevPackages: ServicePackage[] = [
  {
    name: 'Launch Site',
    blurb: 'A polished, fast site for a business that’s getting started.',
    features: [
      'Custom design and build',
      'Mobile-first, responsive layouts',
      'Contact forms and analytics',
      'On-page SEO foundations',
      'Launch and handover',
    ],
  },
  {
    name: 'Business Site',
    blurb: 'A full multi-page website with a CMS your team can edit.',
    badge: 'Most complete',
    highlight: true,
    features: [
      'A multi-page custom website',
      'Content management system',
      'Blog or case-study sections',
      'CRM, email, and payment integrations',
      'Performance and accessibility checks',
      'Training and handover',
    ],
  },
  {
    name: 'Custom Web App',
    blurb: 'A tailored web application for your workflow or product.',
    features: [
      'Discovery and technical planning',
      'Custom features and user accounts',
      'Admin dashboard',
      'API and third-party integrations',
      'Testing and secure deployment',
      'Optional ongoing support',
    ],
  },
];

export const webdevWhyUs: IconItem[] = [
  {
    icon: Gauge,
    title: 'Fast by default',
    description:
      'Performance and accessibility are built in from the start, not patched on at the end.',
  },
  {
    icon: Layers,
    title: 'Design, build, and search under one roof',
    description:
      'The design, the code, and how people find you are handled together, so nothing gets lost in translation.',
  },
  {
    icon: LifeBuoy,
    title: 'We don’t disappear after launch',
    description:
      'Care plans keep your site secure, updated, and improving long after go-live.',
  },
];

export const webdevFaqs: FaqItem[] = [
  {
    question: 'How long does a website take to build?',
    answer: [
      'It depends on scope. A focused landing page is much quicker than a multi-page site or a custom web app. We’ll give you a realistic timeline after the discovery call, before you commit to anything.',
    ],
  },
  {
    question: 'Do you build with custom code or no-code?',
    answer: [
      'Both, and we’ll recommend what fits. Custom code suits complex or high-performance needs; no-code platforms like Webflow or Framer suit projects where speed and easy editing matter most.',
    ],
  },
  {
    question: 'Can I update the site myself?',
    answer: [
      'Yes. We set up a content management system that suits your team and train you to use it, so everyday changes don’t need a developer.',
    ],
  },
  {
    question: 'Will my website work well on phones?',
    answer: [
      'Yes. Every site is designed mobile-first and tested across devices and browsers before launch.',
    ],
  },
  {
    question: 'Do you handle hosting and domains?',
    answer: [
      'We can set up and manage hosting and domain configuration, or work with the providers you already use. Either way, it’s documented in your handover guide.',
    ],
  },
  {
    question: 'What happens after the site launches?',
    answer: [
      'You can add a care plan covering security updates, backups, monitoring, and improvements, so the site stays healthy and keeps evolving with your business.',
    ],
  },
];
