# 04 — Phases: Roadmap, Sprints and Milestones

> **Project:** Good Hope Manor website · **Spec set:** v1 · **Last updated:** 2026-11-22
>
> **Spec set:** [01 PRD](./PRD.md) · [02 Architecture](./ARCHITECTURE.md) · [03 Rules](./RULES.md) · [04 Phases](./PHASES.md) · [05 Design](./DESIGN.md) · [06 Memory](./MEMORY.md)

## 1. Overview

| Phase | Goal | Target date | Status |
| --- | --- | --- | --- |
| **Phase 0** — Readiness | Gather source material and resolve launch inputs | Oct 4–6, 2026 (planned) | Source material received; release approvals remain |
| **Phase 1** — Static website | 10-route, accessible Next.js static export | Demo Oct 9–10, 2026 (planned; elapsed) | Implementation complete; production sign-off pending |
| **Phase 2** — Interactive web app | Backend, CRM intake, admin portal, scheduling | After Phase 1 sign-off; dates TBD | Future |

**Phase 1 budget:** 15–20 hours total (set at kickoff, Sept 26). This plan uses **≈ 19 h**, which is at the top of the range. Anything beyond that comes out of the cut list in §7.

---

## 2. Phase 0 — Readiness (parallel to Sprint 1.1)

| ID | Action | Owner | Needed by | Blocks |
| --- | --- | --- | --- | --- |
| P0-01 | Get high-resolution authentic photos into a shared drive (CI-02) | Nintu → client | Oct 6 | Sprint 1.2 imagery (**Blocker 1**) |
| P0-02 | Collect page copy for About, Services, Families, Life captions (CI-03) | Nintu → client | Oct 6 | Sprint 1.2 |
| P0-03 | Collect verbatim review text, Google Business URL (CI-04, CI-10) | Nintu → client | Oct 6–7 | Sprint 1.3 |
| P0-04 | Choose hosting: Vercel vs Cloudflare Pages (OQ-09) — verify commercial-use terms | Akhil | Oct 7 | Sprint 1.4 deploy (**Blocker 2**) |
| P0-05 | Create form endpoint (Formspree or equivalent); share endpoint URL | Aditya / Akhil | Oct 6 | Sprint 1.3 |
| P0-06 | Deliver wireframes: Home + one inner page first, remaining pages after | Reshma | Oct 5 (first), Oct 6 (rest) | Sprint 1.2 layout fidelity |
| P0-07 | Send the open-question list (01-PRD §11.3) to the client | Nintu | Oct 5 | OQ-01 – OQ-10 |
| P0-08 | Confirm address/phone/email, domain, hours | Nintu → client | Oct 5 | NAP data, SEO |

**If inputs are missing:** omit unsupported details or use only verified source material. Do not publish content or photo placeholders; update the content modules when approved source material becomes available.

---

## 3. Phase 1 — Sprints and tasks

> Estimates are working hours. **Done when** points to acceptance criteria in 01-PRD.

### Sprint 1.1 — Setup and design system (≈ 5 h)

| ID | Task | Est. | Owner | Depends on | Implements | Done when |
| --- | --- | --- | --- | --- | --- | --- |
| T-1.1.1 | Scaffold repo with `create-next-app` (TypeScript, Tailwind, ESLint, App Router, `src/`, alias `@/*`); init git; add `.nvmrc`; pin versions; copy specs to `docs/spec/`; add `AGENTS.md` | 0.5 | Aditya | — | 02 §5 | `npm run dev` works; first commit on `main` |
| T-1.1.2 | Configure static export; add design tokens (05 §3); load fonts via `next/font`; write base styles (focus, body, skip-link target) | 1.0 | Aditya | T-1.1.1 | NFR-PERF, R-A11Y-04/05/11 | Token utilities (`bg-brand-primary`, etc.) work; fonts self-hosted; `npm run build` emits `out/` |
| T-1.1.3 | Create `src/content/` modules and `src/types/` (site, navigation, services, reviews, images, faqs) | 0.5 | Aditya | T-1.1.1 | FR-G-07, R-CODE-07 | Verified facts/copy are centralized; no unsupported placeholders are published |
| T-1.1.4 | Build UI primitives: `Button`, `ButtonLink`, `TextLink`, `Container`, `Section`, `Card`, icon set | 1.0 | Aditya (Reshma reviews) | T-1.1.2 | 05 §6 | All states render; 44px targets; focus visible |
| T-1.1.5 | Build layout: `SkipLink`, `SiteHeader` (`UtilityBar`, `MainNav`, `MobileMenu`), `Breadcrumbs`, `SiteFooter`, `StickyMobileBar` | 1.5 | Aditya | T-1.1.4, T-1.1.3 | FR-G-01 – FR-G-06 | Works at 320/768/1024px; keyboard menu; `aria-current` |
| T-1.1.6 | CI: GitHub Actions for lint → typecheck → build; add Playwright + axe smoke test | 0.75 | Aditya | T-1.1.1 | NFR-A11Y-01, NFR-MAINT-01 | CI green on a PR |

