# 02 — Architecture and Technical Strategy

> **Project:** Good Hope Manor website · **Spec set:** v1 · **Last updated:** 2026-11-22
>
> **Spec set:** [01 PRD](./PRD.md) · [02 Architecture](./ARCHITECTURE.md) · [03 Rules](./RULES.md) · [04 Phases](./PHASES.md) · [05 Design](./DESIGN.md) · [06 Memory](./MEMORY.md)

## 1. Summary of decisions

| ID | Decision | Status | Why |
| --- | --- | --- | --- |
| ADR-001 | **Next.js (App Router) + TypeScript + Tailwind CSS** | Accepted | Component-driven; static export for Phase 1; same codebase can gain server features in Phase 2 |
| ADR-002 | **Static export** (`output: 'export'`) for Phase 1 | Accepted | Fastest possible pages, cheapest hosting, simplest handoff |
| ADR-003 | **Formspree** (or equivalent) for the contact form in Phase 1 | Accepted | No backend yet; keep PII handling out of our infrastructure |
| ADR-004 | **Typed content modules** in `src/content/` instead of copy hard-coded in JSX | Accepted | Shared source for verified contact facts and client-approved copy; omit unsupported details until sourced |
| ADR-005 | **Self-hosted fonts** via `next/font` | Accepted | No third-party requests; no layout shift |
| ADR-006 | **Hosting:** Vercel or Cloudflare Pages | **Open** (OQ-09) | See §6 |
| ADR-007 | Phase 2 built as a **modular monolith first**, services split only if needed | Proposed | See §9 |

---

## 2. Tech stack

| Layer | Choice | Policy |
| --- | --- | --- |
| Runtime | Node.js **LTS** | Record exact version in `.nvmrc` and in 06-MEMORY |
| Framework | Next.js, App Router, `src/` directory | Use the latest stable at scaffold time, then **pin exact versions** |
| Language | TypeScript, `strict: true` | No `any` without a justified comment |
| Styling | Tailwind CSS | Tokens only (see 05-DESIGN §3). No custom CSS files beyond `globals.css` |
| Fonts | `next/font` — a serif for headings, a sans-serif for body | See 05-DESIGN §4 |
| Forms | Native `<form>` + `fetch` to Formspree | No form library |
| Icons | Inline SVG components in `src/components/ui/icons/` | Always paired with text |
| Lint/format | ESLint (Next config + `jsx-a11y`), Prettier | CI-enforced |
| Testing | Playwright + `@axe-core/playwright`; Lighthouse CI | Dev dependencies only |
| Package manager | npm (lockfile committed) | One manager only |

**Allowed dev dependencies:** the lint/format/test tools above, `sharp` (image pre-processing script), `serve` (preview `out/`). Everything else needs a PR note justifying it (03-RULES §4).

---

## 3. Rendering and build strategy

### 3.1 Static export configuration

```js
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // emit plain HTML/CSS/JS into /out
  images: { unoptimized: true }, // required for static export; images are pre-optimised to WebP
  trailingSlash: true,       // /about/index.html works identically on any static host
};
export default nextConfig;
```

### 3.2 What static export does **not** support (important)

| Feature | Phase 1 | Consequence |
| --- | --- | --- |
| Default image optimizer (`next/image` server) | Not available | Pre-optimise images (§5.3); keep `unoptimized: true` |
| Server Actions, Route Handlers (API routes), Middleware | Not available | Form posts go to Formspree; no server code |
| Rewrites, redirects and custom headers in `next.config` | Not applied | Put redirects/headers in host config (§8) |
| ISR / on-demand revalidation | Not available | Not needed |

**Phase 2 note:** Next.js can gain API routes and Server Actions, but only by **removing `output: 'export'`** and deploying to a host with a Node/edge runtime. The frontend components do not change; the deploy target and config do. Plan for that rather than assuming "no rewrite" means "no change".

### 3.3 Rendering rules

- Pages are **Server Components** by default.
- Add `'use client'` only for: `MobileMenu`, `ContactForm`, and any component needing browser state. Keep client components small and leaf-level.
- No data fetching at runtime in Phase 1. All content is imported from `src/content/`.

---

## 4. Tailwind setup (version note)

