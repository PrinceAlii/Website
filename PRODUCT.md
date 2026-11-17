# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Engineering peers: colleagues and other engineers who look Ali up after meeting Ali at work, at
  an event, or through Ali's code.
- Anyone who searches Ali's name: the site is Ali's personal home base and calling card on the web.

Recruiters are not the primary audience, though they use the same page.

## Product Purpose

`https://www.alib.au` is Ali Bonagdaran's personal website. It tells a visitor who Ali is and where
Ali has worked, then hands them off to the full details.

A visit succeeds when any of these happens:

- The visitor takes in the name and career path within a few seconds.
- The visitor opens LinkedIn or GitHub for more.
- The visitor uses Contact to send an email.

## Positioning

The page is deliberately small and factual. It shows a real career path, from crew member and
customer service roles to DevOps at the Australian Bureau of Statistics, with no bio, tagline, or
self-description. The content is Ali's own and nothing else.

## Operating Context

- Visitors arrive from a search for Ali's name, a shared link, LinkedIn, or GitHub.
- Many visits are on phones, so the page must read cleanly from 320px up.
- The full story lives off the page: LinkedIn and GitHub.

## Capabilities and Constraints

- One static page: name, theme toggle, three links (`LinkedIn`, `GitHub`, `Contact`), an
  `Experience` label, and four experience rows. The ABS row holds two positions. A styled 404 page
  and a sitemap. Static export to Cloudflare Workers.
- Light and dark themes, following the system by default, with a toggle that persists.
- Contact is a `mailto:` link. The email address is never printed as page text.
- The rendered page has no prose: names, labels, and dates only.
- The layout follows andrewqu.com for spacing, type, and themes only. None of its content may be
  used.
- Open decision: the site may grow later (projects, writing, or a bio), but nothing is decided.
  Until Ali decides, any new section needs Ali's explicit approval, and the current hard rules in
  `AGENTS.md` stand.

## Brand Commitments

- Name: Ali Bonagdaran, shown as a plain static heading.
- Voice: plain, short, factual. No em dashes anywhere.
- Existing assets: the custom "A" favicon (`public/favicon.svg`), the Open Graph image
  (`public/og.png`), and employer logos in `public/logos/`.

## Evidence on Hand

- Work history: `src/data/experiences.ts` (five positions across four rows, 2019 to present, with
  highlights and skills kept as data).
- Resume: `public/resume.pdf`. Still published at `/resume.pdf` but not linked from the page.
- Education, skills, and achievements: `src/data/education.ts`, `src/data/skills.ts`,
  `src/data/achievements.ts`. Kept as data, not rendered.
- No projects, testimonials, writing, or case studies exist in the repository. Do not invent them.

## Product Principles

1. Real content only. Every fact on the page is Ali's and verifiable.
2. Get out of the way. The page is a fast first impression and a hand-off to LinkedIn, GitHub, or
   email.
3. Small on purpose. Growth is a deliberate decision, not filler added to look complete.
4. Equal care in both themes and at every width from 320px up.

## Accessibility & Inclusion

- WCAG AA text contrast in both themes.
- Works without JavaScript. Only the theme toggle needs it.
- Semantic structure: one `h1`, a real list of experiences, accessible names on controls, visible
  focus, and reduced motion respected.
