# Acceptance criteria

A change is done only when every item below that applies passes. Measurements are in CSS pixels at
device scale factor 1. Reference values come from the captures in `specs/reference/`.

## 1. Structure

- [ ] The page has exactly one `h1`: `Ali Bonagdaran`.
- [ ] The page has exactly one `h2`: `Experiences`.
- [ ] The page has exactly five experience `h3` elements.
- [ ] There are exactly four links in the link row, in this order: `LinkedIn`, `GitHub`, `Resume`,
      `Contact`.
- [ ] The page has no `nav`, `footer`, project section, about section, skills section, education
      section, achievements section, or contact section.
- [ ] The page ends after the fifth experience row. No footer, copyright, or spacer content follows.
- [ ] The only images are the four employer logos. No avatar or decorative images.
- [ ] The page has no prose. The visible text is the name, link labels, the `Experiences` label,
      company names, roles, and dates.
- [ ] There is no project-related text or link anywhere in `src/` or the rendered page.

## 2. Desktop geometry (1440 × 1000)

- [ ] `main` is 672px wide at `x=384`.
- [ ] Content starts at `x=416` and is 608px wide.
- [ ] Header is at `y=96`, 48px tall.
- [ ] Name is `48px / 48px`, weight 500, 337.06px wide, at `x=416, y=96`.
- [ ] Link row is at `y=208`. All four links are 20px tall at `y=208`: `LinkedIn` at `x=416`
      (56.9 wide), `GitHub` at `x=488.9` (45.97 wide), `Resume` at `x=550.87` (54.09 wide), and
      `Contact` at `x=620.95` (53.8 wide).
- [ ] `Experiences` label is at `y=308`, 20px tall, with 24px bottom margin.
- [ ] Experience rows start at `y=352, 424, 496, 568, 640`.
- [ ] Each row is 48px tall with a 48px logo slot and a 16px gap to the text block.
- [ ] Text block starts at `x=480`.
- [ ] Desktop date is vertically centered against the company and role block and right-aligned.
- [ ] Dates read `2026 to Present`, `2025 to 2026`, `2024 to 2025`, `2023 to 2024`, and
      `2019 to 2023`, with no dashes.
- [ ] Full company names are shown at this width.
- [ ] There is no horizontal scrolling (`scrollWidth === 1440`).

## 3. Mobile geometry (390 × 1000)

- [ ] `main` padding is 24px, so content is 342px wide at `x=24`.
- [ ] Header is at `y=96`, 48px tall.
- [ ] Name is 35.88px / 35.88px, about 251.95px wide, and does not wrap.
- [ ] Link row is at `y=208`, and all four links fit on one line.
- [ ] `Experiences` label is at `y=308`.
- [ ] Rows start at `y=352, 424, 496, 568, 640` and are all 48px tall.
- [ ] Logo slot is 48px, text block starts at `x=88` and is 278px wide.
- [ ] Company labels are `ABS`, `ABS`, `CommBank`, `Service NSW`, `McDonald's`.
- [ ] Each mobile date is on the company line, right-aligned, and vertically centered.
- [ ] Roles use the full 278px text width and do not wrap for this content set.
- [ ] There is no horizontal scrolling (`scrollWidth === 390`).

## 4. Narrow mobile (320 × 1000)

- [ ] Content is 272px wide at `x=24`.
- [ ] Name is 29.44px / 29.44px, 206.73px wide, and does not wrap.
- [ ] The four links stay on one line, from `x=24` to `x=282.75`. The row ends at `x=296` at most.
      `flex-wrap` is only a safety net.
- [ ] Header remains 48px tall.
- [ ] Rows start at `y=352, 424, 496, 568, 660`.
- [ ] Rows 1 to 3 and 5 are 48px tall; Service NSW is 68px because its role wraps to two lines.
- [ ] Dates remain right-aligned and never overlap company text.
- [ ] No text is clipped or hidden.
- [ ] There is no horizontal scrolling (`scrollWidth === 320`).

## 5. Tablet (768 × 1000)

- [ ] Full company names are visible.
- [ ] Dates are in the desktop right column.
- [ ] Content remains inside the centered 672px column with 32px padding.
- [ ] No horizontal scrolling.
- [ ] The name is 337.06px wide at 768px.
- [ ] No element from the mobile short-name layout is visible.

## 6. Color and theme

- [ ] Light theme: body background is `#ffffff`, primary text is `#101828`.
- [ ] Dark theme: body background is `#000000`, primary text is `#f3f4f6`.
- [ ] Role text is `#4a5565` light and `#99a1af` dark.
- [ ] Dates and the section label are `#6a7282` in both themes.
- [ ] The toggle shows a moon in light mode and a sun in dark mode.
- [ ] Clicking the toggle switches the resolved theme to the opposite theme.
- [ ] The selection persists across reloads under the `theme` storage key.
- [ ] With no saved selection, the theme follows the OS preference.
- [ ] Background/text/color transitions are 300ms and do not flash on load.
- [ ] No other element changes color on hover except links and the theme button.
- [ ] With `prefers-reduced-motion: reduce`, transitions are effectively off and nothing depends on
      motion.

## 7. Name

- [ ] The name is static, selectable text.
- [ ] Nothing moves on load or hover.
- [ ] The name is a plain `h1` with no `aria-label` and no extra layers.
- [ ] There is no hydration mismatch warning in the console.

## 8. Links and assets

- [ ] `LinkedIn` → `https://www.linkedin.com/in/alibonagdaran/`, new tab.
- [ ] `GitHub` → `https://github.com/PrinceAlii`, new tab.
- [ ] `Resume` → `/resume.pdf`, new tab.
- [ ] `Contact` → `mailto:alibonagdaran@gmail.com`, same tab, with no `target` and no `rel`.
- [ ] `LinkedIn`, `GitHub`, and `Resume` include `rel="noopener noreferrer"`.
- [ ] All four links share the same plain text style: 14px/20px, weight 600, no pill, no button
      chrome, no icons.
