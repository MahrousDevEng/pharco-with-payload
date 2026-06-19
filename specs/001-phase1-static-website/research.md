# Phase 0 Research: Static Pharco Website Port (Tailwind v3 → v4)

All decisions below resolve the Technical Context and the two items the spec deferred to planning
(dynamic-route generation strategy, image-asset handling). No open `NEEDS CLARIFICATION` remain.

---

## D1. Tailwind v4 adoption inside a Payload (Next 16) project

**Decision**: Add `tailwindcss@4` + `@tailwindcss/postcss`. Create root `postcss.config.mjs` with
`{ plugins: { "@tailwindcss/postcss": {} } }`. Put `@import "tailwindcss";` + `@theme` ONLY in
`src/app/(frontend)/globals.css`, imported ONLY by `src/app/(frontend)/layout.tsx`.

**Rationale**: v4 is CSS-first (no JS `tailwind.config.js` required). Preflight/base and generated
utilities only apply to stylesheets that `@import "tailwindcss"`. Because the Payload admin under
`(payload)/` imports its own `custom.scss` and never imports `globals.css`, Tailwind's reset cannot
leak into the admin (Constitution: "Tailwind must not affect the Payload admin"). PostCSS plugin
runs fine under Next 16 Turbopack.

**Alternatives considered**: (a) Keep a JS config via `@config` — unnecessary, reintroduces v3-style
file. (b) Scope Tailwind with a wrapper class/important — fragile and harms parity.

## D2. v3 → v4 token mapping (pixel parity)

**Decision**: Translate every token from `design-ref/tailwind.config.js` into a v4 `@theme` block.
Keep the SAME utility class names design-ref uses so ported markup is unchanged.

| v3 (tailwind.config.js) | v4 `@theme` entry | Utilities produced (unchanged) |
|---|---|---|
| `colors.primary = #e07e27` | `--color-primary: #e07e27;` | `text-primary`, `bg-primary`, `border-primary` |
| `colors.secondary = #55565a` | `--color-secondary: #55565a;` | `*-secondary` |
| `colors.third = #000` | `--color-third: #000000;` | `*-third` |
| `fontFamily.titleFont = var(--titleFont)` | `--font-titleFont: var(--titleFont);` | `font-titleFont` |
| `fontFamily.textFont = var(--textFont)` | `--font-textFont: var(--textFont);` | `font-textFont` |
| `keyframes.{accordion-up/down, marquee, fadeIn}` + `animation.*` | `@keyframes` in css + `--animate-marquee/--animate-fadeIn/--animate-accordion-*` | `animate-marquee`, `animate-fadeIn`, `animate-accordion-*` |

The `--titleFont` / `--textFont` CSS variables are produced by `next/font/local` (D4) so the font
indirection is preserved exactly.

**Rationale**: 1:1 token names → ported components need no class rewrites → fidelity by construction.

**Alternatives considered**: Renaming to v4 idioms (`font-title`) — would force edits across every
ported component and risk drift. Rejected.

## D3. The `container` utility (v4 gotcha)

**Decision**: v4 dropped `theme.container` (center/padding/screens). Recreate design-ref's container
with a custom utility in `globals.css`:

```css
@utility container {
  margin-inline: auto;
  padding-inline: 1rem;     /* v3 container.padding */
  max-width: 1400px;        /* v3 screens.2xl */
}
```

**Rationale**: design-ref relies on `container` being centered, `1rem` padded, capped at `1400px`.
v4 has no config knobs for this, so a custom `@utility` reproduces it identically.

**Alternatives considered**: `mx-auto px-4 max-w-[1400px]` everywhere — noisy, diverges from ported
markup. Rejected.

## D4. Fonts

**Decision**: Use `next/font/local` in `src/lib/fonts.ts` to load `DMSerifDisplay-Regular.ttf`
(title) and `Ubuntu-{Light,Regular,Medium,Bold}.ttf` (text) from `public/fonts`, exposing
`variable: "--titleFont"` and `variable: "--textFont"`. Apply both variable classes on `<html>`/
`<body>` in the `(frontend)` layout.

**Rationale**: Matches design-ref's `var(--titleFont)`/`var(--textFont)` contract, self-hosted (no
network FOUT), and gives `font-display: swap` for LCP. Copy the `.ttf` files; ignore `fonts.rar`.

**Alternatives considered**: `@font-face` in CSS — works but loses next/font optimization & preload.

## D5. Animations / `tailwindcss-animate`

**Decision**: Replace the v3 `tailwindcss-animate` plugin with `tw-animate-css` (v4-native), imported
in `globals.css`. Port design-ref's bespoke keyframes (`marquee`, `fadeIn`, accordion) into `@theme`/
`@keyframes`. Reveal-on-scroll and motion use `framer-motion` as in design-ref.

**Rationale**: shadcn/Radix-derived components (sheet, dialog, navigation) use `animate-in`/`-out`
utilities from the animate plugin; `tw-animate-css` is the maintained v4 equivalent. Bespoke
keyframes are few and ported verbatim for parity.