`create-next-app@latest` may scaffold **Tailwind v4** (CSS-first configuration, no `tailwind.config.ts`) or v3 (JS config), depending on what is current when you run it. **Check which one you got** (`npm ls tailwindcss`) and use the matching form below. The token *names and values* are identical; only the place they live differs.

- **Tailwind v4:** define tokens in `src/app/globals.css` using `@theme` (preferred).
- **Tailwind v3:** define tokens in `tailwind.config.ts` under `theme.extend`.

Both forms of the token block are in **05-DESIGN §3**. Do not define the same token in both places.

---

## 5. Codebase structure

### 5.1 Repository layout

```
good-hope-manor/
├── AGENTS.md                      # Short pointer to the specs for AI agents (03-RULES §9)
├── .nvmrc
├── .github/
│   └── workflows/ci.yml           # lint → typecheck → build → a11y tests → Lighthouse CI
├── docs/
│   └── spec/                      # The six spec files (PRD.md … MEMORY.md)
├── assets/                        # The only permitted location for website image files
├── public/                        # Unprocessed static files only
│   ├── favicon.ico
│   └── (host config files such as _headers if Cloudflare Pages)
├── scripts/
│   ├── optimize-images.mjs        # sharp: resize + WebP from a source folder
│   ├── check-placeholders.mjs     # finds "[CONTENT NEEDED" strings
│   └── check-bundle-size.mjs      # enforces NFR-PERF-04
├── tests/
│   ├── a11y.spec.ts               # axe on all 10 routes + 404
│   ├── navigation.spec.ts         # keyboard, skip link, aria-current, breadcrumbs
│   ├── client-requirements.spec.ts # supplied copy, contact, footer, legal and referral routes
│   └── contact-form.spec.ts       # validation, success, failure
├── src/
│   ├── app/                       # Routing layer ONLY (thin pages)
│   │   ├── layout.tsx             # <html lang="en">, fonts, SkipLink, header, footer, JSON-LD
│   │   ├── globals.css            # Tailwind import + design tokens (@theme) + base styles
│   │   ├── page.tsx               # Home
│   │   ├── not-found.tsx          # Custom 404
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── life/page.tsx
│   │   ├── families/page.tsx
│   │   ├── reviews/page.tsx
│   │   ├── referrals/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── accessibility/page.tsx
│   ├── components/
│   │   ├── ui/                    # Primitives: Button, ButtonLink, TextLink, Input, Textarea,
│   │   │   └── icons/             #   Select, RadioGroup, FormField, Card, Container, Section
│   │   ├── layout/                # SiteHeader, UtilityBar, MainNav, MobileMenu, SiteFooter,
│   │   │                          #   Breadcrumbs, SkipLink, StickyMobileBar
│   │   └── sections/              # HomeHero, HomeDining, HomeLocation, PageHero, PillarGrid,
│   │                              #   CareApproach, LifeGallery, ReviewList, ReviewCard,
│   │                              #   ServiceList, FaqList, CtaBand,
│   │                              #   ContactForm, ContactDetails
│   ├── content/                   # Typed data. Copy and facts live HERE, not in JSX
│   │   ├── site.ts                # name, tagline, phone, address, url, directionsUrl
│   │   ├── navigation.ts
│   │   ├── services.ts
│   │   ├── reviews.ts
│   │   ├── images.ts              # image manifest: import + alt text + caption
│   │   └── faqs.ts
│   ├── lib/                       # Pure helpers: validation.ts, phone.ts, metadata.ts, jsonld.ts
│   └── types/                     # Shared TypeScript types
├── tsconfig.json
├── next.config.mjs
├── eslint.config.mjs
├── package.json
└── (tailwind.config.ts            # ONLY if the scaffold is Tailwind v3)
```

### 5.2 Differences from the earlier draft (and why)

| Earlier draft | This spec | Reason |
| --- | --- | --- |
| `src/styles/globals.css` | `src/app/globals.css` | Matches the scaffold default; fewer moving parts for agents |
| `TestimonialSlider.tsx` | `ReviewList.tsx` + `ReviewCard.tsx` | Auto-advancing sliders are hostile to screen-reader and low-dexterity users (03-RULES R-A11Y-12) |
| `tailwind.config.ts` always | Version-dependent | Tailwind v4 has no JS config by default |
| No content layer | `src/content/` + `src/types/` | DRY facts and verified copy; source-backed content updates are data edits |
| No tests/scripts folders | Added | Accessibility and performance budgets must be enforced automatically |

