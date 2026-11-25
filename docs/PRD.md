# 01 — Product Requirements Document (PRD)

> **Project:** Good Hope Manor website · **Spec set:** v1 · **Last updated:** 2026-11-22
>
> **Spec set:** [01 PRD](./PRD.md) · [02 Architecture](./ARCHITECTURE.md) · [03 Rules](./RULES.md) · [04 Phases](./PHASES.md) · [05 Design](./DESIGN.md) · [06 Memory](./MEMORY.md)

## 0. How to read this file

- **IDs** are stable. Reference them in commits, PRs and tests (e.g. `Implements FR-HOME-03`). Never renumber; retire an ID by marking it `(withdrawn)`.
- **Priority** uses MoSCoW: **M** = Must (blocks the demo), **S** = Should (do if time allows), **C** = Could (nice to have).
- **Content status:** anything marked `[CONTENT NEEDED]` must come from the client. Never invent it (see 03-RULES, R-CONTENT-01).
- **Authority:** if this file conflicts with 03-RULES, 03-RULES wins. If it conflicts with the live site owner's instruction, ask the PM (Nintu) and record the decision in 06-MEMORY.

---

## 1. Executive summary

Good Hope Manor is a family owned and operated assisted living community in Oakland Park, Florida. Its client-approved copy emphasizes personalized support, dignity, long-tenured staff, nursing oversight within the scope of assisted living, table-service dining and meaningful community life. Do not market Memory Care or Dementia Care without separate authorization.

The digital work is split into two phases:

| Phase | What it is | Primary outcome |
| --- | --- | --- |
| **Phase 1** (current) | 10-route, fast, accessible, informational static website | Build trust, answer families' immediate questions, drive **tour requests** |
| **Phase 2** (future) | Interactive web app with backend, CRM integration, staff dashboard, real scheduling | Capture, track and follow up on leads; let staff manage content and tours |

This PRD covers **Phase 1 in full detail**. Phase 2 is described only at the level needed to avoid painting Phase 1 into a corner (see 02-ARCHITECTURE §9 and 04-PHASES §6).

---

## 2. Goals, non-goals and success measures

### 2.1 Goals (Phase 1)

1. A family member on a phone can find the address, phone number and "Schedule a Tour" action within **one tap** from any page.
2. A prospective resident aged 60+ can read, navigate and use the contact form without help (large text, high contrast, big targets, predictable navigation).
3. The site feels like a warm home, not an institution.
4. The repository is clean enough to hand to a DNS/hosting company and to extend in Phase 2 without a rewrite.

### 2.2 Non-goals (Phase 1)

- No user accounts, login, admin dashboard or CMS.
- No real-time tour scheduling (the form collects a *preference*; staff follow up by phone or email).
- No live chat, chatbot, social feeds, blog, or third-party embeds (maps, video, social widgets).
- No collection of medical or care-needs information.
- No multi-language support (see open question OQ-08).

### 2.3 Success measures

| Measure | Target | How measured |
| --- | --- | --- |
| Lighthouse Performance (mobile, all 10 routes) | **≥ 95** | Lighthouse CI on every PR |
| Page load on simulated 4G | **< 3 s** | Lighthouse mobile throttling |
| Lighthouse Accessibility | **100** (axe: 0 serious/critical) | Lighthouse CI + axe in Playwright |
| Tour-request form submissions per month | Baseline set in first 30 days after launch; target agreed with client | Form endpoint dashboard |
| Demo accepted by client | Yes/No at the Oct 9–10 demo | PM sign-off recorded in 06-MEMORY |

> No business KPI numbers are invented here. Targets for form submissions are set **after** a baseline exists.

---

## 3. Personas and journeys

The interface must serve a **mixed audience**: anxious, time-pressed adult children *and* older adults with age-related vision and motor changes.

### 3.1 Persona A — The Adult Child / Family Member (age 30–60)

| Attribute | Detail |
| --- | --- |
| Mindset | Anxious, researching deeply, protective, wants fast reassurance on safety and staff compassion |
| Device | Mostly **mobile**, often late evening, often comparing several communities in parallel |
| Needs | Services clearly stated, proof from other families, exact location, an easy way to ask for a tour |
| Fears | Hidden details, clinical jargon, slow pages, long forms, feeling "sold to" |
| Success looks like | Submits a tour request in under 2 minutes without creating an account |
| Design implications | Sticky mobile call/tour bar, reviews on Home, short form, plain language |

**Primary journey**

