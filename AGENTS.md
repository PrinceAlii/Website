# Agent instructions

This is the only instruction file for coding agents. The design, content, and implementation
contract is `specs/SPEC.md`. The checks for done are `specs/ACCEPTANCE.md`. Setup and deployment are
in `README.md`.

## Project

Ali Bonagdaran's personal website at `https://www.alib.au`: one static page with a name, a theme
toggle, three links, an `Experience` label, and four experience rows. The ABS row holds two
positions.

The layout follows [andrewqu.com](https://www.andrewqu.com/). Match its spacing, typography, and
themes, using the captures in `specs/reference/`. It is a design guide only, not a template to expand
and not a content source.

When sources disagree, this order wins:

1. The user's current request.
2. This file, `specs/`, and the saved captures in `specs/reference/`.
3. The live reference site, for visual intent only. Do not adopt new sections, copy, or behavior from
   it. If it differs from the captures, keep the documented structure and ask.

## Hard rules

Structure:

- Header: the name and the theme toggle. Nothing else.
- Exactly three links, in this order: `LinkedIn`, `GitHub`, `Contact`. `Contact` is a
  same-tab `mailto:` link and the only email entry point. The other three open in a new tab. Never
  print the email address as page text.
- Then the `Experience` label and four experience rows, newest first. The page ends after the last
  row.
- No projects section. No footer, navigation, bio, avatar, contact block, cards, borders, separators,
  extra links, or extra sections.
- Education, skills, achievements, and highlights stay as data only. Do not render them to make the
  site look complete. A new section is a product decision: stop and ask.
- The 404 page includes the shared theme toggle in a 48px header, aligned to the right.
- The name is a plain, static, selectable server-rendered `h1` in Lower Pixel. The 404 message uses
  Lower Pixel too. Nothing moves except the theme switch and hover colors.
- Keep both light and dark themes working.

Content:

- Use only Ali's content: `src/data/`, `public/`, and Ali's resume. No placeholder, invented, or
  lorem ipsum content.
- Never copy Andrew Qu's name, biography, links, employers, dates, logos, emoji, project copy, or
  assets into any served file or metadata.
- Phones show the `shortCompany` labels (`ABS`, `CommBank`). Desktop shows full company names. Do
  not change this without retesting every row at 320px and 390px.
- Dates read `2026 - Present` or `2025 - 2026`, with a spaced hyphen. The data keeps ISO year-month
  dates, and the year range is formatted at render time.
- Employer logos come only from `public/logos/`. Record the source of any new logo in
  `specs/SPEC.md`.

## Writing and copy

These rules cover page text, code comments, docs, errors, commit messages, PRs, and final answers.

- Never use em dashes (the character or its HTML entity) anywhere. Use a period, comma, colon, or
  plain wording.
- The rendered page has no prose. It shows only names, labels, and dates. Do not add sentences,
  taglines, or helper text. The 404 page is the one exception, and it stays short.
- Page text is for visitors. Do not explain the design or the system, and avoid engineering words
  such as "atomic", "idempotent", "payload", or "state machine".
- Prompt-shaped copy test: if a string could be pasted into an engineering ticket unchanged, or it
  names a hidden mechanism instead of what the visitor sees, rewrite it.
- In repository prose, use clear, simple English and short sentences. Lead with the practical answer.
  Skip buzzwords, vague claims ("robust", "comprehensive"), metaphors, and long introductions. Prefer
  active voice.
- Keep exact commands, file names, config keys, identifiers, and error messages unchanged.
- In code, comments explain why, not what.
- Progress updates say what was found, what is changing, and what needs attention. Final answers
  start with the outcome, then list changes, trade-offs, checks run, and any step the user still has
  to do.

## Code

- Next.js App Router, static export to `out/`. Server components by default. The only client
  component is `src/components/theme-toggle.tsx`. `src/app/layout.tsx` wraps the app in the
  `next-themes` `ThemeProvider`. Do not make the page a client component to add interactions.
- Page content lives in typed data in `src/data/`. Do not hardcode it in components.
- The only routes are `/`, the 404 page, `/sitemap.xml`, and `/index.md` (the markdown copy of `/`
  for agents). Do not add project pages, a CMS, API routes, server functions, `basePath`, or
  `assetPrefix`.
- `worker/index.ts` is the only server code. It runs for `/` only and serves `/index.md` when the
  request sends `Accept: text/markdown`. Keep it that small.
- Tabs, double quotes, 100-column lines, formatted by Biome only.
- Do not add a component library, icon package, animation library, or state manager.
- Prefer deleting decoration over adding it. Use semantic HTML and accessible names.
- Use pnpm through Corepack. Do not commit an npm or yarn lockfile.
- Do not upgrade pinned dependencies without re-measuring the layout at every viewport in both
  themes.

## Common changes

- Name, site URL, links: `src/data/profile.ts`. Metadata, the sitemap, and JSON-LD read from it.
- Experience rows: `src/data/experiences.ts`. Keep the list newest first. Each employer has a
  `positions` list, newest first. ABS is one row with two positions, shown as a grouped timeline. To
  separate them, split the ABS entry into two experiences. Set `shortCompany` for any company too
  long to sit beside a phone date. A new employer needs a `LogoKind`, a `CompanyLogo` branch, an SVG
  in `public/logos/`, and a source note in the spec.
- Spacing, type, or the name: edit the Tailwind classes and `specs/SPEC.md` together.
- Section label: keep the visible heading as `Experience` in the page and `/index.md`.
- Selection highlight: use the blue selection colors in `specs/SPEC.md` and keep both selected-text
  foregrounds above WCAG AA contrast.
- Lower Pixel: use the local WOFF2 font for the name and 404 message only. It is licensed for
  personal use, so do not use it for commercial work without written permission. Do not subset or
  alter it. WOFF2 format conversion is allowed by the license.
- Theme: keep the `next-themes` class strategy, system default, and `theme` storage key.
- 404 page, sitemap, metadata: `src/app/not-found.tsx`, `src/app/sitemap.ts`, `src/app/layout.tsx`.
- Markdown for agents: `src/app/index.md/route.ts` builds it from `src/data/`, and
  `worker/index.ts` serves it.
- Update `specs/` and this file when behavior or content changes. If a request conflicts with them,
  point out the conflict instead of picking a side.

## Verification

```bash
corepack pnpm check   # Biome, TypeScript, static export. CI runs the same command.
corepack pnpm dev     # local server for visual checks
```

For any visual change, inspect 1440, 768, 390, and 320 (each 1000px tall) in light and dark, after
fonts load, and run the checks in `specs/ACCEPTANCE.md`. At minimum confirm:

- The header is 48px and the name does not wrap.
- Vertical positions and row pitch match the spec. The ABS group is 152px tall; other rows are 48px
  at 390 and 1440. At 320 the Service NSW row is 68px.
- Dates in single-position rows line up on one right edge. ABS dates stay with their roles.
- No horizontal overflow (`document.documentElement.scrollWidth === innerWidth`).
- The theme toggle flips the resolved theme, persists, and shows a moon or sun.
- The name is static. The 404 page (for example `/missing`) is styled.
- No hydration or accessibility warnings, and no reference content in served files.

Do not report success with a failing or skipped step.

## Git and deployment

- Do not commit `out/`, `.next/`, or `node_modules/`.
- Do not push or deploy unless asked. Pushing to `main` deploys the live site through Cloudflare
  Workers Builds. See `README.md`.
