# 03 — Rules: Development Guardrails and Agent Directives

> **Project:** Good Hope Manor website · **Spec set:** v1 · **Last updated:** 2026-10-04
>
> **Spec set:** [01 PRD](./PRD.md) · [02 Architecture](./ARCHITECTURE.md) · [03 Rules](./RULES.md) · [04 Phases](./PHASES.md) · [05 Design](./DESIGN.md) · [06 Memory](./MEMORY.md)

> **CRITICAL DIRECTIVE FOR ALL AI AGENTS AND DEVELOPERS:** These rules are mandatory. A PR that breaks a **MUST / MUST NOT** rule is rejected, regardless of how good the feature is.

## 0. Conventions

- **MUST / MUST NOT** = hard rule. **SHOULD** = default; deviate only with a written reason in the PR.
- Every rule has an ID. Cite it in PR descriptions and review comments.
- **Precedence:** 03-RULES > 05-DESIGN > 02-ARCHITECTURE > 01-PRD > 04-PHASES. If two files disagree, follow the higher one and log the conflict in 06-MEMORY.

---

## 1. Accessibility and usability

The audience includes seniors with vision, motor and cognitive changes. Ordinary web practice is not enough.

| ID | Rule | Why |
| --- | --- | --- |
| R-A11Y-01 | Standalone interactive elements (buttons, nav links, footer links, form controls, calendar/select controls) **MUST** have a hit area of at least **44×44 CSS px**, with at least **8px** between adjacent targets. | Tremor / Fitts's law |
| R-A11Y-02 | Inline links inside paragraphs are exempt from 44px but **MUST** be underlined, in a contrasting colour, and in text ≥ 18px. | Practical exception that keeps prose readable |
| R-A11Y-03 | Navigation **MUST** be persistent, identical on every page, and **MUST** mark the current page with `aria-current="page"` plus a non-colour marker. Sub-pages **MUST** show breadcrumbs. Nested dropdowns **MUST NOT** be used. | Cognitive anchoring |
| R-A11Y-04 | Page background **MUST** be `neutral-base` (`#F9F7F1`) and body text `typography-primary` (`#1A1A1A`). Pure `#000` on pure `#FFF` for body text **MUST NOT** be used. | Glare reduction |
| R-A11Y-05 | Body text **MUST** be 18px (`text-lg`). No text **MAY** be smaller than **16px**. | Presbyopia |
| R-A11Y-06 | Every text/background pairing **MUST** come from the approved matrix in 05-DESIGN §2. The `accent` colour **MUST NOT** be used for text or as the only boundary of a control. | Verified contrast ratios |
| R-A11Y-07 | Meaning **MUST NOT** be conveyed by colour alone (errors, active nav, links, required fields). | WCAG 1.4.1 |
| R-A11Y-08 | Use semantic landmarks: one `<header>`, one `<main id="main">`, one `<footer>`, `<nav aria-label="…">` for each nav. | Screen readers |
| R-A11Y-09 | Exactly one `<h1>` per page; headings **MUST NOT** skip levels; headings are chosen for structure, not size. | Screen readers |
| R-A11Y-10 | Every `<img>` **MUST** have an `alt`. Informative images get context-aware text describing what is shown *and why it matters*; decorative images use `alt=""`. Never write "image of…" or "photo of…". | WCAG 1.1.1 |
| R-A11Y-11 | A visible focus indicator **MUST** be present on every focusable element: 3px **outline** (not only `box-shadow`) in `brand-secondary`, 2px offset; white on dark backgrounds. | Works in Windows High Contrast / forced-colors |
| R-A11Y-12 | Auto-advancing carousels/sliders, auto-playing video/audio, parallax and scroll-jacking **MUST NOT** be used. Review lists and galleries are static grids. | Cognitive load; WCAG 2.2.2 |
| R-A11Y-13 | Motion **MUST** be wrapped in `motion-safe:` variants (or `@media (prefers-reduced-motion: no-preference)`). Transitions ≤ 200 ms. | Vestibular safety |
| R-A11Y-14 | Forms: visible `<label>` for every field (placeholder is never a label); required fields say "(required)"; errors use text + icon, `aria-invalid`, `aria-describedby`; failed submit shows a focusable error summary; `autocomplete` attributes set (`name`, `tel`, `email`). | WCAG 1.3.5, 3.3.x |
| R-A11Y-15 | Do not disable pinch-zoom. `viewport` **MUST NOT** contain `maximum-scale` or `user-scalable=no`. | Low-vision users |
| R-A11Y-16 | Content **MUST** work at 200% zoom and reflow at 320px width without horizontal scrolling. | WCAG 1.4.4, 1.4.10 |
| R-A11Y-17 | Links **MUST** have descriptive text. "Click here" and "Read more" alone are forbidden. Links opening a new tab **MUST** say so in text. | Screen-reader link lists |
| R-A11Y-18 | Phone numbers **MUST** be `tel:` links; email addresses `mailto:`. | One-tap calling |
| R-A11Y-19 | Hover-only content (tooltips, menus that appear on hover) **MUST NOT** be used. | Touch, keyboard, tremor |
| R-A11Y-20 | Accordions **MUST** use native `<details>/<summary>` unless there is a documented reason. | Built-in semantics |
| R-A11Y-21 | `<html lang="en">` **MUST** be set; every page has a unique, descriptive `<title>`. | WCAG 3.1.1, 2.4.2 |
| R-A11Y-22 | A "Skip to main content" link **MUST** be the first focusable element. | Keyboard users |

