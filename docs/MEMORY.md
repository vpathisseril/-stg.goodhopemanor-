# 06 — Memory: Project State and Handoff Tracking

> **Project:** Good Hope Manor website · **Spec set:** v2.1 · **Last updated:** 2026-11-25
>
> **Spec set:** [01 PRD](./PRD.md) · [02 Architecture](./ARCHITECTURE.md) · [03 Rules](./RULES.md) · [04 Phases](./PHASES.md) · [05 Design](./DESIGN.md) · [06 Memory](./MEMORY.md)

## 0. How to use this file

**This is the only spec file that changes every session.** Humans and AI agents **MUST** read it first and update it last (03-RULES R-AGENT-01, R-AGENT-07).

- Keep entries short and factual: what changed, what is true now, what comes next.
- Newest entries go at the **top** of each log.
- Never delete history; mark superseded items `(superseded by D-00X)`.
- If this file and reality disagree, fix this file.

---

## 1. Project snapshot

| Field | Value |
| --- | --- |
| Project | Good Hope Manor website |
| Client | Good Hope Manor — assisted living community, 2251 NW 29th Ct., Oakland Park, FL 33311 · (954) 677-2900 · info@goodhopemanor.com · fax (954) 486-5335 (verified brief/live reference; reconfirm before release) |
| Brand line | "A Place to Call Home. Quality Care Without Compromise." |
| Current phase | **Phase 1** — implementation complete; client approvals and release checks pending |
| Spec version | v2.1 (six files) |
| Demo window | **October 9–10, 2026** |
| Phase 1 budget | 15–20 hours (set at kickoff, Sept 26) |
| Code status | **10 static public routes implemented** with client-supplied care/referral/review copy, contact details, footer disclosures, privacy/accessibility routes, and client-content tests; Documents/login/admin remains deferred. Home uses six supplied interior photos plus two owner-approved garden concepts; their accessible text identifies them as illustrative, not actual residents, staff, or services. Next.js 16.4.6. Latest `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:a11y` (11), `npm test` (35), and `npm run check:content` all pass after restoration. Build warns when `NEXT_PUBLIC_SITE_URL` is unset. Earlier full dependency audit reported 9 development/transitive findings (8 moderate, 1 high); not rerun in this implementation pass. |
| Repo | `yantralabs101-arch/Good-Hope-Manor` |
| Active branch | `feature/alpha-build-website-r-01`, based on `develop`; HEAD `eb17f00` (`Some UI changes for Home page`) matches `origin/feature/alpha-build-website-r-01`; additional local changes are uncommitted |
| Hosting | **Cloudflare Pages selected for Phase 1 static hosting**; project/deployment setup pending |
| Domain | *(unknown — OQ-01)* |
| Form endpoint | *(not created — P0-05)* |
| Pinned versions | Node 22.19.0 (`.nvmrc`); Next.js 16.4.6; React 19.3.0; Tailwind CSS 4.3.3; TypeScript 5.9.3 |
| Last updated | 2026-11-25 |

---

## 2. Team and roles

| Person | Role | Responsibility | Time zone (October) |
| --- | --- | --- | --- |
| **Reshma** | Design lead | Wireframes, visual design, design system, design review | New Zealand (NZDT, UTC+13) |
| **Aditya** | Developer and QA | Implementation, test cases, testing | India (IST, UTC+5:30) |
| **Akhil** | Hosting research | Hosting recommendation, setup guide, DNS handoff | India (IST, UTC+5:30) |
| **Nintu Biju** | Documentation and PM | Meeting minutes, spec files, tracking, client liaison | US Eastern (EDT, UTC−4 until Nov 1; then EST, UTC−5) |
| **Varghese MP** | Mentor | Guidance and strategic support | *(not recorded)* |

**Scheduling aid:** a call at **06:00 IST** is 13:30 in New Zealand and 20:30 the previous evening in US Eastern. That is the easiest three-way overlap.

---

## 3. Current state

### 3.1 Done

- [x] Kickoff meeting (Sept 26)
- [x] Client information, brand positioning and page structure captured (Sept 27)
- [x] Architecture pivoted to Next.js + Tailwind (Oct 4)
- [x] Specification rewritten as **six separate markdown files**, v2.1 (Oct 4)
- [x] Design token contrast ratios computed and recorded (05-DESIGN §2.3)
- [x] Created `PR/alpha-mvp-website-ad` from `PR/docs-assets`
- [x] Implemented ten static routes, shared accessible site chrome, content modules, metadata, sitemap and robots
- [x] Added contact-form validation/progressive enhancement, call fallback without an approved endpoint, and automated tests/CI
- [x] Replaced visible site placeholders with concise copy grounded in the project documents; no content/photo placeholder markers remain in the rendered routes
- [x] Added six metadata-stripped WebP derivatives from supplied, unwatermarked room photos; two visibly watermarked images are excluded
- [x] Added the client-supplied care/service hierarchy, qualified admissions copy, family FAQ, referral page, and three verbatim supplied review excerpts with source/date labels
- [x] Added the supplied privacy and accessibility statements, footer license/service disclosure, email/fax, and AHCA consumer-information link
- [x] Restored the two owner-approved garden concepts to the Home hero and care approach; accessible text identifies them as illustrative rather than actual residents or staff
- [x] Updated display/body typography to Newsreader and Source Sans 3, drawing on the user-provided reference site's editorial style while retaining the documented brand palette
- [x] Lint, typecheck, static build, placeholder check and client-content checks pass; all 35 Playwright tests and 11 route/not-found axe tests pass

