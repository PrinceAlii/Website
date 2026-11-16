## Stack

- Next.js 16 (App Router, static export)
- React 19
- Tailwind CSS 4
- next-themes for light and dark mode
- Geist Sans, Geist Mono, and Geist Pixel Square, vendored locally

## Local development

Requires Node 24+ and pnpm 11.3.0 (the repo is set up for Corepack):

```bash
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:3000`.

`pnpm dev` and `pnpm check` are the only local commands needed. There is no local deploy step.
Deploys happen by pushing to `main`.

## Scripts

```bash
corepack pnpm dev         # development server
corepack pnpm build       # static export to out/
corepack pnpm lint        # Biome
corepack pnpm typecheck   # TypeScript
corepack pnpm check       # lint + typecheck + build
```

## Editing content

| What | Where |
| --- | --- |
| Name, description, email, links, site URL (`https://www.alib.au`) | `src/data/profile.ts` |
| Experience entries, dates, roles, highlights | `src/data/experiences.ts` |
| Education (data only) | `src/data/education.ts` |
| Skills (data only) | `src/data/skills.ts` |
| Achievements (data only) | `src/data/achievements.ts` |
| Resume download | `public/resume.pdf` |
| Employer logos | `public/logos/` |
| Open Graph image (footer reads `alib.au`) | `public/og.png` |

The page shows only the company, role, and dates for each experience. Highlights, skills, education,
and achievements stay in the data files unused. Do not add sections for them without an explicit
design request.

Dates read `2026 to Present` and `2025 to 2026`. Do not use dashes in dates.

Phones use short company labels (`ABS`, `CommBank`) so the rows keep the 48px height. Desktop shows the full organization names. Both are stored in `src/data/experiences.ts`.

## Structure

```text
src/
  app/          page shell, 404 page, sitemap, metadata, global styles
  components/   links, experience rows, logos, theme controls
  data/         typed content
  fonts/        locally hosted Geist fonts
public/         resume, logos, favicon, OG image, robots.txt, _headers
specs/          design specs, agent playbook, reference captures
wrangler.jsonc  Cloudflare Workers config
```

## Deployment

The site is served at `https://www.alib.au`. The apex `alib.au` redirects to it.

Hosting is Cloudflare Workers static assets. Cloudflare Workers Builds deploys the Worker named
`website` from the GitHub repo `PrinceAlii/Website`, branch `main`. Each deploy runs
`pnpm run build`, then `npx wrangler deploy`. The build uses Node 24 (`.node-version`) and pnpm
11.3.0 (the `packageManager` field in `package.json`). `wrangler` is a pinned devDependency.

Config is in `wrangler.jsonc` at the repo root: `name: "website"`, assets directory `./out`,
`not_found_handling: "404-page"`, and a custom domain route for `www.alib.au`. There is no Next.js
`basePath` or `assetPrefix`, because the site is served from the domain root.

`public/_headers` sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and
`Permissions-Policy`, and long immutable caching for `/_next/static/*`. There is no CSP on purpose,
because Next and next-themes inject inline scripts.

Pushing to `main` deploys the site. Cloudflare builds previews for other branches automatically.

GitHub Actions (`.github/workflows/ci.yml`) runs `pnpm check` (lint, typecheck, and build) on pull
requests and on pushes to `main`. It does not deploy.

The build output in `out/` contains `index.html`, `404.html`, `sitemap.xml`, `resume.pdf`, `og.png`,
`robots.txt`, `_headers`, and `_next/`.

The build produces three routes: `/`, `/_not-found` (the 404 page), and `/sitemap.xml`.

## Specs

Read the specs before changing the page:

- [`specs/01-visual-spec.md`](./specs/01-visual-spec.md)
- [`specs/02-motion-spec.md`](./specs/02-motion-spec.md)
- [`specs/03-content-spec.md`](./specs/03-content-spec.md)
- [`specs/04-implementation-spec.md`](./specs/04-implementation-spec.md)
- [`specs/05-acceptance-criteria.md`](./specs/05-acceptance-criteria.md)
- [`specs/06-agent-playbook.md`](./specs/06-agent-playbook.md)

Instructions for coding agents are in `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and
`.github/copilot-instructions.md`.

## Credits and licensing

- Design inspiration: [andrewqu.com](https://www.andrewqu.com/). Reference captures live in
  `specs/reference/` for design review only and are not deployed.
- Fonts: Geist by Vercel, licensed under the SIL Open Font License 1.1. See
  `src/fonts/OFL.txt`.
- Employer logos are trademarks of their respective owners and are used only to identify Ali's work
  history. Sources are listed in `public/logos/SOURCES.md`.
- Site content and code © Ali Bonagdaran.
