import { Link } from 'react-router-dom';
import {
  DribbbleIcon,
  YoutubeIcon,
  FacebookIcon,
  LinkedinIcon,
  InstagramIcon,
  XIcon,
  TiktokIcon,
} from './SocialIcons';
import {
  footerColumns,
  industries,
  awards,
  socialLinks,
} from '../data/content';
import { SITE_NAME } from '../lib/assets';

import type { ReactElement } from 'react';

type Glyph = (props: { size?: number; className?: string }) => ReactElement;

const socialIcons: Record<string, Glyph> = {
  Dribbble: DribbbleIcon,
  YouTube: YoutubeIcon,
  Facebook: FacebookIcon,
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
  X: XIcon,
  TikTok: TiktokIcon,
};

function SocialList({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex list-none items-center gap-4 ${className}`}>
      {socialLinks.filter((social) => social.href && social.href !== '#').map((social) => {
        const Icon = socialIcons[social.label];
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="social-item"
              aria-label={`${SITE_NAME} on ${social.label}`}
            >
              <Icon size={18} className="text-white" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function Footer() {
  return (
    <>
      <footer className="zf-footer above-glow relative">
        <div className="container-zf">
          {/* Decorative watermark: drawn with generated content so it is not
              treated as text that needs readable contrast. */}
          <p
            aria-hidden="true"
            data-text={SITE_NAME}
            className="font-display text-[15vw] font-semibold uppercase leading-none tracking-tight text-white/10 before:content-[attr(data-text)] max-[575px]:text-[22vw]"
          />

          <div className="footer-grid">
            <div className="footer-text">
              <p className="font-inter text-[18px] leading-[27px] text-gray-495">
                Branding, UI/UX design, web development, no-code, automation,
                and SEO: everything your business needs to launch, run, and
                grow online.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                {awards.map((award) => (
                  <img
                    key={award.alt}
                    src={award.src}
                    alt={award.alt}
                    width={award.width}
                    height={award.height}
                    loading="lazy"
                    className="object-contain"
                    style={{ height: award.height }}
                  />
                ))}
              </div>
            </div>

            {footerColumns.map((column) => (
              <nav
                className="footer-col"
                key={column.heading}
                aria-label={column.heading}
              >
                <h2 className="font-inter text-[16px] font-bold leading-5 text-white">
                  {column.heading}
                </h2>
                <ul className="mt-5 flex list-none flex-col gap-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') && !link.href.includes('#') ? (
                        <Link
                          to={link.href}
                          className="arrow-hover inline-block font-inter text-[15px] leading-6 text-gray-200"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="arrow-hover inline-block font-inter text-[15px] leading-6 text-gray-200"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="footer-col">
              <h2 className="font-inter text-[16px] font-bold leading-5 text-white">
                Industries
              </h2>
              <ul className="mt-5 flex list-none flex-col gap-3.5">
                {industries.map((industry) => (
                  <li key={industry}>
                    <span className="font-inter text-[15px] leading-5 text-gray-200">
                      {industry}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-5">
            <p className="font-inter text-[14px] leading-[21px] text-gray-200">
              © 2026 Copyright {SITE_NAME}. All rights reserved.
            </p>
            <a
              href="#"
              className="arrow-hover inline-block font-inter text-[14px] leading-6 text-gray-200"
            >
              Privacy Policy
            </a>
            <SocialList />
          </div>
        </div>
      </footer>
    </>
  );
}