**Sprint exit:** layout shell renders on an empty page at all breakpoints; CI green; Reshma has reviewed the primitives.

### Sprint 1.2 — Core pages (≈ 5 h)

| ID | Task | Est. | Owner | Depends on | Implements | Done when |
| --- | --- | --- | --- | --- | --- | --- |
| T-1.2.1 | Home: `HomeHero`, brand promise, `PillarGrid`, `CareApproach`, community-life teaser, reviews teaser, `CtaBand` | 2.5 | Aditya | Sprint 1.1, P0-01, P0-06 | FR-HOME-01 – 08 | H1 + CTA above the fold at 375×667; hero ≤ 150 KB |
| T-1.2.2 | About Us page | 0.75 | Aditya | T-1.2.1 patterns, P0-02 | FR-ABT-01 – 03 | Source-based narrative and CTA; omit leadership details unless supplied |
| T-1.2.3 | Care & Services page with eight client-supplied blocks and a jump list | 1.25 | Aditya | P0-02 | FR-SVC-01 – 04 | Each block has heading + client copy |
| T-1.2.4 | Per-route metadata, `sitemap.ts`, `robots.ts`, `LocalBusiness` JSON-LD | 0.5 | Aditya | OQ-01 | SEO-01 – 06 | Unique title/description per route; valid sitemap; do not emit fake canonical URLs before domain configuration |

**Sprint exit:** Home, About, Services complete and responsive; axe clean on the three pages.

### Sprint 1.3 — Secondary pages and form (≈ 5 h)

| ID | Task | Est. | Owner | Depends on | Implements | Done when |
| --- | --- | --- | --- | --- | --- | --- |
| T-1.3.1 | Life at Good Hope: client-sourced community-life copy and supplied room-photo gallery | 1.25 | Aditya | P0-01, OQ-06 | FR-LIFE-01 – 04 | Static gallery; accurate alt text/captions; do not imply unsupported activities or use unapproved resident photos |
| T-1.3.2 | For Families (+ FAQ with `<details>` if time) | 1.0 | Aditya | P0-02 | FR-FAM-01 – 04 | Three sections; FAQ optional |
| T-1.3.3 | Reviews page: `ReviewList` + `ReviewCard` (static) and Google link | 0.75 | Aditya | P0-03 | FR-REV-01 – 04 | Supplied text verbatim with only supplied source/date; do not invent reviewer names or ratings |
| T-1.3.4 | Contact page: `ContactDetails`, `ContactForm` with validation, error summary, success/failure states, honeypot, tests | 2.0 | Aditya | P0-05 | FR-CON-01 – 09, 01 §6 | Form tests pass; works with JS disabled (native POST) |
| T-1.3.5 | Referral Partners, Privacy Policy and Accessibility routes; complete shared footer links/content | Added scope | Aditya | Verified client brief/reference | FR-REF-01 – 02, FR-LEG-01 – 02, FR-G-04 | Three routes and required footer destinations render and are covered by client-content tests |

**Sprint exit:** all 10 routes exist; the form remains in its documented call-fallback state until an approved endpoint is configured.

### Sprint 1.4 — QA, hosting and handoff (≈ 4 h)

