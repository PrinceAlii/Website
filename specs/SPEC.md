# Site specification

Design, content, and implementation contract for `https://www.alib.au`. The hard rules are in
`AGENTS.md`. The checks for done are in `ACCEPTANCE.md`. All measurements are CSS pixels at device
scale 1.

## 1. Reference captures

Captured from [andrewqu.com](https://www.andrewqu.com/) on 16 November 2026 with Chromium via
Playwright on Windows. The files in `specs/reference/` contain Andrew Qu's personal content. They are
design evidence only and are not deployed.

| File | Viewport | Theme |
| --- | --- | --- |
| `andrew-desktop-1440-light.png` | 1440 × 1000 | light |
| `andrew-desktop-1440-dark.png` | 1440 × 1000 | dark |
| `andrew-mobile-390-light.png` | 390 × 1000 | light |
| `andrew-mobile-390-dark.png` | 390 × 1000 | dark |

`reference/measurements/*.json` holds the raw browser measurements for each capture: bounding boxes,
computed fonts, colors, spacing, and flex properties for the header, name, toggle, links, heading, and
each experience row. The reference name animation was stubbed out so the captures show the rest
state. Captures are 1000px tall because of `min-h-screen`.

Deliberate differences from the reference:

- Ali's longer name uses a phone clamp (section 3) and phones use short company labels (section 5).
  The reference uses a fixed 48px name.
- The reference always shows a moon icon. This site shows a sun in dark mode.
- The reference name flip animation is not used. The name is static.
- Ali has five experiences instead of four. This must not change the layout.

## 2. Layout

```
96px top padding
Ali Bonagdaran                          moon/sun    header, 48px
64px
LinkedIn  GitHub  Resume  Contact                   link row, 20px
80px
EXPERIENCES                                         label, 20px
24px
[logo]  Company                   2026 - Present    row, 48px
        Role
24px
... four more rows, then the page ends
```

- Centered `main`, `max-width: 672px` (`max-w-2xl`), padding `96px 32px` at `sm` (640px) and up,
  `96px 24px` below.
- Do not vertically center the page or add filler. The page is much shorter than the viewport.
- No tablet or mobile navigation, hamburger, or layout switcher.

1440px viewport (`main` at `x=384`, content `x=416`, 608px wide):

| Element | x | y | width | height |
| --- | ---: | ---: | ---: | ---: |
| Header | 416 | 96 | 608 | 48 |
| Name | 416 | 96 | 337.06 | 48 |
| Link row | 416 | 208 | 608 | 20 |
| `EXPERIENCES` | 416 | 308 | 608 | 20 |
| Rows 1 to 5 | 416 | 352, 424, 496, 568, 640 | 608 | 48 |
| Text block | 480 | row top | - | - |

| Link | x | width |
| --- | ---: | ---: |
| LinkedIn | 416 | 56.9 |
| GitHub | 488.9 | 45.97 |
| Resume | 550.87 | 54.09 |
| Contact | 620.95 | 53.8 |

768px: same as desktop inside the 672px column. Name 48px, 337.06px wide.

390px viewport (content `x=24`, 342px wide):

| Element | x | y | width | height |
| --- | ---: | ---: | ---: | ---: |
| Header | 24 | 96 | 342 | 48 |
| Name | 24 | 102.06 | 251.95 | 35.88 |
| Link row | 24 | 208 | 342 | 20 |
| `EXPERIENCES` | 24 | 308 | 342 | 20 |
| Rows 1 to 5 | 24 | 352, 424, 496, 568, 640 | 342 | 48 |
| Logo slot | 24 | row top + 2 | 48 | 44 |
| Text block | 88 | row top | 278 | - |
| Date (row 1) | 262.05 | 354 | 103.95 | 20 |

320px viewport (content `x=24`, 272px wide):

| Element | x | y | width | height |
| --- | ---: | ---: | ---: | ---: |
| Header | 24 | 96 | 272 | 48 |
| Name | 24 | 105.28 | 206.73 | 29.44 |
| Link row | 24 to 282.75 | 208 | - | 20 |
| Rows 1 to 3 | 24 | 352, 424, 496 | 272 | 48 |
| Row 4 (Service NSW, role wraps) | 24 | 568 | 272 | 68 |
| Row 5 | 24 | 660 | 272 | 48 |
| Text block | 88 | row top | 208 | - |

`document.documentElement.scrollWidth` equals the viewport width at 320, 390, 768, and 1440.

## 3. Header

- Flex, `align-items: center`, `justify-content: space-between`, height 48px (`h-12`), margin-bottom
  64px (`mb-16`). It stays 48px at every width.
- Name: Geist Pixel Square, weight 500, `line-height: 1`, `tracking-tight` (-0.025em, -1.2px at
  48px), font size `clamp(1.75rem, 9.2vw, 3rem)`. That gives 48px at 768 and up, 35.88px at 390, and
  29.44px at 320. It never wraps and never causes horizontal scroll. No `aria-label`, no extra layers,
  no hover state, default cursor.
- Theme toggle: one icon button, 8px padding, 20 × 20 icon (36px slot), vertically centered,
  `aria-label="Toggle theme"`, pointer cursor. Moon outline (`stroke-width: 1.5`) in light mode, sun
  outline in dark mode.

## 4. Links and label

- Link row: flex, `flex-wrap: wrap` as a safety net only, 16px gap, margin-bottom 80px (`mb-20`). All
  four links fit on one line at every supported width.
- Links: Geist Sans 14px/20px, weight 600, secondary text color, primary on hover. No separators,
  icons, arrows, underlines, pills, or button chrome.
- `Experiences` label: the only `h2`, rendered uppercase by CSS. Geist Sans 14px/20px, weight 500,
  `tracking-wider` (0.7px), muted color in both themes, margin-bottom 24px. The list uses
  `aria-labelledby` to point at it.

## 5. Experience rows

- `ul` with 24px gaps (`space-y-6`). Each `li` is flex, `align-items: flex-start`, 16px gap, 2px
  vertical padding so the 44px logo slot and the 44px text block share a center line.
- Logo slot: 48 × 44, `flex-shrink: 0`, contents centered.
- Company (`h3`): 16px/24px, weight 500, primary color.
- Role: 14px/20px, weight 400, secondary color.
- Date: 14px/20px, weight 400, muted color.
- No border, separator, card background, or hover surface.

At `sm` and up: full company names. The date is right-aligned in its own column
(`justify-content: space-between`), vertically centered against the two-line company and role block.

Below `sm`:

- Company and date share one line, date at the right with at least 8px gap, vertically centered on
  the company line (2px below its top). The role spans the full text width below.
- Company labels are `ABS`, `ABS`, `CommBank`, `Service NSW`, `McDonald's` (`shortCompany`, falling
  back to the full name). CSS shows only one of the two labels at a time, so screen readers get one
  name.
- Rows are 48px at 390. At 320 only the Service NSW row grows to 68px. Never force a fixed row height
  that clips a wrapped role.

## 6. Logos

| File | Source (retrieved 9 October 2026) | Treatment |
| --- | --- | --- |
| `public/logos/abs.svg` | Official inline SVG from https://www.abs.gov.au/ | White artwork on transparent. Used as a CSS mask, 36 × 32, filled with the primary text color. |
| `public/logos/commbank.svg` | https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg, unchanged | Grayscale, about 28px tall, `brightness-90` in light mode so both tones show. |
| `public/logos/service-nsw.svg` | https://www.service.nsw.gov.au/themes/snsw_theme/images/servicensw-logo.svg, circular symbol extracted without the wordmark | Grayscale, about 28px tall. |
| `public/logos/mcdonalds.svg` | https://commons.wikimedia.org/wiki/File:McDonald%27s_Golden_Arches.svg, unchanged | Grayscale, 28px tall, natural aspect ratio, `brightness-75` in light mode. |

Logos use `alt=""` because the company name sits next to them. They remain trademarks of their
owners, identify employers only, and do not imply endorsement.

## 7. Color, theme, and motion

| Token | Light | Dark |
| --- | --- | --- |
| Background | `#ffffff` | `#000000` |
| Primary text, focus outline, link and toggle hover | `#101828` | `#f3f4f6` |
| Secondary text (roles, links, toggle) | `#4a5565` | `#99a1af` |
| Muted text (dates, label) | `#6a7282` | `#6a7282` |

- The gray palette is overridden in the Tailwind `@theme` in `src/app/globals.css`. No gradients,
  glows, shadows, or accent colors.
- `next-themes` `ThemeProvider` in `src/app/layout.tsx`: `attribute="class"` (`.dark` on `<html>`),
  `storageKey="theme"`, and the library's system default. The OS preference applies until the visitor picks a theme. The toggle switches
  to the opposite of the resolved theme, reading the `dark` class before hydration. Do not use
  `localStorage` directly or default to a fixed theme.
- Background, text, link, and toggle colors transition over 300ms. That and the theme switch are the
  only motion. No name animation, load or scroll effects, route transitions, smooth scrolling, or
  animated backgrounds.
- Focus: `:focus-visible` shows a 2px outline with 4px offset in the primary text color. Never remove
  it.
- `prefers-reduced-motion: reduce` sets animations and transitions to 0.01ms. Nothing depends on
  motion.

## 8. Content

| Field | Value | Where it appears |
| --- | --- | --- |
| Name | Ali Bonagdaran | Header `h1`, title |
| Role | Graduate DevOps Engineer, Australian Bureau of Statistics | First row, JSON-LD |
| Location | Sydney, NSW | Data only |
| Email | `alibonagdaran@gmail.com` | Only the `Contact` href |
| Site URL | `https://www.alib.au` | Metadata, sitemap, JSON-LD |
| Description | Graduate DevOps Engineer at the Australian Bureau of Statistics. Sydney-based, focused on cloud platforms and developer tooling. | Meta description only |

| Label | Destination | Opens |
| --- | --- | --- |
| LinkedIn | `https://www.linkedin.com/in/alibonagdaran/` | New tab |
| GitHub | `https://github.com/PrinceAlii` | New tab |
| Resume | `/resume.pdf` | New tab |
| Contact | `mailto:alibonagdaran@gmail.com` | Same tab |

New-tab links use `target="_blank"` and `rel="noopener noreferrer"`. `Contact` has neither.

| # | Company | Phone label | Role | Dates | Display | Logo |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Australian Bureau of Statistics | ABS | Graduate DevOps Engineer | 2026-02 to Present | 2026 - Present | `abs` |
| 2 | Australian Bureau of Statistics | ABS | Cadet, DevOps | 2025-03 to 2026-02 | 2025 - 2026 | `abs` |
| 3 | Commonwealth Bank of Australia | CommBank | Business Banking Associate | 2024-11 to 2025-06 | 2024 - 2025 | `commbank` |
| 4 | Service NSW | Service NSW | Customer & Digital Service Representative | 2023-03 to 2024-11 | 2023 - 2024 | `service-nsw` |
| 5 | McDonald's | McDonald's | Crew Member | 2019-08 to 2023-03 | 2019 - 2023 | `mcdonalds` |

Each row shows company, role, and date only. Locations, highlights, and skills stay in the data.

Data that is not rendered:

- `src/data/education.ts`: UTS Bachelor of Information Technology, 2023 - 2025, WAM 82.58, GPA 6.21,
  Distinction, Enterprise Systems Development major, Networking and Cybersecurity sub-major.
- `src/data/skills.ts`: operating systems, languages, cloud and DevOps, containers, tooling, home lab.
- `src/data/achievements.ts`: 2nd in NSW IPT (2022 HSC) and an in-progress AWS certification.

The complete visible text of the main page is the name, the four link labels, `Experiences`, and the
five company labels, roles, and date ranges.

## 9. Metadata and assets

- `metadataBase` and site URL `https://www.alib.au`. Title `Ali Bonagdaran`. Description from
  `profile.description`. Canonical `/`. Locale `en_AU`.
- Open Graph: title, description, URL, site name, `/og.png` (1200 × 630, made from Ali's name and
  role, footer reads `alib.au`). Twitter card `summary_large_image` with the same image.
- Icon `/favicon.svg`, a custom "A" mark. `themeColor` white in light and black in dark.
  `colorScheme: light dark`.
- JSON-LD `Person` in `src/app/layout.tsx`: `name`, `url`, `jobTitle`, `worksFor`, and `sameAs` with
  only the LinkedIn and GitHub URLs. `<` is escaped. Not visible on the page.
- `src/app/sitemap.ts` is `force-static` (required by static export) and lists
  `https://www.alib.au/`. `public/robots.txt` allows all and contains
  `Sitemap: https://www.alib.au/sitemap.xml`.
- `public/resume.pdf` is Ali's real resume. Keep it current.
- No metadata may mention the reference site or its author.

Fonts are the Geist family from [vercel/geist-font](https://github.com/vercel/geist-font), vendored
unmodified in `src/fonts/` under the SIL Open Font License 1.1 (`OFL.txt`, `AUTHORS.txt`) and loaded
with `next/font/local`. Filenames are local aliases.

| File | Variable | Use |
| --- | --- | --- |
| `Geist-Variable.woff2` | `--font-geist-sans` | All text except the name |
| `GeistPixel-Square.woff2` | `--font-geist-pixel-square` | The name only, weight 500 |
| `Serif404-Semibold.woff2` | none (class on the `h1`) | The 404 numeral only |

`Serif404-Semibold.woff2` is Source Serif 4 Semibold (opsz 60) from Google Fonts, subset to the
glyphs `0` and `4` (1.4 KB). It stands in for Larish Neue Semibold, which is paid. Adobe reserves the
name "Source" under the SIL Open Font License, so the subset uses a different name. License:
`src/fonts/OFL-SourceSerif.md`. It is not preloaded, so only the 404 page downloads it. To add more
characters, download a new subset with `&text=` set to every character needed.

## 10. Accessibility

- One `h1`, one `h2`, one `h3` per experience. The experience list is a real `ul`.
- Tab order: theme toggle, `LinkedIn`, `GitHub`, `Resume`, `Contact`.
- Text contrast meets WCAG AA at the grays above.
- The page works without JavaScript. Only the theme toggle needs it.

## 11. 404 page

`src/app/not-found.tsx` is a server component using the same column, padding, and colors as the
main page, in both themes. From top to bottom:

- `404` as the `h1`, in `Serif404-Semibold` (section 9), `clamp(8rem, 42vw, 12rem)` (192px on
  desktop, about 134px at 320), `line-height: 1`, tight tracking, primary text color.
- 24px below: `I’m sorry, that page is in another castle!` in Geist 16px/24px, secondary color.
- 16px below: the `Back home` link to `/`, styled like the profile links.

No header, toggle, link row, images, or animation. It builds to `/_not-found` and is served as `out/404.html`.

## 12. Build output

The build has four static routes: `/`, `/_not-found`, `/sitemap.xml`, and `/index.md`. `next.config.ts` sets
`output: "export"`, `images: { unoptimized: true }`, and `trailingSlash: true`. After a build, `out/`
contains `index.html`, `index.md`, `404.html`, `sitemap.xml`, `resume.pdf`, `og.png`, `robots.txt`, `_headers`,
and `_next/`.