### 3.2 In progress

- [ ] Rerun Lighthouse against the expanded 10-route build; prior scores (Home 92/94, Services 94 once) are historical and do not verify the current version
- [ ] Manual keyboard, screen-reader and cross-browser review
- [ ] Client/regulatory review of care/admission wording; reconfirm address, contact details and hours; confirm photo authenticity/rights and review authorization; configure production domain and approved form endpoint

### 3.3 Immediate next action (Aditya)

1. Complete client/regulatory approval of published copy and image/review permissions; reconfirm contact details and hours.
2. Set `NEXT_PUBLIC_SITE_URL`, configure an approved HTTPS form endpoint and hosting, and rerun Lighthouse on the 10-route build.
3. Use Node 22.19.0 from `.nvmrc`, review the outstanding dependency-audit findings, and complete keyboard/screen-reader/cross-browser checks.

---

## 4. Blockers and open questions

### 4.1 Blockers

| ID | Blocker | Owner | Needed by | Status |
| --- | --- | --- | --- | --- |
| B-1 | Confirm supplied interior images are authentic and approved for use; obtain releases before any future resident imagery | Nintu → client | Oct 6 | Six supplied unwatermarked room images are displayed; two watermarked images excluded; image approval remains unconfirmed |
| B-2 | Final hosting choice (Vercel vs Cloudflare Pages) | Akhil | Oct 7 | Resolved: Cloudflare Pages selected; deployment setup pending |
| B-3 | Approved form endpoint not created | Aditya / Akhil | Oct 6 | Open; form uses call fallback |
| B-4 | Wireframe handoff/status | Reshma | Oct 5 (first), Oct 6 (rest) | Not confirmed; MVP follows DESIGN.md |

### 4.2 Open questions (full text in 01-PRD §11.3)

| ID | Question | Owner | Status |
| --- | --- | --- | --- |
| OQ-01 | Final production domain | Akhil / client | Open |
| OQ-02 | Omit Memory Care/Dementia Care marketing categories unless separately authorized | Client brief | Resolved in copy |
| OQ-03 | Use supplied license wording and common footer service qualification | Client brief | Implemented; final regulatory review pending |
| OQ-04 | Use live-reference privacy/accessibility statements and add local routes | Client reference | Implemented |
| OQ-05 | Confirm authorization for the supplied review excerpts | Client | Pending final confirmation |
| OQ-06 | No resident photos currently published; confirm releases before any future resident imagery | Nintu → client | Not needed for current imagery; confirm before adding resident photos |
| OQ-07 | Analytics wanted? | Nintu → client | Open |
| OQ-08 | Future languages | Nintu → client | Open |
| OQ-09 | Hosting platform | Akhil | Resolved: Cloudflare Pages for Phase 1 static hosting |
| OQ-10 | Public email supplied as `info@goodhopemanor.com` | Client brief/live reference | Implemented; reconfirm before release |

### 4.3 Content still needed

Tracked in 01-PRD §9 (CI-01 – CI-12). Update statuses here when items arrive:

| ID | Item | Status |
| --- | --- | --- |
| CI-01 | Logo | Needed |
| CI-02 | Photography | Supplied interior photos are displayed; authenticity/usage approval remains unconfirmed; generated imagery is not rendered |
| CI-03 | Page copy | Verified brief copy implemented; final client/regulatory review remains |
| CI-04 | Review text | Three excerpts supplied and implemented; confirm authorization before release |
| CI-05 | Leadership info | Needed |
| CI-06 | Hours | Published on live Contact reference; reconfirm |
| CI-07 | NAP confirmation | Address, phone, email and fax sourced; reconfirm |
| CI-08 | Privacy policy | Live-reference privacy statement implemented at `/privacy/`; legal completeness not independently assessed |
| CI-09 | Regulatory wording | Supplied license wording and footer note implemented; review pending |
| CI-10 | Google Business URL | Official profile URL not supplied; Google Maps lookup fallback remains |
| CI-11 | Photo releases | No resident photos are displayed; confirm releases before using any in future |
| CI-12 | Domain | Needed |

---

## 5. Decisions log (newest first)

