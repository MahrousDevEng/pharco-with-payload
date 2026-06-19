# Route Contract — In-Scope Pages

The website exposes exactly these routes (Constitution VII). Each maps a `(frontend)` route file to
a feature view and its data source. Any route NOT listed here MUST NOT be built. Every `NavItem.href`
and in-page link MUST target a route in this table (FR-008).

## Static routes (18)

| Route | Page file | Feature view | Primary data |
|-------|-----------|--------------|--------------|
| `/` | `(frontend)/page.tsx` | `features/home/HomeView` | hero, companies, news, locations |
| `/about-our-story` | `(frontend)/about-our-story/page.tsx` | `features/about/StoryView` | about content |
| `/history` | `(frontend)/history/page.tsx` | `features/about/HistoryView` | `data/history.ts` |
| `/about-leadership` | `(frontend)/about-leadership/page.tsx` | `features/about/LeadershipView` | `data/leadership.ts` |
| `/about-pharco-group` | `(frontend)/about-pharco-group/page.tsx` | `features/about/GroupView` | `data/companies.ts` |
| `/about-impact-csr` | `(frontend)/about-impact-csr/page.tsx` | `features/about/ImpactCsrView` | csr content |
| `/products-overview` | `(frontend)/products-overview/page.tsx` | `features/products/OverviewView` | `data/products.ts` |
| `/products-therapeutic-areas` | `(frontend)/products-therapeutic-areas/page.tsx` | `features/products/TherapeuticAreasView` | `data/products.ts` |
| `/product-detail` | `(frontend)/product-detail/page.tsx` | `features/products/ProductDetailView` | `PRODUCT_DETAIL_SAMPLE` |
| `/science-rd` | `(frontend)/science-rd/page.tsx` | `features/science/RdView` | science content |
| `/science-manufacturing` | `(frontend)/science-manufacturing/page.tsx` | `features/science/ManufacturingView` | science content |
| `/science-quality` | `(frontend)/science-quality/page.tsx` | `features/science/QualityView` | quality/certs content |
| `/global-presence` | `(frontend)/global-presence/page.tsx` | `features/global-presence/View` | `data/locations.ts` |
| `/life-at-pharco` | `(frontend)/life-at-pharco/page.tsx` | `features/life/View` | life content |
| `/news-events` | `(frontend)/news-events/page.tsx` | `features/news-events/ListView` | `data/news.ts`, `data/events.ts` |
| `/careers` | `(frontend)/careers/page.tsx` | `features/careers/CareersView` | `data/careers.ts` |
| `/careers/apply` | `(frontend)/careers/apply/page.tsx` | `features/careers/ApplyForm` | apply schema |
| `/contact` | `(frontend)/contact/page.tsx` | `features/contact/ContactView` | contact schema |

## Dynamic routes (3) — SSG via `generateStaticParams`

| Route | Page file | Feature view | Params source | Unknown slug |
|-------|-----------|--------------|---------------|--------------|
| `/products/[slug]` | `(frontend)/products/[slug]/page.tsx` | `features/products/ProductDetailView` | `Product.slug` | `notFound()` |
| `/news-events/[slug]` | `(frontend)/news-events/[slug]/page.tsx` | `features/news-events/NewsDetailView` | `NewsArticle.slug` | `notFound()` |
| `/news-events/events/[slug]` | `(frontend)/news-events/events/[slug]/page.tsx` | `features/news-events/EventDetailView` | `Event.slug` | `notFound()` |

Each dynamic page MUST export `generateStaticParams()` (from sample data) and `generateMetadata()`.

## SEO endpoints

| File | Output |
|------|--------|
| `(frontend)/sitemap.ts` | `MetadataRoute.Sitemap` listing all static routes + sample dynamic slugs |
| `(frontend)/robots.ts` | `MetadataRoute.Robots` (allow all; reference sitemap) |
| `(frontend)/not-found.tsx` | styled 404 for unknown slugs |

## Page contract (every page)

- Renders inside `(frontend)/layout.tsx` shell (Header, Footer, ScrollToTop, Toaster, fonts).
- Exports metadata (`metadata` or `generateMetadata`) → unique title + description + OG/Twitter (FR-019).
- Server Component unless it needs interactivity; interactive parts are client islands.
- Visual + responsive parity with the matching live page (FR-002/FR-003).
- Uses shared `PageBanner` / `SectionHeader` for inner-page headers (FR-010).

## Out of scope (MUST NOT build)

- Any `design-ref` route not deployed on the live site.
- `tests/`-style routes, admin website pages, language-prefixed routes (i18n is Phase 2+).