| ID | Task | Est. | Owner | Depends on | Implements | Done when |
| --- | --- | --- | --- | --- | --- | --- |
| T-1.4.1 | Accessibility audit and fixes (automated + manual; §5.1) | 1.5 | Aditya | Sprint 1.3 | NFR-A11Y-01 – 05 | axe 0 serious/critical; manual checklist signed |
| T-1.4.2 | Cross-browser and device pass (§5.3) | 1.0 | Aditya | Sprint 1.3 | NFR-BRW-01, NFR-RESP-01 | Matrix complete; defects fixed or logged |
| T-1.4.3 | Lighthouse tuning (images, fonts, JS size) | 0.75 | Aditya | Sprint 1.3 | NFR-PERF-01 – 04 | ≥ 95 mobile on all routes |
| T-1.4.4 | Deploy to chosen host; set security headers; connect domain/DNS if ready; write hosting handoff note | 0.5 | Akhil / Aditya | P0-04 | 02 §6, §8 | HTTPS URL live; headers verified |
| T-1.4.5 | Demo prep: script, test on phone, fallback URL | 0.25 | Aditya / Nintu | T-1.4.4 | — | Dry run complete |

**Sprint exit:** production or preview URL live and passing all gates in §5.

---

## 4. Day-by-day schedule (IST)

| Date | Day | Focus | Hours | Checkpoint |
| --- | --- | --- | --- | --- |
| Oct 4 | Sun | Phase 0 kickoff; T-1.1.1, T-1.1.2, start T-1.1.3 | ~2 | Repo scaffolded; tokens in place; questions sent (P0-07) |
| Oct 5 | Mon | Finish Sprint 1.1 (T-1.1.3 – T-1.1.6) | ~3 | Layout shell + CI green; first wireframes arrive (P0-06) |
| Oct 6 | Tue | Sprint 1.2: Home first, then About | ~4 | Home reviewed by Reshma; photos/copy due |
| Oct 7 | Wed | Finish Sprint 1.2; Sprint 1.3: Life, Families, Reviews | ~4.5 | Hosting choice due; reviews text due |
| Oct 8 | Thu | Contact + form; then Sprint 1.4: a11y, cross-browser, Lighthouse, deploy | ~5 | Preview URL live |
| Oct 9 | Fri | Fixes, demo prep, DNS if ready; **demo window opens** | ~1–2 | Dry run done |
| Oct 10 | Sat | **Demo window closes**; buffer only | — | Sign-off recorded in 06-MEMORY |

This assumes roughly 3–5 focused hours on working days. If availability is lower, cut per §7 rather than extend the date.

---

## 5. QA and launch checklist

### 5.1 Accessibility

- [ ] axe (Playwright) on all 10 routes + 404: zero serious/critical
- [ ] Lighthouse Accessibility = 100 on all routes
- [ ] **Keyboard only:** Tab through every page; focus order is logical; focus always visible; menu opens/closes with keyboard; Esc closes the mobile menu and returns focus to the "Menu" button
- [ ] Skip link works on every page
- [ ] **Screen reader:** VoiceOver (Safari, macOS or iOS) and NVDA (Windows, Firefox/Chrome): landmarks, headings list, link list, form labels, error announcements, success announcement
- [ ] **Zoom:** 200% browser zoom is usable; 320px width / 400% zoom has no horizontal scroll
- [ ] **Text spacing** override (line-height 1.5, paragraph spacing 2×, letter-spacing 0.12em, word-spacing 0.16em) does not clip content
- [ ] **Reduced motion** (OS setting on): no hover lift, no transitions
- [ ] **Forced colors / Windows High Contrast:** focus outlines and button boundaries remain visible
- [ ] Colour contrast: only pairings from 05-DESIGN §2.3 are used
- [ ] Every image has correct `alt` (or `alt=""` if decorative)
- [ ] Touch targets measured ≥ 44×44px (DevTools overlay) with ≥ 8px spacing

### 5.2 Performance

- [ ] Lighthouse mobile Performance ≥ 95 on every route
- [ ] LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms
- [ ] JS ≤ 150 KB gzipped per route; hero ≤ 150 KB; other images ≤ 200 KB
- [ ] Zero third-party requests (except the form POST)
- [ ] Throttled "Fast 4G" load < 3 s

### 5.3 Browsers and devices

| Environment | Pass |
| --- | --- |
| Chrome (latest, desktop) | ☐ |
| Firefox (latest, desktop) | ☐ |
| Safari (latest, macOS) | ☐ |
| Edge (latest, desktop) | ☐ |
| Safari on iPhone (real device) | ☐ |
| Chrome on Android (real device or emulator) | ☐ |
| Tablet width (768px) in iPad emulation | ☐ |
| Viewports: 320, 375, 768, 1024, 1440px | ☐ |

### 5.4 Functional