| ID | Date | Decision | Reason | Owner |
| --- | --- | --- | --- | --- |
| D-014 | 2026-11-25 | Use Cloudflare Pages Git integration for Phase 1 static hosting; keep GoDaddy as domain registrar/DNS provider until an approved custom-domain cutover | The existing site is a static export; a `pages.dev` deployment can be published without DNS changes, with `www` connected later if approved | Project team |
| D-013 | 2026-11-22 | Restore the existing garden-laughter and garden-caregiving concept images on Home; identify them as illustrative in accessible text | The user clarified these were intentional project concepts and asked to restore them; they are not described as actual Good Hope Manor residents, staff, or services | Aditya |
| D-012 | 2026-11-22 | Implement the verified client brief as a 10-route public site; defer Documents/login/admin functionality | The brief adds Referral Partners, Privacy Policy and Accessibility and supplies the related care, contact, review and footer copy; the user explicitly deferred the document portal | Aditya |
| D-011 | 2026-11-22 | Do not render generated garden/caregiver photos or conceptual activity illustrations; use supplied room photography *(superseded by D-013 for the two named garden concepts)* | The client requires genuine Good Hope Manor photos and asks to remove AI/watermarked imagery | Aditya |
| D-010 | 2026-11-22 | Upgrade the pinned Next.js runtime from 16.4.4 to 16.4.6 (`adafbd9`) | The installed version triggered a security-upgrade recommendation; the patched runtime passed the existing automated checks | Copilot |
| D-009 | 2026-10-10 | Adopted Newsreader headings and Source Sans 3 body text, and added original conceptual activity illustrations with an explicit disclosure; retained the documented brand palette and separated concepts from authentic supplied photography *(illustration decision superseded by D-011)* | Bring the user-approved reference site's editorial warmth into the site without implying unverified facility details or misrepresenting images | Aditya |
| D-008 | 2026-10-10 | Replaced visible placeholders with source-grounded copy, optimized supplied unwatermarked room photos, and a Google Maps search fallback; did not invent review text or an official profile URL | Show available client material while preserving factual accuracy and static export | Aditya |
| D-007 | 2026-10-10 | Implemented the Phase 1 MVP on `PR/alpha-mvp-website-ad`, branched from `PR/docs-assets`; client-dependent copy and photos remain explicit placeholders *(superseded by D-008)* | Do not invent care claims or publish unapproved imagery; keep static export and client-side content structure | Aditya |
| D-006 | 2026-10-04 | Reviews and galleries are **static grids**; no auto-advancing slider (`TestimonialSlider` replaced by `ReviewList`/`ReviewCard`) | Accessibility for screen-reader, cognitive and motor needs | Spec v2.1 |
| D-005 | 2026-10-04 | `brand-accent` is decorative only; error/success colours and two tints added (pending Reshma approval) | Computed contrast: accent on base is 2.51:1, white on accent 2.69:1 | Spec v2.1 |
| D-004 | 2026-10-04 | Phase 1 uses `output: 'export'` with `images.unoptimized: true`; no Server Actions/API routes/middleware | Static export limits; Phase 2 must drop export | Spec v2.1 |
| D-003 | 2026-10-04 | Spec delivered as **six separate markdown files** in the root `docs/` directory (earlier draft called itself a single "HTML master document") | Easier for IDE/agents to load, review and update individually | Aditya |
| D-002 | 2026-10-04 | Primary brand colour is `#8a1f2d` | Matches the core business-name colour requirement | Spec v2.0 |
| D-001 | 2026-10-04 | Move from Vanilla HTML/CSS/JS to **Next.js (App Router) + Tailwind** | Repo handoff to DNS/hosting company and Phase 2 growth path | Spec v2.0 |
| *(pending)* | — | Hosting: Vercel vs Cloudflare Pages | Resolved by D-014; deploy setup remains pending | Project team |

---

## 6. Spec change log: v2.0 draft → v2.1

What was changed when the earlier consolidated draft was split, and why. Each item can be reverted by editing the named file.

| # | Change | File | Reason |
| --- | --- | --- | --- |
| 1 | Split into six files; removed "single HTML master document" wording | All | The draft contradicted itself (said markdown files, called itself HTML) |
| 2 | Added requirement IDs, MoSCoW priorities and measurable acceptance criteria | 01 | Makes the spec testable |
| 3 | Added contact-form field spec, validation and privacy rules | 01 | Draft said "form collecting basic lead info" only |
| 4 | Added content inventory, risks, open questions | 01, 06 | Several content gaps would otherwise have been filled by invention |
| 5 | Flagged: "memory support" in brand copy but absent from Services list | 01 | OQ-02 |
| 6 | Documented static-export limitations and Phase 2 impact | 02 | "No rewrite" in the draft was optimistic: removing static export is required |
| 7 | Added Tailwind v3/v4 note; tokens given in both forms | 02, 05 | Scaffold may not create `tailwind.config.ts` |
| 8 | `globals.css` moved to `src/app/`; added `src/content/`, `src/types/`, `tests/`, `scripts/` | 02 | Matches scaffold; enables content swap and automated gates |
| 9 | Hosting comparison with commercial-use caution | 02 | Free tiers can restrict commercial use; verify before choosing |
| 10 | Security headers set in host config | 02 | `next.config` headers don't apply to static export |
| 11 | Phase 2 "modular monolith first" recommendation | 02 | Five services + GSLB is heavy for one community site |
| 12 | Clarified 44px rule for inline links; added focus-outline, forced-colors, reduced-motion, no-carousel rules | 03 | Practical and testable |
| 13 | Added content rules (no invented content, verbatim reviews, photo consent, vocabulary) | 03 | Trust, privacy and regulatory risk |
| 14 | Added dependency allow/forbid table and dev-tooling allowlist | 03 | Draft banned libraries but allowed none of the test tooling it needs |
| 15 | Added `AGENTS.md` and AI protocol rules | 03 | Gets agents to read the specs and update memory |
| 16 | Day-by-day plan, task IDs, estimates, QA checklist, ranked cut list | 04 | Draft had sprint names only |
| 17 | Added Milestone 2.0 (decisions, compliance) before backend work | 04 | Key Phase 2 decisions are unresolved |
| 18 | Contrast matrix computed; accent restricted to decorative; tints and status colours added | 05 | Accent fails AA as text or border |
| 19 | `rounded-md` → `rounded-lg` for buttons | 05 | In Tailwind `rounded-md` is 6px; the spec said 8px |
| 20 | Font recommendation Merriweather + Inter, with criteria | 05 | Playfair's hairlines are hard to read for low vision |
| 21 | Time zones corrected for October (NZDT and EDT, not NZST/EST) | 06 | Daylight saving is in effect |

