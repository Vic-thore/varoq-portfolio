import { useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { submitInquiry, inquiryWhatsappHref, CONTACT_EMAIL, FORM_ENDPOINT, type SubmitResult } from '../lib/contact';
import { WHATSAPP_NUMBER, whatsappHref } from '../lib/assets';
import { countries } from '../data/countries';

type Errors = Partial<Record<'fullName' | 'email' | 'message', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const ids = useId();
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | SubmitResult>('idle');

  // Service cards elsewhere on the site link here as /?service=Name#contact
  // so a click turns straight into a scoped inquiry instead of a dead end.
  // Clicking a second card while already on this page updates the URL
  // without remounting the component, so this has to react to param
  // changes rather than only reading them once — but only when the visitor
  // hasn't typed their own message over the auto-filled one.
  const lastAppliedService = useRef<string | null>(null);
  useEffect(() => {
    const service = searchParams.get('service');
    if (!service || service === lastAppliedService.current) return;
    setValues((v) => {
      const previousAutofill = lastAppliedService.current
        ? `I'm interested in: ${lastAppliedService.current}\n\n`
        : '';
      if (v.message !== '' && v.message !== previousAutofill) return v;
      return { ...v, message: `I'm interested in: ${service}\n\n` };
    });
    lastAppliedService.current = service;
  }, [searchParams]);

  const [countryOpen, setCountryOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState('');
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!countryOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!countryRef.current?.contains(e.target as Node)) setCountryOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCountryOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [countryOpen]);

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.fullName.trim()) next.fullName = 'Enter your full name.';
    if (!values.email.trim()) next.email = 'Enter your email address.';
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = 'Enter a valid email address, like name@company.com.';
    if (!values.message.trim())
      next.message = 'Tell us a little about your project.';
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.getElementById(`${ids}-${Object.keys(next)[0]}`);
      first?.focus();
      return;
    }
    setStatus('sending');
    // Not awaited before the call: the WhatsApp / mailto branches need to
    // run inside this click so the browser doesn't block the new tab.
    submitInquiry(values).then((result) => {
      if (result !== 'error') trackEvent('enquiry_submitted', { method: result });
      setStatus(result);
    });
  };

  const filtered = countryQuery
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(countryQuery.toLowerCase())
      )
    : countries;

  const done = status === 'sent' || status === 'whatsapp' || status === 'email';

  return (
    <>
      {done ? (
        <div
          role="status"
          className="mt-10 rounded-xl border border-brand-bright/40 bg-brand-blue/10 p-6"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue">
              <Check size={18} className="text-white" aria-hidden="true" />
            </span>
            <p className="font-tight text-[18px] text-white">
              {status === 'sent' ? 'Thanks, we’ve got your message' : status === 'email' ? 'Your email app is open' : 'WhatsApp is open with your message'}
            </p>
          </div>
          <p className="mt-3 font-inter text-[14px] leading-6 text-gray-495">
            {status === 'sent'
              ? 'We’ll read it and get back to you by email.'
              : status === 'email'
                ? 'Press send in your email app to deliver it.'
                : 'Tap send in WhatsApp to deliver it. Nothing is sent until you do.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {status === 'whatsapp' && (
              <a className="btn btn-primary" href={inquiryWhatsappHref(values)} target="_blank" rel="noopener noreferrer">
                Open WhatsApp again
              </a>
            )}
            <button type="button" className="btn btn-outlined" onClick={() => setStatus('idle')}>
              Edit inquiry
            </button>
          </div>
        </div>
      ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="mt-10 flex flex-col gap-6 max-[575px]:mt-6 max-[575px]:gap-12"
              >
                <div className="cf-grid-2">
                  <div>
                    <label htmlFor={`${ids}-fullName`} className="cf-label">
                      Full Name*
                    </label>
                    <input
                      id={`${ids}-fullName`}
                      name="full_name"
                      type="text"
                      className="cf-input"
                      value={values.fullName}
                      onChange={(e) => set('fullName')(e.target.value)}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={
                        errors.fullName ? `${ids}-fullName-error` : undefined
                      }
                    />
                    {errors.fullName && (
                      <p id={`${ids}-fullName-error`} className="field-error">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={`${ids}-email`} className="cf-label">
                      Email Address*
                    </label>
                    <input
                      id={`${ids}-email`}
                      name="email"
                      type="email"
                      className="cf-input"
                      value={values.email}
                      onChange={(e) => set('email')(e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? `${ids}-email-error` : undefined
                      }
                    />
                    {errors.email && (
                      <p id={`${ids}-email-error`} className="field-error">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={`${ids}-phone`} className="cf-label">
                      Phone Number
                    </label>
                    <input
                      id={`${ids}-phone`}
                      name="phone"
                      type="tel"
                      className="cf-input"
                      value={values.phone}
                      onChange={(e) => set('phone')(e.target.value)}
                    />
                  </div>

                  <div className="relative" ref={countryRef}>
                    <label htmlFor={`${ids}-country`} className="cf-label">
                      Country (Optional)
                    </label>
                    <button
                      id={`${ids}-country`}
                      type="button"
                      className="cf-input flex items-center justify-between text-left"
                      aria-haspopup="listbox"
                      aria-expanded={countryOpen}
                      onClick={() => setCountryOpen((v) => !v)}
                    >
                      <span
                        className={values.country ? '' : 'text-gray-200'}
                      >
                        {values.country || 'Select country'}
                      </span>
                      <ChevronDown
                        size={16}
                        className="text-gray-200"
                        aria-hidden="true"
                      />
                    </button>

                    {countryOpen && (
                      <div className="absolute left-0 top-[calc(100%+4px)] z-[999] w-full overflow-hidden rounded-lg border border-[#373737] bg-[#171717]">
                        <div className="p-2">
                          <input
                            type="text"
                            autoFocus
                            placeholder="Search country..."
                            value={countryQuery}
                            onChange={(e) => setCountryQuery(e.target.value)}
                            className="w-full rounded border border-[#373737] bg-transparent px-3 py-2 font-inter text-[14px] font-medium text-gray-495 outline-none"
                            aria-label="Search country"
                          />
                        </div>
                        <ul
                          role="listbox"
                          aria-label="Country"
                          className="max-h-[200px] list-none overflow-y-auto px-1 pb-1"
                        >
                          {filtered.map((country) => (
                            <li key={country.code}>
                              <button
                                type="button"
                                role="option"
                                aria-selected={values.country === country.name}
                                className="w-full cursor-pointer px-2 py-1 text-left font-inter text-[14px] font-medium leading-normal text-[#B9B9B9] hover:bg-[#090909]"
                                onClick={() => {
                                  set('country')(country.name);
                                  setCountryOpen(false);
                                  setCountryQuery('');
                                }}
                              >
                                {country.name}
                              </button>
                            </li>
                          ))}
                          {filtered.length === 0 && (
                            <li className="px-2 py-2 font-inter text-[14px] text-gray-200">
                              No match
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor={`${ids}-message`} className="cf-label">
                    Message
                  </label>
                  <textarea
                    id={`${ids}-message`}
                    name="about_project"
                    className="cf-input"
                    placeholder="Tell us about your project, goals, timeline, or requirements*"
                    value={values.message}
                    onChange={(e) => set('message')(e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? `${ids}-message-error` : undefined
                    }
                  />
                  {errors.message && (
                    <p id={`${ids}-message-error`} className="field-error">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-danger/50 bg-danger/10 p-4"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0 text-white" aria-hidden="true" />
                    <p className="font-inter text-[14px] leading-6 text-gray-495">
                      We couldn&rsquo;t send that just now.{' '}
                      {WHATSAPP_NUMBER ? (
                        <>
                          Message us directly on{' '}
                          <a className="underline" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                            WhatsApp
                          </a>
                          {CONTACT_EMAIL ? ' or email ' : '.'}
                        </>
                      ) : null}
                      {CONTACT_EMAIL ? (
                        <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                          {CONTACT_EMAIL}
                        </a>
                      ) : null}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-gradient self-start font-inter disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send inquiry'}
                  </button>
                  <p className="font-inter text-[13px] leading-5 text-gray-200">
                    {WHATSAPP_NUMBER && !FORM_ENDPOINT
                      ? 'This opens WhatsApp with your message ready to send.'
                      : ''}
                  </p>
                </div>
              </form>
      )}
    </>
  );
}
