# Visual specification

Target: the desktop and mobile composition of [andrewqu.com](https://www.andrewqu.com/), reproduced
with Ali Bonagdaran's content. Reference screenshots and raw measurements are in `specs/reference/`.

## 1. Page model

```
┌──────────────────────────────────────────────┐
│  96px top padding                            │
│  ┌────────────────────────────────────────┐  │
│  │ Ali Bonagdaran                    ☾/☀  │  │  header, 48px tall
│  └────────────────────────────────────────┘  │
│  64px gap                                    │
│  LinkedIn  GitHub  Resume  Contact           │  link row
│  80px gap                                    │
│  EXPERIENCES                                 │  section label
│  24px gap                                    │
│  [logo]  Company             2026 - Present │  experience row, 48px
│          Role                                │
│  24px gap                                    │
│  ... four more rows ...                      │
│                                              │
│  page ends; no footer                        │
└──────────────────────────────────────────────┘
```

The column is centered, `max-width: 672px` (Tailwind `max-w-2xl`). Outer padding is `96px 32px`
at `sm` and above; `96px 24px` below `sm` (640px).

At 1440px wide:

| Element | x | y | width | height |
| --- | ---: | ---: | ---: | ---: |
| Page column (`main`) | 384 | 0 | 672 | full viewport |
| Content area (inside 32px padding) | 416 | - | 608 | - |
| Header | 416 | 96 | 608 | 48 |
| Name | 416 | 96 | 337.06 | 48 |
| Link row | 416 | 208 | 608 | 20 |
| `EXPERIENCES` label | 416 | 308 | 608 | 20 |
| Experience 1 row | 416 | 352 | 608 | 48 |
| Experience 2 row | 416 | 424 | 608 | 48 |
| Experience 3 row | 416 | 496 | 608 | 48 |
| Experience 4 row | 416 | 568 | 608 | 48 |
| Experience 5 row | 416 | 640 | 608 | 48 |

The 48px row pitch is `48px row height + 24px gap` (`space-y-6`). The page is much shorter
than the viewport. Do not vertically center it or add filler.

## 2. Header

- `display: flex; align-items: center; justify-content: space-between;`
- Fixed height `48px` (`h-12`), margin-bottom `64px` (`mb-16`).
- Name on the left, theme toggle on the right. No other header elements.

### Name

- Font: Geist Pixel Square, weight `500`.
- Desktop: `48px / 48px`, letter-spacing `-1.2px` (`tracking-tight`, `-0.025em`).
- Color: `#101828` light, `#f3f4f6` dark.
- The long name must not push the toggle or create horizontal scrolling. Below `sm`, use
  `font-size: clamp(1.75rem, 9.2vw, 3rem)` and `line-height: 1`.
  - Measured at 390px: `35.88px / 35.88px`, width about 251.95px.
  - Measured at 320px: `29.44px / 29.44px`, width 206.73px.
  - At 1440px and 768px: `48px / 48px`, width 337.06px.
- The heading stays on one line at every supported width. Do not wrap "Ali Bonagdaran".
- The header stays exactly 48px tall at all widths. The name may be smaller on phones; the toggle
  stays vertically centered.
- The name is a plain server-rendered `h1` with static, selectable text. It has no `aria-label`, no
  extra layers, and no hover or idle motion. Classes: `font-pixel`,
  `text-[clamp(1.75rem,9.2vw,3rem)]`, `font-medium`, `leading-none`, `tracking-tight`.

### Theme toggle

- A single icon button with `padding: 8px`, icon `20 × 20px`.
- Light theme: moon outline (`stroke-width: 1.5`), color `#4a5565`, hover `#101828`.
- Dark theme: sun outline, color `#99a1af`, hover `#f3f4f6`.
- The icon slot is 36px square after padding; its center aligns with the 48px header center.
- The button has `aria-label="Toggle theme"` and a visible focus ring.

## 3. Link row

- Exactly four links in this order: **LinkedIn**, **GitHub**, **Resume**, **Contact**.
- `display: flex; flex-wrap: wrap; gap: 16px;`. Wrapping is a safety net. The four links fit on one
  line at every supported width.
- Font: Geist Sans, `14px / 20px`, weight `600`.
- Light: `#4a5565`, hover `#101828`. Dark: `#99a1af`, hover `#f3f4f6`.
- Row sits 64px below the header (`header` margin-bottom) and 80px above the section label.
- No separators, icons, underlines, pills, or buttons.

At 1440px all four links sit at `y=208` with height 20:

| Link | x | width |
| --- | ---: | ---: |
| LinkedIn | 416 | 56.9 |
| GitHub | 488.9 | 45.97 |
| Resume | 550.87 | 54.09 |
| Contact | 620.95 | 53.8 |

At 320px the four links stay on one line, from `x=24` to `x=282.75`. The container is 272px wide, so
the row ends at `x=296` at most.

## 4. Experiences label

- Text content: `Experiences`, rendered uppercase by CSS.
- Font: Geist Sans, `14px / 20px`, weight `500`, letter-spacing `0.7px` (`tracking-wider`).
- Color: `#6a7282` in both themes.
- Margin-bottom: `24px`.
- It is the only `h2` on the page. It must be associated with the experience list via
  `aria-labelledby`.

## 5. Experience rows

Each row is a list item with a 48px logo slot and a flexible text block.

- Row: `display: flex; align-items: flex-start; gap: 16px;`
- List: vertical stack with `24px` gaps.
- Logo slot: `48px × 48px`, `flex-shrink: 0`, contents centered.
- Text starts at `x = 88px` on mobile (24px page padding + 48px icon + 16px gap) and
  `x = 480px` on desktop (416 + 48 + 16).
- Company: Geist Sans, `16px / 24px`, weight `500`, color `#101828` / `#f3f4f6`.
- Role: Geist Sans, `14px / 20px`, weight `400`, color `#4a5565` / `#99a1af`.
- Date: Geist Sans, `14px / 20px`, weight `400`, color `#6a7282` in both themes. Format is
  `2026 - Present` or `2025 - 2026`.
- There is no visible separator, border, card background, or hover surface on rows.

### Desktop layout (`≥ 640px`)

- Date is right-aligned, on the same horizontal band as the company and role, vertically centered
  against the two-line text block. It is not top-aligned with the company.
- The text block and date use a row with `justify-content: space-between`.
- Company and role span the available left column. All five companies use their full display
  names.
- Rows remain 48px tall for this content set.

### Mobile layout (`< 640px`)

- The company and date share one line: company at the left, date at the right, with at least 8px of
  gap. The date is vertically centered against the company line (2px below the company top for a
  single-line company).
- The role occupies the full text width below that line, not just the company column.
- The full organization names are too long to fit beside a date at 390px, so phones show the
  `shortCompany` label: `ABS`, `ABS`, `CommBank`, `Service NSW`, `McDonald's`. This keeps rows at
  48px. Do not remove the short labels or show the full names on mobile without rechecking every
  row at 320px and 390px.
- Full company names remain visible from `sm` upward, and remain in the underlying data for every
  viewport.
- At 390px every row is 48px tall. At 320px rows are 48px except the Service NSW row, whose role
  wraps to two lines and becomes 68px. The extra height comes from the content and is acceptable.
- Do not force a fixed row height that clips wrapped roles.

### Measured mobile geometry

390px viewport:

| Element | x | y | width | height |
| --- | ---: | ---: | ---: | ---: |
| Page content | 24 | - | 342 | - |
| Header | 24 | 96 | 342 | 48 |
| Name | 24 | 102.06 | 251.95 | 35.88 |
| Link row | 24 | 208 | 342 | 20 |
| `EXPERIENCES` | 24 | 308 | 342 | 20 |
| Row 1 | 24 | 352 | 342 | 48 |
| Row 2 | 24 | 424 | 342 | 48 |
| Row 3 | 24 | 496 | 342 | 48 |
| Row 4 | 24 | 568 | 342 | 48 |
| Row 5 | 24 | 640 | 342 | 48 |
| Logo slot | 24 | row top | 48 | 48 |
| Text block | 88 | row top | 278 | - |
| Date (row 1) | 262.05 | 354 | 103.95 | 20 |

320px viewport:

| Element | x | y | width | height |
| --- | ---: | ---: | ---: | ---: |
| Page content | 24 | - | 272 | - |
| Name | 24 | 105.28 | 206.73 | 29.44 |
| Header | 24 | 96 | 272 | 48 |
| Row 1 | 24 | 352 | 272 | 48 |
| Row 2 | 24 | 424 | 272 | 48 |
| Row 3 | 24 | 496 | 272 | 48 |
| Row 4 | 24 | 568 | 272 | 68 |
| Row 5 | 24 | 660 | 272 | 48 |
| Text block | 88 | row top | 208 | - |

`document.documentElement.scrollWidth` must equal the viewport width at 320, 390, 768, and 1440.

## 6. Color and theme

| Token | Light | Dark |
| --- | --- | --- |
| Page background | `#ffffff` | `#000000` |
| Primary text | `#101828` | `#f3f4f6` |
| Secondary text (roles, links) | `#4a5565` | `#99a1af` |
| Muted text (dates, section label) | `#6a7282` | `#6a7282` |
| Focus outline | `#101828` | `#f3f4f6` |

- Themes are class-based on `<html>` (`.dark`), with system preference as the default.
- Background and text colors transition over `300ms`.
- There are no gradients, glows, shadows, or accent colors in the main composition.

## 7. Logos

Logos identify employers. They are not decoration:

- All marks sit in a 48px centered slot.
- CommBank, Service NSW, and McDonald's: grayscale, approximately 28px tall.
- ABS: no backing. The artwork is white on a transparent background, so it is used as a CSS mask (36px wide, 32px tall) filled with `#101828` in light mode and `#f3f4f6` in dark mode.
- McDonald's keeps its natural aspect ratio (`height: 28px`, width auto).
- Logos are decorative (`alt=""`) because the company name is adjacent.
- Only Ali's employer marks in `public/logos/` may be used. Never use logos from the reference site.

## 8. Responsive breakpoints

| Width | Behavior |
| --- | --- |
| `≥ 640px` | 32px horizontal padding, full company names, date in right column, 48px rows. |
| `390px` | 24px horizontal padding, short company labels, date beside company, 48px rows. |
| `320px` | Same as 390, long roles may wrap; no horizontal overflow. |
| `768px` | Full desktop row layout inside the 672px column. |
| `1440px` | Column centered with 384px side margins. |

There is no separate tablet or mobile navigation, no hamburger button, and no layout switcher.

## 9. Exclusions

Do not add any of the following, even if other portfolios usually have them:

- Projects or work samples
- About/bio paragraph
- Footer or copyright line
- Navigation bar, logo bar, or social icon strip
- Contact section or email call to action. The `Contact` link in the link row is the only email entry point.
- Education, skills, achievements, certifications, or awards sections
- Cards, panels, rounded containers, borders, separators, or background fills
- Name animation, scroll progress, page transitions, cursor effects, or decorative particles
- Extra links beyond LinkedIn, GitHub, Resume, and Contact

## 10. 404 page

`src/app/not-found.tsx` uses the same visual language as the main page:

- Same centered column (`max-w-2xl`), same padding, same colors and fonts, both themes.
- No header, theme toggle, or link row.
- Plain text and one link back to `/`. Keep the copy short and in plain words.
- No images, illustrations, or animation.
