# Varoq — frontend build

A React + Vite + TypeScript + Tailwind site for Varoq, originally
built as a high-fidelity recreation of another agency's homepage and since
rebranded: colors, copy, and every outbound link have been reworked so the
page stands on its own rather than pointing back at the site it started from.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle into dist/
npm run preview  # serve the production build
```

## Design system

Tokens live as CSS custom properties at the top of `src/index.css`, so the
whole palette is re-themable from one block.

| Token | Value | Used for |
| --- | --- | --- |
| `--color-primary` | `#FF5C1A` | Orange accent, active states, rail |
| `--color-black-300` | `#0B0B0B` | Page background |
| `--color-black-200` | `#0D0D0D` | Header background |
| `--color-cream-white` | `#FAF9F4` | Light sections |
| `--color-gray-200` | `#8F8F8F` | Muted body copy |
| `--color-black-400` | `#3C3C3C` | Dark borders |
| `--border-light` | `#D7D8D4` | Hairlines on cream service rows |

**Typefaces** — Geologica (display, 800, hero headline and FAQ questions),
Inter Tight (default body), Inter (utility and captions), loaded from Google
Fonts with metric-matched local fallbacks so nothing reflows during the swap.

**Layout** — container `max-width: 1400px`, padding stepping 80 → 60 → 40 → 16px
at the 1204 / 991 / 575px breakpoints. Sections are `80px 0`, collapsing to
`32px 0` below 575px.

## Structure

```
src/
  index.css                 tokens + component classes
  App.tsx                   section composition only
  lib/            assets.ts, cn.ts
  hooks/          useMediaQuery, useTypewriter, useReveal
  data/           navigation.ts, content.ts, countries.ts
  components/
    Header.tsx              sticky header, desktop nav, mobile drawer
    ServicesMegaMenu.tsx    tabbed mega menu, shared desktop + mobile
    Hero.tsx                layered hero composition
    ClientLogos.tsx         seamless logo marquee (empty until real clients exist)
    Showreel.tsx            lazy-attached process video
    SectionHeading.tsx      shared eyebrow / title / description
    Services.tsx            hairline service rows
    Process.tsx             scroll-driven rail + sticky artwork
    ProcessStep.tsx
    Showcase.tsx            staggered portfolio grid
    ProjectCard.tsx
    CTASection.tsx          orange band
    FAQ.tsx                 accessible accordion
    Insights.tsx / InsightCard.tsx
    Testimonials.tsx        autoplaying review slider (placeholder quotes)
    Contact.tsx             validated form, local submit state
    Footer.tsx              offices, wordmark, link columns, socials
    SocialIcons.tsx         inline brand glyphs
    CursorGlow.tsx          ambient pointer glow
```

All repeated content is driven by arrays in `src/data/` — no duplicated JSX.

## Interactions implemented

Hover mega menu (with click and `Escape` support), mobile drawer with body-scroll
lock, inline mobile services accordion, FAQ accordion, testimonial slider
(autoplay, arrows, dots, pauses on hover/focus), hero typewriter, cursor-following
showreel pill, searchable country dropdown, form validation with focus management,
service-row and portfolio hover states, footer link hovers, smooth anchor scrolling
with `scroll-padding-top` set to the header height.

## Accessibility

Semantic landmarks, one `<h1>`, skip link, visible focus rings, `aria-expanded` /
`aria-controls` on every disclosure, `role="tablist"` on the mega menu with
`tabIndex` managed by open state, labelled form fields with `aria-invalid` and
`aria-describedby`, decorative imagery marked `aria-hidden`, and
`prefers-reduced-motion` honoured globally (it also disables the typewriter and
the cursor glow).

## Links and placeholder content

This started as a clone of a real agency's homepage, so a pass was made to
disconnect it from that source rather than silently keep pointing at it:

- **Navigation** (header, mobile drawer, footer columns, mega menu) now
  anchors to sections that exist on this single page (`#hero`, `#services`,
  `#work`, `#insights`, `#contact`), or uses an inert `#` where no matching
  page/section exists yet (About, individual service subpages, blog posts,
  Privacy Policy).
- **Calendly and Figma links** were replaced with in-page anchors to the
  Contact form / Showcase section.
- **Social links** (Dribbble, YouTube, Facebook, LinkedIn, Instagram) are `#`
  placeholders until Varoq's real accounts are wired in.
- **Testimonials** are clearly generic placeholder quotes ("Client Name,
  Founder, Example Co."), not real reviews — the original page quoted real,
  named clients, and swapping the company name in their quotes would have
  misattributed an endorsement to real people who never gave one.
- **Client logos, office addresses/phone numbers, and third-party award
  badges** (ISO/Clutch/GoodFirms) were removed rather than rebranded, since
  they belonged to the site this was cloned from and would misrepresent
  Varoq's actual clients, locations, and credentials.
- **Visual assets** (photos, background art, icon sets) still load from the
  original site's public CDN — there's no local copy of that artwork, so
  removing it would leave the page broken rather than just less accurate.
  The recolored logo mark and hero star are the exception: those are hosted
  locally at `public/svgs/`.

## Known differences from a pixel-perfect clone

1. **No screenshot diffing.** The build environment had no headless browser
   and the network allowlist blocked the source site, so fidelity comes from
   reading its actual CSS rather than pixel comparison.
2. **Marquee timing.** Uses a duplicated track and `-50%` transform, which
   loops seamlessly at any width.
3. **Social icons.** `lucide-react` has dropped brand icons, so the five
   footer glyphs are inlined in `SocialIcons.tsx`.
4. **Contact form.** No backend, so submission settles into a local
   confirmation state that says plainly that nothing was sent.
5. **Two deliberate fixes carried over.** The "Explore More" arrow was
   recoloured from a near-invisible dark grey to white; the hero uses a
   single `<h1>` for correct heading hierarchy.