- [ ] The email address does not appear as visible page text.
- [ ] JSON-LD `sameAs` lists only the LinkedIn and GitHub `https` links.
- [ ] `/resume.pdf` returns 200 and opens the correct PDF.
- [ ] `/og.png` returns 200 and is 1200 × 630. Its footer reads `alib.au`.
- [ ] `/favicon.svg`, `/robots.txt`, and all four `/logos/*.svg` return 200.
- [ ] ABS mark is legible in both themes.
- [ ] Grayscale employer marks are legible in both themes.

## 9. Accessibility

- [ ] Tab order follows the page from top to bottom: theme toggle, LinkedIn, GitHub, Resume, Contact.
- [ ] Focus-visible outline is visible on all interactive elements.
- [ ] The name is exposed by its own text, with no `aria-label`.
- [ ] The section is labelled by the `Experiences` heading.
- [ ] Logos have empty alt text.
- [ ] The theme button has `aria-label="Toggle theme"`.
- [ ] There are no duplicate accessible company names caused by the short/full label switch.
- [ ] Text contrast meets WCAG AA.
- [ ] The page remains readable and navigable with JavaScript disabled.

## 10. SEO

- [ ] Document title is `Ali Bonagdaran`.
- [ ] Meta description matches `profile.description`.
- [ ] Canonical URL is `https://www.alib.au/`.
- [ ] `og:url` is `https://www.alib.au`.
- [ ] A JSON-LD `Person` script is present in the HTML and is not visible on the page.
- [ ] `/sitemap.xml` returns 200 and lists `https://www.alib.au/`.
- [ ] `robots.txt` contains `Sitemap: https://www.alib.au/sitemap.xml`.
- [ ] `og:title`, `og:description`, `og:image`, and `twitter:card` are present.
- [ ] `theme-color` is white for light and black for dark.
- [ ] `robots.txt` allows crawling.

## 11. Content boundary

- [ ] The rendered page contains only Ali's visible copy from the content spec.
- [ ] No Andrew Qu name, biography, employer, project, link, or logo appears in `src/`, `public/`,
      or rendered HTML. (Reference files under `specs/reference/` and the neutral design-reference
      credit in the README/specs are exempt design evidence.)

Suggested check:

```bash
rg -n --glob '!fonts/**' 'Andrew Qu|andrewqu|Chief of Software|Nooks|quuu' src public
```

Expected: no matches.

- [ ] The page has no projects section and no link labelled "Projects".
- [ ] Education, skills, achievements, and highlights remain data-only.

## 12. Build and deployment

- [ ] `corepack pnpm check` passes.
- [ ] `corepack pnpm build` succeeds.
- [ ] Build output has three routes: `/`, `/_not-found`, and `/sitemap.xml`.
- [ ] `out/index.html`, `out/404.html`, `out/sitemap.xml`, `out/resume.pdf`, `out/og.png`,
      `out/robots.txt`, `out/_headers`, and `out/_next/` exist.
- [ ] `out/index.html` includes the metadata and does not include reference content.
- [ ] `wrangler.jsonc` has `name: "website"`, assets directory `./out`, `not_found_handling:
      "404-page"`, and a custom domain route for `www.alib.au`.
- [ ] `wrangler` is a pinned devDependency. `.node-version` is 24 and `packageManager` is pnpm
      11.3.0.
- [ ] Cloudflare Workers Builds deploys from the GitHub repo `PrinceAlii/Website`, branch `main`,
      with `pnpm run build` and `npx wrangler deploy`. Other branches get automatic previews.
- [ ] `public/_headers` sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and
      `Permissions-Policy`, and long immutable caching for `/_next/static/*`. It has no CSP.
- [ ] `.github/workflows/ci.yml` runs `pnpm check` on pull requests and pushes to `main` and does
      not deploy. `.github/workflows/deploy.yml` does not exist.
- [ ] The apex `alib.au` redirects to `https://www.alib.au`.
- [ ] No `basePath` or `assetPrefix` is configured.
- [ ] The build works from a clean install with `pnpm install --frozen-lockfile`.

## 13. 404 page

- [ ] An unknown URL shows the styled 404 page, not the default Next.js one.
- [ ] It uses the same column, padding, fonts, and colors as the main page, in both themes.
- [ ] It has a short message and a link back to `/`, and nothing else.
- [ ] It has no header, theme toggle, images, or animation.
- [ ] It has no horizontal scrolling at 320, 390, 768, and 1440.

## 14. Writing

- [ ] No em dash character or its HTML entity in the page, metadata, docs, comments, or specs. Run:

```bash
rg -n '\x{2014}|&m[d]ash;' README.md AGENTS.md CLAUDE.md GEMINI.md .github specs public src --glob '!specs/reference/**'
```

Expected: no matches.

- [ ] Copy passes the prompt-shaped copy test in `AGENTS.md`.

## 15. Visual review

Compare these files side by side with fresh screenshots of the implementation:

| Viewport | Reference |
| --- | --- |
| 1440px light | `specs/reference/andrew-desktop-1440-light.png` |
| 1440px dark | `specs/reference/andrew-desktop-1440-dark.png` |
| 390px light | `specs/reference/andrew-mobile-390-light.png` |
| 390px dark | `specs/reference/andrew-mobile-390-dark.png` |

Check vertical spacing, column width, type hierarchy, date alignment, icon size, and theme colors.
The content differs from the reference: Ali's name is longer, and there are five experiences instead
of four. Those differences must not change the layout.
