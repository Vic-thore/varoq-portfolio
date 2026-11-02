/**
 * Real client testimonials only. The section on the home page stays hidden
 * until this list has at least one entry, so nothing placeholder can go live.
 *
 * Add an entry like:
 *   {
 *     quote: 'Exactly what they said, word for word.',
 *     name: 'Full name',
 *     role: 'Role, Company',
 *     project: 'dente',                 // optional: slug of /work/<slug>
 *     source: { label: 'Google review', url: 'https://…' }, // optional proof link
 *   }
 * Only include a quote the person has agreed to publish under their name.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Case study slug, links the quote to the project it is about. */
  project?: string;
  /** Where the quote can be verified (a review page, LinkedIn post, email-permission note). */
  source?: { label: string; url: string };
}

export const testimonials: Testimonial[] = [];
