# Agent playbook

## Design guide

Use [andrewqu.com](https://www.andrewqu.com/) as the guide and match its minimal layout as far as
Ali's content allows. Open the live site and compare it with the saved captures in
`specs/reference/`. Keep its spacing, single column, pixel-font name, and muted grays. The name
is static.

The reference is for design only. Do not copy its personal content, identity, links, employers,
logos, project copy, or assets. Use only Ali Bonagdaran's data from `src/data/` and `public/`.

## Read before touching the site

1. `specs/README.md`: the rules for the page.
2. `specs/01-visual-spec.md`: geometry and type.
3. `specs/02-motion-spec.md`: theme switch, hover, focus, reduced motion.
4. `specs/03-content-spec.md`: what the page may show.
5. `specs/04-implementation-spec.md`: stack and file map.
6. `specs/05-acceptance-criteria.md`: checks for done.

Also read the "Writing and copy" section of `AGENTS.md`.

If a request conflicts with these specs, point out the conflict. Do not pick a side without saying so.

## Layout rules

- Keep the page to header, four links, `Experiences`, five rows. Nothing else.
- Never add a projects section, bio, footer, navigation, contact block, cards, borders, avatars, or
  extra links. These are product requirements, not style choices.
- Keep the 672px column, 96px top padding, 48px header, 20px label, and 48px rows.
- Keep the name a plain static `h1`. Keep the 300ms color transitions.
- The page has no prose. Show names, labels, and dates only. Write dates as `2026 - Present`.
- Never use em dashes.
- Delete decoration before adding any. The reference works because of alignment and whitespace.
- Use Ali's real content and employer marks only. Read `public/logos/SOURCES.md` before changing a
  logo.
- Do not replace real content with lorem ipsum, invented companies, or the reference's text.

## Common change recipes

### Update Ali's identity or links

Edit `src/data/profile.ts`. Keep exactly the four labels `LinkedIn`, `GitHub`, `Resume`, `Contact` in that
order unless the user asks for a structural change. `Contact` is a same-tab `mailto:` link. Do not
print the email address as page text. Update `specs/03-content-spec.md` if a destination or label
changes. The site URL (`https://www.alib.au`) is also in this file. The sitemap, metadata, and
JSON-LD read it from here.

### Add, remove, or edit an experience

Edit `src/data/experiences.ts`.

- Keep the list newest first.
- Keep full `startDate` and `endDate`, and make `period` with `formatPeriod` (`2026 - Present`).
- Set `shortCompany` for any company label too long to sit beside a mobile date. Test at 390px and
  320px.
- Add a `LogoKind` and a `CompanyLogo` branch only for a real new employer; put the SVG in
  `public/logos/` and document its source.
- Do not render highlights or skills. They are data only.

### Change the name treatment

Edit the `h1` in `src/app/page.tsx` and `specs/01-visual-spec.md` together. Required behavior:

- Plain server-rendered `h1`, Geist Pixel Square, weight 500, static and selectable.
- No animation, no extra layers, no `aria-label`.
- No layout shift. The header stays 48px and the name does not wrap at 320px.

### Change the 404 page, sitemap, or metadata

The 404 page is `src/app/not-found.tsx`, the sitemap is `src/app/sitemap.ts`, and the metadata and
JSON-LD are in `src/app/layout.tsx`. Keep the 404 page in the same style as the main page, with a
short message and a link home. Update `specs/04-implementation-spec.md` if routes change.

### Tweak spacing or typography

Edit the Tailwind classes and the matching visual spec. Then check all four viewports in both
themes. A desktop change is not done if it moves the mobile header or adds horizontal scrolling.

### Change theme behavior

Keep `next-themes` class strategy, system default, and the `theme` storage key. The toggle must
switch to the opposite of the resolved theme and show a moon in light mode and sun in dark mode.

### Update dependencies

Do not upgrade Next, React, Tailwind, or next-themes without a reason. The layout was
checked against the pinned versions in `package.json`. If you must upgrade, run the full check and
re-measure at 1440, 768, 390, and 320 in light and dark before committing.

## Checks

Run the site:

```bash
corepack pnpm dev
```

Capture or inspect at:

- 1440 × 1000, light and dark
- 768 × 1000, light and dark
- 390 × 1000, light and dark
- 320 × 1000, light and dark

Check:

- Vertical positions from `specs/01-visual-spec.md`.
- `document.documentElement.scrollWidth === innerWidth` at every viewport.
- Header is 48px; name does not wrap.
- Rows are 48px at 390 and 1440.
- Dates share one column on mobile and one right edge on desktop.
- The theme toggle flips the resolved theme and the choice persists.
- Nothing moves on load or hover. The name is selectable text.
- Reduced motion is static.
- The 404 page (for example `/missing`) is styled.
- The console has no hydration or accessibility warnings.

Then run:

```bash
corepack pnpm check
```

This runs Biome, TypeScript, and a production static export. The CI workflow
(`.github/workflows/ci.yml`) runs the same command on pull requests and pushes to `main`. Do not report success if any step was skipped.

## Visual comparison

Open the reference screenshots next to fresh captures. The content differs, so compare geometry,
not pixels:

- Column and padding
- Header height and name size
- Vertical gaps between blocks
- Row pitch and icon size
- Type scale, weight, and muted color hierarchy
- Date position
- Light/dark surfaces

Take your screenshot after the fonts load.

## Guardrails

- Do not copy the reference's name, biography, link URLs, employer names, dates, logos, emoji, or
  project copy into any served file.
- Do not add sections because "a portfolio should have them."
- Do not vertically center the page or add a footer to fill empty space.
- Do not add hover backgrounds, borders, or shadows to experience rows.
- Do not add a UI component library, icon package, or animation library. The inline SVGs and
  employer SVGs are enough.
- Do not replace the pixel name with a standard sans-serif.
- Do not add prose to the page. Write dates with a spaced hyphen, never an em dash.
- Do not remove the mobile short company labels without retesting every row at 320px.
- Do not commit generated output (`out/`, `.next/`, `node_modules/`).
- Do not push or deploy unless the user asks. Pushing to `main` deploys the site through Cloudflare
  Workers Builds.

## Definition of done

A change is done when:

1. The visible page still has only Ali's allowed content, with no prose and no em dashes.
2. The structure and geometry match the visual spec at 1440, 768, 390, and 320.
3. Both themes work, and nothing moves except the theme switch and hover colors.
4. The links, resume, logos, favicon, OG image, robots file, sitemap, and 404 page work.
5. `corepack pnpm check` passes.
6. `specs/` and the agent instruction files are updated if behavior or content changed.
