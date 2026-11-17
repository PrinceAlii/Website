---
name: Ali Bonagdaran
description: A monochrome personal page with a pixel-font name and blue text selection.
colors:
  paper: "#ffffff"
  void: "#000000"
  ink: "#101828"
  frost: "#f3f4f6"
  slate: "#4a5565"
  steel: "#99a1af"
  ash: "#6a7282"
  selection-light: "#bfdbfe"
  selection-dark: "#365f8b"
  selection-ink: "#101828"
  selection-frost: "#f3f4f6"
typography:
  display:
    fontFamily: "Lower Pixel, ui-monospace, monospace"
    fontSize: "clamp(1.75rem, 9.2vw, 3rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "24px"
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  link:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
  label:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
    letterSpacing: "0.05em"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "64px"
  xl: "80px"
  page: "96px"
components:
  link:
    textColor: "{colors.slate}"
    typography: "{typography.link}"
  link-hover:
    textColor: "{colors.ink}"
  link-dark:
    textColor: "{colors.steel}"
  link-dark-hover:
    textColor: "{colors.frost}"
  theme-toggle:
    textColor: "{colors.slate}"
    padding: "8px"
    size: "36px"
  experience-row:
    height: "48px"
---

# Design System: Ali Bonagdaran

## Overview

**Creative North Star: "The Calling Card"**

The site is a calling card: small, exact, and taken in within a second. One centered column holds a
name, three links, and four employer rows covering five roles. There is no prose, no imagery beyond
employer marks, and no surface other than the page itself. Everything a visitor needs to judge Ali's
path is in names, labels, and dates.

The mood is crisp and technical. Contrast is high, the palette is pure black and white with a short
cool gray scale, and alignment is measured to the pixel. The name and the 404 message use Lower
Pixel. The rest stays in a quiet geometric sans. A restrained blue appears only when visitors select
text.

The layout follows andrewqu.com for spacing, type, and theming. None of its content is used.

**Key Characteristics:**

- One 672px column, top-aligned, with fixed vertical rhythm (96, 64, 80, 24px).
- Monochrome: white or black page and cool gray text, with blue reserved for text selection.
- Lower Pixel on the name and the 404 message.
- Equal care in light and dark themes.
- Flat. No borders, cards, shadows, or separators.
- Motion limited to 300ms color transitions and the theme switch.

## Colors

A neutral system: a pure page color and three steps of cool gray text, with selection blue in both
themes.

### Neutral

- **Paper** (`paper`): the light page background.
- **Void** (`void`): the dark page background. True black, not a tinted near-black.
- **Ink** (`ink`): primary text in light mode (the name, company names), hover color for links and
  the toggle, focus outline, and the ABS logo fill.
- **Frost** (`frost`): the same roles as Ink in dark mode.
- **Slate** (`slate`): secondary text in light mode: roles, links, and the toggle at rest.
- **Steel** (`steel`): the same roles as Slate in dark mode.
- **Ash** (`ash`): muted text in both themes: the `Experience` label and dates.
- **Selection blue** (`selection-light`, `selection-dark`): selected-text background in each theme.
  Selected text uses Ink in light mode and Frost in dark mode.

### Named Rules

**The Selection Rule.** Blue is reserved for selected text. It does not appear in links, logos, or
other page states.

**The Three Steps Rule.** Text uses exactly three levels per theme: primary, secondary, muted. A new
element takes one of them; it never introduces a fourth gray.

## Typography

**Display Font:** Lower Pixel (with ui-monospace, monospace)
**Body Font:** Geist (with Arial, sans-serif)
**404 Font:** Source Serif 4 Semibold (subset, with Georgia, serif), a free stand-in for Larish Neue,
for the 404 numeral only

**Character:** Lower Pixel sets the name and 404 message over a clean geometric sans. The sans keeps
the links, labels, and experience rows neutral and readable.

### Hierarchy

- **Display** (400, `clamp(1.75rem, 9.2vw, 3rem)`, line-height 1, tight tracking): the name.
  48px from 768px up, scaling down so it never wraps on phones.
