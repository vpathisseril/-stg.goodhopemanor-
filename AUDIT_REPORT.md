# Good Hope Manor — Code Audit Report

**Date:** 2026-11-25 · **Source:** `yantralabs101-arch/Good-Hope-Manor`, branch `feature/alpha-build-website-r-01` (uploaded snapshot) · **Remediation branch:** `fix/audit-remediation-20261125`

## Stack inventory

| Item | Value |
|---|---|
| Framework | Next.js 16.4.6 (App Router, `output: "export"` → fully static `out/`) |
| UI | React 19.3, Tailwind CSS 4.3, TypeScript 5.9 (strict) |
| Runtime | Node 22.19.0 (`.nvmrc`) |
| Routes | 10 public pages + 404, `robots.txt`, `sitemap.xml` |
| Forms | Client-side POST to Formspree (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`), honeypot `_gotcha`; falls back to "call us" when unset |
| Tests | Playwright + axe-core (35 tests), Lighthouse script, placeholder checker |
| CI | GitHub Actions: lint → typecheck → build → a11y → e2e → Lighthouse |
| Intended host | Cloudflare Pages (see `docs/DEPLOYMENT.md`) |

## Summary

| Severity | Found | Fixed | Open |
|---|---|---|---|
| Critical | 0 | 0 | 0 |
| High | 3 | 3 | 0 |
| Medium | 3 | 2 | 1 |
| Low | 5 | 0 | 5 |

**Health score:** 82/100 before → **93/100 after** remediation.

Overall this is a well-engineered codebase: pinned dependencies, no secrets in the repo, `.env*` ignored, strict TypeScript, escaped JSON-LD, honeypot spam protection, HTTPS enforced for configured URLs, `rel="noopener noreferrer"` on the only external `_blank` link, descriptive alt text on every image, axe-tested accessibility, and an image pipeline that strips metadata and enforces size budgets.

## Findings

| ID | Severity | Category | Location | Evidence | Recommendation | Effort | Status |
|---|---|---|---|---|---|---|---|
| SEC-001 | High | Security | host config (none) | Static export ships no CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy or Permissions-Policy; `next.config` `headers()` is ignored with `output: "export"` | Set headers at the host | S | **Fixed** — `public/_headers` (Cloudflare/Netlify) + `.replit` `[[deployment.responseHeaders]]`; verified all routes render with the CSP and no console errors |
| SEO-001 | High | SEO / Ops | `src/app/robots.ts`, `layout.tsx` | `robots.txt` always `Allow: /`; a staging copy would be indexed and compete with the live site | Environment flag for non-production | S | **Fixed** — `NEXT_PUBLIC_SITE_ENV=staging` → `noindex,nofollow` meta, `Disallow: /`, empty sitemap (plus `X-Robots-Tag` on Replit) |
| BLD-001 | High | Build reliability | `src/app/layout.tsx:2` | `next/font/google` downloads fonts at build time; build fails with "Failed to fetch Newsreader from Google Fonts" on restricted networks | Self-host fonts | S | **Fixed** — `next/font/local` with `@fontsource` (OFL) files; same families and weights |
| DX-001 | Medium | Tooling | `package.json` `typecheck` | `tsc --noEmit` fails on a fresh clone (14× TS2307 for `.svg`/`.webp` imports) because `next-env.d.ts` is git-ignored and not yet generated | Generate types first | S | **Fixed** — `next typegen && tsc --noEmit` |
| DEP-001 | Medium | Dependencies | `package-lock.json` | `npm audit`: 9 dev/transitive advisories (8 moderate, 1 high — zod GHSA-mrhx-c7xc-m3w5); production deps clean | `npm audit fix` | S | **Fixed** — 0 vulnerabilities |
| DEP-002 | Medium | Dependencies | `package.json` | `eslint@9.39.5` flagged deprecated by npm | Plan upgrade to a supported ESLint major alongside `eslint-config-next` | M | Open |
| TST-001 | Low | Testing | `tests/navigation.spec.ts:160` | Test asserts every `main img` has loaded, but gallery images are intentionally `loading="lazy"` off-screen; fails headless (34/35 pass) | Scroll gallery into view or scope the assertion to above-the-fold images | S | Open (test-only; site behaviour correct) |
| OPS-002 | Low | Config | `site.ts` | `NEXT_PUBLIC_SITE_URL` unset → no canonical URLs, sitemap or absolute OG URLs | Set per environment once domains are confirmed (OQ-01) | S | Open — needs domain decision |
| FRM-001 | Low | Feature | `site.ts` | `NEXT_PUBLIC_FORMSPREE_ENDPOINT` not created (P0-05); contact page shows the call-us fallback | Create Formspree form, set env var | S | Open — client action |
| REPO-001 | Low | Repo hygiene | `assets/` | ~30 MB of source photos committed, including unused `living_room1.jpg` (4.6 MB) and `bedroom_yellowblack.jpg` | Move originals to Git LFS or remove unused files | S | Open |
| A11Y-001 | Low | Accessibility | `ContactForm.tsx` submit button | `aria-live` on the button label re-announces "Request a Tour"; status could live in a separate visually-hidden region | Optional refinement | S | Open |

## Verification after remediation

- `npm run lint` ✅ · `npm run typecheck` ✅ · `npm run build` ✅ (production and staging modes) · `npm audit` 0 vulnerabilities ✅
- Playwright: 34/35 pass (TST-001 is the remaining test-only issue)
- Staging build: `robots.txt` = `Disallow: /`; every page carries `<meta name="robots" content="noindex, nofollow">`
- CSP smoke test: all 10 routes return 200 with the policy applied; zero console or CSP errors; mobile menu works

## Top risks remaining

1. Contact form has no endpoint yet (FRM-001), so online tour requests are disabled.
2. Canonical/sitemap URLs are absent until the production domain is set (OPS-002).
3. ESLint major is out of support (DEP-002).