### 5.3 Image pipeline

| Step | Rule |
| --- | --- |
| Source | Use only supplied, eligible image files from the repository's `assets/` directory; do not use remote or generated facility imagery |
| Process | `scripts/optimize-images.mjs`: max width 1600px (hero 2000px), WebP, quality ≈ 80, strip metadata (EXIF/GPS) |
| Store | Keep supplied source images under `assets/`; the `npm run images` pipeline writes optimized derivatives to ignored `assets/optimized/` |
| Import | Static imports from `../../assets/` in `src/content/images.ts` so width/height are known at build time (prevents CLS) |
| Render | `next/image` with correct `alt`; hero uses `priority`; all others lazy |
| Manifest | Every image has `alt`, `caption?`, `decorative?`, `consentConfirmed` (for residents) in `images.ts` |
| Budget | Hero ≤ 150 KB; others ≤ 200 KB |

### 5.4 Content module shape (example)

```ts
// src/content/site.ts
export const site = {
  name: 'Good Hope Manor',
  tagline: 'A Place to Call Home. Quality Care Without Compromise.',
  phone: { display: '(954) 677-2900', tel: '+19546772900' },
  address: {
    street: '2251 NW 29th Court',
    city: 'Oakland Park',
    state: 'FL',
    zip: '33311',
  },
  url: 'https://CONFIRM-DOMAIN.example', // [CONTENT NEEDED: final domain, OQ-01]
  directionsUrl: '', // [CONTENT NEEDED: Google Business / maps URL, CI-10]
} as const;
```

```ts
// src/types/content.ts
export type Review = {
  id: string;
  author: string;          // as publicly shown on Google
  rating: 1 | 2 | 3 | 4 | 5;
  dateLabel: string;       // e.g. "March 2025"
  text: string;            // VERBATIM, never edited
  sourceUrl?: string;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  details?: string[];
};
```

---

## 6. Hosting and CI/CD

### 6.1 Pipeline

```
feature branch ──PR──► CI (lint, typecheck, build, a11y, Lighthouse) ──► preview deploy
                                         │
                              merge to main (protected)
                                         │
                                         ▼
                              production deploy (auto)  ◄── DNS (CNAME/A) from hosting company
```

### 6.2 Host options (Akhil's research to confirm — OQ-09)

| Criterion | Vercel | Cloudflare Pages |
| --- | --- | --- |
| Fit for Phase 1 static export | Excellent | Excellent |
| Fit for Phase 2 (server features) | Native Next.js support | Needs an adapter layer for non-static Next.js |
| Preview deployments per PR | Yes | Yes |
| Commercial use on the free tier | **Check current terms** — the free/hobby tier has historically been limited to non-commercial use, which a business site is not | Check current terms (historically permissive for static sites) |
| Config files for headers/redirects | `vercel.json` | `public/_headers`, `public/_redirects` |

**Recommendation:** pick the host that is *legally correct for a commercial site on the plan the client will actually pay for*, then record it in 06-MEMORY. If Phase 2 server features are likely within a year, Vercel is the lower-friction path; if cost and static-only hosting dominate, Cloudflare Pages is the lower-cost path. Verify pricing and terms on the host's current pages before deciding — they change.

### 6.3 DNS handoff checklist (for the hosting/DNS company)

| Record | Value |
| --- | --- |
| Apex (`example.com`) | A/ALIAS/ANAME to the host's instructions (host shows exact values) |
| `www` | CNAME to the host's target |
| Redirect | One canonical host (apex **or** `www`); the other 301-redirects to it |
| TLS | Issued automatically by the host; confirm HTTPS works before demo |
| TTL | Lower TTL (e.g. 300 s) before cutover; raise after |

### 6.4 Required npm scripts

| Script | Purpose |
| --- | --- |
| `dev` | Local dev server |
| `build` | Static export to `out/` |
| `lint` | ESLint (including `jsx-a11y`) |
| `typecheck` | `tsc --noEmit` |
| `test:a11y` | Playwright + axe against a served `out/` |
| `test:e2e` | Navigation and form tests |
| `lighthouse` | Lighthouse CI against `out/` with budgets from NFR-PERF |
| `check:content` | `scripts/check-placeholders.mjs` (warns on PRs; blocks release) |
| `images` | `scripts/optimize-images.mjs` |

### 6.5 Environment variables

