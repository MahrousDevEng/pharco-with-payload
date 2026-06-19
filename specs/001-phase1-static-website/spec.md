# Feature Specification: Phase 1 — Static Pharco Informative Website

**Feature Branch**: `001-phase1-static-website`
**Created**: 2026-06-20
**Status**: Draft
**Input**: Port the approved, deployed Pharco corporate website into this codebase so it is visually identical to https://pharco-2025.vercel.app/ and the source in `/design-ref/`. Phase 1 is UI/UX only — no backend, no APIs, no database, no CMS wiring. Content comes from static sample data in `design-ref/src/data`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse the corporate website end to end (Priority: P1)

A prospective partner, investor, patient, or job seeker visits the Pharco website, lands on
the home page, and navigates through the company, products, science, presence, life, news,
and contact areas using the header and footer navigation. Every in-scope page renders fully,
looks identical to the approved live site, and behaves the same across desktop, tablet, and
mobile.

**Why this priority**: The website's core purpose is to inform visitors about Pharco. If the
pages render and navigation works with faithful design, the site already delivers its primary
value — even before forms or detail pages.

**Independent Test**: Visit every top-level route, compare each against the matching live page
at https://pharco-2025.vercel.app/, and confirm visual and responsive parity plus working
navigation. Delivers a complete, browsable marketing site.

**Acceptance Scenarios**:

1. **Given** the home page, **When** a visitor opens it on desktop and mobile, **Then** layout,
   fonts, colors, imagery, spacing, and animations match the live home page at each breakpoint.
2. **Given** any page, **When** the visitor uses the header navigation (including the mobile
   menu), **Then** every link routes to the correct in-scope page with no broken links.
3. **Given** any page, **When** the visitor scrolls, **Then** on-scroll reveal animations and the
   scroll-to-top control behave as on the live site.
4. **Given** the footer, **When** the visitor clicks a footer link, **Then** it resolves to the
   correct in-scope route.
5. **Given** any page, **When** the visitor navigates by keyboard or screen reader, **Then** all
   interactive elements are reachable and operable, focus order is logical, visible focus states
   are present, and landmarks/headings/alt text expose the content correctly.

---

### User Story 2 - View detailed product, news, and event pages (Priority: P2)

A visitor drills into a specific product, news article, or event from a listing page and sees a
fully rendered detail page populated from sample content, matching the live site's detail
templates.

**Why this priority**: Detail pages deepen engagement but depend on the listing/overview pages
(P1) existing first. They are populated from static sample data in Phase 1.

**Independent Test**: Open each dynamic detail route with a sample slug and confirm it renders
the detail template with sample content and matches the live detail layout.

**Acceptance Scenarios**:

1. **Given** the products overview, **When** the visitor opens a product, **Then** the product
   detail page renders from sample data and matches the live product template.
2. **Given** the news & events listing, **When** the visitor opens a news item, **Then** the
   news detail page renders from sample data and matches the live layout.
3. **Given** the news & events listing, **When** the visitor opens an event, **Then** the event
   detail page renders from sample data and matches the live layout.
4. **Given** an unknown slug, **When** the visitor requests it, **Then** a not-found state is
   shown rather than a crash.

---

### User Story 3 - Submit the contact and careers forms (Priority: P3)

A visitor fills out the Contact form or the Careers "Apply Now" form. Inputs are validated with
clear inline feedback, and on a valid submit the visitor sees a success confirmation. No data is
sent anywhere in Phase 1.

**Why this priority**: Forms add interactivity and lead intent, but the informational value of
the site (P1/P2) stands without a working backend. Submission wiring is a later phase.

**Independent Test**: Submit each form with invalid and valid inputs; confirm inline validation
errors appear for invalid input and a success confirmation appears for valid input, with no
backend dependency.

**Acceptance Scenarios**:

1. **Given** the contact form, **When** the visitor submits empty or invalid fields, **Then**
   field-level validation messages appear and submission is blocked.
2. **Given** a valid contact form, **When** the visitor submits, **Then** a success confirmation
   (toast) appears and no network/database call is required.
3. **Given** the careers apply form, **When** the visitor submits valid input, **Then** the same
   validate-then-confirm behavior applies.
4. **Given** any form, **When** it renders, **Then** the reCAPTCHA UI present on the live site is
   shown visually, without being functionally enforced in Phase 1.

---

### Edge Cases

- Visitor requests a dynamic detail route with a slug that has no sample data → a not-found state
  renders, not an error page.
- Visitor requests a `/design-ref` page that is NOT deployed on the live site → it is out of
  scope and is not built (no route exists).
- Visitor on a slow connection → below-the-fold and heavy media load progressively without
  blocking first paint.
- Visitor with reduced-motion preference → reveal/scroll animations respect the preference where
  the live site does.
- Visitor uses keyboard-only navigation or a screen reader → every interactive element is
  reachable and operable, focus order is logical, and visible focus states are present (no
  separate on-page accessibility widget is provided).

## Requirements *(mandatory)*

### Functional Requirements

**Scope & parity**

- **FR-001**: The site MUST render every in-scope page listed in "Key Entities → In-scope pages"
  and MUST NOT build any `design-ref` page that is not deployed on the live site.
- **FR-002**: Each in-scope page MUST be visually identical to its counterpart on
  https://pharco-2025.vercel.app/ and `/design-ref/` — fonts, colors, CSS, images, buttons,
  headings, global styles, containers, spacing, and animations.