---

## 2. Content and assets

| ID | Rule | Why |
| --- | --- | --- |
| R-CONTENT-01 | **Zero hallucinated content.** Do not invent statistics, awards, staff names, staffing ratios, licence numbers, prices, testimonials, quotes or claims. If content is missing, insert `[CONTENT NEEDED: description]` and add it to 06-MEMORY §4.3. | Trust and regulatory risk |
| R-CONTENT-02 | **Zero misleading assets.** Do not link to stock/placeholder image services. Use only image files in the repository's root `assets/` directory. Original conceptual illustrations may be used with client approval, but must be clearly labelled as illustrations—not photos of Good Hope Manor, its residents, or proof that a depicted service/activity is offered. Do not source assets from remote services. Until suitable photos or approved illustrations are available, use a neutral block with visible text `[PHOTO NEEDED: description]`. | Authenticity is a brand requirement |
| R-CONTENT-03 | Reviews **MUST** be reproduced verbatim from the source with author, date and rating exactly as shown. They **MUST NOT** be paraphrased, shortened or fabricated. | Integrity |
| R-CONTENT-04 | Photos showing residents **MUST NOT** be committed until the client confirms a signed release (set `consentConfirmed: true` in `images.ts`). | Privacy and dignity |
| R-CONTENT-05 | No medical claims, outcome guarantees or superlatives ("best", "guaranteed", "#1") unless the client supplies wording and confirms it is substantiated. | Compliance |
| R-CONTENT-06 | Write in plain language, aim for a reading level of grade 8 or below, with sentences under ~22 words. | Accessibility |
| R-CONTENT-07 | Use the vocabulary table below. | Non-institutional tone |
| R-CONTENT-08 | Name, address and phone **MUST** be read from `src/content/site.ts`; they **MUST NOT** be typed into components. | DRY, consistency |

**Vocabulary**

| Prefer | Avoid |
| --- | --- |
| home, community | facility, institution, unit |
| residents | patients, inmates, clients |
| caregivers, team members | staff (in headings), personnel |
| a place to call home | placement, admission (in marketing copy) |
| visit, tour | evaluation, assessment (unless clinical context is required) |
| help with daily activities | ADL support (spell out; avoid abbreviations) |

---

## 3. Code and architecture

