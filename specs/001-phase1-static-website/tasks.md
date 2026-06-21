---
description: "Task list — Phase 1 Static Pharco Informative Website"
---

# Tasks: Phase 1 — Static Pharco Informative Website

**Input**: Design documents from `specs/001-phase1-static-website/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: NONE. Automated testing is intentionally out of scope (Constitution: "No Automated
Tests"). Verification is manual visual/parity + owner-run performance. No test tasks are generated.

**Organization**: Tasks grouped by user story (US1=P1 browse, US2=P2 detail, US3=P3 forms) for
independent, incremental delivery.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on incomplete tasks)
- **[Story]**: US1 / US2 / US3 (story phases only)
- All paths are repo-relative.

## Parity rule (applies to EVERY page/component task)

Each ported page/component MUST match the live page at https://pharco-2025.vercel.app/ and
`/design-ref/` — fonts, colors, spacing, container, imagery, animations — at desktop/tablet/mobile,
keeping design-ref's utility class names (v4 token names are identical, see research.md D2).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Dependencies, build wiring, assets.

- [X] T001 Add Phase 1 dependencies to `package.json` and install (pnpm) per research.md D12: `tailwindcss`, `@tailwindcss/postcss`, `tw-animate-css`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-{dialog,label,navigation-menu,slot}`, `framer-motion`, `embla-carousel-react`, `embla-carousel-autoplay`, `sonner`, `lucide-react` (pinned 0.548.0 to match design-ref), `react-icons`, `react-hook-form`, `zod`, `@hookform/resolvers`
- [X] T002 [P] Create `postcss.config.mjs` with `{ plugins: { '@tailwindcss/postcss': {} } }`
- [X] T003 [P] Copy `design-ref/public/fonts/*.ttf` → `public/fonts/` (5 ttf copied; skipped `fonts.rar`)
- [X] T004 [P] Copy `design-ref/public/images/**` → `public/images/` (249 files)
- [X] T005 [P] Create `src/lib/utils.ts` exporting `cn()` (+ getDirection/handleMouseEnter), ported from `design-ref/src/lib/utils.ts`
- [X] T006 [P] Remove leftover scaffold: deleted `src/app/my-route/` and the Payload demo `src/app/(frontend)/styles.css` starter (replaced by globals.css in T007)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Tailwind v4 theme, fonts, layout shell, shared chrome + primitives. **BLOCKS all stories.**

**⚠️ CRITICAL**: No user-story page can render correctly until this phase is done.

- [X] T007 Create `src/app/(frontend)/globals.css`: ported design-ref globals verbatim; swapped `@tailwind` → `@import "tailwindcss"; @import "tw-animate-css";` + `@theme` (colors, fonts, `--animate-*`) + `@keyframes` (marquee/fadeIn/accordion). NOTE: design-ref hand-defines `.container` (1280px) in CSS → kept as-is, no `@utility container` needed. Fixed v4-removed `bg-opacity-55` → `bg-primary/55`. **Compiles clean (next build ✓).** (depends: T001, T002)
- [X] T008 [P] Create `src/lib/fonts.ts` using `next/font/local`: title=DM Serif Display `variable:"--titleFont"`, text=Ubuntu-Light `variable:"--textFont"` (depends: T003)
- [X] T009 Create `src/app/(frontend)/layout.tsx` shell: font `.variable` classes, `globals.css`, renders `<Header/> {children} <Footer/> <ScrollToTop/> <RevealInit/> <Toaster/>`, `metadataBase` + title template + default OG. **Build ✓** (depends: T007, T008, T014, T015)
- [X] T010 [P] Create `src/data/nav.ts` (NAV + FOOTER_GROUPS) ported from `design-ref/src/components/nav-data.ts`
- [X] T011 [P] Port UI primitives to `src/components/ui/` — DONE: `button`, `sonner` (next-themes removed → light). PENDING: input, textarea, label, form, dialog, sheet, navigation, carousel, breadcrumbs (port when consuming page/form needs them) (depends: T005, T007)
- [X] T012 [P] Port global components to `src/components/global/` — DONE: `ScrollToTop`, `RevealInit`, `Toaster`(sonner). PENDING: `NextImage`, `Marquee` (depends: T007)
- [X] T013 [P] Port inner components to `src/components/inner/` — `PageBanner`, `SectionHeader`, `StatCard`, `Counter`, `Breaker` from `design-ref/src/components/inner/*` (depends: T007)
- [X] T014 Port `src/components/layout/Header.tsx` (custom CSS header + mobile drawer, lang/search) from design-ref, driven by `src/data/nav.ts` + `src/components/icons.tsx`. **Build ✓** (depends: T010)
- [X] T015 Port `src/components/layout/Footer.tsx` from design-ref, driven by `src/data/nav.ts` + icons. **Build ✓** (depends: T010)
- [X] T016 [P] Create `src/app/(frontend)/not-found.tsx` (styled 404 for unknown slugs)

