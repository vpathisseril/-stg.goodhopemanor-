# 05 — Design: UI/UX Specification

> **Project:** Good Hope Manor website · **Spec set:** v1 · **Last updated:** 2026-11-22
>
> **Spec set:** [01 PRD](./PRD.md) · [02 Architecture](./ARCHITECTURE.md) · [03 Rules](./RULES.md) · [04 Phases](./PHASES.md) · [05 Design](./DESIGN.md) · [06 Memory](./MEMORY.md)
>
> **Design owner:** Reshma. Where Reshma's approved wireframes differ from this file, the wireframes win for layout; tokens, accessibility rules and contrast values here still apply. Record any such difference in 06-MEMORY.

## 1. Brand positioning and design principles

The visual design must actively combat the "institutional" stereotype: it should feel like a warm, elegant residential home.

| | |
| --- | --- |
| **Promote** | Warmth, dignity, safety, compassion, trust |
| **Avoid** | Clinical blues/greens, harsh white page backgrounds, hospital-like layouts, exaggerated corporate promises, generic stock photography |

**Principles (in priority order)**

1. **Clarity over cleverness.** One idea per section, one primary action per screen.
2. **Large and calm.** 18px text, generous spacing, 44px+ targets.
3. **Predictable.** Same header, same footer, same CTA place on every page.
4. **Warm and real.** Authentic photos of the actual home and people (with consent).
5. **Never rely on colour alone.**
6. **Quiet motion.** Almost none, and always optional.

---

## 2. Colour

### 2.1 Core tokens (from the brand and the building's palette)

| Token | Hex | Role |
| --- | --- | --- |
| `brand-primary` | `#8a1f2d` | Crimson — brand name colour, **primary CTAs**, active-nav marker, emphasis |
| `brand-secondary` | `#2C4C7E` | Slate/denim blue — trust; links, nav text accents, focus ring, footer background |
| `brand-accent` | `#D98A6C` | Soft terracotta — **decorative only** (dividers, icon fills, shape backgrounds) |
| `neutral-base` | `#F9F7F1` | Warm sand — page background (prevents glare) |
| `neutral-surface` | `#FFFFFF` | Elevated cards, header, form fields |
| `typography-primary` | `#1A1A1A` | Soft black — body and headings |
| `typography-muted` | `#4A5568` | Slate grey — secondary text, form borders |

### 2.2 Extended tokens (added in spec v2.1 — **pending Reshma's approval**)

The original token list had no error/success colours or tints. Without them, agents invent colours. These were chosen and checked for contrast.

| Token | Hex | Role |
| --- | --- | --- |
| `brand-secondary-tint` | `#E9EEF5` | Light denim band background to separate sections |
| `brand-accent-tint` | `#F6E6DE` | Light terracotta band for warm callouts |
| `status-error` | `#B42318` | Error text and icon (always with the word "Error:" and an icon) |
| `status-success` | `#1E6B3C` | Success text and icon (always with text) |

### 2.3 Contrast matrix (computed with the WCAG relative-luminance formula)

Thresholds: **4.5:1** = AA text · **7:1** = AAA text · **3:1** = non-text UI (borders, icons).

