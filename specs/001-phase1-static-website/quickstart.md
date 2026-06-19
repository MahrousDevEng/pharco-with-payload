# Quickstart: Phase 1 Static Website Port

Audience: the implementer. This is the build order. No tests (constitution). No DB needed.
Performance audits are owner-run (do NOT run local Lighthouse).

## 0. Prereqs

- pnpm, Node ≥ 20.9.
- `.env`: `PAYLOAD_SECRET` set; `DATABASE_URL` NOT required for the website (admin may error — fine).
- Reference: `/design-ref/` (source) and https://pharco-2025.vercel.app/ (parity target).

## 1. Install dependencies (D12)

```bash
pnpm add tailwindcss @tailwindcss/postcss tw-animate-css \
  class-variance-authority clsx tailwind-merge \
  @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-navigation-menu @radix-ui/react-slot \
  framer-motion embla-carousel-react embla-carousel-autoplay sonner lucide-react react-icons \
  react-hook-form zod @hookform/resolvers
```

## 2. Tailwind v4 wiring (D1–D3, D5)

1. Create `postcss.config.mjs`: `export default { plugins: { '@tailwindcss/postcss': {} } }`.
2. Create `src/app/(frontend)/globals.css`:
   - `@import "tailwindcss";`
   - `@import "tw-animate-css";`
   - `@theme { --color-primary:#e07e27; --color-secondary:#55565a; --color-third:#000;
     --font-titleFont:var(--titleFont); --font-textFont:var(--textFont);
     --animate-marquee:marquee var(--duration) linear infinite; --animate-fadeIn:fadeIn 1s ease-out; ... }`
   - `@utility container { margin-inline:auto; padding-inline:1rem; max-width:1400px; }`
   - `@keyframes marquee/fadeIn/accordion-*` (ported from design-ref).
   - Port the rest of `design-ref/src/styles/globals.css` base rules; convert/verify any v3-only
     `@apply`/`theme()`/`@layer` usages (see research Open Risks).
3. Confirm Payload admin still renders unstyled-by-Tailwind (globals.css imported ONLY by
   `(frontend)/layout.tsx`).

## 3. Fonts (D4)

- Copy `design-ref/public/fonts/*.ttf` → `public/fonts/`.
- `src/lib/fonts.ts`: `localFont` for title (DM Serif Display) `variable:"--titleFont"`, text
  (Ubuntu weights) `variable:"--textFont"`. Apply both `.variable` classes in `(frontend)/layout.tsx`.

## 4. Assets (D9)

- Copy `design-ref/public/images/**` → `public/images/`.
- Use static `import` for `next/image` (port design-ref's `NextImage` wrapper to `components/global`).

## 5. Shared chrome + primitives (D6, D7)

- Port `components/ui/*`, `components/global/*`, `components/inner/*`, `components/layout/*`
  (Header, Footer, MainLayout) into `src/components/...`; retune classes to v4 tokens (names unchanged).
- Port `nav-data.ts` → `src/data/nav.ts`. Wire Header + Footer from it.
- `(frontend)/layout.tsx`: fonts + globals + `<Header/> {children} <Footer/> <ScrollToTop/> <Toaster/>`.
- Add `'use client'` only to interactive islands (header menu, carousel, forms, reveal, scroll-top,
  counter, marquee, toaster).

## 6. Content (data-model.md)

- Port `design-ref/src/{data,lib,utils}` into typed modules under `src/data/` (products, news,
  events, history, leadership, companies, locations, hero, careers). Type each per data-model.md.

## 7. Pages by priority (spec user stories)

1. **P1 — browse**: home + all 18 static routes. Each: `page.tsx` → feature view; export metadata;
   parity-check vs live at desktop/tablet/mobile; verify nav/footer/scroll-top/reveal.
2. **P2 — detail**: `products/[slug]`, `news-events/[slug]`, `news-events/events/[slug]` with
   `generateStaticParams` + `generateMetadata` + `notFound()`; add `(frontend)/not-found.tsx`.
3. **P3 — forms**: Contact + Careers Apply (RHF + zod + sonner), per `contracts/forms.md`.

## 8. SEO (D10)

- Per-page `metadata` / `generateMetadata` (title, description, OG/Twitter).
- `(frontend)/sitemap.ts` + `(frontend)/robots.ts`; set `metadataBase` in layout.

## 9. Accessibility (FR-018) — built in, no widget

- Semantic landmarks + heading order; labels for all controls; visible focus; keyboard operability;
  meaningful/empty `alt`; AA contrast; reduced-motion guard on framer-motion.

## 10. Verify (manual)

```bash
pnpm dev      # click through every route in contracts/routes.md; compare to live
pnpm build    # MUST succeed with no DATABASE_URL (website build is static)
pnpm lint
```

- Visual parity per page (SC-002); zero broken links (SC-001); dynamic + not-found (SC-003);
  form validate/success (SC-004); a11y pass (SC-007).
- Hand the deploy/preview to the owner for Core Web Vitals + speed tests (SC-009) — do not run
  Lighthouse locally.

## Done when

All in-scope routes render with parity, forms behave, SEO present, build is DB-free, a11y clean.