| Name | Public? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Yes (embedded in client JS by design) | Form endpoint URL |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URL base |

No secrets exist in Phase 1. Never commit `.env*` files with real values; provide `.env.example`.

---

## 7. Performance budget

| Metric | Budget |
| --- | --- |
| Lighthouse Performance (mobile) | ≥ 95 |
| LCP | ≤ 2.5 s |
| CLS | ≤ 0.1 |
| INP | ≤ 200 ms |
| JS per route (gzipped) | ≤ 150 KB |
| Hero image | ≤ 150 KB |
| Other images | ≤ 200 KB each |
| Third-party requests | 0 (except the form POST) |
| Web fonts | ≤ 2 families, ≤ 4 files total, `display: swap` via `next/font` |

These are proposed engineering budgets; tighten them once the first build exists.

---

## 8. Security and privacy posture (Phase 1)

### 8.1 Headers (set in host config, not `next.config`)

| Header | Starting value |
| --- | --- |
| `Content-Security-Policy` | Start in **Report-Only**. Base: `default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io; frame-ancestors 'none'; base-uri 'self'`. Tighten (hashes) once stable |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| HSTS | Enabled by the host after HTTPS is verified |

### 8.2 Privacy

- The form collects name, phone, optional email and a short message. No health data.
- Formspree stores submissions on its infrastructure: client must be told this (OQ-04, OQ-07).
- Strip EXIF/GPS metadata from every photo.

---

## 9. Phase 2 target architecture

### 9.1 Reference model (from the team's architecture diagrams)

| Layer | Components |
| --- | --- |
| **Edge / network** | Visitor → DNS → GSLB → CDN (static pages, images) → WAF (XSS/SQLi protection) → Firewall → TLS termination |
| **Application / service** | Next.js frontend → API Gateway (routing, throttling, validation) → Auth Service (admin login, MFA, RBAC, sessions) · Inquiry Service (form intake) · Notification Service (email/SMS) · Schedule Service (tour slots) · CRM/Intake integration (leads, follow-ups, contact history) |
| **Data / persistence** | Relational database (users, roles, inquiries, tour slots) · Cache (sessions) · Object storage (photos, PDFs) · Search index (FAQs) · Backups / DR |

### 9.2 Pragmatic path (recommendation)

The reference model is enterprise-scale. For **one** community's website, running five separate services plus a global load balancer adds operations work that the traffic and team size do not justify. Recommended sequence:

1. **Modular monolith:** one Next.js deployment with server routes organised as internal modules (`auth`, `inquiries`, `schedule`, `notifications`). Same boundaries as the diagram, one deployable.
2. **Managed services over self-run:** managed Postgres, a transactional-email provider, managed object storage, managed auth where compliance allows.
3. **CDN + WAF** come with the host; add dedicated GSLB/DR only when an availability requirement says so.
4. **Split a module into its own service** only when a concrete need appears (separate scaling, separate team, vendor isolation).

This keeps every boundary in the diagram but defers the cost. Decision to be confirmed in Milestone 2.0 (04-PHASES §6).

### 9.3 Draft data model (Phase 2, not for Phase 1 build)

| Entity | Key fields |
| --- | --- |
| `AdminUser` | id, email, role, mfaEnabled, lastLoginAt |
| `Inquiry` | id, createdAt, name, phone, email?, relationship?, contactMethod?, visitTimeframe?, message?, status, assignedTo? |
| `TourSlot` | id, startsAt, endsAt, capacity, status |
| `TourBooking` | id, inquiryId, slotId, status, notes? |
| `AuditLog` | id, actorId, action, entity, entityId, at |

### 9.4 Compliance gate

Before Phase 2 stores anything about a prospective resident's **health or care needs**, obtain legal/compliance review of applicable privacy law and retention obligations for this business. Do not assume HIPAA does or does not apply; get it confirmed.

---

## 10. Phase 1 → Phase 2 migration checklist

- [ ] Remove `output: 'export'`; choose runtime host
- [ ] Replace Formspree POST with an Inquiry endpoint behind validation and rate limiting
- [ ] Move headers/redirects from host config into Next config or middleware (as appropriate)
- [ ] Introduce database + migrations; add `.env` secrets handling
- [ ] Add auth (admin only) with MFA and role checks on every route handler
- [ ] Extend CI with API tests and dependency/security scanning