import { brandingConcepts } from './branding';
import { nocodeConcepts } from './nocode';
import { seoConcepts } from './seo';
import { uiuxConcepts } from './uiux';
import { webdevConcepts } from './webdev';
import type { ServiceConcept } from '../components/service-page/types';

export interface WorkItem extends ServiceConcept {
  serviceId: string;
  serviceLabel: string;
  href: string;
}

const tag = (
  concepts: ServiceConcept[],
  serviceId: string,
  serviceLabel: string,
  href: string
): WorkItem[] => concepts.map((c) => ({ ...c, serviceId, serviceLabel, href }));

/** Original concept projects, one list across every service. */
export const workItems: WorkItem[] = [
  ...tag(brandingConcepts, 'branding', 'Branding', '/services/branding'),
  ...tag(uiuxConcepts, 'ui-ux-design', 'UI/UX', '/services/ui-ux-design'),
  ...tag(webdevConcepts, 'web-development', 'Web', '/services/web-development'),
  ...tag(nocodeConcepts, 'no-code-development', 'No-code', '/services/no-code-development'),
  ...tag(seoConcepts, 'seo', 'SEO', '/services/seo'),
];

export const workFilters = [
  { id: 'all', label: 'All' },
  { id: 'branding', label: 'Branding' },
  { id: 'ui-ux-design', label: 'UI/UX' },
  { id: 'web-development', label: 'Web' },
  { id: 'no-code-development', label: 'No-code' },
  { id: 'seo', label: 'SEO' },
];

/** Extra filters by kind of project. */
export const workKindFilters = [
  { id: 'past', label: 'Past projects' },
  { id: 'concept', label: 'Concepts' },
];
