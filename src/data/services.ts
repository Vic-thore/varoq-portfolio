import type { LucideIcon } from 'lucide-react';
import {
  Search,
  PenTool,
  LayoutGrid,
  Boxes,
  FlaskConical,
  Fingerprint,
  Shapes,
  Palette,
  BookOpen,
  Rocket,
  Building2,
  ShoppingCart,
  LifeBuoy,
  Globe,
  Layers,
  Heart,
  Blocks,
  Layers3,
  GitBranch,
  Database,
  Workflow,
  Mail,
  Bot,
  Gauge,
  FileText,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceGroup {
  slug: string;
  tabLabel: string;
  /** One-line description, shown on the About page. */
  summary: string;
  /** Dedicated page for this service, when one exists. */
  href?: string;
  comingSoon?: boolean;
  cards: ServiceCard[];
}

// Order here is the order shown in the mega menu and on the Services page.
export const serviceGroups: ServiceGroup[] = [
  {
    slug: 'branding',
    tabLabel: 'Branding',
    href: '/services/branding',
    summary: 'Identities, logos, and brand systems that make you look credible at first glance.',
    cards: [
      {
        icon: Fingerprint,
        title: 'Brand naming & trademark screening',
        description: 'Names checked for availability before you fall in love with one.',
      },
      {
        icon: Shapes,
        title: 'Logo & monogram design',
        description: 'A mark that still works at 16px and on a truck.',
      },
      {
        icon: Palette,
        title: 'Color & typography systems',
        description: 'A palette and type scale built for consistency across every touchpoint.',
      },
      {
        icon: BookOpen,
        title: 'Brand guideline documentation',
        description: 'A reference doc so your brand stays on-brand without you in the room.',
      },
    ],
  },
  {
    slug: 'ui-ux-design',
    tabLabel: 'UI/UX Design',
    href: '/services/ui-ux-design',
    summary: 'Intuitive, user-focused interfaces backed by research and testing.',
    cards: [
      {
        icon: Search,
        title: 'UX research & flows',
        description: 'Understand real user behavior before a single screen gets drawn.',
      },
      {
        icon: PenTool,
        title: 'Wireframing',
        description: 'Low-fidelity structure that locks in flow before visual design starts.',
      },
      {
        icon: LayoutGrid,
        title: 'High-fidelity UI design in Figma',
        description: 'Pixel-level screens ready to hand to engineering.',
      },
      {
        icon: Boxes,
        title: 'Design systems',
        description: 'Reusable components and tokens that keep every screen consistent.',
      },
      {
        icon: FlaskConical,
        title: 'Usability testing',
        description: 'Test real flows with real users before anything ships.',
      },
    ],
  },
  {
    slug: 'web-development',
    tabLabel: 'Web Development',
    href: '/services/web-development',
    summary: 'Fast, secure websites that look sharp and turn visitors into customers.',
    cards: [
      {
        icon: Rocket,
        title: 'Landing pages',
        description: 'Focused, fast-loading pages built to move one metric.',
      },
      {
        icon: Building2,
        title: 'Business & corporate sites',
        description: 'Multi-page sites that hold up to scrutiny from a real buyer.',
      },
      {
        icon: ShoppingCart,
        title: 'Ecommerce stores',
        description: 'Shopify builds designed around checkout, not just browsing.',
      },
      {
        icon: LifeBuoy,
        title: 'Website care plans',
        description: 'Security, backups, updates, and SEO maintenance after launch.',
      },
    ],
  },
  {
    slug: 'no-code-development',
    tabLabel: 'No-Code Development',
    summary: 'Launch websites, MVPs, and internal tools quickly on modern no-code platforms.',
    href: '/services/no-code-development',
    cards: [
      {
        icon: Globe,
        title: 'Webflow websites',
        description: 'Responsive, CMS-driven sites your team can edit without a developer.',
      },
      {
        icon: Layers,
        title: 'Framer sites',
        description: 'Interactive, design-forward sites built and launched fast.',
      },
      {
        icon: Heart,
        title: 'Lovable app building',
        description: 'Turn an idea into a working, AI-powered app quickly.',
      },
      {
        icon: Layers3,
        title: 'Bubble apps',
        description: 'Full web apps with logic, databases, and accounts, built without code.',
      },
      {
        icon: Blocks,
        title: 'MVPs & prototypes',
        description: 'Validate a product before committing to a full engineering build.',
      },
    ],
  },
  {
    slug: 'automation',
    tabLabel: 'Automation',
    href: '/services/automation',
    summary: 'Connect the tools your team already uses and cut repetitive work.',
    cards: [
      {
        icon: GitBranch,
        title: 'Lead routing',
        description: 'New leads routed to the right inbox or rep automatically.',
      },
      {
        icon: Database,
        title: 'CRM sync',
        description: 'Keep your CRM updated without manual data entry.',
      },
      {
        icon: Workflow,
        title: 'Internal workflow automation',
        description: 'Connect the tools your team already uses.',
      },
      {
        icon: Mail,
        title: 'Email & follow-up sequences',
        description: 'Timely follow-ups that go out without anyone remembering to send them.',
      },
      {
        icon: Bot,
        title: 'AI-assisted workflows',
        description: 'Add summarizing, drafting, and triage steps to the processes you already run.',
      },
    ],
  },
  {
    slug: 'seo',
    tabLabel: 'SEO',
    href: '/services/seo',
    summary: 'Get found by the people already searching for what you offer.',
    cards: [
      {
        icon: Gauge,
        title: 'Technical SEO audit',
        description: 'Find and fix the crawling, speed, and indexing issues holding your rankings back.',
      },
      {
        icon: Search,
        title: 'Keyword & competitor research',
        description: 'Find the searches your buyers actually make and where rivals are winning.',
      },
      {
        icon: FileText,
        title: 'On-page & content optimization',
        description: 'Titles, structure, and copy tuned to rank and to convert.',
      },
      {
        icon: MapPin,
        title: 'Local SEO',
        description: 'Show up when people nearby search for what you offer.',
      },
      {
        icon: TrendingUp,
        title: 'Reporting & analytics',
        description: 'Clear reporting tied to leads and revenue, not vanity rankings.',
      },
    ],
  },
];