---

## 7. Progress and handoff log (newest first)

| Date | Who | What happened | Files touched | Next step |
| --- | --- | --- | --- | --- |
| 2026-11-25 | Copilot | Added `docs/DEPLOYMENT.md` describing Cloudflare Pages Git setup, a `pages.dev` deployment that leaves GoDaddy DNS unchanged, custom `www` publishing that changes only its DNS record, and the limits of the mentor’s `/stg/` proposal with the current root-based export. Confirmed the existing GitHub Actions workflow checks pull requests and `main`; no Cloudflare project or deployment was created. Recorded the Phase 1 Cloudflare decision (D-014). | `docs/DEPLOYMENT.md`, `docs/MEMORY.md` | Connect the GitHub repository to Cloudflare Pages, deploy and check the `pages.dev` build; connect `www` only after client approval |
| 2026-11-22 | Copilot | Implemented the verified client requirements across the 10-route static site: updated client copy/service hierarchy, added Referral Partners, Privacy Policy and Accessibility routes, supplied review excerpts/contact/footer information, and restored two owner-approved garden illustrations at the user's request. Their accessible text identifies them as illustrative. Added client-specific Playwright checks and updated route/design/readiness documentation. Lint, typecheck, build, 11 axe checks, 35 Playwright tests, and content check pass; build notes `NEXT_PUBLIC_SITE_URL` is unset. Login/document administration remains deferred. | `src/`, `tests/`, `README.md`, `docs/PRD.md`, `docs/DESIGN.md`, `docs/ARCHITECTURE.md`, `docs/PHASES.md`, `docs/CLIENT-REQUIREMENTS-READINESS.md`, `docs/MEMORY.md` | Obtain final client/regulatory approval for copy/contact details and actual interior-photo/review permissions; configure domain and approved form endpoint; rerun Lighthouse/dependency audit and release checks on Node 22.19.0 |
| 2026-11-22 | Copilot | Ran and committed the approved Next.js security update as `adafbd9`; package manifest/lockfile now pin 16.4.6 (the previously installed package was 16.4.0 despite the manifest's 16.4.4). `npm test` (26), `npm run test:a11y` (8), lint, typecheck, static build, and placeholder check pass. Production dependency audit is clear; full audit reports 9 development/transitive findings (8 moderate, 1 high). Tests ran on Node 22.18.0 rather than the pinned 22.19.0; Lighthouse reports the runtime is below its engine requirement. Updated the readiness report with final results. | `package.json`, `package-lock.json`, `docs/CLIENT-REQUIREMENTS-READINESS.md`, `docs/MEMORY.md` | Address dependency audit findings; use Node 22.19.0 for final verification; resolve the client content and manual-review items in the readiness report |
| 2026-11-22 | Copilot | Compared the client-provided verified website brief with the current source and existing automated checks; added `docs/CLIENT-REQUIREMENTS-READINESS.md`. `npm run lint` (retry), `npm run typecheck`, and `npm run check:content` pass. `npm test` did not start because the Next.js dev server displayed a security-upgrade recommendation and exited; no Playwright tests ran. No site implementation was changed. | `docs/CLIENT-REQUIREMENTS-READINESS.md`, `docs/MEMORY.md` | Confirm client/regulatory copy, contact details, review/image permissions and destinations; decide how to handle the Next.js security upgrade, then rerun blocked tests and production build |
| 2026-11-10 | Reshma (with Copilot) | Audited and updated this handoff against the active feature branch. Branch `feature/alpha-build-website-r-01` is based on `develop`; commit `eb17f00` (26 files) refreshes the homepage and care/gallery sections, adds supplied brand/design assets and image-optimization updates, refines responsive header/container styling and page copy, updates design guidance, enables the Next.js security upgrade policy, and adds related Playwright coverage. Current uncommitted changes are the hero's feathered 3px/2px/1.5px blur, shared main-navigation pill styling/color inversion, this memory update, and deletions of `assets/Bougainvillea_background.png` and `assets/Dreamy Ivory Bougainvillea Petals.png`; the reason for those two deletions is unknown, so they were left untouched. | `docs/MEMORY.md` (branch work also includes the files recorded in the existing 2026-11-08 entries) | Confirm whether the two uncommitted asset deletions are intended; review and commit desired local changes |
| 2026-11-10 | Reshma (with Copilot) | Swapped the primary-navigation pill colors as requested: all links use the former active crimson/white colors, while the current-page link uses the former inactive warm-neutral/dark-text colors. Removed the selected underline and retained bold text plus `aria-current`. Final production-browser checks on Home (desktop, 1440px) and About Us (mobile, 390px) confirm the color swap, no underline, and 44px targets. Lint, TypeScript, and production build pass after the final change. The 8 axe tests and 16 navigation tests passed earlier in this same styling task, before the final color-only swap. Build warns when `NEXT_PUBLIC_SITE_URL` is unset. | `src/components/layout/NavLinkList.tsx`, `docs/MEMORY.md` | Confirm supplied photography authenticity and usage approval before production |
| 2026-11-10 | Reshma (with Copilot) | Corrected the navigation styling scope after the prior edit changed the Services-page jump links instead of the primary nav. Restored the service jump links and applied responsive pill styling to the shared Home/About/Services/etc. links in desktop and mobile navigation, retaining destinations, `aria-current`, and an underline/bold active marker. Browser checks at 1440px and 390px confirmed desktop/mobile pills; the 1024px desktop nav wraps without overflow. Lint, TypeScript, production build, and all 8 axe tests pass; build warns when `NEXT_PUBLIC_SITE_URL` is unset. | `src/components/layout/NavLinkList.tsx`, `src/app/services/page.tsx`, `src/app/globals.css`, `docs/MEMORY.md` | Confirm supplied photography authenticity and usage approval before production |
| 2026-11-10 | Reshma (with Copilot) | Restyled the Services-page section jump links as responsive pill-shaped buttons with roomy padding, subtle inactive borders, hover/transition states, and a distinct selected style for the current hash target. Hash destinations and section structure are unchanged. Browser checks at 1440, 390, and 320px confirmed wrapping without horizontal overflow and retained 44px targets. Lint, TypeScript, production build, and all 8 axe tests pass; build warns when `NEXT_PUBLIC_SITE_URL` is unset. *(Reverted as out of scope by the following correction.)* | `src/app/services/page.tsx`, `src/app/globals.css`, `docs/MEMORY.md` | Confirm supplied photography authenticity and usage approval before production |
| 2026-11-10 | Reshma (with Copilot) | Increased backdrop blur within the same feathered hero text-area mask from 2px/1.5px/1px to 3px/2px/1.5px at desktop/tablet/mobile; photo and foreground remain unchanged. Lint passes. The shared `localhost:3000` preview still serves previously compiled CSS (2px/1.5px/1px); did not restart its pre-existing server. | `src/app/globals.css`, `docs/MEMORY.md` | Refresh the existing dev server to verify the updated responsive blur in-browser |
| 2026-11-10 | Reshma (with Copilot) | Refined the homepage hero's localized backdrop blur with a responsive feathered mask that fades nearly clear at the text-area edges; blur remains 2px desktop, 1.5px tablet, and 1px mobile. The background photo, text, typography, layout, and CTAs are unchanged. Browser review and computed-style checks at 1920×1080, 1440×900, 1024×768, 768×1024, and 390×844 confirmed sharp foreground text, pointer-transparent blur, and unchanged CTA links. Lint, TypeScript, isolated production build, and all 8 axe tests pass. The standard a11y web-server startup encountered the existing shared Next dev lock; rerunning against the existing preview passed. Build warns when `NEXT_PUBLIC_SITE_URL` is unset. | `src/app/globals.css`, `docs/MEMORY.md` | Confirm supplied photography authenticity and usage approval before production |
| 2026-11-08 | Reshma (with Copilot) | Added a restrained section-only rose tint to “Spaces to picture everyday life,” mixing 4% `brand-primary` into `neutral-base`; photography, content, layout, and gallery behavior are unchanged. Lint, TypeScript, production build, responsive gallery Playwright test (1440/768/390/320), production-browser review at 1440×900, 768×1024, and 390×844, and a gallery-scoped axe check passed. No page overflow; heading and link contrast measured 15.18:1 and 7.50:1. Full axe suite had 5 passes and 3 pre-existing global navigation touch-target failures on Home, Services, and Life; build notes `NEXT_PUBLIC_SITE_URL` is unset. | `src/components/sections/CommunityLifeTeaser.tsx`, `src/app/globals.css`, `tests/navigation.spec.ts`, `docs/MEMORY.md` | Confirm supplied photography authenticity and usage approval before production |
| 2026-11-08 | Reshma (with Copilot) | Updated both homepage editorial sections to use corner crops from `Delicate Rose Petals on Ivory.png`. The two responsive image layers retain their source proportions, use no added blur or overlay, and sit on the warm-sand token background; section copy and layout are unchanged. Lint, TypeScript, production build, responsive Playwright assertions (1920×1080, 1440×900, 1024×768, 768×1024, 390×844, 375×667, and 844×390), desktop/tablet/mobile browser review, and a section-scoped axe check passed. The full accessibility suite had 6 passes and 2 unrelated failures: an existing homepage navigation touch-target-size violation and an intermittent connection refusal on `/services/`. | `scripts/optimize-images.mjs`, `src/content/images.ts`, `src/components/sections/CornerPetalBackground.tsx`, `src/components/sections/CareApproach.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `tests/navigation.spec.ts`, `docs/MEMORY.md` | Confirm supplied image usage rights before production |
| 2026-11-08 | Reshma (with Copilot) | Added a shared, clipped background layer behind the homepage brand-promise and family care-approach sections, using the supplied `Dreamy Ivory Bougainvillea Petals.png` asset. The optimized image used a subtle responsive blur, light warm overlay, and breakpoint-specific positioning; foreground text and links remained unfiltered. Lint, TypeScript, production build, responsive browser assertions (1440/768/390/320px), desktop/mobile visual review, and homepage axe check passed. Full axe suite had 5 passes and 3 environment-related failures: two static-server connection drops (`/` and `/life/`) and the static server's 404 response for `/not-a-page/`; no section-specific accessibility issue was reported. | `scripts/optimize-images.mjs`, `src/content/images.ts`, `src/components/sections/BougainvilleaBackground.tsx`, `src/components/sections/CareApproach.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `tests/navigation.spec.ts`, `docs/MEMORY.md` | Retry the full accessibility suite with a stable server that supports the not-found route; confirm supplied asset usage rights before production |
| 2026-11-06 | Reshma (with Copilot) | Redesigned “Spaces to picture everyday life” as a responsive editorial photo strip using all six eligible, unwatermarked interior images (`living_room3.jpg`, `dining_room_blue.jpg`, `bedroom_ivoryblue.jpg`, `living_room2.jpg`, `dining_room_red.png`, `washing_closet.jpg`). The gallery is manually navigable rather than auto-advancing, following R-A11Y-12; it supports touch scrolling, keyboard arrows, accessible controls, and reduced-motion-aware scrolling. Focused gallery Playwright checks, homepage axe, responsive checks at 1440/768/390/320 widths, isolated production build, typecheck, focused lint, and full lint pass; no horizontal page overflow. The full accessibility suite had 6 passes and 2 unrelated failures: existing `/about/` target-size findings and the not-found assertion against the temporary Python static server. | `src/components/sections/CommunityLifeTeaser.tsx`, `src/components/sections/CommunityPhotoGallery.tsx`, `src/content/images.ts`, `tests/navigation.spec.ts`, `docs/MEMORY.md` | Confirm supplied interior-photo authenticity and usage approval before production |
| 2026-11-06 | Reshma (with Copilot) | Refined “Start with what your family needs to know” into an editorial layout with a distinct Newsreader heading, comfortable supporting copy, and a clearer services link, preserving existing text, destination, and tint. Browser previews at 1440, 1024, 768, 390, and 320 CSS px showed the intended desktop two-column / smaller-screen stacked layout and no horizontal overflow. Targeted ESLint, TypeScript, image optimization, and isolated production build pass. Focused Playwright startup timed out waiting for the isolated dev server. | `src/components/sections/CareApproach.tsx`, `tests/navigation.spec.ts`, `docs/MEMORY.md` | Re-run the focused Playwright test when isolated dev-server startup is healthy |
| 2026-11-06 | Reshma (with Copilot) | Removed the visible “Illustrative image” badge from the care-and-connection section at the user’s request. Kept the image’s accessible alt text identifying it as illustrative and updated the responsive browser test to confirm the badge is absent. | `src/components/sections/PillarGrid.tsx`, `tests/navigation.spec.ts`, `docs/MEMORY.md` | Revisit visible image disclosure if the image is replaced or approved for real facility use |
| 2026-11-06 | Reshma (with Copilot) | Redesigned the “Care and connection, considered together” section around the generated garden caregiving image, with an image-only responsive blur, editorial content layout, accessible image description, and visible illustrative-image disclosure. Reduced the warm overlay after desktop/tablet/mobile browser previews showed the initial treatment washed out the photo; source-equivalent overlay rules were injected because the shared server served stale CSS. Responsive previews showed the interaction remained recognizable and no horizontal overflow. Image optimization, lint, typecheck, and isolated production build pass. Focused Playwright validation could not complete because the isolated dev server did not return a page response. | `scripts/optimize-images.mjs`, `src/content/images.ts`, `src/components/sections/PillarGrid.tsx`, `src/app/globals.css`, `tests/navigation.spec.ts`, `docs/MEMORY.md` | Re-run the focused responsive Playwright test against a fresh responsive dev server |
| 2026-11-06 | Reshma (with Copilot) | Added a restrained, responsive two-layer text shadow to the hero heading and supporting text while preserving brand colors, image, CTAs, and existing localized blur. Browser checks at desktop/tablet/mobile showed the specified shadow adjustments, crisp text, visible CTAs, and no horizontal overflow. Lint and typecheck pass. The shared dev server still served stale CSS, so the intended shadow styles were injected for visual review. | `src/components/sections/HomeHero.tsx`, `src/app/globals.css`, `docs/MEMORY.md` | Verify on a fresh dev server when available |
| 2026-11-06 | Reshma (with Copilot) | Reworded the homepage hero supporting text per the requested warm, concise copy and styled it in medium-weight 24px Newsreader with white text, relaxed leading, and a restrained text shadow for legibility over the photograph. Browser checks at desktop/tablet/mobile showed the intended type color, font and sizes, no horizontal overflow, and the existing localized blur (CSS temporarily injected because the shared dev server serves stale global styles). Lint and typecheck pass. | `src/content/pages.ts`, `src/components/sections/HomeHero.tsx`, `src/app/globals.css`, `docs/MEMORY.md` | Verify on a fresh dev server once available |
| 2026-11-06 | Reshma (with Copilot) | Added a masked, text-localized backdrop blur to the homepage hero (2px desktop, 1.5px tablet, 1px mobile), without changing the photo, existing wash, copy, or CTAs. Browser preview at 1152/768/390 CSS px confirmed the garden remains recognizable outside the soft text-side area, both CTAs remain clickable, and there is no horizontal overflow. Lint and typecheck pass. The shared dev server served stale global CSS, so the intended rules were injected for visual review; build and axe checks remain to run with a fresh server. | `src/components/sections/HomeHero.tsx`, `src/app/globals.css`, `docs/MEMORY.md` | Recheck the rendered CSS and run build/axe after the shared dev server is stopped |
| 2026-11-04 | Reshma (with Copilot) | Audited homepage wrappers and found the shared `Container` cap of 1152px was constraining the header, footer, and full-width content grids. Increased the shared max width to 1280px while preserving narrower copy limits (4xl/3xl/prose). Browser layout checks at 1440, 1280, 1024, 768, 390, and 375 CSS px show consistent shared alignment and no horizontal overflow. Lint and typecheck pass; the shared dev server did not refresh Tailwind CSS, so the browser preview applied the equivalent 80rem max-width rule. | `src/components/ui/Container.tsx`, `docs/MEMORY.md` | Recheck after a fresh server/build to confirm regenerated Tailwind CSS includes the 7xl utility |
| 2026-11-04 | Reshma (with Copilot) | Retrieved the exact 508×115 Good Hope Manor logo JPEG used in the live site's header and footer; added it as a static Next Image import in the responsive home link. Lint and typecheck pass; logo asset, home link, alt text, proportions, and desktop/tablet/mobile fit were verified in the browser. Build and a11y suite not run while the shared dev server is active. | `assets/brand/good-hope-manor-logo.jpg`, `src/content/images.ts`, `src/components/layout/SiteHeader.tsx`, `docs/MEMORY.md` | Run build and a11y tests when the shared dev server is stopped |
| 2026-11-04 | Reshma (with Copilot) | Retrieved the exact 508×115 Good Hope Manor logo JPEG used in the live site's header and footer; added it as a static Next Image import in the responsive home link. Lint and typecheck pass; logo asset, home link, alt text, proportions, and desktop/tablet/mobile fit were verified in the browser. Build and a11y suite not run while the shared dev server is active. | `assets/brand/good-hope-manor-logo.jpg`, `src/content/images.ts`, `src/components/layout/SiteHeader.tsx`, `docs/MEMORY.md` | Run build and a11y tests when the shared dev server is stopped |
| 2026-11-03 | Reshma (with Copilot) | Added the supplied garden image as the full-section homepage hero background, with a preprocessed 154 KB WebP, responsive cover positioning, a subtle layered brand overlay, and a 200 ms reduced-motion-aware reveal. Updated the image pipeline, image metadata, responsive browser coverage, and design guidance. Lint, typecheck, build, and all 8 accessibility tests pass; responsive hero checks pass at 1440/768/390/320 px. Full E2E had one transient contact-form timing failure; its targeted retry passed. | `assets/Joyful Laughter in the Garden (1).png`, `scripts/optimize-images.mjs`, `src/content/images.ts`, `src/components/sections/HomeHero.tsx`, `src/app/globals.css`, `tests/navigation.spec.ts`, `docs/DESIGN.md`, `docs/MEMORY.md` | Confirm photo release before publishing the new image; run the full E2E suite again if further validation is needed |
| 2026-11-03 | Reshma (with Copilot) | Upgraded Next.js from 16.4.0 to 16.4.4 for the security advisory, enabled `experimental.agentUpgrade: "security"`, and confirmed the app serves HTTP 200 at `http://localhost:3000`. `npm run lint`, `npm run typecheck`, `npm run build`, and all 8 `npm run test:a11y` tests pass. Install reports 18 dependency audit findings; Lighthouse requires Node >=22.19 while the active runtime is 22.14.0. | `package.json`, `package-lock.json`, `next.config.ts`, `docs/MEMORY.md` | Address remaining dependency audit findings; use the pinned Node 22.19.0 runtime for follow-up QA |
| 2026-10-15 | Aditya (with Copilot) | Removed repeated brand suffixes from page titles; added Open Graph/Twitter metadata and LocalBusiness JSON-LD from `site.ts` with empty URL omitted; added a build warning when `NEXT_PUBLIC_SITE_URL` is unset; added WCAG 2.2 axe tags; added in-flight form state and duplicate-submit protection; measured Contact at 375×667 and confirmed its phone link is below the first viewport, so a call-only sticky mobile action is now shown there. `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:a11y` (8), and `npm run test:e2e` (11) pass. | `src/app/layout.tsx`, `src/lib/metadata.ts`, `src/content/metadata.ts`, `src/content/form.ts`, `src/components/layout/StickyMobileBar.tsx`, `src/components/sections/ContactForm.tsx`, `next.config.ts`, `tests/a11y.spec.ts`, `tests/contact-form.spec.ts`, `tests/navigation.spec.ts`, `docs/MEMORY.md` | Set the verified production URL before release; continue open client confirmations and Lighthouse tuning |
| 2026-10-10 | Aditya (with Copilot) | Reworked family-facing copy and image descriptions, added three disclosed conceptual activity illustrations, and adopted Newsreader / Source Sans 3 typography based on the accessible Vercel reference; updated design, rules, README and test coverage. `npm run lint`, `npm run typecheck`, `npm run check:content`, `npm run build`, and all 16 Playwright tests pass. Two Lighthouse runs: Accessibility/SEO 100 on every route; Home Performance 92 and 94; all other routes passed ≥95 on the latest run (Services was 94 on the first). Fixed the test to check the actual disclosure text. | `README.md`, `docs/DESIGN.md`, `docs/MEMORY.md`, `docs/RULES.md`, `assets/illustrations/**`, `scripts/optimize-images.mjs`, `src/**`, `tests/navigation.spec.ts` | Tune variable Home mobile LCP; complete manual accessibility/cross-browser checks and resolve client confirmations |
| 2026-10-10 | Aditya (with Copilot) | Built the seven-route Next.js static MVP, shared accessible layout, form and fallback, content placeholders, CI/tests and helper scripts; Lighthouse preview now serves gzip. Lint/typecheck/build pass; prior Playwright runs passed (8 a11y, 6 e2e). Lighthouse: Accessibility/SEO 100; Performance Home 92, Contact 93, other routes 95–96. | Root project config, `src/**`, `tests/**`, `scripts/**`, `.github/workflows/ci.yml`, `README.md`, `AGENTS.md`, `docs/MEMORY.md` | Tune Home/Contact LCP and blocking time to meet ≥95; then finish manual QA and gather client inputs |
| 2026-10-04 | Aditya (with Claude) | Split the consolidated draft into six spec files (v2.1); verified colour contrast; logged corrections | `01-PRD.md`–`06-MEMORY.md` | Scaffold repo (§3.3) |
| 2026-10-04 | Team | Architecture moved to Next.js + Tailwind; primary colour set to `#8a1f2d`; first consolidated spec produced | Spec draft | Split into six files |
| 2026-09-27 | Nintu | Client information, brand positioning and page structure recorded in MoM doc | MoM doc | Draft specs |
| 2026-09-26 | Team | Kickoff meeting; Phase 1 scoped at 15–20 hours | — | Collect client inputs |

---

## 8. Build tracker (update as work lands)

### 8.1 Pages

| Route | Status | PR / commit | Notes |
| --- | --- | --- | --- |
| `/` Home | Implemented | | Client hierarchy, table-service dining, supplied room photo, six pillars, two review excerpts, location and CTA |
| `/about/` | Implemented | | Family-owned operation and long-tenured staff; no leadership names invented |
| `/services/` | Implemented | | Eight supplied service blocks, scope and admission qualifications |
| `/life/` | Implemented | | Supplied room gallery and client-sourced community-life copy; generated activity art removed |
| `/families/` | Implemented | | Client-provided tour questions, move-preparation information and FAQ |
| `/reviews/` | Implemented | | Three supplied excerpts with Google Review month/year; Google Maps lookup, not official profile |
| `/referrals/` | Implemented | | Client-supplied referral relationships and admission language; no incentive wording |
| `/contact/` | Implemented | | Address, phone, email, fax, live-reference hours, directions and tour/admission information; call fallback remains |
| `/privacy/` | Implemented | | Supplied live-reference privacy statements; document/admin feature not implied |
| `/accessibility/` | Implemented | | Supplied statement and phone contact |
| 404 | Implemented | | |

### 8.2 Shared pieces

| Item | Status | Notes |
| --- | --- | --- |
| Repo scaffold + static export | Implemented | Next.js 16; output in `out/`; based on `PR/docs-assets` |
| Tokens + fonts + base styles | Implemented | Tailwind 4; Newsreader + Source Sans 3; brand palette retained |
| `src/content/` modules | Implemented | Verified client/live-reference copy; no visible placeholder markers |
| UI primitives | Implemented | Buttons, containers, headings, form fields, responsive optimized photos |
| Layout (header, footer, breadcrumbs, sticky bar) | Implemented | Includes skip link and responsive navigation |
| CI (lint, typecheck, build, axe, Lighthouse) | Implemented | Lint/typecheck/build/axe pass; Lighthouse needs rerun on expanded routes |
| Client content tests | Implemented | Footer/contact/review/referral/service/legal copy checks |
| Contact form + tests | Implemented | Validation and no-endpoint call fallback; 35 Playwright tests pass |
| Hosting + DNS + headers | Pending | Hosting/domain decision and deploy-specific security headers needed |

### 8.3 Quality gates (latest results)

| Gate | Latest result | Date |
| --- | --- | --- |
| Lighthouse Performance (mobile, gzip-enabled preview) | Not rerun on the expanded 10-route build; prior Home 92/94 and Services 94 readings are historical | — |
| Lighthouse Accessibility / SEO | Not rerun on the expanded 10-route build | — |
| `npm test` | **PASS**: 35 Playwright tests (including content, navigation, form, responsive and image assertions) | 2026-11-22 |
| `npm run test:a11y` | **PASS**: 11 axe checks across 10 routes and the 404 | 2026-11-22 |
| Lint / typecheck / static build | **PASS**; static export includes all 10 routes; build warns `NEXT_PUBLIC_SITE_URL` is unset | 2026-11-22 |
| `npm run check:content` | **PASS**: no content/photo placeholders in `src/content` | 2026-11-22 |
| Dependency audit | Earlier check: production tree clear; full tree had 9 dev/transitive findings (8 moderate, 1 high); not rerun here | 2026-11-22 |
| Runtime version | Node 22.18.0; `.nvmrc` pins 22.19.0; rerun release gates on pinned runtime | 2026-11-22 |
| Manual keyboard pass | Not completed; automated skip-link/navigation coverage exists | — |
| Screen-reader pass | Not completed | — |
| Cross-browser matrix | Not completed | — |

---

## 9. Handoff template (copy to §7 at the end of every session)

```md
### Handoff — YYYY-MM-DD HH:MM IST — <name or agent>

**Goal of this session:**
**Requirement IDs touched:** FR-… / NFR-…

**Files created / modified / deleted:**
- path — what changed

**Complete:**
-

**Partially done (and exactly where I stopped):**
-

**Commands run and real results:**
- npm run lint → pass/fail
- npm run typecheck → pass/fail
- npm run build → pass/fail
- npm run test:a11y → pass/fail (n violations)

**Decisions made (add to §5):**
-

**New blockers / questions (add to §4):**
-

**Spec files that need editing (and why):**
-

**IMMEDIATE NEXT ACTION (one concrete step):**
```
