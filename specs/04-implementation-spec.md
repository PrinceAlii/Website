# Implementation specification

## 1. Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js `16.4.6`, App Router |
| UI runtime | React `19.3.1`, React DOM `19.3.1` |
| Language | TypeScript `6.0.3`, strict mode |
| Styling | Tailwind CSS `4.3.5` via `@tailwindcss/postcss` |
| Motion | `motion` `14.14.0` (import from `motion/react`) |
| Themes | `next-themes` `0.4.6` |
| Linting/formatting | Biome `2.4.15` |
| Package manager | pnpm `11.3.0` via Corepack |
| Node | `>= 24` |

The site is a static export. It has no server, API route, database, or client-side router beyond
what Next generates.

```ts
// next.config.ts
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
```

Files in `public/` are served as they are. Build output goes to `out/`.

## 2. Repository map

```
.
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/ci.yml
├── public/
│   ├── _headers          # security headers, immutable caching for /_next/static/*
│   ├── favicon.svg
│   ├── og.png
│   ├── resume.pdf
│   ├── robots.txt        # allows all, links to the sitemap
│   └── logos/{abs,commbank,service-nsw,mcdonalds}.svg + SOURCES.md
├── specs/                    # this contract, reference captures, measurements
├── src/
│   ├── app/
│   │   ├── layout.tsx        # fonts, metadata, JSON-LD Person data, ThemeProvider
│   │   ├── page.tsx          # the entire page
│   │   ├── not-found.tsx     # styled 404 page
│   │   ├── sitemap.ts        # sitemap.xml (force-static)
│   │   └── globals.css       # Tailwind v4 theme, dark variant, transitions
│   ├── components/
│   │   ├── animated-name.tsx # client component, name flip wave
│   │   ├── company-logo.tsx  # employer mark mapping
│   │   ├── experience-item.tsx
│   │   ├── profile-links.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx  # client component
│   ├── data/
│   │   ├── achievements.ts   # data only
│   │   ├── education.ts      # data only
│   │   ├── experiences.ts    # five rendered experiences
│   │   ├── profile.ts        # name, description, links, site URL
│   │   └── skills.ts         # data only
│   └── fonts/                # Geist Sans/Mono/Pixel Square + OFL license
├── .node-version             # Node 24
├── AGENTS.md                 # main agent instructions
├── CLAUDE.md
├── GEMINI.md
├── README.md
├── biome.json
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── wrangler.jsonc            # Cloudflare Workers config
```

## 3. Rendering model

`src/app/page.tsx` is a server component:

```tsx
<main className="mx-auto min-h-screen max-w-2xl px-6 py-24 sm:px-8">
  <header className="mb-16 flex h-12 items-center justify-between">
    <AnimatedName name={profile.name} />
    <ThemeToggle />
  </header>

  <section aria-label="Links" className="mb-20">
    <ProfileLinks links={profile.links} />
  </section>

  <section aria-labelledby="experiences-heading">
    <h2 id="experiences-heading" ...>Experiences</h2>
    <ul className="space-y-6">
      {experiences.map((experience) => <ExperienceItem ... />)}
    </ul>
  </section>
</main>
```

Only `AnimatedName` and `ThemeToggle` are client components. Keep the rest server-rendered. Do not
make the page a client component to add interactions.

## 4. Data contracts

```ts
type ProfileLink = { label: string; href: string; newTab: boolean };

type Profile = {
  name: string;
  firstName: string;
  role: string;
  company: string;
  location: string;
  email: string;
  siteUrl: string;    // https://www.alib.au
  description: string;
  links: readonly ProfileLink[];
};

type Experience = {
  company: string;
  shortCompany?: string;
  legalName?: string;
  role: string;
  location: string;
  startDate: string;  // ISO year-month
  endDate: string | "Present";
  period: string;     // made by formatPeriod, e.g. "2026 to Present"
  logo: "abs" | "commbank" | "service-nsw" | "mcdonalds";
  highlights: readonly string[];
  skills: readonly string[];
};
```

Rules:

- Derive `period` from the full dates with `formatPeriod`. Do not write a year range in a
  component. The format is `2026 to Present` or `2025 to 2026`, with no dashes.
- Keep the five experiences newest first.
- Add an experience by editing `src/data/experiences.ts` and adding a logo mapping only if a new
  employer appears. Do not add a projects array.
- `profile.links` must contain exactly three entries until the product requirement changes.
- The data files hold more than the page shows (education, skills, achievements, highlights). Do
  not render them without an explicit design change.

## 5. Typography and CSS

Fonts are vendored from `vercel/geist-font` and loaded with `next/font/local`:

| Variable | File | Use |
| --- | --- | --- |
| `--font-geist-sans` | `Geist-Variable.woff2` | Body, links, labels, experiences |
| `--font-geist-mono` | `GeistMono-Variable.woff2` | Loaded, not currently visible |
| `--font-geist-pixel-square` | `GeistPixel-Square.woff2` | Name only, weight 500 |

`globals.css`:

- Imports Tailwind v4 with `@import "tailwindcss";`.
- Declares `@custom-variant dark (&:where(.dark, .dark *));`.
- Overrides the gray palette in `@theme` to the exact values in the visual spec.
- Maps font variables in `@theme inline`.
- Uses `background-color` and `color` transitions at 300ms.
- Provides `.grid-stack` for the two name layers.
- Turns off animation and transition timing under `prefers-reduced-motion`.
- Provides focus-visible outlines.

