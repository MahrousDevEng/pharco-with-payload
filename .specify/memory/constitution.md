<!--
SYNC IMPACT REPORT
==================
Version change: (template / unversioned) → 1.0.0
Bump rationale: Initial ratification of the project constitution (first concrete version).

Principles defined (7):
  I.   Design Fidelity (NON-NEGOTIABLE)
  II.  Tailwind v4 Only — Faithful Migration
  III. Port, Don't Rebuild
  IV.  Feature-Based Architecture & DRY
  V.   Performance-First by Default
  VI.  Reuse Over Reinvent (Package-First)
  VII. Scope Discipline — Live Pages Only

Sections added:
  - Technology Stack & Constraints
  - Development Workflow & Phasing
  - Governance

Templates reviewed:
  ✅ .specify/templates/plan-template.md   — Constitution Check gate is generic (placeholder-driven); no edit required.
  ✅ .specify/templates/spec-template.md    — scope/requirements structure compatible; no edit required.
  ⚠ .specify/templates/tasks-template.md   — contains TDD/test task categories. Per Principle "No Automated
       Tests" (see Technology Stack & Constraints), task generation MUST omit test-authoring tasks for this
       project. No structural edit applied; enforced at /speckit-tasks time.

Deferred / TODO: none. Ratification date supplied (2026-06-20).
-->

# Pharco Informative Website Constitution

## Core Principles

### I. Design Fidelity (NON-NEGOTIABLE)

The ported website MUST be visually identical to the source in `/design-ref/` and the live
pages on https://pharco-2025.vercel.app/. Fonts, colors, CSS, images, buttons, headings,
global styles, containers, spacing, breakpoints, and animations MUST match the reference
exactly. Any visual deviation is a defect, not a variation. When the reference and a
"cleaner" approach conflict, the reference wins. Visual parity is verified against the live
deployed pages, not against intent.

**Rationale**: The design is already approved and deployed; this project re-platforms it, it
does not redesign it.

### II. Tailwind v4 Only — Faithful Migration

The codebase MUST use Tailwind CSS v4 (CSS-first `@theme` configuration). Tailwind v3 MUST
NOT ship. Every v3 token from `design-ref/tailwind.config.js` — colors (`primary #e07e27`,
`secondary`, `third`), `titleFont`/`textFont` font variables, the centered `container` with
its padding and `2xl: 1400px` screen, and all keyframes/animations (`accordion`, `marquee`,
`fadeIn`) — MUST be mapped into the v4 config so output is pixel-identical. `tailwindcss-animate`
behavior MUST be preserved (native v4 equivalent or the plugin).

**Rationale**: Modern, maintainable styling base without sacrificing the approved look.

### III. Port, Don't Rebuild

Existing `design-ref` components MUST be ported as-is — Radix primitives,
`class-variance-authority`, `tailwind-merge`/`clsx` patterns retained — then retuned to v4
tokens. Components MUST NOT be rebuilt from scratch when a working reference exists. shadcn/ui
is the primitive layer; where a design-ref component already wraps Radix, prefer adapting it
over regenerating.

**Rationale**: Porting preserves fidelity and behavior at the lowest risk and effort.

### IV. Feature-Based Architecture & DRY

Code MUST be organized by feature (`src/features/<feature>/…`), not by technical type.
Shared, reusable React components, hooks, and utilities MUST be factored into clear shared
locations rather than copy-pasted. Duplication is a refactor trigger. Naming and structure
MUST read like senior full-stack work: clear boundaries, single responsibility, easy to
maintain and upgrade.

**Rationale**: Feature cohesion and DRY keep a multi-phase project maintainable.

### V. Performance-First by Default

React Server Components are the default. Client components (`'use client'`) MUST be used only
where interactivity genuinely requires them, and kept as small leaf components. Images MUST
use `next/image`. Client JavaScript MUST be minimized; heavy/below-the-fold work MUST be
code-split or lazy-loaded. Performance is a design constraint, not a later optimization pass.

