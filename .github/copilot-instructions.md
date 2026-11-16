# Copilot instructions

This repository is Ali Bonagdaran's personal website. Follow `AGENTS.md` as the main instruction
file, including its "Writing and copy" section. Never use em dashes. The documents in `specs/` are
the design contract.

## Design

The page follows [andrewqu.com](https://www.andrewqu.com/): a centered 672px column, 96px top
padding, a Geist Pixel Square name, four text links, an uppercase `Experiences` label, and a short
list of experience rows. Match its spacing, typography, and light and dark palette. The name is static.

## Content boundary

- Use Ali Bonagdaran's real content and employer assets only.
- Never copy the reference author's name, bio, links, employers, dates, logos, projects, or copy.
- No projects section. No footer, navigation, bio, avatar, contact section, cards, borders, or extra
  sections. The page ends after the fifth experience row.
- Keep exactly four links, in this order: `LinkedIn`, `GitHub`, `Resume`, `Contact`. `Contact` is a
  same-tab `mailto:` link. Never print the email address as page text.
- Mobile shows short company labels (`ABS`, `CommBank`). Desktop shows full names.
- Dates read `2026 to Present`. No dashes.
- Education, skills, achievements, and highlights stay as data only.

## Code conventions

- Next.js App Router, static export, server components by default.
- The only client component is `theme-toggle.tsx`, plus the `ThemeProvider` wrapper.
- Typed content in `src/data/`. Tailwind tokens in `src/app/globals.css`.
- Tabs, double quotes, Biome formatting, no new UI libraries or animation library.
- Do not upgrade pinned dependencies without re-measuring the layout.

## Verification

Run `corepack pnpm check`, then inspect 1440, 768, 390, and 320 in light and dark. Confirm the 48px
header, row spacing, date alignment, no horizontal overflow, theme persistence, a static name,
and the styled 404 page. Full checklist:
`specs/05-acceptance-criteria.md`.
