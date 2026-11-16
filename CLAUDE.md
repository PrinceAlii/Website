# Claude Code instructions

Read `AGENTS.md` first. It is the main instruction file. Follow its "Writing and copy" section for
all text you write, and never use em dashes. Then read the relevant documents in `specs/`, starting
with `specs/06-agent-playbook.md`.

## What this is

Ali Bonagdaran's personal website: one page with a name, a theme toggle, three links, an
`Experiences` label, and five experience rows. The layout follows
[andrewqu.com](https://www.andrewqu.com/). Match its spacing, typography, themes, and name animation.

## Hard rules

- Use Ali's content only. Never copy Andrew Qu's name, bio, links, employers, dates, logos, project
  copy, or assets.
- No projects section. No footer, nav, bio, avatar, contact block, cards, or extra sections.
- Keep exactly three links: `Social`, `Code`, `Professional`.
- Phones use the `shortCompany` labels (`ABS`, `CommBank`). Desktop uses full names.
- Dates read `2026 to Present`. No dashes.
- Keep education, skills, achievements, and highlights as data only.
- Keep the name animation and both themes working.
- Do not change pinned dependencies without re-measuring.

## Verify before finishing

```bash
corepack pnpm check
```

Inspect 1440, 768, 390, and 320 in light and dark. Confirm the 48px header, the vertical spacing,
48px rows at 390 and 1440, aligned dates, no horizontal overflow, theme persistence, no layout shift
from the name animation, a styled 404 page, and no reference content in served files.

Acceptance criteria: `specs/05-acceptance-criteria.md`.
