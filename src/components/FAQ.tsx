import { faqs } from '../data/content';
import { SITE_NAME } from '../lib/assets';
import { FaqAccordion } from './FaqAccordion';

export function FAQ() {
  return (
    <section id="faq" className="section-pad above-glow relative bg-ink" aria-label="FAQs">
      <div className="container-zf">
        <FaqAccordion
          eyebrow="FAQs"
          title="Questions? We’ve Got Answers"
          description={`${SITE_NAME} reduces design complexity & speeds up product launches with clear UX workflows, scalable visual systems, and no-code execution.`}
          items={faqs}
          ctaLabel="Book a free call"
        />
      </div>
    </section>
  );
}
