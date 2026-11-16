---
name: Ali Bonagdaran
description: A one-column, monochrome personal page with a pixel-font name and a plain record of work.
colors:
  paper: "#ffffff"
  void: "#000000"
  ink: "#101828"
  frost: "#f3f4f6"
  slate: "#4a5565"
  steel: "#99a1af"
  ash: "#6a7282"
typography:
  display:
    fontFamily: "Geist Pixel Square, ui-monospace, monospace"
    fontSize: "clamp(1.75rem, 9.2vw, 3rem)"
    fontWeight: 500
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
name, four links, and a record of five roles. There is no prose, no imagery beyond employer marks,
and no surface other than the page itself. Everything a visitor needs to judge Ali's path is in
names, labels, and dates.

The mood is crisp and technical. Contrast is high, the palette is pure black and white with a short
cool gray scale, and alignment is measured to the pixel. The one expressive note is the name, set in
a pixel typeface that reads like an engineer's nameplate. The rest stays in a quiet geometric sans so
the name carries the identity alone.

The layout follows andrewqu.com for spacing, type, and theming. None of its content is used.

**Key Characteristics:**

- One 672px column, top-aligned, with fixed vertical rhythm (96, 64, 80, 24px).
- Monochrome: white or black page, cool gray text, no accent color.
- A pixel-font name as the single expressive element.
- Equal care in light and dark themes.
- Flat. No borders, cards, shadows, or separators.
- Motion limited to 300ms color transitions and the theme switch.

## Colors

A strict monochrome system: a pure page color and three steps of cool gray text, inverted for dark.

### Neutral

- **Paper** (`paper`): the light page background.
- **Void** (`void`): the dark page background. True black, not a tinted near-black.
- **Ink** (`ink`): primary text in light mode (the name, company names), hover color for links and
  the toggle, focus outline, and the ABS logo fill.
- **Frost** (`frost`): the same roles as Ink in dark mode.
- **Slate** (`slate`): secondary text in light mode: roles, links, and the toggle at rest.
- **Steel** (`steel`): the same roles as Slate in dark mode.
- **Ash** (`ash`): muted text in both themes: the `Experiences` label and dates.

### Named Rules

**The No Accent Rule.** There is no brand color. Hierarchy comes from the three gray steps and font
weight, never from hue.

**The Three Steps Rule.** Text uses exactly three levels per theme: primary, secondary, muted. A new
element takes one of them; it never introduces a fourth gray.

## Typography

**Display Font:** Geist Pixel Square (with ui-monospace, monospace)
**Body Font:** Geist (with Arial, sans-serif)
**404 Font:** the system serif (ui-serif, Georgia, Times), for the 404 numeral only

**Character:** a pixel nameplate over a clean geometric sans. The pixel face signals an engineer; the
sans keeps everything else neutral and readable.

### Hierarchy

- **Display** (500, `clamp(1.75rem, 9.2vw, 3rem)`, line-height 1, tight tracking): the name only.
  48px from 768px up, scaling down so it never wraps on phones.
- **Title** (500, 16px, 24px): company names in experience rows.
- **Body** (400, 14px, 20px): roles and dates.
- **Link** (600, 14px, 20px): the four profile links and the 404 link.
- **Label** (500, 14px, wide tracking, uppercase): the `Experiences` section label.
- **Error numeral** (400, system serif, 96px, 128px from 640px up, line-height 1): the `404` on the
  404 page only. The one serif on the site.

### Named Rules

**The Nameplate Rule.** Geist Pixel Square belongs to the name. It may appear sparingly in a future
section heading if the site grows, but never in body text, links, labels, or dates.

**The No Prose Rule.** Type sizes stop at 16px below the name because there is nothing longer than a
role title to set. Do not add a size for paragraphs.

## Layout

A single centered column, 672px maximum, with 32px side padding from 640px up and 24px below. The
column is top-aligned with 96px of top padding and is never vertically centered.

Vertical rhythm is fixed: a 48px header, 64px to the link row, 80px to the `Experiences` label,
24px to the list, and 24px between rows. Rows are 48px tall at 390px and up.

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

The core of the page: logo, company, role, date.

- **Logo:** grayscale employer mark, about 28px tall, centered in a 48 × 44 slot. The ABS mark is a
  mask filled with the primary text color so it reads on both pages.
- **Text:** company in Title, role in Body (secondary), date in Body (muted), formatted
  `2026 - Present` with a spaced hyphen.
- **States:** none. Rows are not interactive and have no hover surface.

## Do's and Don'ts

### Do:

- **Do** keep every text color to the three steps: Ink/Frost, Slate/Steel, Ash.
- **Do** keep the 96 / 64 / 80 / 24px rhythm and 48px rows when adding anything.
- **Do** check both themes at 320, 390, 768, and 1440px for every change.
- **Do** keep logos grayscale and tune brightness per mark so they read at a similar weight.
- **Do** keep the visible focus outline on every interactive element.

### Don't:

- **Don't** add an accent color, gradient, glow, or shadow.
- **Don't** add cards, borders, separators, pills, or background tints.
- **Don't** use Geist Pixel Square outside the name, except sparingly for a future section heading.
- **Don't** animate the name or add load, scroll, or hover motion beyond 300ms color changes.
- **Don't** add paragraphs, taglines, or helper text to the page.
