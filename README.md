# alib.au

Ali Bonagdaran's personal website, served at `https://www.alib.au`. It is a single static page built
with Next.js 16 (App Router, static export), React 19, Tailwind CSS 4, and next-themes.

## Local development

Requires Node 24+ and pnpm 11.3.0 through Corepack.

```bash
corepack pnpm install
corepack pnpm dev         # http://localhost:3000
corepack pnpm build       # static export to out/
corepack pnpm lint        # Biome
corepack pnpm typecheck   # TypeScript
corepack pnpm check       # lint, typecheck, and build
```

## Editing content

| What | Where |
| --- | --- |
| Name, description, email, links, site URL | `src/data/profile.ts` |
| Experiences | `src/data/experiences.ts` |
| Education, skills, achievements (not rendered) | `src/data/education.ts`, `skills.ts`, `achievements.ts` |
| Resume | `public/resume.pdf` |
| Employer logos | `public/logos/` |
| Open Graph image | `public/og.png` |

The design and content rules are in `specs/SPEC.md`, with checks in `specs/ACCEPTANCE.md`. Coding
agents read `AGENTS.md`.

## Deployment

Pushing to `main` deploys. There is no local deploy step.

- Hosting is Cloudflare Workers static assets. Cloudflare Workers Builds deploys the Worker `website`
  from the GitHub repo `PrinceAlii/Website`, branch `main`, running `pnpm run build` then
  `npx wrangler deploy`. It uses Node 24 from `.node-version` and pnpm from the `packageManager`
  field. `wrangler` is a pinned devDependency. Other branches get preview builds automatically.
- `wrangler.jsonc`: `name: "website"`, Worker script `worker/index.ts`, assets directory `./out`
  bound as `ASSETS`, `not_found_handling: "404-page"`, `run_worker_first: ["/"]`, and a custom
  domain route for `www.alib.au`. The apex `alib.au` redirects to `https://www.alib.au`.
  The site is served from the domain root, so there is no `basePath` or `assetPrefix`.
- `public/_headers` sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and
  `Permissions-Policy`, plus long immutable caching for `/_next/static/*`. There is no CSP on purpose,
  because Next and next-themes inject inline scripts.
- Markdown for Agents without a paid plan: the Worker runs only for `/`. With
  `Accept: text/markdown` it returns `out/index.md` as `text/markdown` with `Vary: Accept` and an
  estimated `x-markdown-tokens` count. Everything else is HTML from static assets. Test locally with
  `corepack pnpm build`, then `corepack pnpm exec wrangler dev` and
  `curl -H "Accept: text/markdown" localhost:8787/`.
- GitHub Actions (`.github/workflows/ci.yml`) runs `pnpm check` on pull requests and pushes to `main`.
  It does not deploy.

## Credits

- Design inspired by [andrewqu.com](https://www.andrewqu.com/). Reference captures in
  `specs/reference/` are for design review only and are not deployed.
- Geist fonts by Vercel, under the SIL Open Font License 1.1 (`src/fonts/OFL.txt`).
- The 404 numeral uses a subset of Source Serif 4 by Adobe, under the SIL Open Font License 1.1
  (`src/fonts/OFL-SourceSerif.md`).
- Employer logos are trademarks of their owners, used only to identify Ali's work history. Sources
  are listed in `specs/SPEC.md`.
- Site content and code © Ali Bonagdaran.