| Step | User action | System response | Requirements |
| --- | --- | --- | --- |
| 1 | Lands on Home from search | Hero loads fast with real photo, tagline, "Schedule a Tour" and call option | FR-HOME-01, FR-HOME-02, NFR-PERF-01 |
| 2 | Checks what care is offered | Services summary on Home → Services page | FR-HOME-04, FR-SVC-01 |
| 3 | Looks for social proof | Google reviews on Home → Reviews page | FR-HOME-06, FR-REV-01 |
| 4 | Taps "Schedule a Tour" | Contact page; form is short and forgiving | FR-CON-01 – FR-CON-08 |
| 5 | Submits | Clear confirmation, expectation of follow-up, phone fallback | FR-CON-07 |

**Friction to avoid:** hidden location details, institutional jargon, slow mobile pages, convoluted forms.

### 3.2 Persona B — The Prospective Resident (age 60+)

| Attribute | Detail |
| --- | --- |
| Mindset | Wants independence, dignity, belonging and a non-institutional feel |
| Abilities | May have macular degeneration, presbyopia (small text is hard), mild tremor (small targets are hard), or early cognitive decline (unpredictable navigation is stressful) |
| Device | Tablet or desktop; sometimes assisted by family |
| Success looks like | Browses photos and amenities, understands what daily life is like, finds the phone number |
| Design implications | 18px body text, 44×44px minimum targets, persistent labelled navigation, no hover-only content, no auto-moving content |

**Primary journey:** Home → Life at Good Hope (gallery) → Services (amenities) → Contact.

**Friction to avoid:** low-contrast text, small tap targets, unpredictable navigation, deep page hierarchies, generic stock photography.

---

## 4. Information architecture

### 4.1 Sitemap (10 routes — updated Phase 1 scope)

```
/                 Home
/about/           About Us
/services/        Care & Services
/life/            Life at Good Hope
/families/        For Families
/reviews/         Why Families Recommend Us
/referrals/       Referral Partners
/contact/         Contact / Tour Request
/privacy/         Privacy Policy
/accessibility/   Accessibility
```

Plus non-page outputs: `/sitemap.xml`, `/robots.txt`, custom `404`.

### 4.2 Navigation model

| Item | Spec |
| --- | --- |
| Main nav order | Home · About Us · Care & Services · Life at Good Hope · For Families · Reviews · Referral Partners · Contact |
| Utility row (desktop ≥ 1024px) | Phone number as `tel:` link + **Schedule a Tour** primary button, above the main nav row |
| Mobile (< 1024px) | Top bar: logo + a button labelled **"Menu"** (text, not just a hamburger icon). Menu opens a full-width panel listing all 8 primary links as large targets. A **sticky bottom bar** shows "Call" and "Schedule a Tour" |
| Current page | `aria-current="page"` plus a visual marker (bold + 3px underline) — never colour alone |
| Dropdowns | **None.** Hierarchy is one level deep |
| Breadcrumbs | On every page except Home: `Home › Page name` |

---

## 5. Functional requirements

### 5.1 Global (all pages)

| ID | Requirement | Acceptance criteria | Pri |
| --- | --- | --- | --- |
| FR-G-01 | Persistent header with name/logo and navigation per §4.2 | Header present on all 10 routes and the 404; layout matches §4.2 at 320, 768, 1024px | M |
| FR-G-02 | Current page indicated in navigation | Active link has `aria-current="page"` and a non-colour marker | M |
| FR-G-03 | Phone number and tour CTA reachable from every page | Desktop: in utility row. Mobile: in sticky bar. Both usable with one tap/click | M |
| FR-G-04 | Footer with contact details, license, service information, navigation and legal links | Address, phone, email, fax, license wording, AHCA link, Privacy Policy and Accessibility are present; links are accessible targets | M |
| FR-G-05 | Breadcrumbs on all sub-pages | Present on 9 sub-pages; last item is current page, not a link, has `aria-current="page"` | M |
| FR-G-06 | Skip-to-content link | First focusable element; visible on focus; moves focus to `<main id="main">` | M |
| FR-G-07 | Name/address/phone/email/fax come from one source | Contact facts are configured in `src/content/site.ts` and reused across pages | M |
| FR-G-08 | One `<h1>` per page; unique `<title>` and meta description per page | Verified by test and by manual review | M |
| FR-G-09 | Custom 404 page | Offers links to Home and Contact; uses the same header/footer | S |
| FR-G-10 | Help line in footer | Text such as "Need help using this site? Call (954) 677-2900." | S |

