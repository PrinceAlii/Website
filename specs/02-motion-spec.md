# Motion and interaction specification

Motion appears in three places: the name, hover color transitions, and the theme switch. Nothing
else moves. The name animation is quiet and runs in the background.

## 1. Name flip wave

The name is built from two stacked copies of the same text:

- Front layer: visible at rest.
- Back layer: hidden at rest.
- Each layer is one `span` marked `aria-hidden`, so the `h1` holds only inline content.
- Every character is animated on its own as an inline-block. Spaces stay inline so word spacing is
  kept.
- Both layers sit in the same grid cell (`.grid-stack`), so swapping never changes layout.

### Flipped state

| Property | Front layer | Back layer |
| --- | --- | --- |
| `rotateX` | `80deg` | `360deg` |
| `y` | `-16px` | `0px` |
| `blur` | `4px` | `0px` |
| `opacity` | `0` | `1` |
| Stagger | `index × 50ms` | `100ms + index × 50ms` |

- Transition: spring, `stiffness: 250`, `damping: 30`.
- The front layer tips away first. The back layer follows and lands as a readable name. The stagger
  makes a left-to-right wave.

### Rest state

| Property | Front layer | Back layer |
| --- | --- | --- |
| `rotateX` | `0deg` | `270deg` |
| `y` | `0px` | `16px` |
| `blur` | `0px` | `4px` |
| `opacity` | `1` | `0` |
| Stagger | `(length - 1 - index) × 60ms` | `(length - 1 - index) × 50ms` |

The reset runs right to left, so the name settles as a wave instead of a single cross-fade.

### Triggers

1. **Ambient:** while idle, toggle between flipped/rest every `1500ms`.
2. **Hover/pointer enter:** set flipped immediately, hold for `1200ms`, then return to rest.
3. **Quiet period:** the ambient interval does not fire while a hover hold is active. It stays quiet
   for 1.2s after the reset begins so the name can settle before the next wave.
4. **Reduced motion:** no interval, no hover flip; render the static front layer. `useReducedMotion`
   plus the global reduced-motion CSS must both protect this.

The name has `cursor: pointer`. It is not a button or a link, has no click action, and is not
focusable.

### Layout invariants

- Header height remains exactly 48px during every frame.
- The back layer must never widen the page, cause horizontal overflow, or move the theme toggle.
- The accessible name comes from `aria-label` on the `h1`; both animated layers are `aria-hidden`.
- The animation must not cause hydration warnings. The first render is the rest state.

## 2. Theme switch

- `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and storage key
  `theme`.
- Clicking the toggle switches to the opposite of the resolved theme, not just the stored
  preference.
- The page background and text transition over `300ms`; links and the theme icon transition colors
  over `300ms`.
- The toggle shows a moon in light mode and a sun in dark mode. The reference site always shows a
  moon, which is a bug there. This site shows the icon that matches the theme you will switch to.
- The theme choice persists across reloads. Until the visitor picks one, the OS preference applies.

## 3. Hover and focus

- Links: color change only, over `300ms`. No underline, translate, scale, or background.
- Theme toggle: color change only, over `300ms`.
- Experience rows have no hover state.
- `:focus-visible` shows a 2px outline with 4px offset, in the primary text color for the active
  theme.

## 4. Reduced motion

When `prefers-reduced-motion: reduce` is set:

- All animations run once for `0.01ms` and transitions are effectively off (global CSS).
- The ambient name interval is not started.
- Hover does not flip the name.
- No functionality depends on motion.

## 5. Not included

- No page-load transition, fade-in, or reveal on scroll.
- No route transitions. The site has one page, plus a static 404 page.
- No parallax, cursor follower, gradient movement, particles, or animated background.
- No animation on experience rows, logos, links, or the resume link.
- No scroll-triggered effects.
- No smooth-scroll behavior. The page is too short to need it.