- [ ] All internal links resolve; no 404s (crawl `out/`)
- [ ] `tel:` link dials `+19546772900` on a phone
- [ ] Form: empty submit → error summary and focus; invalid phone → clear message; valid → success state and focus move; network failure → values preserved with phone fallback; honeypot filled → no visible success misuse
- [ ] Form works with JavaScript disabled
- [ ] Current page is marked in nav on every route; breadcrumbs correct
- [ ] 404 page renders with header/footer

### 5.5 Content and release gates

- [ ] `npm run check:content` reports no content/photo placeholders
- [ ] Client reconfirms address, phone, email, fax and hours; official business profile URL remains unprovided
- [ ] Review text is verified verbatim against source and client authorization is confirmed
- [ ] No resident photos are published unless a release is confirmed
- [ ] Sitemap and robots valid; canonical URLs use the final domain
- [ ] Security headers present (02 §8); CSP in Report-Only is acceptable for the demo
- [ ] HTTPS works on apex and `www`; one redirects to the other
- [ ] PM (Nintu) signs off; recorded in 06-MEMORY

---

## 6. Phase 2 — Interactive web app

> Sizes are rough T-shirt estimates (S ≈ days, M ≈ 1–2 weeks, L ≈ several weeks) for planning only. Re-estimate at Milestone 2.0.

### Milestone 2.0 — Decisions and discovery (S)

| Item | Detail |
| --- | --- |
| Entry | Phase 1 signed off |
| Decide | Hosting runtime (drop `output: 'export'`?); modular monolith vs separate services (02 §9.2); CRM product; email/SMS provider; data retention; who administers the system |
| Compliance | Legal/privacy review of what prospect information may be stored (02 §9.4) |
| Exit | Written decisions in 06-MEMORY; updated 02-ARCHITECTURE; estimates refreshed |

### Milestone 2.1 — Backend infrastructure (M)

| Item | Detail |
| --- | --- |
| Deliverables | API layer with routing, request validation, throttling/rate limits, API policies; **Auth Service** (admin login, MFA, RBAC, sessions) |
| Entry | M2.0 exit |
| Exit | Authenticated admin can log in; every route handler enforces role checks; automated tests cover auth |

### Milestone 2.2 — CRM and intake integration (M)

| Item | Detail |
| --- | --- |
| Deliverables | **Inquiry Service**: contact and tour-request forms post to our API; leads pushed to CRM/Intake for tracking, follow-ups, contact history; **Notification Service** for staff alerts and family confirmations |
| Entry | M2.1 exit; CRM chosen |
| Exit | A form submission appears in the CRM and triggers a staff notification; Formspree retired |

### Milestone 2.3 — Admin portal and scheduling (L)

| Item | Detail |
| --- | --- |
| Deliverables | Secure React dashboard: review leads, update statuses, manage selected site content; **Schedule Service** with real-time tour-slot selection and confirmation |
| Entry | M2.2 exit |
| Exit | Staff can manage a lead from inquiry to booked tour without leaving the portal; families pick a tour time online |

### Milestone 2.4 — Data persistence and resilience (M)

| Item | Detail |
| --- | --- |
| Deliverables | Relational database and migrations (users, roles, inquiries, bookings); object storage for brochures/PDFs; session cache; automated backups and a tested restore (DR) |
| Entry | Can start alongside M2.1 for schema work |
| Exit | Restore from backup tested; retention policy implemented |

---

## 7. Schedule risk: ranked cut list

If time runs short, cut from the top; **never** cut accessibility, the contact form, or NAP accuracy.

| Rank | Cut | Requirement | Effect |
| --- | --- | --- | --- |
| 1 | FAQ on For Families | FR-FAM-04 | None for demo |
| 2 | `LocalBusiness` JSON-LD | SEO-02 | Minor SEO |
| 3 | Closing CTA band on Home | FR-HOME-08 | Fewer conversion prompts |
| 4 | Jump list on Services | FR-SVC-03 | Slightly longer scroll |
| 5 | Footer help line | FR-G-10 | Minor |
| 6 | Custom 404 | FR-G-09 | Default 404 page |
| 7 | Open Graph image | SEO-03 | Plain link previews |

---

## 8. Change control

- Scope changes require PM (Nintu) approval and a line in 06-MEMORY §5 (Decisions).
- Adding a page = new route in 01-PRD §4.1, new tasks here, new tests.
- Date changes are recorded with the reason; the cut list in §7 is applied before dates move.