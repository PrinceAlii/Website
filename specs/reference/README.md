# Reference capture

Reference: [andrewqu.com](https://www.andrewqu.com/)
Captured: 16 November 2026
Purpose: design evidence for composition, spacing, typography, and motion only.

These files contain Andrew Qu's personal content. They are **not** site assets. Never copy the
name, biography, links, employer names, logos, or copy from these captures into `src/`, `public/`, or
the built site.

## Screenshots

| File | Viewport | Theme | Device scale |
| --- | --- | --- | --- |
| `andrew-desktop-1440-light.png` | 1440 × 1000 | light | 1 |
| `andrew-desktop-1440-dark.png` | 1440 × 1000 | dark | 1 |
| `andrew-mobile-390-light.png` | 390 × 1000 | light | 1 |
| `andrew-mobile-390-dark.png` | 390 × 1000 | dark | 1 |

The ambient name interval was stubbed out before load so the captures show the settled rest state.
The screenshots are full-page captures. The page is 1000px tall at these viewports because of
`min-h-screen`, even though the content ends much earlier.

## Measurements

`measurements/*.json` contains raw browser measurements for each capture: bounding boxes, computed
fonts, letter spacing, colors, padding, margins, gaps, and flex properties for:

- page/root and header
- name wrapper and front layer
- theme toggle
- link section and each link
- experiences heading
- each experience row, icon, content block, company, role, mobile date, and desktop date

The key values are summarized in `../01-visual-spec.md`.

## Reproduction notes

- Browser: Chromium via Playwright.
- OS: Windows.
- Reference site is a Next.js app with Tailwind classes; its DOM was measured live.
- The reference uses `text-5xl` (48px) for the name at all widths and a non-wrapping flex name.
  Ali's longer name required a phone-specific clamp and a responsive company label strategy; these
  are documented deviations, not accidental drift.
- The reference always shows a moon icon, including in dark mode. This project intentionally shows a
  sun in dark mode.
