# Acceptance criteria

A change is done when every item that applies passes. Expected values live in `SPEC.md`; section
numbers below point there.

## Structure and content

- [ ] Exactly one `h1` (`Ali Bonagdaran`), one `h2` (`Experiences`), and five `h3` elements.
- [ ] Exactly four links in the link row, in order, with the destinations and tab behavior in
      section 8.
- [ ] No `nav`, `footer`, projects, about, skills, education, achievements, or contact section. Nothing
      follows the fifth row.
- [ ] The only images are the four employer logos.
- [ ] Visible text is exactly the list at the end of section 8. The email address is not visible.
- [ ] Dates read `2026 - Present`, `2025 - 2026`, `2024 - 2025`, `2023 - 2024`, `2019 - 2023`.
- [ ] No reference content in served files. This must return no matches:

```bash
rg -n --glob '!fonts/**' 'Andrew Qu|andrewqu|Chief of Software|Nooks|quuu' src public
```

## Geometry (section 2 to 5)

At 1440, 768, 390, and 320 wide, 1000 tall:

- [ ] Every position and size in the section 2 tables matches.
- [ ] `scrollWidth` equals the viewport width.
- [ ] The header is 48px and the name does not wrap.
- [ ] The four links stay on one line.
- [ ] 768 and 1440 show full company names and dates in the right column. No phone label is visible.
- [ ] 390 and 320 show the phone labels, with each date right-aligned on the company line and never
      overlapping it. Roles use the full text width.
- [ ] At 390 every row is 48px. At 320 only Service NSW is 68px. No text is clipped.

## Theme and motion (section 7)

- [ ] Background and text colors match the token table in both themes.
- [ ] The toggle shows a moon in light and a sun in dark, and switches to the opposite resolved theme.
- [ ] The choice persists across reloads under the `theme` key. With nothing saved, the OS preference
      applies. No flash on load.
- [ ] Only the links and the toggle change color on hover. The name is static, selectable text.
- [ ] Reduced motion leaves the page static and fully usable.
- [ ] No hydration mismatch warning in the console.

## Links, assets, and SEO (sections 8 and 9)

- [ ] `/resume.pdf`, `/og.png` (1200 × 630), `/favicon.svg`, `/robots.txt`, `/sitemap.xml`, and all
      four `/logos/*.svg` return 200.
- [ ] The ABS mask and the grayscale logos are legible in both themes.
- [ ] Title, meta description, canonical `https://www.alib.au/`, `og:url`, `og:title`,
      `og:description`, `og:image`, `twitter:card`, and both `theme-color` values are present.
- [ ] The JSON-LD `Person` script is present, invisible, and its `sameAs` lists only LinkedIn and
      GitHub.

## Accessibility (section 10)

- [ ] Tab order is toggle, `LinkedIn`, `GitHub`, `Resume`, `Contact`, and every focus outline shows.
- [ ] The name has no `aria-label`. The list is labelled by the `Experiences` heading.
- [ ] Logos have empty alt text, and each company name is exposed once.
- [ ] Contrast meets WCAG AA. The page is readable and navigable with JavaScript off.

## 404 page (section 11)

- [ ] An unknown URL shows the styled 404 page: a large serif `404`, the castle message, and a link
  to `/`, nothing else.
- [ ] It matches the main page in both themes and has no horizontal scroll at the four viewports.

## Build and deployment

- [ ] `corepack pnpm check` passes, including from a clean `pnpm install --frozen-lockfile`.
- [ ] `curl -H "Accept: text/markdown"` on `/` returns markdown with `Content-Type: text/markdown`.
  Without that header, `/` returns HTML. Both responses send `Vary: Accept`.
- [ ] The build has the four routes and the `out/` files in section 12.
- [ ] Hosting config still matches the Deployment section of `README.md`.
- [ ] No em dash in the page, metadata, docs, comments, or specs. This must return no matches:

```bash
rg -n '\x{2014}|&m[d]ash;' README.md AGENTS.md CLAUDE.md GEMINI.md .github specs public src --glob '!specs/reference/**'
```

## Visual review

Compare fresh screenshots, taken after fonts load, with the four captures in `specs/reference/`.
Compare geometry, not pixels: column and padding, header height, name size, vertical gaps, row pitch,
icon size, type hierarchy, date position, and theme surfaces.