**Checkpoint**: Shell + chrome render; pages can now be ported.

---

## Phase 3: User Story 1 — Browse the corporate website end to end (Priority: P1) 🎯 MVP

**Goal**: All 18 static routes render with parity, working nav/footer/scroll-top/reveal, per-page SEO.

**Independent Test**: Visit every static route, compare to the live page at each breakpoint, click all
nav/footer links — zero broken links, full visual parity.

### Content data (static, from design-ref data/lib/utils)

- [X] T017 [P] [US1] Create `src/data/products.ts` — `PRODUCTS`, `TA_TABS`, `PRODUCT_DETAIL_SAMPLE` (port `design-ref/src/lib/products.ts`)
- [X] T018 [P] [US1] Create `src/data/news.ts` — news articles + slugs (port `design-ref/src/utils/news.js`)
- [X] T019 [P] [US1] Create `src/data/events.ts` — events + slugs
- [X] T020 [P] [US1] Create `src/data/history.ts` — timeline (port `design-ref/src/data/index.js`)
- [X] T021 [P] [US1] Create `src/data/leadership.ts`
- [X] T022 [P] [US1] Create `src/data/companies.ts` (port `design-ref/src/utils/companies.js`)
- [X] T023 [P] [US1] Create `src/data/locations.ts` (global-presence + home map)
- [X] T024 [P] [US1] Create `src/data/hero.ts` + cards/footer content (port `design-ref/src/utils/{hero,cards,footer}.js`)
- [X] T025 [P] [US1] Create `src/data/careers.ts` — sample career listings

### Pages (each: `page.tsx` + `features/<feature>/<View>` + sections + exported `metadata` with title/description/OG — FR-019)

- [X] T026 [US1] Home: `src/features/home/HomeView.tsx` + `sections/*` (HeroBanner, AboutSection, MapSection, ManufacturingSection, HepCSection, RewardSection, NewsSection) wired in `src/app/(frontend)/page.tsx` (depends: T017–T024)
- [X] T027 [P] [US1] `about-our-story` → `features/about/StoryView` + `src/app/(frontend)/about-our-story/page.tsx`
- [X] T028 [P] [US1] `history` → `features/about/HistoryView` (uses `data/history.ts`) + page
- [X] T029 [P] [US1] `about-leadership` → `features/about/LeadershipView` (uses `data/leadership.ts`) + page
- [X] T030 [P] [US1] `about-pharco-group` → `features/about/GroupView` (uses `data/companies.ts`) + page
- [X] T031 [P] [US1] `about-impact-csr` → `features/about/ImpactCsrView` + page
- [X] T032 [P] [US1] `products-overview` → `features/products/OverviewView` (uses `data/products.ts`) + page
- [X] T033 [P] [US1] `products-therapeutic-areas` → `features/products/TherapeuticAreasView` (TA_TABS) + page
- [X] T034 [P] [US1] `product-detail` → `features/products/ProductDetailView` (PRODUCT_DETAIL_SAMPLE) + page
- [X] T035 [P] [US1] `science-rd` → `features/science/RdView` + page
- [X] T036 [P] [US1] `science-manufacturing` → `features/science/ManufacturingView` + page
- [X] T037 [P] [US1] `science-quality` → `features/science/QualityView` + page
- [X] T038 [P] [US1] `global-presence` → `features/global-presence/View` (uses `data/locations.ts`) + page
- [X] T039 [P] [US1] `life-at-pharco` → `features/life/View` + page
- [X] T040 [P] [US1] `news-events` list → `features/news-events/ListView` (uses news + events) + page
- [X] T041 [P] [US1] `careers` → `features/careers/CareersView` (uses `data/careers.ts`) + page

**Checkpoint**: Full browsable site (MVP). All static routes parity-checked; nav/footer links resolve.

---

## Phase 4: User Story 2 — View detailed product, news, and event pages (Priority: P2)

**Goal**: Dynamic detail routes render from sample data via SSG, with metadata and graceful not-found.

**Independent Test**: Open each dynamic route with a sample slug (renders detail, matches live) and an
unknown slug (shows not-found).

- [X] T042 [US2] `src/app/(frontend)/products/[slug]/page.tsx` → `features/products/ProductDetailView`; export `generateStaticParams()` from `Product.slug`, `generateMetadata()`, `dynamicParams=true`, `notFound()` on miss (depends: T017, T034)
- [X] T043 [P] [US2] `src/app/(frontend)/news-events/[slug]/page.tsx` → `features/news-events/NewsDetailView`; `generateStaticParams` from `NewsArticle.slug` + `generateMetadata` + `notFound()` (depends: T018, T040)
- [X] T044 [P] [US2] `src/app/(frontend)/news-events/events/[slug]/page.tsx` → `features/news-events/EventDetailView`; `generateStaticParams` from `Event.slug` + `generateMetadata` + `notFound()` (depends: T019, T040)