| Foreground | Background | Ratio | Result | Use |
| --- | --- | --- | --- | --- |
| `typography-primary` | `neutral-base` | **16.25:1** | AAA | Body text on page |
| `typography-primary` | `neutral-surface` | **17.40:1** | AAA | Text on cards |
| `typography-muted` | `neutral-base` | **7.02:1** | AAA (barely) | Secondary text, ≥ 16px only |
| `typography-muted` | `neutral-surface` | **7.53:1** | AAA | Secondary text on cards |
| `neutral-surface` (white) | `brand-primary` | **9.07:1** | AAA | Primary button text |
| `brand-primary` | `neutral-base` | **8.47:1** | AAA | Headings/links in crimson |
| `brand-primary` | `neutral-surface` | **9.07:1** | AAA | Same, on cards/header |
| `neutral-surface` (white) | `brand-secondary` | **8.60:1** | AAA | Footer text, inverted buttons |
| `brand-secondary` | `neutral-base` | **8.03:1** | AAA | Links, focus ring, outlines |
| `brand-secondary` | `neutral-surface` | **8.60:1** | AAA | Links on cards/header |
| `typography-primary` | `brand-secondary-tint` | **14.93:1** | AAA | Text on denim band |
| `typography-muted` | `brand-secondary-tint` | **6.46:1** | AA | Prefer soft black here |
| `brand-primary` | `brand-secondary-tint` | **7.78:1** | AAA | CTA on band |
| `brand-secondary` | `brand-secondary-tint` | **7.38:1** | AAA | Links on band |
| `typography-primary` | `brand-accent-tint` | **14.33:1** | AAA | Text on terracotta band |
| `typography-muted` | `brand-accent-tint` | **6.20:1** | AA | Prefer soft black here |
| `brand-primary` | `brand-accent-tint` | **7.47:1** | AAA | CTA on band |
| `brand-secondary` | `brand-accent-tint` | **7.08:1** | AAA | Links on band |
| `status-error` | `neutral-base` | **6.14:1** | AA | Error text |
| `status-error` | `neutral-surface` | **6.57:1** | AA | Error text in forms on white |
| `neutral-surface` (white) | `status-error` | **6.57:1** | AA | Text on error fill (if ever used) |
| `status-success` | `neutral-base` | **6.08:1** | AA | Success text |
| `status-success` | `neutral-surface` | **6.51:1** | AA | Success text on white |
| `typography-primary` | `brand-accent` | **6.47:1** | AA | Only valid text on terracotta |
| **`brand-accent`** | `neutral-base` | **2.51:1** | **FAIL** | **Never text; never a control's only boundary** |
| **`neutral-surface` (white)** | `brand-accent` | **2.69:1** | **FAIL** | **Never white text on terracotta** |
| `neutral-surface` | `neutral-base` | 1.07:1 | n/a | Card edge is not relied on; shadow separates cards |
| `brand-secondary-tint` | `neutral-base` | 1.09:1 | n/a | Band is decorative; headings define sections |

### 2.4 Colour rules

1. Use **only** pairings marked AA or AAA above.
2. `brand-accent` is **decorative**: dividers, icon backgrounds, illustration shapes. Never for text, links, form borders or focus indicators. If text must sit on it, use `typography-primary`.
3. `typography-muted` is for secondary text at **16px or larger**; never on `brand-accent`. Prefer `typography-primary` on tinted bands.
4. Primary CTA = `brand-primary` background with white bold text. Only **one** primary CTA is emphasised per viewport where possible.
5. On the dark footer (`brand-secondary`), buttons use the **inverted** style (white background, `brand-secondary` text), not crimson (crimson on denim is muddy).
6. Errors and success always include text and an icon.
7. Alternate section backgrounds between `neutral-base` and `brand-secondary-tint` to chunk long pages. Use a subtle, layered brand-colour gradient only as the homepage hero photograph overlay.

---

## 3. Token implementation

Use **one** of the two forms below, matching the Tailwind major version actually installed (02-ARCHITECTURE §4).

### 3.1 Tailwind v4 — `src/app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* Core */
  --color-brand-primary: #8a1f2d;
  --color-brand-secondary: #2c4c7e;
  --color-brand-accent: #d98a6c;
  --color-neutral-base: #f9f7f1;
  --color-neutral-surface: #ffffff;
  --color-typography-primary: #1a1a1a;
  --color-typography-muted: #4a5568;

  /* Extended (pending design approval) */
  --color-brand-secondary-tint: #e9eef5;
  --color-brand-accent-tint: #f6e6de;
  --color-status-error: #b42318;
  --color-status-success: #1e6b3c;
}

/* Font variables come from next/font in layout.tsx */
@theme inline {
  --font-heading: var(--font-newsreader), Georgia, "Times New Roman", serif;
  --font-body: var(--font-source-sans), system-ui, -apple-system, "Segoe UI", sans-serif;
}