### 5.2 Home (`/`)

| ID | Requirement | Acceptance criteria | Pri |
| --- | --- | --- | --- |
| FR-HOME-01 | Hero with client heading, supporting sentence and authentic facility photo | H1 and CTA visible without scrolling at 375×667. Use a supplied, approved facility photo; no AI or watermarked photo | M |
| FR-HOME-02 | Primary CTA "Schedule a Tour" (`#8a1f2d` background) and secondary "Call (954) 677-2900" | CTA → `/contact/`; call link is `tel:+19546772900` | M |
| FR-HOME-03 | **Brand promise** section: "A Place to Call Home. Quality Care Without Compromise." | Appears verbatim; followed by 2–3 sentences of client-supplied copy | M |
| FR-HOME-04 | **Why Families Choose Good Hope Manor** — six client-supplied pillars | Family-owned operation, long-tenured staff, personalized support, nursing oversight, table-service dining and meaningful activities; do not market Memory Care or Dementia Care | M |
| FR-HOME-05 | **Care approach** section | Short narrative + link to Services | M |
| FR-HOME-06 | **Family recommendations** — 2 supplied review excerpts + link to `/reviews/` | Quotes remain verbatim, carry only the supplied Google Review month/year attribution, and include the authorization note | M |
| FR-HOME-07 | **Community life** teaser — 3–4 real photos | Each image has context-aware alt text; links to `/life/` | M |
| FR-HOME-08 | Closing CTA band | Repeats tour CTA and phone number | S |

Section order follows the client brief: Hero → Family-owned commitment → Long-tenured staff → Personalized assisted living → Table-service dining → Community life → Why Families Choose → Family recommendations → Location → CTA band → Footer.

### 5.3 About Us (`/about/`)

| ID | Requirement | Acceptance criteria | Pri |
| --- | --- | --- | --- |
| FR-ABT-01 | "Our Commitment to Caring" narrative | Heading present; copy is client-supplied | M |
| FR-ABT-02 | Leadership involvement and experienced caregivers | Names, roles and photos only if the client supplies them and consents | M |
| FR-ABT-03 | CTA to tour | CTA band at end | S |

### 5.4 Services (`/services/`)

| ID | Requirement | Acceptance criteria | Pri |
| --- | --- | --- | --- |
| FR-SVC-01 | Client-supplied care and service blocks | Personalized Assistance, Nursing Oversight, Clinical Care Coordination, Medication Support, Mobility & Daily Support, Table-Service Dining & Nutrition, Housekeeping & Laundry, Activities & Recreation | M |
| FR-SVC-02 | Services and admission are appropriately qualified | Include the client-supplied individual assessment, care-plan, licensing, availability and safe-fit qualifications; do not imply nursing-home or hospital-level care | M |
| FR-SVC-03 | Anchor links to each service block | In-page "jump to" list at top; targets are 44×44px | S |
| FR-SVC-04 | CTA to tour | CTA band at end | S |

### 5.5 Life at Good Hope (`/life/`)

| ID | Requirement | Acceptance criteria | Pri |
| --- | --- | --- | --- |
| FR-LIFE-01 | Visual-heavy sections: **Arts & Crafts, Dining, Library, Beauty Salon**, and resident interactions | Each section has a heading, short caption copy and ≥ 2 real photos | M |
| FR-LIFE-02 | Photo gallery | Static responsive grid (no auto-advancing carousel). Optional click-to-enlarge only if fully keyboard- and screen-reader-accessible | M |
| FR-LIFE-03 | Published photography is authentic and approved | Use actual Good Hope Manor photos with publication permission; do not use AI-generated, stock, or watermarked photos | M |
| FR-LIFE-04 | Courtyard / amenities coverage | Courtyard and other amenities included if client provides photos | S |

### 5.6 For Families (`/families/`)

| ID | Requirement | Acceptance criteria | Pri |
| --- | --- | --- | --- |
| FR-FAM-01 | Family peace-of-mind messaging | Client-supplied copy; plain language | M |
| FR-FAM-02 | Communication approach (how and when families are kept informed) | Specific, client-confirmed statements only | M |
| FR-FAM-03 | "Family Partnership" approach | Dedicated section with heading | M |
| FR-FAM-04 | FAQ (5–8 questions) | Built with native `<details>/<summary>`; content from client | S |

### 5.7 Reviews (`/reviews/`)