| ID | Rule | Why |
| --- | --- | --- |
| R-CODE-01 | **DRY components.** If a UI element appears more than once (CTA button, review card, service block, section heading), it **MUST** be a component in `src/components/`. Pages are thin: compose sections, pass content. | Maintainability |
| R-CODE-02 | Place components by role: `ui/` (primitives), `layout/` (page chrome), `sections/` (page sections). One exported component per file; filename = `PascalCase.tsx`. | Predictable structure |
| R-CODE-03 | TypeScript `strict`. `any` **MUST NOT** be used without an adjacent comment explaining why. Component props **MUST** have named types. | Safety |
| R-CODE-04 | Use Server Components by default. `'use client'` only where browser state/events are needed, and only on the smallest component that needs it. | Performance |
| R-CODE-05 | Style with Tailwind utilities that reference **tokens** (`bg-brand-primary`). Hard-coded hex values, arbitrary colour values (`text-[#123456]`), inline `style={{…}}` for colour/spacing, and `!important` **MUST NOT** be used. | Design integrity |
| R-CODE-06 | New design tokens **MUST NOT** be added without updating 05-DESIGN and getting design approval (Reshma). | Prevents drift |
| R-CODE-07 | All copy and facts live in `src/content/`; JSX contains structure, not prose, except trivial labels (e.g. "Menu"). | Swappable content |
| R-CODE-08 | Images **MUST** come only from the repository's root `assets/` directory via static import and `next/image`, with accurate `alt`. | CLS, authenticity |
| R-CODE-09 | No runtime data fetching in Phase 1 except the form POST. | Static export |
| R-CODE-10 | Do not use APIs unsupported by static export (Server Actions, Route Handlers, Middleware) in Phase 1. | Build would fail or silently differ |
| R-CODE-11 | No `console.log` in committed code. Never log form values. | Privacy |
| R-CODE-12 | Prefer native HTML and ES6+ APIs over libraries. | Dependency restraint |
| R-CODE-13 | A component file **SHOULD** stay under ~150 lines; split when it grows. | Readability |

---

## 4. Dependencies

| Category | Allowed | Forbidden |
| --- | --- | --- |
| Runtime | `next`, `react`, `react-dom` | jQuery, Bootstrap, Moment.js, Lodash, Axios, UI kits (MUI, Chakra, etc.), animation libraries, carousel libraries, CSS-in-JS |
| Styling | `tailwindcss` (+ its official PostCSS/Vite plugin as scaffolded) | Additional CSS frameworks |
| Dev | TypeScript, ESLint (+ `jsx-a11y`), Prettier, Playwright, `@axe-core/playwright`, Lighthouse CI, `sharp`, `serve` | Anything else without justification |

| ID | Rule |
| --- | --- |
| R-DEP-01 | Adding a runtime dependency **MUST** be approved in the PR: state the need, the alternatives considered, and the bundle cost. |
| R-DEP-02 | Lockfile **MUST** be committed. Versions pinned after scaffold. |
| R-DEP-03 | No third-party scripts (analytics, chat, tag managers, fonts CDNs, embeds) in Phase 1 without PM sign-off (OQ-07). |

---

## 5. Privacy and security

| ID | Rule |
| --- | --- |
| R-PRIV-01 | Public forms **MUST** collect only the fields in 01-PRD §6. No medical, financial or date-of-birth data. |
| R-PRIV-02 | Never commit secrets. Only public, non-sensitive variables are used in Phase 1 (`NEXT_PUBLIC_*`). |
| R-PRIV-03 | Strip EXIF/GPS data from all photos before commit. |
| R-PRIV-04 | No embedded third-party maps, videos or social widgets in Phase 1. |
| R-PRIV-05 | Any Phase 2 feature that stores health or care-needs information is blocked until compliance review is complete (02-ARCHITECTURE §9.4). |

---

## 6. Git and review workflow

