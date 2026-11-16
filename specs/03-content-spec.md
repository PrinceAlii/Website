# Content specification

Every visible word, number, link, and logo on this page must be Ali Bonagdaran's. The reference site
supplies layout and behavior only.

## 1. Content boundary

Never place the following on this site:

- Andrew Qu's name, biography, role, employer names, dates, links, logos, headshot, or copy.
- The reference site's project descriptions, project names, or any projects section.
- Emoji used as company logos on the reference site.
- Placeholder lorem ipsum, fake employers, fake roles, or invented achievements.
- Any personal data that is not in Ali's resume, existing portfolio, or this repository.

Specs and reference screenshots may mention or show the reference site for design review. That does
not allow copying its content into `src/`, `public/`, or metadata.

## 2. Identity

| Field | Value | Rendered? |
| --- | --- | --- |
| Name | Ali Bonagdaran | Yes, header `h1` |
| First name | Ali | Data only |
| Current role | Graduate DevOps Engineer | Yes, first experience role |
| Current employer | Australian Bureau of Statistics | Yes, first two experiences |
| Location | Sydney, NSW | No |
| Email | `alibonagdaran@gmail.com` | Only as the `mailto:` href of the `Contact` link. Never as page text. |
| Site URL | `https://www.alib.au` | Metadata, sitemap, and structured data only |
| Description | "Graduate DevOps Engineer at the Australian Bureau of Statistics. Sydney-based, focused on cloud platforms and developer tooling." | Metadata only |

Do not show the location or description on the page. Do not print the email address as page text.
Only the `Contact` link exposes it, as a `mailto:` href. The page has no bio or contact block and
must not get one.

## 3. Links

Exactly four links, in this order, with these labels:

| Label | Destination | Behavior |
| --- | --- | --- |
| LinkedIn | `https://www.linkedin.com/in/alibonagdaran/` | New tab |
| GitHub | `https://github.com/PrinceAlii` | New tab |
| Resume | `/resume.pdf` | New tab |
| Contact | `mailto:alibonagdaran@gmail.com` | Same tab |

- `LinkedIn`, `GitHub`, and `Resume` use `target="_blank"` and `rel="noopener noreferrer"`.
- `Contact` has no `target` and no `rel`.
- All four share one plain text-link style: 14px/20px, weight 600, no pill, no button chrome, no
  icons or arrows.
- Label text is exactly `LinkedIn`, `GitHub`, `Resume`, `Contact`.
- `/resume.pdf` is the real resume in `public/resume.pdf` and must be included in the export.
- Do not add X/Twitter, Instagram, or other links.

## 4. Experiences

Newest first. The page shows year ranges only. The data keeps the full start and end dates. A range
is written as two years joined by a spaced hyphen, for example `2026 - Present`. Never use an em dash in
dates.

| # | Company (≥640px) | Mobile label (<640px) | Role | Display period | Full dates | Location | Logo |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Australian Bureau of Statistics | ABS | Graduate DevOps Engineer | 2026 - Present | 2026-02 - Present | Sydney, NSW | `abs` |
| 2 | Australian Bureau of Statistics | ABS | Cadet, DevOps | 2025 - 2026 | 2025-03 - 2026-02 | Sydney, NSW | `abs` |
| 3 | Commonwealth Bank of Australia | CommBank | Business Banking Associate | 2024 - 2025 | 2024-11 - 2025-06 | Redfern, NSW | `commbank` |
| 4 | Service NSW | Service NSW | Customer & Digital Service Representative | 2023 - 2024 | 2023-03 - 2024-11 | Ryde, NSW | `service-nsw` |
| 5 | McDonald's | McDonald's | Crew Member | 2019 - 2023 | 2019-08 - 2023-03 | Mount Colah, NSW | `mcdonalds` |

- `shortCompany` only keeps mobile rows at 48px. It does not replace the full company name in the
  data or on desktop.
- `legalName` is optional and currently duplicates the full CommBank name.
- Highlights and skills stay in `src/data/experiences.ts` and are not rendered. Each row shows
  company, role, and date only.
- Do not merge the two ABS entries. They are separate roles with separate dates.

## 5. Data that is not rendered

These files keep Ali's resume data available for later. The page does not show them:

- `src/data/education.ts`: UTS Bachelor of Information Technology, WAM 82.58, GPA 6.21,
  Distinction, Enterprise Systems Development major, Networking and Cybersecurity sub-major,
  2023 - 2025.
- `src/data/skills.ts`: operating systems, languages, cloud/DevOps, containers, tooling, home lab.
- `src/data/achievements.ts`: 2nd in NSW IPT (2022 HSC) and an in-progress AWS certification.

Do not add sections for these to make the site look complete. The page shows experiences only, and
projects are excluded. If someone asks for these sections later, treat it as a new design task and
confirm the scope first.

## 6. Visible text

The main page shows only names, labels, and dates. It has no sentences. The full list is:

- `Ali Bonagdaran`
- `LinkedIn`
- `GitHub`
- `Resume`
- `Contact`
- `Experiences` (rendered uppercase)
- Five company labels, five role labels, and five date ranges from the table above.

The page has no tagline, greeting, paragraph, footer, copyright, project count, or call to action.

## 7. Metadata

Metadata comes from `profile.description` and the identity table:

- Title: `Ali Bonagdaran`
- Description: `Graduate DevOps Engineer at the Australian Bureau of Statistics. Sydney-based,
  focused on cloud platforms and developer tooling.`
- Locale: `en_AU`
- Canonical URL: `https://www.alib.au/`
- OG image: `/og.png`, 1200 × 630.

Metadata is not visible on the page. Update it when Ali's role changes.

Structured data: `src/app/layout.tsx` adds a JSON-LD `Person` script built from `src/data/profile.ts`
with `name`, `url` (`https://www.alib.au`), `jobTitle`, `worksFor`, and `sameAs`. `sameAs` lists
only the two `https` profile links (LinkedIn and GitHub). The `Resume` and `Contact` links are not
included. The script is not visible on the page.

Sitemap: `src/app/sitemap.ts` lists `https://www.alib.au/`. `public/robots.txt` points to
`https://www.alib.au/sitemap.xml`.

## 8. Assets

| Asset | Purpose | Rule |
| --- | --- | --- |
| `public/resume.pdf` | `Resume` link target | Ali's real resume; keep current. |
| `public/favicon.svg` | Browser icon | Custom "A" mark, not from the reference site. |
| `public/og.png` | Open Graph image | Made from Ali's name and role, 1200 × 630. Footer reads `alib.au`. |
| `public/logos/abs.svg` | ABS employer mark | White artwork on a transparent background, used as a mask and filled with the text color. |
| `public/logos/commbank.svg` | CommBank employer mark | Official diamond, grayscale in UI. |
| `public/logos/service-nsw.svg` | Service NSW employer mark | Circular symbol, grayscale in UI. |
| `public/logos/mcdonalds.svg` | McDonald's employer mark | Golden arches, grayscale in UI. |
| `src/fonts/*` | Geist fonts | Licensed under OFL-1.1; see `src/fonts/OFL.txt`. |

Logo sources and trademark notes are in `public/logos/SOURCES.md`. Logos identify past and present
employers. They do not mean the employers endorse this site.

## 9. 404 page

`src/app/not-found.tsx` shows a short plain message and a link back to `/`. It is the one place that
shows a sentence, and it stays minimal. The same rules apply: no em dashes, no jargon, no extra
content.
