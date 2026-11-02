import { MessageCircle, Mail } from 'lucide-react';
import { CONTACT_EMAIL } from '../lib/contact';
import { trackEvent } from '../lib/analytics';
import { WHATSAPP_NUMBER, whatsappHref } from '../lib/assets';

const steps = [
  ['Tell us what you need', 'A few lines about the project, goals and timeline is plenty.'],
  ['We reply with questions or a plan', 'A short call if it helps, or a written outline you can react to.'],
  ['You decide', 'A clear scope and price before any work starts.'],
];

/** Light panel with the fastest ways to reach Varoq and what happens next. */
export function ContactInfo({ className = '' }: { className?: string }) {
  return (
    <div className={`testimonial-panel ${className}`}>
      <h2 className="font-tight text-[24px] font-bold leading-8 text-gray-800">
        Prefer to talk now?
      </h2>
      <p className="mt-2 font-inter text-[15px] leading-6 text-[#52525b]">
        The fastest way to reach us is a message. Send a note and we&rsquo;ll pick it up from there.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {WHATSAPP_NUMBER && (
          <a
            href={whatsappHref()}
            onClick={() => trackEvent('whatsapp_click', { location: 'contact' })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full justify-start gap-3"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Chat on WhatsApp
          </a>
        )}
        {CONTACT_EMAIL && (
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            onClick={() => trackEvent('email_click', { location: 'contact' })}
            className="btn w-full justify-start gap-3 border-gray-800 text-gray-800"
          >
            <Mail size={18} aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
        )}
      </div>

      <h3 className="mt-10 font-tight text-[18px] font-bold text-gray-800">
        What happens next
      </h3>
      <ol className="mt-4 flex list-none flex-col gap-4">
        {steps.map(([title, text], i) => (
          <li key={title} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-navy font-inter text-[13px] font-medium text-white">
              {i + 1}
            </span>
            <span>
              <span className="block font-tight text-[16px] font-medium text-gray-800">{title}</span>
              <span className="block font-inter text-[14px] leading-6 text-[#52525b]">{text}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
