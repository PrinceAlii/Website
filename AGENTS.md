# Agent instructions

## Project

This is Ali Bonagdaran's personal website: one static page with a name, four links, an
`Experiences` label, and five experience rows. The live site is `https://www.alib.au`. It is hosted
on Cloudflare Workers static assets.

The layout follows [andrewqu.com](https://www.andrewqu.com/) and uses only Ali's content. For design
decisions, look at the live site and the captures in `specs/reference/`. Match its spacing,
typography, and themes. The name is static. Do not use it as a template to expand.

Do not copy Andrew Qu's name, biography, links, employers, project copy, logos, emoji, or any other
personal content into the site.

## Writing and copy

These rules cover page text, code comments, docs, errors, commit messages, PRs, and final answers.

Page text:

- Write for the person reading the page, not for the designer or the agent building it.
- The rendered page has no prose. It shows only names, labels, and dates. Do not add sentences,
  taglines, or helper text.
- Do not explain the design or the system in page text. No specification wording, no internal
  terms, no feature names.
- Never use em dashes (the character or its HTML entity) anywhere: page, docs, comments, or commit
  messages. Use a period, comma, colon, or plain wording.
- Dates read `2026 to Present` and `2025 to 2026`. No dashes in dates.
- Avoid engineering words such as "atomic", "idempotent", "payload", or "state machine" in anything a
  visitor can read.
- Prompt-shaped copy test: if a string could be pasted into an engineering ticket unchanged, or it
  names a hidden mechanism instead of what the visitor sees, rewrite it. Page text should say what
  something is or what happens next.

Agent and repository prose:

- Use clear, simple English. Lead with the practical answer.
- Use short sentences and common words. Explain a technical term once if it is needed.
- Keep exact commands, file names, config keys, code identifiers, and error messages unchanged.
- Progress updates say what was found, what is changing, and what needs attention.
- Final answers start with the outcome, then list changes, trade-offs, checks run, and any step the
  user still has to do.
- Skip buzzwords, vague claims ("robust", "comprehensive"), metaphors, long introductions, and
  restating the request. Prefer active voice. Cut words that add no meaning.
- In code, comments explain why, not what.

Before you finish, read the prose on its own. Check that:

1. Nothing a visitor can see reads like a spec or a ticket.
2. There are no em dashes.
3. Every command, file name, and value is still exact.

## Start here

Read these before changing the page:

1. `specs/README.md`
2. `specs/01-visual-spec.md`
3. `specs/02-motion-spec.md`
4. `specs/03-content-spec.md`
5. `specs/04-implementation-spec.md`
6. `specs/05-acceptance-criteria.md`
7. `specs/06-agent-playbook.md`

## Fixed structure

- Header: static name and theme toggle. Nothing else.
- Four links, in this order: `LinkedIn`, `GitHub`, `Resume`, `Contact`. `Contact` is a same-tab
  `mailto:` link. The other three open in a new tab.
- `Experiences` label.
- Five experience rows, newest first.
- No projects section.
- No footer, navigation, bio, avatar, contact section, cards, borders, or extra sections. The
  `Contact` link is the only email entry point.
- The page ends after the last experience row.

Do not add education, skills, achievements, projects, or a footer to make the site look complete.
Those data files exist on purpose and are not rendered.

## Content boundary

- Use only Ali's real content from `src/data/`, `public/`, Ali's resume, or the existing portfolio.
- Do not print the email address as page text. Only the `Contact` link exposes it, as a `mailto:`
  href.
- Never use the reference site's personal copy, employers, dates, names, links, or logos.
- Employer logos must come from `public/logos/`. Record any addition in `public/logos/SOURCES.md`.
- Phones show `shortCompany` (`ABS`, `CommBank`) to keep rows compact. Desktop shows the full
  company name. Do not remove this without retesting 320px and 390px.
- Keep full ISO dates in the data. Render year ranges only, as `2026 to Present`.
- Keep highlights, skills, education, and achievements as data only unless the user asks for a
  different page structure.

## Architecture

- Next.js App Router, static export (`output: "export"`), output in `out/`.
- Server components by default. The name is a plain server-rendered `h1`. The only client component
  is `theme-toggle.tsx`, plus the `ThemeProvider` wrapper.
- Tailwind CSS v4 with tokens in `src/app/globals.css`.
- `next-themes` for class-based themes.
- Local Geist fonts under `src/fonts/`. The name uses Geist Pixel Square only.
- Typed data in `src/data/`. Do not hardcode page content in components.
- One page. The only other routes are the styled 404 page (`src/app/not-found.tsx`) and the sitemap
  (`src/app/sitemap.ts`). Do not add project pages, a CMS, API routes, or server functions.
- Metadata and JSON-LD (`Person`) use the site URL `https://www.alib.au` from `src/data/profile.ts`.
  The JSON-LD is not visible on the page.
- The build routes are `/`, `/_not-found`, and `/sitemap.xml`.

## Hosting and deployment

- Cloudflare Workers static assets. Workers Builds deploys the Worker `website` from the GitHub repo
  `PrinceAlii/Website`, branch `main`. It runs `pnpm run build`, then `npx wrangler deploy`.
- Config is in `wrangler.jsonc`: `name: "website"`, assets directory `./out`,
  `not_found_handling: "404-page"`, and a custom domain route for `www.alib.au`. The apex `alib.au`
  redirects to `https://www.alib.au`.
- Node 24 comes from `.node-version`. pnpm 11.3.0 comes from the `packageManager` field in
  `package.json`. `wrangler` is a pinned devDependency.
- `public/_headers` sets the security headers and long immutable caching for `/_next/static/*`. There
  is no CSP on purpose, because Next and next-themes inject inline scripts.
- Do not add `basePath` or `assetPrefix`.
- GitHub Actions (`.github/workflows/ci.yml`) only runs `pnpm check`. It does not deploy.

## Core measurements

At 1440px:

- Centered column `max-width: 672px`, padding 96px 32px.
- Header at `y=96`, 48px tall, 64px bottom margin.
- Links at `y=208`, 20px tall, 80px bottom margin. `LinkedIn` `x=416`, `GitHub` `x=488.9`,
  `Resume` `x=550.87`, `Contact` `x=620.95`.
- `Experiences` at `y=308`, 24px bottom margin.
- Rows at `y=352, 424, 496, 568, 640`, each 48px, 24px gaps.
- Name `48px/48px` Geist Pixel Square, weight 500, tracking -1.2px, 337.06px wide.
- Company `16px/24px` medium. Role and date `14px/20px`.

At 390px:

- 24px side padding. Name `clamp(1.75rem, 9.2vw, 3rem)` (35.88px measured, about 251.95px wide).
- Header stays 48px tall. All rows stay 48px for the current content.
- Logo slot 48px, 16px gap, text starts at `x=88`.
- Dates sit at the right of the company line. Roles span the full text width.

At 320px:

- All rows stay 48px except Service NSW (68px, because its role wraps to two lines).
- No horizontal overflow. The name (29.44px, 206.73px wide) does not wrap.
- The four links stay on one line (`x=24` to `x=282.75`).

Full values: `specs/01-visual-spec.md`.

## Verification

```bash
corepack pnpm dev
corepack pnpm check
```

`check` runs lint, typecheck, and the build. The CI workflow (`.github/workflows/ci.yml`) runs the
same command on pull requests and pushes to `main`.

Before finishing any visual change, inspect 1440, 768, 390, and 320 in light and dark:

- Header is 48px. The name does not wrap.
- Column width, vertical spacing, and row pitch match the spec.
- Dates line up on the same right edge.
- No horizontal scrolling (`scrollWidth === innerWidth`).
- The theme toggle switches to the opposite resolved theme, persists, and shows a moon or sun.
- Tab order is the theme toggle, `LinkedIn`, `GitHub`, `Resume`, `Contact`.
- The name is static, selectable text. Nothing moves on load or hover.
- The 404 page renders in the same style.
- No hydration or accessibility warnings.
- No reference content appears in `src/`, `public/`, or rendered HTML.

Run the checks in `specs/05-acceptance-criteria.md`. Do not report success with a failing build.

## Style

- Match existing formatting: tabs, double quotes, 100-column Biome formatting.
- Prefer deleting decoration over adding it.
- Use semantic HTML and accessible names.
- Keep classes consistent with the existing Tailwind patterns.
- Do not add a component library, icon package, animation library, or state manager.
- Do not upgrade pinned dependencies without re-measuring the layout.
- Do not commit `out/`, `.next/`, or `node_modules/`.
- Do not push or deploy unless asked. Pushing to `main` deploys the site through Cloudflare Workers
  Builds. Preview builds for other branches are created by Cloudflare.

## When in doubt

If a request conflicts with the fixed structure or the content boundary, stop and ask. A new section
is a product decision, not a styling change.