**Rationale**: An informative marketing site must be fast on first load across devices.

### VI. Reuse Over Reinvent (Package-First)

Before hand-rolling non-trivial functionality, a suitable well-maintained package MUST be
searched for and preferred. Sanctioned libraries: shadcn/ui, zod, react-hook-form, payload,
PostgreSQL (`@payloadcms/db-postgres`), plus design-ref's proven libs — framer-motion,
embla-carousel, sonner, lucide-react, react-icons, tailwind-merge, clsx,
class-variance-authority. New dependencies are allowed when they replace meaningful custom
code; they MUST be justified and maintained.

**Rationale**: Proven packages beat bespoke code for reliability and upgrade cost.

### VII. Scope Discipline — Live Pages Only

Only pages that are live on https://pharco-2025.vercel.app/ are in scope. `design-ref` routes
that are not deployed MUST NOT be built. The verified in-scope set is the live navigation
pages plus the dynamic detail routes (`products/[slug]`, `news-events/[slug]`,
`news-events/events/[slug]`). New scope requires an explicit decision, not assumption.

**Rationale**: The deployed site defines "done"; building unshipped pages is wasted work.

## Technology Stack & Constraints

- **Framework**: Next.js (App Router) + Payload 3, TypeScript, pnpm.
- **Database**: PostgreSQL via `@payloadcms/db-postgres`. Stood up in the CMS phase (Phase 2);
  Phase 1 is UI-only and MUST NOT depend on a running database.
- **Styling**: Tailwind v4 (Principle II) + shadcn/ui (Principle III). **Light theme only** —
  dark mode and `next-themes` are dropped; the live site is light.
- **Forms & Validation**: react-hook-form + zod.
- **Code Style**: All code MUST conform to the repo Prettier config, including
  `prettier-plugin-tailwindcss` class ordering.
- **No Automated Tests**: Automated testing is intentionally out of scope. No test framework,
  test files, or TDD tasks are added. `/speckit-tasks` MUST omit test-authoring tasks.
- **Localization (deferred — NOT Phase 1)**: The public website will support EN + AR with RTL
  for AR. Localization lives on the website ONLY. The Payload admin panel stays single-language
  and merely controls which website languages are enabled/disabled. i18n MUST NOT be
  implemented in Phase 1.

## Development Workflow & Phasing

Delivery proceeds in phases; detailed specs/plans/tasks are produced per phase via the
spec-kit workflow (`/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`).

- **Phase 1 — Static Website**: Port the in-scope pages from `design-ref` to the v4 stack,
  including dynamic detail pages (`products/[slug]`, `news-events/[slug]`,
  `news-events/events/[slug]`) rendered from `design-ref/src/data` sample content. No backend
  wiring, no APIs, no database dependency.
- **Phase 2 — Payload CMS**: Model collections/globals to manage the Phase 1 content; wire
  pages to read from Payload. Stand up PostgreSQL here.
- **Later Phase — Localization**: EN/AR website localization with the admin language toggle.

Every change MUST satisfy the Core Principles. Visual parity (Principle I) is checked against
the live deployed pages before a page is considered done.

## Governance

This constitution supersedes ad-hoc practices and conventions for this project. When guidance
conflicts, the constitution wins.

- **Amendments**: Changes MUST be made by editing this file with a version bump and an updated
  Sync Impact Report. Dependent spec-kit templates MUST be re-checked for alignment on every
  amendment.
- **Versioning (semantic)**: MAJOR = principle removal or backward-incompatible governance
  change; MINOR = new principle/section or materially expanded guidance; PATCH = clarifications
  and non-semantic refinements.
- **Compliance**: Plans (`/speckit-plan`) MUST pass the Constitution Check gate. Reviews MUST
  verify principle compliance, especially Design Fidelity (I), Tailwind v4 (II), and Scope
  Discipline (VII). Any deviation MUST be justified in the plan's Complexity Tracking or
  rejected.

**Version**: 1.0.0 | **Ratified**: 2026-06-20 | **Last Amended**: 2026-06-20
