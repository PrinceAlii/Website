# Motion and interaction specification

Motion appears in two places: the theme switch and hover color transitions. Nothing else moves.

The name is plain, selectable text. It does not animate on load, on hover, or at rest. The reference
site's flip wave is intentionally not used.

## 1. Theme switch

- `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and storage key
  `theme`.
- Clicking the toggle switches to the opposite of the resolved theme, not just the stored
  preference.
- The page background and text transition over `300ms`; links and the theme icon transition colors
  over `300ms`.
- The toggle shows a moon in light mode and a sun in dark mode. The reference site always shows a
  moon, which is a bug there. This site shows the icon that matches the theme you will switch to.
- The theme choice persists across reloads. Until the visitor picks one, the OS preference applies.

## 2. Hover color transitions

- The four links (`LinkedIn`, `GitHub`, `Resume`, `Contact`): color change only, over `300ms`. No
  underline, translate, scale, or background.
- Theme toggle: color change only, over `300ms`.
- The name and experience rows have no hover state. The name keeps the default cursor.

## 3. Focus

`:focus-visible` shows a 2px outline with 4px offset, in the primary text color for the active
theme. It applies to the theme toggle and all four links.

## 4. Reduced motion

When `prefers-reduced-motion: reduce` is set:

- All animations run once for `0.01ms` and transitions are effectively off (global CSS).
- No functionality depends on motion.

## 5. Not included

- No name animation of any kind: no layers, no flip, no hover or idle motion.
- No page-load transition, fade-in, or reveal on scroll.
- No route transitions. The site has one page, plus a static 404 page.
- No parallax, cursor follower, gradient movement, particles, or animated background.
- No animation on experience rows, logos, links, or the resume link.
- No scroll-triggered effects.
- No smooth-scroll behavior. The page is too short to need it.
