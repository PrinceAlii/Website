# Specification index

These specs define the design, content, behavior, and checks for Ali Bonagdaran's personal website.

The visual target is [andrewqu.com](https://www.andrewqu.com/), a minimal single-column personal
page. This site matches its layout, spacing, typography, and themes, and uses Ali Bonagdaran's real
content and assets only. The name is static.

The reference site is a design guide, not a content source. Never copy Andrew Qu's name, biography,
links, employers, logos, project descriptions, or any other personal material. See
[`03-content-spec.md`](./03-content-spec.md) for the content boundary.

## Rules

1. One page with a header (name and theme toggle), a row of four links, an `Experiences` label, and
   the experience list. Nothing else.
2. No projects section. No project cards, project list, case studies, or project links.
3. No footer, navigation, biography, avatar, contact form, cards, borders, or decorative sections.
   The page ends after the final experience row.
4. Match the reference geometry: 672px content column, 96px top padding, 48px header, 48px
   experience rows, 24px gaps, and the vertical spacing in the visual spec.
5. Use only Ali's content. All identity, links, employers, roles, dates, logos, and resume data
   belong to Ali. Reference screenshots are for design review only.
6. Keep both themes. The name is static, selectable text. Nothing moves on load or hover.
7. The rendered page has no prose. It shows names, labels, and dates only. Dates read
   `2026 to Present`, with no dashes.
8. Run `corepack pnpm check` and the checks in
   [`05-acceptance-criteria.md`](./05-acceptance-criteria.md) before shipping.

## Documents

| File | Purpose |
| --- | --- |
| [`01-visual-spec.md`](./01-visual-spec.md) | Pixel-level layout, type, color, logo, and responsive rules. |
| [`02-motion-spec.md`](./02-motion-spec.md) | Theme switch, hover color transitions, focus, reduced motion. |
| [`03-content-spec.md`](./03-content-spec.md) | Ali's data, link mapping, page copy, and prohibited reference content. |
| [`04-implementation-spec.md`](./04-implementation-spec.md) | Stack, file map, data flow, accessibility, SEO, 404 page, sitemap, build, deployment. |
| [`05-acceptance-criteria.md`](./05-acceptance-criteria.md) | Testable definition of done at each viewport and in both themes. |
| [`06-agent-playbook.md`](./06-agent-playbook.md) | How agents should work on this repo. |
| [`reference/`](./reference/) | Saved reference screenshots and browser measurements. |

## Which source wins

1. The user's current request and the requirements in this repository.
2. `specs/` and the saved screenshots in `specs/reference/`.
3. The live reference site, for visual intent only.

The live reference may change. Do not adopt new sections, copy, or behavior from it. If it differs
from the saved captures, keep the documented structure and ask before adding anything.

## Quick orientation

- Framework: Next.js App Router, static export to `out/`.
- Entry page: `src/app/page.tsx`. 404 page: `src/app/not-found.tsx`. Sitemap: `src/app/sitemap.ts`.
- Site URL: `https://www.alib.au`.
- Content: `src/data/`.
- Styling: Tailwind CSS v4 in `src/app/globals.css`.
- Client components: `src/components/theme-toggle.tsx` and the `ThemeProvider` wrapper only.
- Themes: `next-themes` via `src/components/theme-provider.tsx`.
- Deployment: Cloudflare Workers static assets, deployed by Workers Builds from `main`. Config is in
  `wrangler.jsonc`. CI is `.github/workflows/ci.yml`.
- Reference capture: 16 November 2026, 1440px and 390px, light and dark.