**Alternatives considered**: Hand-writing every `animate-in` keyframe — high effort, easy to drift.

## D6. Component port strategy (shadcn/Radix)

**Decision**: Copy `design-ref/src/components/ui/*` (button, input, textarea, label, form, dialog,
sheet, navigation, carousel, breadcrumbs, sonner) into `src/components/ui`, retune to v4 tokens.
Add missing primitives via the shadcn MCP/CLI only if a needed component is absent. Keep Radix +
CVA + `cn()` (clsx + tailwind-merge) intact.

**Rationale**: Constitution III (port, don't rebuild). design-ref already ships these as
shadcn-style wrappers, so porting is mechanical and preserves behavior.

**Alternatives considered**: Regenerate all via shadcn CLI — visual drift + wasted effort. Rejected.

## D7. Server vs client components (performance)

**Decision**: Pages/sections are React Server Components by default. Mark as client islands only:
header (mobile menu / nav state), carousels (embla), forms (RHF), `ScrollToTop`, `Reveal`
(framer-motion), `Counter`, `Marquee`, sonner `Toaster`. Images via `next/image` (static imports).

**Rationale**: Constitution V. Minimizes client JS → supports CWV targets (LCP/INP). Content-heavy
informative pages render on the server.

**Alternatives considered**: design-ref's broad `"use client"` usage — port selectively, not wholesale.

## D8. Dynamic detail routes — generation strategy (deferred item resolved)

**Decision**: For `products/[slug]`, `news-events/[slug]`, `news-events/events/[slug]`, implement
`generateStaticParams()` from the ported sample data (SSG at build), set
`export const dynamicParams = true`, and call `notFound()` for slugs absent from sample data →
renders `(frontend)/not-found.tsx`.

**Rationale**: Static generation fits "no backend" + CWV goals; `notFound()` satisfies FR-012/SC-003
(graceful not-found). Slugs derive from sample data, so the set is known at build.

**Alternatives considered**: Fully dynamic SSR — needs a runtime data source, contradicts static goal.

## D9. Image assets (deferred item resolved)

**Decision**: Copy `design-ref/public/images/**` and `design-ref/public/fonts/*.ttf` into the
project `public/`. Use static `import img from "..."` for `next/image` (as design-ref does) so
width/height/blur and optimization are automatic, preventing CLS.

**Rationale**: Static imports give intrinsic dimensions → CLS ≤ 0.1 (SC-009) and parity with
design-ref's import-based image usage.

**Alternatives considered**: Remote/CMS media — that's Phase 2 (Payload). Out of scope now.

## D10. SEO metadata (from clarification Q1)

**Decision**: Use the Next Metadata API. Static pages export `metadata`; dynamic pages export
`generateMetadata()` deriving title/description/OG from sample data. Add a shared default in the
`(frontend)` layout (title template, `metadataBase`, default OG). Implement `(frontend)/sitemap.ts`
(all in-scope routes incl. sample dynamic slugs) and `(frontend)/robots.ts`.

**Rationale**: Native, zero-dependency, per-route; supports CWV/SEO synergy from Q1/Q2.

**Alternatives considered**: `next-seo` — redundant with the App Router Metadata API. Rejected.

## D11. Forms (no backend)

**Decision**: `react-hook-form` + `zod` via `@hookform/resolvers/zod`. Contact + Careers Apply
forms validate client-side, show inline errors (ported shadcn `form` primitives), and on valid
submit call a local no-op handler that fires a `sonner` success toast and resets. reCAPTCHA markup
kept visually (not enforced).

**Rationale**: FR-013/014/015. Add `@hookform/resolvers` (not in design-ref deps).

**Alternatives considered**: Server actions — would introduce backend behavior; deferred.

## D12. Dependency delta

**Add**: `tailwindcss@4`, `@tailwindcss/postcss`, `tw-animate-css`, `@radix-ui/react-dialog`,
`@radix-ui/react-label`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-slot`,
`class-variance-authority`, `clsx`, `tailwind-merge`, `framer-motion`, `embla-carousel-react`,
`embla-carousel-autoplay`, `sonner`, `lucide-react`, `react-icons`, `react-hook-form`, `zod`,
`@hookform/resolvers`.
**Keep**: existing Payload/Next/React stack; `tsx`, prettier(+tailwind plugin), shadcn CLI, eslint.
**Do NOT add**: `next-themes` (light only), `next-intl` (i18n deferred), `react-google-recaptcha`
enforcement libs beyond visual markup, any test framework.

**Rationale**: Mirrors design-ref's proven libraries (Constitution VI) minus the dropped concerns.

## Open risks

- `globals.css` in design-ref is ~5.7k lines — audit for v3-only at-rules (`@layer`/`@apply` with
  removed utilities, `theme()` calls) during the port; convert `@apply` of custom tokens as needed.
- Two stray PostCSS configs exist in design-ref (`.js` v3 + `.mjs` v4) — the target uses ONE v4
  config only.
- `.js`/`.jsx` page+component files in design-ref (e.g. `products/[slug]/page.js`) are ported to
  typed `.tsx`.
