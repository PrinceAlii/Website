# Gemini instructions

Read `AGENTS.md` first. It is the main instruction file. Follow its "Writing and copy" section for
all text you write, and never use em dashes. Then read the relevant documents in `specs/`, starting
with `specs/06-agent-playbook.md`.

## Project summary

Ali Bonagdaran's personal website. One static page: static name and theme toggle, four links, an
`Experiences` label, and five experience rows. The layout follows
[andrewqu.com](https://www.andrewqu.com/). Match its minimal geometry, type, muted palette, and themes.
The name is static.

## Boundaries

- Use Ali's real content and assets only. Never copy the reference site's name, bio, links,
  employers, dates, logos, projects, or copy.
- Do not add a projects section, footer, navigation, bio, avatar, contact section, cards, borders, or
  extra sections. The page ends after the last experience.
- Fixed structure: four links (`LinkedIn`, `GitHub`, `Resume`, `Contact`), five experiences, one
  page. `Contact` is a same-tab `mailto:` link. Never print the email address as page text.
- Mobile uses short company labels. Desktop uses full names. Keep both.
- Dates read `2026 to Present`. No dashes.
- Education, skills, achievements, and highlights stay as data only.
- Keep light and dark themes working. Nothing moves except the theme switch and hover colors.

## Verification

Run `corepack pnpm check`. Inspect 1440, 768, 390, and 320 in both themes against
`specs/reference/`. Check header height, vertical spacing, row pitch, date alignment, horizontal
scroll, theme persistence, the 404 page, and a static name. See
`specs/05-acceptance-criteria.md`.