| ID | Requirement | Acceptance criteria | Pri |
| --- | --- | --- | --- |
| FR-REV-01 | Prominent Google reviews page | Reviews listed as static cards in a grid/list | M |
| FR-REV-02 | Each supplied review shown **verbatim** with available attribution | Preserve quote text and supplied Google Review month/year attribution; do not invent reviewer names or ratings | M |
| FR-REV-03 | Link readers to Google for more reviews | Use the supplied official profile URL if available; otherwise label the existing Google Maps search as a lookup, not an official profile | M |
| FR-REV-04 | No aggregate rating or review count unless client supplies and will keep it current | Absent by default | M |

The client has supplied three excerpts dated March 2025 and November 2024. The page includes only those excerpts and the client-supplied note that published statements are used with appropriate authorization.

### 5.8 Contact / Tour Request (`/contact/`)

| ID | Requirement | Acceptance criteria | Pri |
| --- | --- | --- | --- |
| FR-CON-01 | Display verified contact details | **2251 NW 29th Ct., Oakland Park, FL 33311**, **(954) 677-2900**, **info@goodhopemanor.com**, **(954) 486-5335**; use `tel:` and `mailto:` links where appropriate | M |
| FR-CON-02 | Tour request form per §6 | Fields, validation and states exactly as specified; the form remains unavailable until an approved endpoint is configured | M |
| FR-CON-03 | Inline field validation and an error summary | See §6.3 | M |
| FR-CON-04 | Spam protection that does not burden users | Honeypot + endpoint spam filter. **No** image/puzzle CAPTCHA | M |
| FR-CON-05 | Privacy line next to submit button | States what the form is used for; asks users not to enter medical details | M |
| FR-CON-06 | "Get directions" link | Plain link to maps URL; **no** embedded map in Phase 1 | S |
| FR-CON-07 | Success state | Replaces form with confirmation heading, expectation of follow-up, phone fallback; focus moves to the confirmation | M |
| FR-CON-08 | Failure state | Keeps all entered values; shows plain-language error and the phone number | M |
| FR-CON-09 | Business and visiting hours | Display the hours published on the live Contact page; confirm they remain current before release | S |

### 5.9 Referral Partners (`/referrals/`)

| ID | Requirement | Acceptance criteria | Pri |
| --- | --- | --- | --- |
| FR-REF-01 | Referral information for families and community professionals | Use the supplied relationship-focused copy and referral-source list | M |
| FR-REF-02 | Admission and care-transition qualifications | Preserve individual review, assessment, applicable requirements, and safe-fit language | M |
| FR-REF-03 | No incentive-based referral language | Do not add paid referrals, commissions, bonuses, or other incentives | M |

### 5.10 Privacy Policy (`/privacy/`) and Accessibility (`/accessibility/`)

| ID | Requirement | Acceptance criteria | Pri |
| --- | --- | --- | --- |
| FR-LEG-01 | Privacy information is reachable from the footer and contact form | Page contains client-supplied website privacy statements; do not imply a document portal is implemented | M |
| FR-LEG-02 | Accessibility information is reachable from the footer | Page states the supplied accessibility features and gives the published phone contact | M |

---

## 6. Contact form specification

### 6.1 Fields

| Field | Name attr | Type | Required | Notes |
| --- | --- | --- | --- | --- |
| Your name | `name` | text, `autocomplete="name"` | Yes | 2–100 chars |
| Phone number | `phone` | `tel`, `autocomplete="tel"` | Yes | Accept spaces, dashes, parentheses; require 10 digits after stripping; 11 if leading 1 |
| Email | `email` | `email`, `autocomplete="email"` | No | Valid format if provided |
| Your relationship to the person who may move in | `relationship` | select | No | Myself · Parent · Spouse/Partner · Other family · Friend · Professional (e.g. social worker) |
| Best way to reach you | `contact_method` | radio (2) | No | Phone · Email. **No SMS option** (avoids text-messaging consent obligations) |
| When would you like to visit? | `visit_timeframe` | select | No | As soon as possible · This week · Next week · Within a month · Just exploring |
| Anything you'd like us to know? | `message` | textarea | No | Max 1000 chars; helper text: "Please don't include medical details." |
| *(honeypot)* | `_gotcha` | text, hidden from users and AT | — | Must stay empty; if filled, silently treat as spam |

### 6.2 Behaviour

