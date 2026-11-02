import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';

/** Homepage contact section: info panel beside the form. */
export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section above-glow relative"
      aria-labelledby="contact-heading"
    >
      <div className="container-zf">
        <div className="contact-shell">
          <div className="testimonial-side">
            <ContactInfo />
          </div>

          <div className="form-wrap">
            <span className="font-inter text-[14px] leading-5 text-primary">
              Contact Us
            </span>
            <h2
              id="contact-heading"
              className="mb-3 mt-6 max-w-[510px] font-tight text-[36px] leading-normal text-white max-[575px]:mt-4 max-[575px]:text-[18px] max-[575px]:leading-7 font-bold"
              style={{ letterSpacing: '-0.72px' }}
            >
              Let&rsquo;s work on what you care about
            </h2>
            <p className="font-tight text-[16px] leading-6 text-gray-300 max-[575px]:text-[14px] max-[575px]:leading-5">
              Got a project in mind? Brand, website, automation or SEO, tell us
              what you need and we&rsquo;ll point you in the right direction.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