- **Title** (500, 16px, 24px): company names in experience rows.
- **Body** (400, 14px, 20px): roles and dates.
- **Link** (600, 14px, 20px): the three profile links and the 404 link.
- **Label** (500, 14px, wide tracking, uppercase): the `Experience` section label.
- **Error numeral** (600, Source Serif 4, `clamp(8rem, 42vw, 12rem)`, line-height 1, tight
  tracking): the `404` on the 404 page only. The one serif on the site.
- **Error message** (400, Lower Pixel): the short 404 message.

### Named Rules

**The Nameplate Rule.** Lower Pixel belongs to the name and the 404 message. Keep it out of links,
labels, experience rows, and dates.

**The No Prose Rule.** Type sizes stop at 16px below the name because there is nothing longer than a
role title to set. Do not add a size for paragraphs.

## Layout

A single centered column, 672px maximum, with 32px side padding from 640px up and 24px below. The
column is top-aligned with 96px of top padding and is never vertically centered.

Vertical rhythm is fixed: a 48px header, 64px to the link row, 80px to the `Experience` label,
24px to the list, and 24px between rows. Single-position rows are 48px; the ABS group is 152px.

Each experience row is a 48 × 44 logo slot, a 16px gap, then a text block. From 640px up, the date
sits in its own right column, centered against the company and role lines. Below 640px, the date
shares the company line and the role spans the full width beneath. Phones show short company labels
(`ABS`, `CommBank`) so the date never collides with the name.

**The No Overflow Rule.** The page never scrolls horizontally, from 320px to 1440px.

## Elevation & Depth

The system is completely flat. There are no shadows, borders, background tints, or layered
surfaces. Depth comes only from the three-step gray hierarchy and from weight. The focus ring
(2px solid, 4px offset, primary text color) is the only drawn outline.

**The Flat Page Rule.** Nothing sits on a surface. If an element seems to need a card or divider,
remove it or use spacing instead.

## Shapes

No corner radius anywhere, because there are no containers. The only shapes are the outline icons
in the theme toggle (1.5px stroke, round caps) and the employer logos, shown in grayscale.

## Components

### Links

Plain text, no chrome.

- **Style:** Link typography in Slate (Steel in dark), 16px apart in one row.
- **Hover:** shifts to Ink (Frost in dark) over 300ms. No underline, icon, or arrow.
- **Focus:** 2px outline, 4px offset, in the primary text color.

### Theme Toggle

A bare icon button at the right of the header.

- **Shape:** 20px outline icon in a 36px slot (8px padding). Moon in light mode, sun in dark.
- **Color:** Slate at rest, Ink on hover (Steel and Frost in dark). Pointer cursor.
- **Focus:** same outline as links.

### Experience Row (signature)

Single-position rows show a logo, company, role, and date.

- **Logo:** grayscale employer mark, about 28px tall, centered in a 48 × 44 slot. The ABS mark is a
  mask filled with the primary text color so it reads on both pages.
- **Text:** company in Title, role in Body (secondary), date in Body (muted), formatted
  `2026 - Present` with a spaced hyphen.
- **States:** none. Rows are not interactive and have no hover surface.

The ABS employer row groups its two positions under one company header. It uses one logo and a short
timeline, as detailed in `specs/SPEC.md` section 5. The grouped row is 152px tall.

## Do's and Don'ts

### Do:

- **Do** use Ink/Frost, Slate/Steel, and Ash for page text. Use selection colors only for selected
  text, with Ink/Frost foregrounds.
- **Do** keep the 96 / 64 / 80 / 24px rhythm, 48px single-position rows, and the 152px ABS group.
- **Do** check both themes at 320, 390, 768, and 1440px for every change.
- **Do** keep logos grayscale and tune brightness per mark so they read at a similar weight.
- **Do** keep the visible focus outline on every interactive element.

### Don't:

- **Don't** use selection blue outside selected text. Don't add gradients, glows, or shadows.
- **Don't** add cards, borders, separators, pills, or background tints.
- **Don't** use Lower Pixel outside the name and the 404 message.
- **Don't** animate the name or add load, scroll, or hover motion beyond 300ms color changes.
- **Don't** add paragraphs, taglines, or helper text to the page.
