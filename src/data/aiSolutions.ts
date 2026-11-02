import {
  BookOpen,
  Bot,
  FileText,
  Filter,
  Gauge,
  LineChart,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
} from 'lucide-react';
import type { FaqItem } from '../components/FaqAccordion';
import type { IconItem, ProcessStep, ServicePackage } from '../components/service-page/types';

export const aiTrustFacts = [
  'Start with one small workflow',
  'You keep control of your data',
  'People stay in the loop',
  'Free discovery call',
];

export const aiEdge: IconItem[] = [
  {
    icon: Target,
    title: 'Business first, technology second',
    description:
      'We start with the job you need done and only then pick the AI. If a simple automation does it better, we say so.',
  },
  {
    icon: Users,
    title: 'Design and build together',
    description:
      'The same team shapes the experience and builds it, so what you approve is what ships.',
  },
  {
    icon: ShieldCheck,
    title: 'Careful with your data',
    description:
      'We work out what the AI can see, what it can do, and when it must hand over to a person, before anything goes live.',
  },
];

export const aiCapabilities: IconItem[] = [
  {
    icon: MessageSquare,
    title: 'AI chat assistants',
    description:
      'Answer common questions on your site or WhatsApp, around the clock, and pass the tricky ones to your team.',
  },
  {
    icon: FileText,
    title: 'Document & data extraction',
    description:
      'Pull the details out of invoices, forms and emails and drop them into your spreadsheet or CRM.',
  },
  {
    icon: Filter,
    title: 'Lead qualification',
    description:
      'Score and route new enquiries so your team spends time on the people most likely to buy.',
  },
  {
    icon: Sparkles,
    title: 'Content & SEO assistance',
    description:
      'Draft, summarise and repurpose content faster, with a person reviewing everything before it goes out.',
  },
  {
    icon: Workflow,
    title: 'Workflow automation',
    description:
      'Connect your tools so repeat tasks run on their own, from follow-ups to reports.',
  },
  {
    icon: BookOpen,
    title: 'Internal knowledge search',
    description:
      'Ask a question and get an answer from your own documents, policies and past work.',
  },
];

export interface UseCaseTab {
  id: string;
  label: string;
  title: string;
  description: string;
  points: string[];
  flow: string[];
}

export const aiUseCases: UseCaseTab[] = [
  {
    id: 'support',
    label: 'Customer support',
    title: 'Answer faster without hiring more',
    description:
      'Let an assistant handle the questions you answer every day, so your team can focus on the ones that need a person.',
    points: ['Order, booking and pricing questions', 'Instant replies on your site or WhatsApp', 'Clear handover to a real person'],
    flow: ['Question arrives', 'AI finds the answer', 'Replies or hands over'],
  },
  {
    id: 'sales',
    label: 'Sales & leads',
    title: 'Follow up every lead, every time',
    description:
      'Respond to new enquiries in minutes and make sure none slip through the cracks.',
    points: ['Qualify and score new leads', 'Send personal first replies', 'Add everything to your CRM automatically'],
    flow: ['Form submitted', 'AI qualifies the lead', 'Team gets a ready summary'],
  },
  {
    id: 'ops',
    label: 'Operations',
    title: 'Take repeat admin off your plate',
    description:
      'Turn the copy-paste jobs that eat your week into workflows that run themselves.',
    points: ['Extract data from documents and emails', 'Keep spreadsheets and tools in sync', 'Weekly reports sent on schedule'],
    flow: ['Email or file arrives', 'AI reads and sorts it', 'Data lands in your tools'],
  },
  {
    id: 'marketing',
    label: 'Marketing & content',
    title: 'Produce more, keep your voice',
    description:
      'Speed up research, drafts and repurposing, while keeping a person in charge of quality and tone.',
    points: ['Outlines and first drafts to edit', 'One piece turned into many formats', 'Keyword and topic research support'],
    flow: ['Brief written', 'AI drafts options', 'You edit and approve'],
  },
];