- Every field has a **visible label** above it. Placeholder text is never the label.
- Required fields marked with the word "(required)" — not only an asterisk.
- Submit button: **"Request a Tour"** (primary style). Disabled state is not used; validate on submit instead.
- Submission via `fetch` POST (JSON) to the Formspree endpoint stored in `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.
- The form must remain usable if JavaScript fails to load: it is a real `<form method="post" action="…">`, progressively enhanced.

### 6.3 Validation and errors

| Rule | Spec |
| --- | --- |
| When | Validate each field on blur (after first interaction) and all fields on submit |
| Message style | Plain language, says how to fix it: "Please enter a phone number we can call, like (954) 555-0100." |
| Display | Message under the field, preceded by the word "Error:" and an icon; not colour alone |
| Association | Input has `aria-invalid="true"` and `aria-describedby` pointing to the message |
| Summary | On failed submit, an error summary (`role="alert"`) at the top lists each error as a link to its field; focus moves to the summary |
| Preserve | Never clear fields on error |

### 6.4 Privacy and data handling (Phase 1)

- Collect only the fields above. No date of birth, health, financial or care-needs data.
- No analytics or tracking scripts on the form page unless OQ-07 is resolved with consent handling.
- Never `console.log` submitted values.
- A link to the client's privacy policy appears near the submit button (see **OQ-04**).

---

## 7. Non-functional requirements

| ID | Category | Requirement | Verification |
| --- | --- | --- | --- |
| NFR-PERF-01 | Performance | Lighthouse **Performance ≥ 95** (mobile profile) on every route | Lighthouse CI |
| NFR-PERF-02 | Performance | Full page load **< 3 s** on simulated 4G | Lighthouse mobile throttling; WebPageTest spot-check |
| NFR-PERF-03 | Performance | LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms | Lighthouse CI + field data after launch |
| NFR-PERF-04 | Performance | JS per route ≤ 150 KB gzipped; any single image ≤ 200 KB (hero ≤ 150 KB) | Build output; `scripts/` size check |
| NFR-A11Y-01 | Accessibility | **WCAG 2.1 AA** conformance on all routes (target 2.2 AA where it costs nothing) | axe in Playwright + manual tests (04-PHASES §5) |
| NFR-A11Y-02 | Accessibility | Text/background pairs use only the approved matrix in 05-DESIGN §2 | Design review; contrast unit test |
| NFR-A11Y-03 | Accessibility | Fully operable by keyboard; visible focus; no keyboard traps | Manual keyboard-only pass |
| NFR-A11Y-04 | Accessibility | Works with VoiceOver (Safari/iOS) and NVDA (Firefox or Chrome) | Manual screen-reader pass |
| NFR-A11Y-05 | Accessibility | Usable at 200% browser zoom and reflows at 320 CSS px (400% zoom) without horizontal scroll | Manual |
| NFR-RESP-01 | Responsive | Mobile-first; renders flawlessly at **320px+, 768px+, 1024px+** | Playwright viewport tests + manual |
| NFR-BRW-01 | Compatibility | Latest stable Chrome, Firefox, Safari (macOS + iOS), Edge | Manual matrix in 04-PHASES §5 |
| NFR-SEO-01 | SEO | Lighthouse SEO ≥ 95; unique titles/descriptions; valid sitemap and robots | Lighthouse CI |
| NFR-SEC-01 | Security | HTTPS only; security headers per 02-ARCHITECTURE §8 | Header check after deploy |
| NFR-PRIV-01 | Privacy | No third-party trackers or embeds in Phase 1 | Network-tab audit |
| NFR-MAINT-01 | Maintainability | Code complies with 03-RULES; CI green before merge | CI |

---

## 8. SEO and local discovery

| ID | Requirement | Pri |
| --- | --- | --- |
| SEO-01 | Per-route `metadata` (title ≤ 60 chars, description ≤ 160 chars) | M |
| SEO-02 | `LocalBusiness` JSON-LD with name, address, phone, URL on Home and Contact | S |
| SEO-03 | Open Graph / Twitter card using a **real** facility photo | S |
| SEO-04 | `sitemap.xml` and `robots.txt` generated from `src/app/` | M |
| SEO-05 | Canonical URL per route; consistent trailing-slash policy | M |
| SEO-06 | NAP (name, address, phone) identical to the client's Google Business profile | M |

---

## 9. Content inventory

| ID | Item | Owner (collect) | Needed by | Status |
| --- | --- | --- | --- | --- |
| CI-01 | Logo (vector preferred) and brand name usage | Nintu → client | Oct 6 | Needed |
| CI-02 | Authentic photography (exterior, lounge, dining, bedroom, salon, library, courtyard, arts & crafts, staff) in the highest resolution available | Nintu → client | Oct 6 | Room photos supplied; authenticity and publication approval remain to be confirmed; other categories not supplied |
| CI-03 | Page copy for About, Services, Families, Life captions | Nintu → client | Oct 6 | Supplied in verified brief and implemented |
| CI-04 | Verbatim Google review text (March 2025, Nov 2024, plus any others client chooses) | Nintu → client | Oct 7 | Three excerpts supplied; final authorization confirmation remains a release check |
| CI-05 | Leadership names/roles/photos (if client wants them shown) | Nintu → client | Oct 7 | Needed |
| CI-06 | Business hours | Nintu → client | Oct 7 | Published on live Contact page; reconfirm before release |
| CI-07 | Confirmation of address, phone, public email | Nintu → client | Oct 5 | Provided in verified brief/live reference; confirm current values |
| CI-08 | Privacy policy URL or text | Nintu → client | Oct 7 | Privacy and accessibility statements available on the live reference; local routes added |
| CI-09 | Any required licensing/regulatory wording for the footer | Nintu → client | Oct 7 | Exact license wording and footer note supplied in the verified brief |
| CI-10 | Google Business profile URL (reviews + directions) | Nintu → client | Oct 6 | Needed |
| CI-11 | Resident photo release confirmation | Nintu → client | before any resident photo is used | Needed |
| CI-12 | Final domain name | Akhil / client | Oct 8 | Needed |

Do not publish placeholders, lorem ipsum, stock photos, unsupported claims, or copy that was not supplied by the client or verified reference.

---

## 10. Out of scope for Phase 1

User accounts · admin portal · CMS · online scheduling · payment · live chat · blog · newsletter · maps/video embeds · analytics beyond (optionally) a privacy-friendly counter · languages other than English · print stylesheets · dark mode.

---

## 11. Assumptions, risks and open questions

### 11.1 Assumptions

- Phase 1 effort is **15–20 hours**; demo is **October 9–10, 2026**.
- Missing source material is omitted; do not publish visible placeholders, stock/generated imagery, or unsupported copy.
- A third-party form endpoint (Formspree or equivalent) is acceptable to the client for Phase 1.
- Site is English-only.

### 11.2 Risks

| ID | Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| RK-01 | Client photos/copy arrive late | High | High | Use verified content modules; omit unsupported details until approved material is supplied |
| RK-02 | Five-day window is tight for 18–20 h of work | Medium | High | Stick to M-priority items; S-items are cut first |
| RK-03 | Hosting platform undecided | Medium | Medium | Develop locally; deploy a preview to any one host; decision recorded in 06-MEMORY |
| RK-04 | Accessibility regressions late in build | Medium | High | axe in CI from Sprint 1.1, not at the end |
| RK-05 | Tailwind major-version mismatch with scaffold output | Medium | Low | See 02-ARCHITECTURE §4 and 05-DESIGN §3 |

### 11.3 Open questions

| ID | Question | Owner | Impact |
| --- | --- | --- | --- |
| OQ-01 | Final production domain? | Akhil / client | Canonical URLs, sitemap, JSON-LD, OG tags |
| OQ-02 | Resolved: omit Memory Care/Dementia Care marketing categories unless separately authorized | Client brief | No such category is published |
| OQ-03 | Resolved: use the supplied license wording and footer service qualification | Client brief | FR-G-04 |
| OQ-04 | Resolved: use the supplied live-reference privacy/accessibility statements and add local routes | Client reference | FR-LEG-01, FR-LEG-02 |
| OQ-05 | Review excerpts supplied with an authorization statement; final authorization still needs client confirmation | Client brief | FR-REV-02 |
| OQ-06 | No resident photos are currently published; confirm signed releases before any are added | Nintu → client | FR-LIFE-03 |
| OQ-07 | Does the client want analytics? If yes, which (privacy-friendly option preferred) | Nintu → client | NFR-PRIV-01 |
| OQ-08 | Any future need for Spanish or other languages? | Nintu → client | Routing structure (affects Phase 2) |
| OQ-09 | Vercel vs Cloudflare Pages — final choice | Akhil | 02-ARCHITECTURE §6 |
| OQ-10 | Resolved: public email address supplied as `info@goodhopemanor.com` | Client brief/live reference | Footer, Contact |