| Item | Rule |
| --- | --- |
| Branches | `main` is protected and auto-deploys. Work on `feat/<area>-<short-name>`, `fix/…`, `docs/…` |
| Commits | Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`). Reference IDs: `feat(home): hero section (FR-HOME-01)` |
| PR size | Prefer < 400 changed lines; one concern per PR |
| Checks | Lint, typecheck, build, a11y tests and Lighthouse **MUST** pass before merge |
| Reviews | Visual changes reviewed by Reshma (design). Code reviewed by a second person where available; otherwise self-review against the checklist below |
| Placeholders | `check:content` warns on PRs. **Release is blocked** while any `[CONTENT NEEDED` or `[PHOTO NEEDED` remains in `main` that is intended for production |

**PR checklist (paste into the PR template)**

```md
## Summary
<!-- What changed and which requirement IDs it implements -->

## Checklist
- [ ] Implements: FR-… / NFR-…
- [ ] Uses design tokens only (no raw hex / arbitrary colours) — R-CODE-05
- [ ] Reused or created a component instead of duplicating UI — R-CODE-01
- [ ] No invented content or stock images — R-CONTENT-01/02
- [ ] Targets ≥ 44×44px; focus visible; keyboard works — R-A11Y-01/11
- [ ] Alt text reviewed; headings in order; one h1 — R-A11Y-09/10
- [ ] Works at 320px and at 200% zoom — R-A11Y-16
- [ ] `npm run lint && npm run typecheck && npm run build && npm run test:a11y` pass
- [ ] Lighthouse mobile ≥ 95 for touched routes
- [ ] Updated 06-MEMORY (progress log + next step)
```

---

## 7. Definition of Done (per page or component)

- [ ] Meets every acceptance criterion in 01-PRD for its requirement IDs
- [ ] Matches 05-DESIGN (tokens, spacing, typography, states)
- [ ] Passes axe with zero serious/critical issues
- [ ] Keyboard-only walkthrough completed (Tab, Shift+Tab, Enter, Space, Esc where relevant)
- [ ] Verified at 320, 768, 1024, 1440px
- [ ] Content comes from `src/content/`; no placeholders left unless logged
- [ ] No new dependency, or approval recorded
- [ ] 06-MEMORY updated

---

## 8. AI collaboration protocol

| ID | Rule |
| --- | --- |
| R-AGENT-01 | **Read before writing.** At the start of every session, read all six spec files in the order 06 → 01 → 03 → 05 → 02 → 04. Summarise the current state and next step in two or three sentences before changing any file. |
| R-AGENT-02 | **Plan, then build.** For any task larger than a single component, list the files you will create or change and the requirement IDs they satisfy, then proceed in small, reviewable steps. |
| R-AGENT-03 | **Stay in scope.** Do not refactor, rename, reformat or "improve" files unrelated to the task. Do not add features not in 01-PRD. |
| R-AGENT-04 | **Ask, don't guess,** when: a requirement is ambiguous; content or an asset is missing; two spec files conflict; a dependency seems necessary. State the question, your recommended answer, and wait. |
| R-AGENT-05 | **Never fabricate** content, assets, quotes, statistics, URLs or file paths. Verify a file exists before importing it. |
| R-AGENT-06 | **Specs change by PR.** If reality disagrees with a spec, propose the spec edit in the PR rather than silently diverging. |
| R-AGENT-07 | **Update 06-MEMORY before ending a session or handing off:** files modified, what is complete, what is partially done, the exact next step, new blockers, decisions made. Use the handoff template in 06-MEMORY §9. |
| R-AGENT-08 | **Run the checks** (`lint`, `typecheck`, `build`, `test:a11y`) and report actual results. Do not claim a check passed without running it. |
| R-AGENT-09 | **Use design tokens and existing components first.** Search `src/components/` and `src/content/` before creating anything new. |
| R-AGENT-10 | **Do not fetch assets from the network** (images, fonts, icons). Everything is local or via `next/font`. |

---

## 9. `AGENTS.md` (place in the repository root)

Keep it short; it points to the specs rather than duplicating them.

```md
# Good Hope Manor — Agent Instructions

This project is built spec-first. Before doing anything:

1. Read `docs/spec/06-MEMORY.md` (current state and next step).
2. Read `docs/spec/03-RULES.md` (mandatory rules), then `01-PRD.md`, `05-DESIGN.md`,
   `02-ARCHITECTURE.md`, `04-PHASES.md`.

Non-negotiables:
- Never invent content, quotes, statistics or images. Use `[CONTENT NEEDED: …]` / `[PHOTO NEEDED: …]`.
- Use design tokens and existing components; no raw hex colours; no new dependencies without approval.
- Targets ≥ 44×44px, 18px body text, visible focus, one h1 per page, alt text on every image.
- Phase 1 is a static export: no Server Actions, API routes or middleware.
- Run `npm run lint && npm run typecheck && npm run build && npm run test:a11y` and report real results.
- Before you stop, update `docs/spec/06-MEMORY.md` using its handoff template.
```