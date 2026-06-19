# Phase 1 Data Model: Static Content Entities

Phase 1 has **no database**. Each "entity" is a TypeScript type backed by a static module in
`src/data/`, ported from `design-ref/src/{data,lib,utils}`. Types are designed so Phase 2 (Payload
collections) can adopt the same shapes. Images are static `import`s typed as `StaticImageData`.

Conventions: `slug` is the canonical URL identifier (kebab-case, unique within its collection).
All content is English-only in Phase 1.

---

## NavItem  (`src/data/nav.ts`) — single source for header + footer

| Field | Type | Notes |
|-------|------|-------|
| id | string | unique key |
| label | string | display text (matches live nav) |
| href | string | in-scope route |
| subs | `{ label: string; href: string }[]` | dropdown / footer column items |

- Consumed by: `components/layout/Header`, `components/layout/Footer` (and `sitemap.ts`).
- Source: `design-ref/src/components/nav-data.ts`.
- Rule: every `href` MUST resolve to an in-scope route (FR-008).

## Product  (`src/data/products.ts`)

| Field | Type | Notes |
|-------|------|-------|
| name (`n`) | string | brand name (e.g. "CIPROFAR") |
| therapeuticArea (`ta`) | string | FK → TherapeuticArea.name |
| slug | string | derived from name; used by `products/[slug]` |

- Plus `TA_TABS: string[]` (ordered therapeutic-area tab labels).
- Plus `PRODUCT_DETAIL_SAMPLE` (placeholder fields the live `/product-detail` template shows:
  activeIngredient, strengths, form, indications, marketedIn — may be "To be supplied").
- Consumed by: `products-overview`, `products-therapeutic-areas`, `product-detail`,
  `products/[slug]`.
- Source: `design-ref/src/lib/products.ts` (full portfolio ~300 names, 12 areas).

## TherapeuticArea  (derived from `products.ts`)

| Field | Type | Notes |
|-------|------|-------|
| name | string | unique; one of `TA_TABS` |
| products | Product[] | grouping (computed by filter) |

- Consumed by: `products-therapeutic-areas`, `products-overview`.

## NewsArticle  (`src/data/news.ts`)

| Field | Type | Notes |
|-------|------|-------|
| slug | string | unique → `news-events/[slug]` |
| title | string | |
| date | string (ISO) | display + sort |
| excerpt | string | listing card |
| body | string / blocks | detail page |
| image | StaticImageData | hero/card |

- Consumed by: `news-events` (list), `news-events/[slug]` (detail), home `NewsSection`.
- Source: `design-ref/src/utils/news.js`.

## Event  (`src/data/events.ts`)

| Field | Type | Notes |
|-------|------|-------|
| slug | string | unique → `news-events/events/[slug]` |
| title | string | |
| date | string (ISO) | |
| location | string | |
| body | string / blocks | |
| image | StaticImageData | |

- Consumed by: `news-events` (events tab/section), `news-events/events/[slug]`.

## HistoryEntry  (`src/data/history.ts`)

| Field | Type | Notes |
|-------|------|-------|
| year | number | timeline anchor |
| sections | `{ title: string; description: string; image: StaticImageData }[]` | |

- Consumed by: `history`.
- Source: `design-ref/src/data/index.js` (`timeline`).

## Leader  (`src/data/leadership.ts`)

| Field | Type | Notes |
|-------|------|-------|
| name | string | |
| role | string | |
| photo | StaticImageData | |
| bio | string (optional) | |

- Consumed by: `about-leadership`.

## GroupCompany  (`src/data/companies.ts`)

| Field | Type | Notes |
|-------|------|-------|
| name | string | |
| logo | StaticImageData | |
| description | string | |
| href | string (optional) | external/internal link |

- Consumed by: `about-pharco-group`, home `AboutSection`/marquee.
- Source: `design-ref/src/utils/companies.js`.

## Location  (`src/data/locations.ts`)

| Field | Type | Notes |
|-------|------|-------|
| country/region | string | |
| label | string | |
| coords / markerData | varies | map markers |

- Consumed by: `global-presence`, home `MapSection`.

## HeroSlide / SectionContent  (`src/data/hero.ts`, per-feature data)

| Field | Type | Notes |
|-------|------|-------|
| title | string | |
| subtitle | string (optional) | |
| image/video | StaticImageData / string | |
| cta | `{ label: string; href: string }` (optional) | |

- Consumed by: home hero + inner-page banners (`PageBanner`).
- Source: `design-ref/src/utils/hero.js`, `cards.js`, `footer.js`.

## CareerListing  (`src/data/careers.ts`) — sample

| Field | Type | Notes |
|-------|------|-------|
| title | string | role title |
| location | string | |
| type | string | full-time, etc. |
| slug/id | string | |

- Consumed by: `careers`, `careers/apply`.

---

## Form models (client-only; not persisted)

### ContactFormValues  (`src/features/contact/contactSchema.ts`)

| Field | Type | Validation (zod) |
|-------|------|------------------|
| name | string | required, min 2 |
| email | string | required, email |
| phone | string | optional, phone pattern |
| subject | string | optional |
| message | string | required, min 10 |
| recaptcha | (visual only) | not enforced (FR-015) |

### ApplyFormValues  (`src/features/careers/applySchema.ts`)

| Field | Type | Validation (zod) |
|-------|------|------------------|
| fullName | string | required, min 2 |
| email | string | required, email |
| phone | string | required, phone pattern |
| position | string | required |
| cv | File (optional in P1) | type/size validated client-side if present |
| coverLetter | string | optional |
| recaptcha | (visual only) | not enforced |

- On valid submit: local no-op → `sonner` success toast → reset. No network/persistence (FR-014).

## Relationships (summary)

- `Product.therapeuticArea` → `TherapeuticArea.name` (many-to-one).
- `NewsArticle.slug` / `Event.slug` → detail routes (1:1 route).
- `NavItem.href` → in-scope routes (referential; validated against route list in `contracts/routes.md`).
- All image fields → static assets under `public/images`.
