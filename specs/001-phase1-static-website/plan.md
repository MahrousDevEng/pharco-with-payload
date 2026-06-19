# Implementation Plan: Phase 1 — Static Pharco Informative Website

**Branch**: `001-phase1-static-website` | **Date**: 2026-06-20 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-phase1-static-website/spec.md`

## Summary

Port the approved, deployed Pharco corporate website from `/design-ref/` (Next.js 15 + Tailwind
v3, mid-migration) into this Payload-scaffolded Next.js 16 App Router project, rendered as a
static, backend-free public website under the existing `(frontend)` route group. UI components
are ported as-is (Radix + CVA + tailwind-merge/clsx) and retuned to a Tailwind **v4** CSS-first
`@theme`; all v3 tokens (colors, fonts, container, keyframes) are mapped 1:1 for pixel parity.
Content is static, sourced from `design-ref/src/data`, `src/lib`, `src/utils`. Forms use
react-hook-form + zod with a success toast and no backend. Full per-page SEO metadata +
`sitemap`/`robots`. Light theme only, English only. No database dependency; Payload admin is left
untouched.

## Technical Context

**Language/Version**: TypeScript 5.7, React 19.2, Next.js 16.2 (App Router)
**Primary Dependencies**: Tailwind CSS v4 (`@tailwindcss/postcss`), shadcn/ui + Radix UI,
class-variance-authority, tailwind-merge, clsx, framer-motion, embla-carousel-react (+autoplay),
sonner, lucide-react, react-icons, react-hook-form, zod, @hookform/resolvers, next/font (local)
**Storage**: None in Phase 1 — static content from `design-ref/src/data` / `src/lib` / `src/utils`
ported into `src/data`. (Payload + PostgreSQL exist in the repo but are NOT wired to the website.)
**Testing**: None — automated testing intentionally out of scope (constitution). Verification is
manual visual/parity review; performance is owner-run manually (no local Lighthouse by implementer).
**Target Platform**: Modern evergreen browsers; responsive desktop/tablet/mobile; deploy on Vercel.
**Project Type**: Web application (frontend website inside a Payload monorepo route group).
**Performance Goals**: Core Web Vitals "good" — LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms (mid-tier
mobile). RSC-by-default, client islands only where interactive.
**Constraints**: Pixel-identical to live site (fonts/colors/spacing/containers/animations);
light theme only; English only; no backend/API/DB dependency to build or run; Tailwind v4 only
(never ship v3); Prettier + prettier-plugin-tailwindcss; Tailwind must not affect the Payload admin.
**Scale/Scope**: 18 static routes + 3 dynamic detail routes; ~12 therapeutic areas, full product
portfolio (~300 product names), sample news/events; shared header/footer/UI component library.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Plan compliance | Status |
|---|-----------|-----------------|--------|
| I | Design Fidelity (NON-NEGOTIABLE) | Port views/sections/components verbatim; parity reviewed vs live pages | PASS |
| II | Tailwind v4 only | `@tailwindcss/postcss` + CSS-first `@theme`; map every v3 token; no v3 config shipped | PASS |
| III | Port, don't rebuild | Reuse design-ref Radix/CVA components, retune tokens; shadcn only for missing primitives | PASS |
| IV | Feature-based architecture & DRY | `src/features/<feature>/` for views+sections; shared `components/`, `lib/`, `data/` | PASS |
| V | Performance-first | RSC default; client islands for header menu, carousels, forms, reveal, scroll-top; next/image | PASS |
| VI | Reuse over reinvent | Adopt design-ref's proven libs; no hand-rolled carousel/toast/animation | PASS |
| VII | Scope discipline — live pages only | Build only the 21 verified in-scope routes; exclude non-deployed design-ref pages | PASS |
| — | Light theme only | Drop next-themes; no `dark:` variants ported | PASS |
| — | No automated tests | No test framework/files; manual verification | PASS |
| — | i18n deferred | English only; no next-intl in Phase 1 | PASS |
| — | DB deferred | No DATABASE_URL needed to build/run the website | PASS |

**Result**: No violations. Complexity Tracking not required.

## Project Structure

### Documentation (this feature)

```text
specs/001-phase1-static-website/
├── plan.md              # This file
├── research.md          # Phase 0 output — decisions & v3→v4 mapping
├── data-model.md        # Phase 1 output — static content entities
├── quickstart.md        # Phase 1 output — setup & port workflow
├── contracts/           # Phase 1 output — route + form/UI contracts
│   ├── routes.md
│   └── forms.md
└── checklists/
    └── requirements.md  # from /speckit-specify
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── (frontend)/                    # PUBLIC WEBSITE (Tailwind v4 scoped here)
│   │   ├── layout.tsx                 # shell: fonts, globals.css, Header, Footer, ScrollTop, Toaster
│   │   ├── globals.css                # @import "tailwindcss" + @theme (mapped v3 tokens) + base layer
│   │   ├── page.tsx                   # / (home)
│   │   ├── about-our-story/page.tsx
│   │   ├── history/page.tsx
│   │   ├── about-leadership/page.tsx
│   │   ├── about-pharco-group/page.tsx
│   │   ├── about-impact-csr/page.tsx
│   │   ├── products-overview/page.tsx
│   │   ├── products-therapeutic-areas/page.tsx
│   │   ├── product-detail/page.tsx
│   │   ├── products/[slug]/page.tsx
│   │   ├── science-rd/page.tsx
│   │   ├── science-manufacturing/page.tsx
│   │   ├── science-quality/page.tsx
│   │   ├── global-presence/page.tsx
│   │   ├── life-at-pharco/page.tsx
│   │   ├── news-events/page.tsx
│   │   ├── news-events/[slug]/page.tsx
│   │   ├── news-events/events/[slug]/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── careers/apply/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── not-found.tsx              # styled 404 for unknown slugs
│   │   ├── sitemap.ts                 # in-scope routes
│   │   └── robots.ts
│   └── (payload)/                     # UNTOUCHED admin + api
├── features/                          # FEATURE-BASED (views + sections + feature schema)
│   ├── home/        { HomeView.tsx, sections/* }
│   ├── about/       { *View.tsx, sections/* }      # story, leadership, group, impact-csr, history
│   ├── products/    { OverviewView, TherapeuticAreasView, ProductDetailView, sections/* }
│   ├── science/     { RdView, ManufacturingView, QualityView, sections/* }
│   ├── global-presence/ { View, sections/* }
│   ├── life/        { View, sections/* }
│   ├── news-events/ { ListView, NewsDetailView, EventDetailView, sections/* }
│   ├── careers/     { CareersView, ApplyForm.tsx, applySchema.ts }
│   └── contact/     { ContactView, ContactForm.tsx, contactSchema.ts }
├── components/
│   ├── layout/      { Header/, Footer/, MainLayout.tsx }
│   ├── ui/          { button, input, textarea, label, form, dialog, sheet, navigation,
│   │                  carousel, breadcrumbs, sonner }   # shadcn/Radix primitives (ported)
│   ├── global/      { NextImage.tsx, ScrollToTop.tsx, Reveal.tsx, Marquee.tsx, Toaster }
│   └── inner/       { PageBanner, SectionHeader, StatCard, Counter, Breaker }
├── data/                              # ported static sample content (from design-ref data/lib/utils)
│   ├── nav.ts        # header + footer nav (single source)
│   ├── products.ts   # PRODUCTS, TA_TABS, product detail sample
│   ├── news.ts       # news articles + sample slugs
│   ├── events.ts     # events + sample slugs
│   ├── history.ts    # timeline
│   └── ...            # leadership, companies, locations, hero, footer, cards
└── lib/             { utils.ts (cn), fonts.ts (next/font local) }

public/
├── fonts/           # DMSerifDisplay-Regular, Ubuntu-{Light,Regular,Medium,Bold}
└── images/          # all design-ref/public/images copied for static next/image imports
```

**Structure Decision**: Web application using the existing `(frontend)` route group for the public
site and a `src/features/<feature>/` layer for page views and their sections (mirrors design-ref's
`views/<feature>/sections/` so the port is mechanical). Shared chrome and primitives live in
`src/components/{layout,ui,global,inner}`; static content lives in `src/data`; helpers in `src/lib`.
Tailwind v4 is introduced via PostCSS and its base/preflight is only imported by the `(frontend)`
layout's `globals.css`, so the Payload admin under `(payload)/` is unaffected.

## Complexity Tracking

> No Constitution Check violations — section intentionally empty.