export const aiSteps: ProcessStep[] = [
  {
    title: 'Discovery & goals',
    description:
      'We learn how your business runs and where time or money is being lost, then agree what success looks like.',
  },
  {
    title: 'Choose the first use case',
    description:
      'We pick one small, valuable workflow to start with, so you see results quickly and with low risk.',
  },
  {
    title: 'Design the flow',
    description:
      'We map what the AI does, what it can access and when a person steps in, and you approve it before we build.',
  },
  {
    title: 'Build & connect',
    description:
      'We build it and connect it to the tools you already use, then test it with real examples.',
  },
  {
    title: 'Launch & improve',
    description:
      'We go live, watch how it performs, and tune it based on what actually happens.',
  },
];

export const aiPackages: ServicePackage[] = [
  {
    name: 'AI Audit',
    blurb: 'A short engagement that finds where AI and automation would actually pay off.',
    features: [
      'Review of your current workflows',
      'Ranked list of opportunities',
      'Risks and data considerations',
      'A clear plan for the first project',
      'Walkthrough call',
    ],
  },
  {
    name: 'Pilot Build',
    blurb: 'One workflow built, tested and live, so you can see the value before going further.',
    badge: 'Best place to start',
    highlight: true,
    features: [
      'Everything in the AI Audit',
      'One workflow designed and built',
      'Connected to your existing tools',
      'Testing with your real examples',
      'Handover and a short training session',
      'Support after launch',
    ],
  },
  {
    name: 'Ongoing Automation',
    blurb: 'A steady partner who keeps improving what you have and builds what’s next.',
    features: [
      'Monthly improvement and monitoring',
      'New workflows added over time',
      'Prompt and quality tuning',
      'Usage and results reporting',
      'Priority support',
    ],
  },
];

export const aiWhyUs: IconItem[] = [
  {
    icon: Gauge,
    title: 'Small steps, quick wins',
    description:
      'We start with one workflow, prove it works, then expand. No giant projects that never launch.',
  },
  {
    icon: Bot,
    title: 'People stay in charge',
    description:
      'The AI handles the routine. Anything sensitive or unclear goes to a person, by design.',
  },
  {
    icon: LineChart,
    title: 'Honest about results',
    description:
      'We measure what changes and tell you plainly what’s working, and what isn’t.',
  },
];

export const aiToolGroups = [
  { label: 'AI models', items: ['OpenAI', 'Anthropic Claude', 'Google Gemini'] },
  { label: 'Automation', items: ['Zapier', 'Make', 'n8n'] },
  { label: 'Data & apps', items: ['Airtable', 'Notion', 'Google Sheets', 'HubSpot'] },
  { label: 'Channels', items: ['WhatsApp', 'Website chat', 'Email', 'Slack'] },
];

export const aiFaqs: FaqItem[] = [
  {
    question: 'What can AI realistically do for a small business?',
    answer: [
      'It’s best at repeat work with clear rules: answering common questions, sorting and summarising messages, pulling data out of documents, drafting first versions, and keeping tools in sync. We’ll tell you honestly if a task isn’t a good fit.',
    ],
  },
  {
    question: 'Will AI replace my team?',
    answer: [
      'That’s not the aim. The goal is to take the repetitive tasks off your team so they can spend time on the work that needs judgment and a human touch.',
    ],
  },
  {
    question: 'Is my data safe?',
    answer: [
      'We decide up front what information the AI can see and what it can do, use providers with clear data policies, and keep sensitive actions behind a person’s approval. We’ll explain the choices in plain language before you sign off.',
    ],
  },
  {
    question: 'What if the AI gets something wrong?',
    answer: [
      'It can, which is why we design for it: the AI is limited to what it can answer well, it hands over when unsure, and we test with your real examples and keep tuning after launch.',
    ],
  },
  {
    question: 'How long does a first project take?',
    answer: [
      'A single workflow usually takes a few weeks from discovery to launch, depending on how many tools it connects to. We’ll give you a clear timeline after the audit.',
    ],
  },
  {
    question: 'Do I need to change the tools I already use?',
    answer: [
      'Usually not. We connect to what you already have, such as your website, spreadsheets, CRM, email and WhatsApp, rather than asking you to start over.',
    ],
  },
];