Biome is set up for tabs, double quotes, 100-column lines, Tailwind CSS directives, and the CSS
specificity exceptions the theme selectors need. Do not reformat the project with other tools.

## 6. Theme handling

`theme-provider.tsx` wraps the app:

```tsx
<NextThemesProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  storageKey="theme"
>
```

`theme-toggle.tsx`:

- Reads `resolvedTheme`.
- Reads the `dark` class as a fallback for the first paint, before hydration.
- Switches to the opposite of the resolved theme.
- Shows a moon in light mode and sun in dark mode.
- Uses accessible button semantics.

Do not use `localStorage` directly, add a theme flash, or default to a fixed theme.

## 7. Accessibility requirements

- One `h1` (the name), one `h2` (`Experiences`), one `h3` per experience.
- The experience list is a real `ul`/`li` list.
- The section is labelled by its `h2` via `aria-labelledby`.
- Animated name layers are `aria-hidden`; `aria-label` on the `h1` provides the accessible name.
- CSS hides the short mobile company label on desktop and the full label on mobile, so only one
  is exposed at a time.
- Company logos use empty alt text because the company name sits next to them.
- External links use descriptive visible text, `target="_blank"`, and `rel="noopener noreferrer"`.
- Focus-visible outlines are never removed.
- Text contrast meets WCAG AA at the specified grays.
- The page works with JavaScript disabled. Content, links, and default themes still render. Only the
  name animation and the toggle need JavaScript.

## 8. SEO and metadata

- Site URL: `https://www.alib.au` (`siteUrl` in `src/data/profile.ts`)
- `metadataBase`: `https://www.alib.au`
- Title: `Ali Bonagdaran`
- Description: from `profile.description`
- Canonical: `/` (resolves to `https://www.alib.au/`)
- Open Graph: title, description, URL, site name, `en_AU`, `/og.png` (1200 × 630)
- Twitter: `summary_large_image`, same image
- Icons: `/favicon.svg`
- Robots: index and follow. `public/robots.txt` allows all and has the line
  `Sitemap: https://www.alib.au/sitemap.xml`
- Sitemap: `src/app/sitemap.ts`, `force-static` (required by `output: "export"`), lists
  `https://www.alib.au/`
- JSON-LD: a `Person` script in `src/app/layout.tsx` with `name`, `url`, `jobTitle`, `worksFor`, and
  `sameAs`, built from `src/data/profile.ts`. `<` is escaped in the output. The script is not
  visible on the page.
- `themeColor`: white in light, black in dark
- `colorScheme`: `light dark`

Do not add metadata that mentions the reference site or its author.

## 8a. 404 page

`src/app/not-found.tsx` is a server component. It uses the same `max-w-2xl` column, padding, fonts,
and gray tokens as the main page, in both themes. It has a short message and a link to `/`. No
header, toggle, images, or animation. It builds to `/_not-found`.

## 9. Build and scripts

```bash
corepack pnpm install       # first run / lockfile changes
corepack pnpm dev           # local development
corepack pnpm lint          # Biome check
corepack pnpm typecheck     # tsc --noEmit
corepack pnpm build         # static export to out/
corepack pnpm check         # lint, typecheck, build
```

If Corepack is unavailable, use pnpm 11.3.0 directly. Do not switch to npm or yarn and commit a
second lockfile.

Expected build routes:

```
Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /sitemap.xml
```

All three are static. After a build, these must exist: `out/index.html`, `out/404.html`,
`out/sitemap.xml`, `out/resume.pdf`, `out/og.png`, `out/robots.txt`, `out/_headers`, and
`out/_next/`.

## 10. Deployment

The site is served at `https://www.alib.au`. The apex `alib.au` redirects to it. Canonical, `og:url`,
the sitemap, and JSON-LD use `https://www.alib.au`.

Hosting is Cloudflare Workers static assets. Cloudflare Workers Builds deploys the Worker named
`website` from the GitHub repo `PrinceAlii/Website`, branch `main`:

1. Cloudflare checks out `main`.
2. It uses Node 24 (`.node-version`) and pnpm 11.3.0 (the `packageManager` field in `package.json`).
3. It runs `pnpm run build`, which writes the static export to `out/`.
4. It runs `npx wrangler deploy`.

`wrangler` is a pinned devDependency. Preview builds for non-main branches are created by Cloudflare
automatically.

`wrangler.jsonc` at the repo root:

- `name: "website"`
- assets directory `./out`
- `not_found_handling: "404-page"`
- a custom domain route for `www.alib.au`

The site is served from the domain root, so no `basePath` or `assetPrefix` is needed.

`public/_headers` sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and
`Permissions-Policy`, and long immutable caching for `/_next/static/*`. There is no CSP on purpose,
because Next and next-themes inject inline scripts.

GitHub Actions `.github/workflows/ci.yml` runs on pull requests and pushes to `main`. It runs
`pnpm check` (lint, typecheck, and build). It does not deploy. The previous domain was
`alibo.dev`, which is no longer the site.
