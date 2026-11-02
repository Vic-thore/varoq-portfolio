import { WHATSAPP_NUMBER, SITE_NAME, whatsappHref } from './assets';

/**
 * Where inquiries go.
 *
 * - FORM_ENDPOINT: paste a Formspree / Web3Forms / Getform URL here and the
 *   form will POST to it and deliver straight to your email inbox.
 * - CONTACT_EMAIL: shown on the Contact page and used as a mailto fallback.
 *
 * With neither set, the form opens WhatsApp with the inquiry pre-written, so
 * nothing is ever silently lost.
 */
export const FORM_ENDPOINT = '';
export const CONTACT_EMAIL = 'varoqstudio@email.com';

export interface Inquiry {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

export type SubmitResult = 'sent' | 'whatsapp' | 'email' | 'error';

export function inquiryText(v: Inquiry): string {
  const lines = [
    `Hi ${SITE_NAME}, I'm ${v.fullName.trim()}.`,
    '',
    v.message.trim(),
    '',
    `Email: ${v.email.trim()}`,
  ];
  if (v.phone.trim()) lines.push(`Phone: ${v.phone.trim()}`);
  if (v.country.trim()) lines.push(`Country: ${v.country.trim()}`);
  return lines.join('\n');
}

export function inquiryWhatsappHref(v: Inquiry): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(inquiryText(v))}`;
}

/**
 * Must be called straight from the submit handler: the WhatsApp / mailto
 * branches run before the first `await`, so browsers still treat them as a
 * user-initiated action and don't block the new tab.
 */
export async function submitInquiry(v: Inquiry): Promise<SubmitResult> {
  if (FORM_ENDPOINT) {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: v.fullName,
          email: v.email,
          phone: v.phone,
          country: v.country,
          message: v.message,
          _subject: `New ${SITE_NAME} inquiry from ${v.fullName}`,
        }),
      });
      return res.ok ? 'sent' : 'error';
    } catch {
      return 'error';
    }
  }
  if (WHATSAPP_NUMBER) {
    window.open(inquiryWhatsappHref(v), '_blank', 'noopener');
    return 'whatsapp';
  }
  if (CONTACT_EMAIL) {
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `${SITE_NAME} inquiry from ${v.fullName.trim()}`
    )}&body=${encodeURIComponent(inquiryText(v))}`;
    return 'email';
  }
  return 'error';
}

export { whatsappHref };