- **FR-003**: Responsive behavior MUST match the reference across the same breakpoints (desktop,
  tablet, mobile).
- **FR-004**: The site MUST present in a single light theme only; no dark mode.
- **FR-005**: The site MUST be in English only; no localization or language switching in Phase 1.

**Navigation & shared chrome**

- **FR-006**: A site header with primary navigation (matching the live nav structure and labels)
  and a working mobile menu MUST appear on all pages.
- **FR-007**: A site footer with footer navigation MUST appear on all pages.
- **FR-008**: All header, footer, and in-page links MUST resolve to correct in-scope routes with
  no broken links.
- **FR-009**: The scroll-to-top control and on-scroll reveal animations MUST be present and
  behave as on the live site. The on-page accessibility widget from `design-ref` is intentionally
  NOT ported (see FR-018).
- **FR-010**: Shared building blocks (inner-page banner, CTA links, editorial/section components)
  MUST be reused across pages rather than duplicated per page.

**Content**

- **FR-011**: All page content in Phase 1 MUST come from static sample content sourced from
  `design-ref/src/data`; no content may depend on a database, API, or CMS.
- **FR-012**: Dynamic detail pages (`products/[slug]`, `news-events/[slug]`,
  `news-events/events/[slug]`) MUST render from sample data and MUST show a not-found state for
  unknown slugs.

**Forms**

- **FR-013**: The Contact form and Careers "Apply Now" form MUST validate input with clear inline
  error messages and MUST block submission of invalid input.
- **FR-014**: On valid submission, each form MUST show a success confirmation and MUST NOT call a
  backend, persist data, or send email in Phase 1.
- **FR-015**: The reCAPTCHA UI from the live site MUST be preserved visually but need not be
  functionally enforced in Phase 1.

**Quality**

- **FR-016**: The site MUST build and run with no dependency on a database or external API.
- **FR-017**: Pages MUST optimize for fast first load (optimized images, minimal blocking
  client work) consistent with an informative marketing site.
- **FR-018**: Accessibility MUST be built into the markup and components — NOT delivered via a
  separate on-page accessibility widget. The site MUST use semantic HTML landmarks and a correct
  heading hierarchy; provide accessible names/labels for all interactive elements and form
  fields; be fully keyboard-operable with visible focus states and logical focus order; include
  meaningful `alt` text for images (and empty `alt` for decorative ones); meet WCAG 2.1 AA color
  contrast; associate form errors with their fields for assistive tech; and respect the user's
  reduced-motion preference for animations.

### Key Entities *(include if feature involves data)*

**In-scope pages** (verified live on the deployed site)

- Static top-level routes: `/` (home), `/about-our-story`, `/history`, `/about-leadership`,
  `/about-pharco-group`, `/about-impact-csr`, `/products-overview`,
  `/products-therapeutic-areas`, `/science-rd`, `/science-manufacturing`, `/science-quality`,
  `/global-presence`, `/life-at-pharco`, `/news-events`, `/careers`, `/careers/apply`,
  `/contact`, `/product-detail`.
- Dynamic detail routes (sample data in Phase 1): `/products/[slug]`, `/news-events/[slug]`,
  `/news-events/events/[slug]`.

**Content entities** (shape only; sourced from `design-ref/src/data`, not a database)

- **Product**: identity, therapeutic area, description, media — drives products overview and
  product detail.
- **Therapeutic Area**: grouping used by the therapeutic areas page.
- **News Article**: title, date, body, media — drives the news listing and news detail.
- **Event**: title, date, location, body — drives the events listing and event detail.
- **Navigation**: the header/footer link structure and labels matching the live site.
- **Leadership / Location / Career listing**: supporting content for leadership, global
  presence, and careers pages.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of in-scope pages render successfully and are reachable from navigation, with
  zero broken links across header, footer, and in-page links.
- **SC-002**: A side-by-side review of every in-scope page against its live counterpart shows no
  perceptible visual differences in fonts, colors, layout, spacing, imagery, or animation at
  desktop, tablet, and mobile widths.
- **SC-003**: Every dynamic detail route renders correctly for a sample slug and shows a graceful
  not-found state for an unknown slug.
- **SC-004**: Both forms reject 100% of invalid submissions with visible inline errors and show a
  success confirmation for valid input, with no backend involved.
- **SC-005**: The site builds and runs with no database or external API available.
- **SC-006**: No page out of the in-scope set exists in the shipped site.
- **SC-007**: Every page is fully operable by keyboard and screen reader, passes an automated
  accessibility audit (e.g. axe) with no critical violations, and meets WCAG 2.1 AA contrast —
  with no reliance on a separate on-page accessibility widget.

## Assumptions

- The deployed site at https://pharco-2025.vercel.app/ is the source of truth for "approved" —
  only its live pages are in scope; non-deployed `design-ref` pages are excluded.
- `/science-quality` and `/product-detail` are in scope: both are live, though not in the main
  navigation.
- Sample content needed for listings and detail pages exists in `design-ref/src/data` and is
  sufficient to render Phase 1 without a CMS.
- Form submission, real reCAPTCHA enforcement, email/notifications, persistence, the Payload CMS,
  PostgreSQL, EN/AR localization, and any admin-panel work are explicitly deferred to later
  phases.
- Visual parity is judged against the live deployed pages (current state) at standard desktop,
  tablet, and mobile widths.