**Checkpoint**: Detail routes work for sample slugs; unknown slugs hit `not-found.tsx`.

---

## Phase 5: User Story 3 — Submit the contact and careers forms (Priority: P3)

**Goal**: Contact + Apply forms validate client-side and show success toast; no backend (contracts/forms.md).

**Independent Test**: Submit each form with invalid input (inline errors, blocked) and valid input
(success toast, reset); no network/DB call.

- [~] T045 [P] [US3] Create `src/features/contact/contactSchema.ts` (zod) + `ContactForm.tsx` (RHF + `@hookform/resolvers/zod` + ui/form), success via sonner toast + reset; render in `features/contact/ContactView` + `src/app/(frontend)/contact/page.tsx` (depends: T011, T012)
- [~] T046 [P] [US3] Create `src/features/careers/applySchema.ts` (zod) + `ApplyForm.tsx` (RHF + zod, client-side CV type/size check) + `src/app/(frontend)/careers/apply/page.tsx`, success toast + reset (depends: T011, T012)
- [~] T047 [US3] Preserve reCAPTCHA UI markup in both forms (visual only, not enforced — FR-015); confirm submit handlers make NO network/persistence calls (depends: T045, T046)

**Checkpoint**: Both forms behave per contract with no backend.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T048 [P] Create `src/app/(frontend)/sitemap.ts` listing all in-scope static routes + sample dynamic slugs (FR-019)
- [X] T049 [P] Create `src/app/(frontend)/robots.ts` (allow all; reference sitemap)
- [ ] T050 Accessibility pass across components (FR-018): semantic landmarks + heading order, labels/`aria-describedby` on form fields, visible focus, meaningful/empty `alt`, AA contrast, reduced-motion guard
- [ ] T051 [P] Image audit: ensure every `next/image` uses static import or explicit width/height to keep CLS ≤ 0.1
- [ ] T052 [P] SEO sweep: confirm every static + dynamic route exports unique title + description + OG/Twitter
- [ ] T053 Run `pnpm lint` + Prettier (incl. prettier-plugin-tailwindcss); fix issues
- [ ] T054 Run `pnpm build` and confirm it succeeds with NO `DATABASE_URL` (website build is static); click through every route in `contracts/routes.md` vs live
- [ ] T055 Hand deploy/preview to owner for Core Web Vitals + speed tests (SC-009) — do NOT run Lighthouse locally

---

## Dependencies & Execution Order

### Phase order

- Setup (P1) → Foundational (P2) → US1 (P3) → US2 (P4) → US3 (P5) → Polish (P6).
- Foundational BLOCKS all stories. US1 is the MVP.
- US2 depends on some US1 data + views (products detail T034, news/events list T040). US3 depends only
  on Foundational (T011/T012) and is independent of US1/US2 content.

### Within stories

- Data tasks (T017–T025) before the views that consume them.
- Pages are independent of each other → most are `[P]`.

### Parallel opportunities

- Setup: T002–T006 in parallel.
- Foundational: T010–T013, T016 in parallel; T014/T015 after T010+T011; T009 after T007/T008/T014/T015.
- US1: all data tasks T017–T025 in parallel; then all `[P]` page tasks T027–T041 in parallel (T026 home after data).
- US2: T043/T044 in parallel (T042 after products detail view).
- US3: T045/T046 in parallel.
- Polish: T048, T049, T051, T052 in parallel.

---

## Parallel Example: User Story 1 pages

```bash
# After foundational + US1 data are done, port static pages in parallel:
Task: "about-our-story → features/about/StoryView + page"      # T027
Task: "history → features/about/HistoryView + page"            # T028
Task: "products-overview → features/products/OverviewView"     # T032
Task: "science-rd → features/science/RdView + page"            # T035
Task: "global-presence → features/global-presence/View"        # T038
# ...all [P] US1 page tasks
```

---

## Implementation Strategy

### MVP first (US1)

1. Phase 1 Setup → 2. Phase 2 Foundational → 3. Phase 3 US1 → **STOP & VALIDATE** parity vs live →
deploy/demo. This alone is a complete, browsable marketing site.

### Incremental delivery

US1 (browse, MVP) → US2 (detail pages) → US3 (forms) → Polish (SEO/a11y/build/handoff). Each story
adds value without breaking the previous.

---

## Notes

- NO test tasks by design (Constitution). Verification is manual parity + owner-run performance.
- Tailwind v4 only; never ship v3. Keep design-ref class names (token names identical).
- Light theme + English only; no `next-themes`, no `next-intl` in Phase 1.
- Payload admin under `(payload)/` is untouched; build must not require `DATABASE_URL`.
- Commit after each task or logical group. Stop at any checkpoint to validate a story.