@layer base {
  html {
    color-scheme: light;
    scroll-padding-bottom: 6rem; /* keeps focused items clear of the sticky mobile bar */
  }
  body {
    background-color: var(--color-neutral-base);
    color: var(--color-typography-primary);
    font-family: var(--font-body);
    font-size: 1.125rem;       /* 18px */
    line-height: 1.6;
    letter-spacing: 0.01em;
  }
  h1, h2, h3, h4 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: 1.25;
  }
  :where(a, button, input, select, textarea, summary, [tabindex]):focus-visible {
    outline: 3px solid var(--color-brand-secondary);
    outline-offset: 2px;
  }
  .on-dark :where(a, button, input, select, textarea, summary, [tabindex]):focus-visible {
    outline-color: var(--color-neutral-surface);
  }
}
```

Utilities generated from these names: `bg-brand-primary`, `text-brand-secondary`, `bg-neutral-base`, `text-typography-muted`, `bg-brand-secondary-tint`, `text-status-error`, `font-heading`, `font-body`.

### 3.2 Tailwind v3 — `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#8a1f2d',
          secondary: '#2C4C7E',
          accent: '#D98A6C',
          'secondary-tint': '#E9EEF5', // pending approval
          'accent-tint': '#F6E6DE',    // pending approval
        },
        neutral: {
          base: '#F9F7F1',
          surface: '#FFFFFF',
        },
        typography: {
          primary: '#1A1A1A',
          muted: '#4A5568',
        },
        status: {
          error: '#B42318',   // pending approval
          success: '#1E6B3C', // pending approval
        },
      },
      fontFamily: {
        heading: ['var(--font-newsreader)', 'Georgia', 'serif'],
        body: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

With v3, put the `@layer base` rules from §3.1 (minus `@theme`) in `globals.css` after the `@tailwind` directives, using the same `var(--color-…)` names defined under `:root`.

---

## 4. Typography

### 4.1 Families

The reference preview's editorial serif and restrained warm surfaces informed the
Newsreader/Source Sans 3 pairing. Keep the approved Good Hope Manor brand colors;
use existing warm neutral and terracotta-tint tokens rather than rebranding.

| Role | Family | Why |
| --- | --- | --- |
| Headings (H1–H4) | **Newsreader**, 400–700 (serif) | Editorial warmth with readable, sturdy forms at large sizes |
| Body, UI | **Source Sans 3**, 400–700 (sans-serif) | Open forms and clear UI text and numerals |

Load through `next/font/google` (self-hosted at build). Budget: ≤ 2 families, ≤ 4 font files. Swapping families is allowed if they keep a large x-height, open apertures and weights 400–700; record the swap in 06-MEMORY.

### 4.2 Type scale

| Style | Mobile | ≥ 1024px | Weight | Line height | Notes |
| --- | --- | --- | --- | --- | --- |
| H1 | 36px (`text-4xl`) | 48px (`lg:text-5xl`) | 700 | 1.2 | One per page |
| H2 | 30px (`text-3xl`) | 36px (`lg:text-4xl`) | 700 | 1.25 | Section titles |
| H3 | 24px (`text-2xl`) | 24px | 700 | 1.3 | Card/block titles |
| H4 | 20px (`text-xl`) | 20px | 700 (body font) | 1.4 | Sub-labels |
| Body | **18px** (`text-lg`) | 18px | 400 | **1.6** | Default |
| Lead paragraph | 20px (`text-xl`) | 22px | 400 | 1.6 | Hero supporting text |
| Small / caption | **16px** (`text-base`) | 16px | 400 | 1.5 | **Minimum size anywhere** |
| Button | 18px | 18px | 600 | 1 | |
| Nav link | 18px | 18px | 500 (active 700) | 1 | |

Rules: no weight below 400; no all-caps blocks; no italics for long text; max line length `max-w-prose` (≈ 65 characters); left-aligned (no justified text); letter-spacing slightly open (`0.01em`) for body.

---

## 5. Spacing, layout, shape

| Item | Spec |
| --- | --- |
| Base unit | 8px grid (Tailwind spacing steps 2, 4, 6, 8, 12, 16…) |
| Breakpoints | Tailwind defaults: `sm` 640 · **`md` 768** · **`lg` 1024** · `xl` 1280. Design starts at **320px** |
| Page container | `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8` (16px side gutter at 320px, no horizontal page scroll) |
| Section rhythm | `py-12 md:py-16 lg:py-20`; space between heading and content `mb-8` |
| Content width | Prose blocks `max-w-prose`; cards in 1 / 2 / 3 column grids at base / `md` / `lg` |
| Button / input radius | `rounded-lg` (**8px**). *Note: Tailwind's `rounded-md` is 6px, not 8px; the earlier draft's intent was 8px* |
| Image radius | `rounded-lg` (8px) |
| Card radius | `rounded-xl` (12px) |
| Elevation | Cards: `shadow-sm` on `neutral-surface` over `neutral-base`; header: `shadow-sm`; sticky bar: `shadow-lg`. No harsh borders on cards |
| Dark mode | **Not supported.** `color-scheme: light` |

---

## 6. Components

All components live in `src/components/` (03-RULES R-CODE-02). Class recipes are starting points; keep to tokens.

### 6.1 Button / ButtonLink

| Variant | Recipe |
| --- | --- |
| **Primary** | `inline-flex items-center justify-center min-h-12 min-w-11 px-6 py-3 rounded-lg bg-brand-primary text-neutral-surface text-lg font-semibold motion-safe:transition motion-safe:duration-150 hover:brightness-90 motion-safe:hover:-translate-y-1 active:brightness-75` |
| **Primary — large (hero)** | Same, `min-h-14 px-8 text-xl` |
| **Secondary (outline)** | `… bg-neutral-surface text-brand-secondary border-2 border-brand-secondary hover:bg-brand-secondary-tint` |
| **Inverted (on dark footer)** | `… bg-neutral-surface text-brand-secondary hover:brightness-95` |
| **Text link** | `text-brand-secondary underline underline-offset-4 decoration-2 hover:text-brand-primary` |

| State | Behaviour |
| --- | --- |
| Hover | Darken (`brightness-90`), lift 4px (`motion-safe` only); hit area does not change (transform only) |
| Focus-visible | 3px outline `brand-secondary`, 2px offset (white on dark) — from base styles |
| Active | `brightness-75`, no lift |
| Disabled | **Not used.** Validate on submit instead |

Notes: `ButtonLink` renders `<a>` (navigation) and `Button` renders `<button>` (actions). Never use a `<div>`. Labels are verbs: "Schedule a Tour", "Request a Tour", "Call (954) 677-2900".

### 6.2 Header and navigation

**Desktop (≥ 1024px)**

```
┌──────────────────────────────────────────────────────────────────────┐
│                                   (954) 677-2900   [ Schedule a Tour ]│  ← utility row
├──────────────────────────────────────────────────────────────────────┤
│  GOOD HOPE MANOR   Home  About Us  Care & Services  Life  Families  Reviews  Referrals  Contact │
└──────────────────────────────────────────────────────────────────────┘
```

| Part | Spec |
| --- | --- |
| Container | `bg-neutral-surface shadow-sm` (both rows) |
| Brand name | Newsreader 700, `text-brand-primary`, links to Home |
| Nav link | `inline-flex items-center min-h-11 px-3 text-lg font-medium text-typography-primary hover:text-brand-primary` |
| Active link | `font-bold border-b-[3px] border-brand-primary` + `aria-current="page"` |
| Phone link | `text-brand-secondary font-semibold min-h-11`, `tel:+19546772900` |
| Label for "Life at Good Hope" | Full text if it fits at 1024px; otherwise "Life at Good Hope" wraps to two lines — never truncate |

**Mobile (< 1024px)**

| Part | Spec |
| --- | --- |
| Top bar | Brand name left; **"Menu"** button right (text label + icon, min 44×44px) |
| Menu panel | Full-width panel under the bar, all 8 primary links stacked, each `min-h-12`, 8px gaps; close button labelled "Close"; `aria-expanded` and `aria-controls` on the toggle; Esc closes and returns focus to the toggle; focus is contained while open |
| Sticky bottom bar | See §6.9 |

### 6.3 Footer

`bg-brand-secondary text-neutral-surface on-dark`, `py-12`. Columns at `lg`: (1) brand name, tagline and supplied highlights, (2) address, phone, email and fax, (3) navigation and tour action. Include the supplied license wording, common service qualification, AHCA consumer-information link, Privacy Policy and Accessibility links. Links are white, underlined, `min-h-11`. Copyright line at 16px. Help line: "Need help using this site? Call (954) 677-2900."

### 6.4 Breadcrumbs

`<nav aria-label="Breadcrumb"><ol>` with `Home › Page`. Text 16px, `text-brand-secondary underline` for Home; current page in `typography-primary`, `aria-current="page"`, not a link. Each link `min-h-11 inline-flex items-center`. Hidden on Home.

### 6.5 Card (content, service, review)

`bg-neutral-surface rounded-xl shadow-sm p-6 md:p-8`. Heading H3. If a whole card is clickable, the heading contains the only link and the card gets a focus outline via `focus-within`. Do not nest links.

### 6.6 ReviewCard and ReviewList

```
<figure class="card">
  <div aria-hidden="true">★★★★★</div><span class="sr-only">5 out of 5 stars</span>
  <blockquote>"…verbatim review text…"</blockquote>
  <figcaption>Reviewer Name · March 2025 · <a>Read on Google</a></figcaption>
</figure>
```

Rules: static, no auto-advance; grid 1 / 2 columns; text 18px; stars are decorative with a text equivalent; text exactly as supplied.

### 6.7 Form controls

| Part | Spec |
| --- | --- |
| Label | Above the field; 18px, `font-medium`, `text-typography-primary`; "(required)" in `text-typography-muted` |
| Helper text | 16px `text-typography-muted`, linked with `aria-describedby` |
| Input / select / textarea | `min-h-12 w-full px-4 py-3 rounded-lg bg-neutral-surface text-lg border-2 border-typography-muted` (border 7.02:1 on base, passes 3:1) |
| Focus | Base outline (3px `brand-secondary`, 2px offset) plus `border-brand-secondary` |
| Error | Message below field: icon + "Error:" + plain-language text in `text-status-error`; field gets `border-status-error` and `aria-invalid="true"` |
| Radio group | `<fieldset><legend>`; each option label is a `min-h-12` target with a 24px control |
| Error summary | Box at top of form: `border-2 border-status-error bg-neutral-surface p-4`, heading "Please fix the following", list of links to fields; `role="alert"`, receives focus |
| Success | Box with `status-success` text, check icon and heading "Thank you — we've received your request"; receives focus |

### 6.8 Hero

| Breakpoint | Layout |
| --- | --- |
| Mobile | H1 → lead paragraph → CTA stack (Primary large, then Secondary "Call …") → image (`aspect-[4/3] rounded-lg object-cover`) |
| `lg` | Two columns: text 5/12, image 7/12; CTAs side by side |

Home hero uses the owner-approved garden illustration as a background; its accessible label identifies it as illustrative. Inner-page hero (`PageHero`) is text only on `brand-secondary-tint`: H1 + one-sentence intro + breadcrumbs above.

### 6.9 Sticky mobile bar (`< lg` only)

`fixed inset-x-0 bottom-0 z-40 lg:hidden bg-neutral-surface shadow-lg p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]`, two equal buttons in a grid: **Call** (secondary outline, `tel:`) and **Schedule a Tour** (primary). `<body>` gets `pb-24 lg:pb-0` so the footer is never hidden. Hidden on the Contact page (the form is already the action).

### 6.10 Gallery (Life page)

`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`. Each item is a `<figure>` with `next/image` (`aspect-[4/3] object-cover rounded-lg`) and a `<figcaption>` (16px) when there is a caption. No auto-advance, no hover-only captions. Optional enlarge-on-click only if it uses a fully accessible dialog (focus trap, Esc, labelled close button).

### 6.11 CTA band

`bg-brand-secondary-tint py-12 text-center`: H2 ("Come see Good Hope Manor for yourself" — proposed), one sentence, Primary large button, phone link beneath.

### 6.12 Pillar grid (Why choose us)

3–4 columns at `lg`, 1 at mobile. Each: 48px icon circle (`bg-brand-accent-tint`, icon `brand-primary`, decorative), H3, 1–2 sentences. Icons are decorative (`aria-hidden`).

---

## 7. Page composition

Section order for each route. Reshma's wireframes override layout details.

| Route | Sections (top → bottom) |
| --- | --- |
| `/` | Hero → Family-owned commitment → Long-tenured staff → Personalized assisted living → Table-service dining → Community life/photos → Why Families Choose (six pillars) → Family recommendations (2 supplied reviews) → Location → CTA |
| `/about/` | PageHero → family-owned approach → long-tenured staff → resident-centered approach → community and commitment → CTA |
| `/services/` | PageHero → service introduction and jump list → eight supplied service blocks → personalized approach and admission qualifications → photos → CTA |
| `/life/` | PageHero → community activities → table-service dining → comfortable living → connection → supplied facility-room gallery → CTA |
| `/families/` | PageHero → family questions → considering assisted living → tour questions → move preparation → care-setting distinctions → transition information → FAQ → CTA |
| `/reviews/` | PageHero → supplied review excerpts → visit information → review note → CTA |
| `/referrals/` | PageHero → referral relationships → care transitions/admission qualification → contact → CTA |
| `/contact/` | PageHero → two columns at `lg`: form (7/12) + `ContactDetails` card (5/12); tour checklist and admission information follow. On mobile: contact details first, then form |
| `/privacy/` | PageHero → supplied website privacy statements |
| `/accessibility/` | PageHero → supplied accessibility statement and phone contact |

**Home — mobile wireframe (low fidelity)**

```
┌───────────────────────┐
│ GOOD HOPE MANOR  Menu │
├───────────────────────┤
│ Quality Care Without  │ H1
│ Compromise             │
│ Where Comfort Feels…   │ lead
│ [ Schedule a Tour ]   │
│ [ Call (954) 677-2900]│
│ ┌───────────────────┐ │
│ │   real photo      │ │
│ └───────────────────┘ │
├───────────────────────┤
│ Why Families Choose…  │ H2 + six supplied pillars
│ …                     │
├───────────────────────┤
│ Reviews (2 cards)     │
├───────────────────────┤
│ CTA band              │
├───────────────────────┤
│ Footer                │
├───────────────────────┤
│ [Call] [Schedule Tour]│ sticky bar
└───────────────────────┘
```

---

## 8. Imagery

| Rule | Detail |
| --- | --- |
| Authenticity | Photos presented as Good Hope Manor spaces or people must be genuine, supplied photos. The two owner-approved garden concepts may be used only as illustrations, not as evidence of actual residents, staff, or services. No stock imagery |
| Location | Use only existing image files in the repository's root `assets/` directory; do not look in other directories or remote sources |
| Consent | Resident photos only with a signed release confirmed by the client (R-CONTENT-04) |
| Shot list (request from client) | Exterior (front, entry), lounge, dining room (a meal in progress), a bedroom, beauty salon, library, courtyard, arts & crafts session, caregiver with resident, group activity |
| Format | WebP, max 1600px wide (hero 2000px); hero ≤ 150 KB, others ≤ 200 KB; EXIF stripped |
| Crop | Prefer 4:3 for grid, 16:9 or 3:2 for hero; keep faces and key subject clear of crops |
| Alt text | Describe content and relevance. Good: "Residents and a caregiver painting at a table in the arts and crafts room." Bad: "image of people", "photo1.webp" |
| Decorative | Backgrounds and ornamental shapes use `alt=""` |
| Missing photo | Omit the unsupported image or use another relevant supplied facility photo; never render a photo placeholder |
| Concept illustrations | The owner-approved garden illustrations (`Joyful Laughter in the Garden (1).png` and `Warm Garden Caregiving Conversation.png`) may appear on Home with alt text identifying them as illustrative. Do not imply they depict actual Good Hope Manor residents, staff, or services; other generated imagery requires approval |

---

## 9. Iconography and motion

**Icons:** inline SVG components, 24px, 2px stroke, `currentColor`. Set (≈ 14): phone, calendar, home, heart, shield, utensils (dining), book (library), scissors (salon), palette (arts), map-pin, menu, close, check, alert, star. Always paired with a visible text label (decorative `aria-hidden="true"`). No icon-only buttons.

**Motion:** motion is limited to the primary button lift and 150 ms colour/brightness transitions, both `motion-safe`, plus a single 200 ms `motion-safe` entrance reveal on the homepage hero. No parallax, auto-scroll, auto-play, or carousels. Menu open/close is instant.

---

## 10. Voice, tone and microcopy (proposed — client to approve)

Warm, plain, respectful. Short sentences. Speak to the reader ("you", "your loved one"). No jargon, no hype.

| Element | Copy |
| --- | --- |
| Primary CTA | Schedule a Tour |
| Phone CTA | Call (954) 677-2900 |
| Form submit | Request a Tour |
| Success heading | Thank you — we've received your request |
| Success body | A member of our team will contact you soon. If you'd like to talk right away, call (954) 677-2900. |
| Error summary heading | Please fix the following |
| Name error | Error: Please tell us your name. |
| Phone error | Error: Please enter a phone number we can call, like (954) 555-0100. |
| Email error | Error: Please check the email address. It should look like name@example.com. |
| Network error | Error: We couldn't send your request. Please try again, or call us at (954) 677-2900. |
| 404 heading | We can't find that page |
| 404 body | Let's get you back home. [Go to Home] [Contact us] |
| Privacy line | We use this information only to reply to your request. Please don't include medical details. |

---

## 11. Design QA checklist

- [ ] Only approved tokens used; no raw hex in components
- [ ] Every text/background pair appears in §2.3 as AA or AAA
- [ ] No text under 16px; body at 18px
- [ ] All standalone targets ≥ 44×44px with ≥ 8px gaps
- [ ] Focus outline visible on every control, on light and dark backgrounds
- [ ] Nav active state uses marker + `aria-current`
- [ ] One primary CTA emphasised per viewport; same CTA position on every page
- [ ] No carousels, auto-play, hover-only content
- [ ] Real photos only; alt text reviewed; consent flags set
- [ ] 320 / 768 / 1024 / 1440px checked; 200% zoom checked
- [ ] Reduced-motion setting removes lift and transitions