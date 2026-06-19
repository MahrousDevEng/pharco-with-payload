# Claude Code

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

<!-- SPECKIT START -->
Active feature: **001-phase1-static-website**. Read the plan before implementing:
- Plan: `specs/001-phase1-static-website/plan.md`
- Spec: `specs/001-phase1-static-website/spec.md`
- Research (v3→v4 mapping, decisions): `specs/001-phase1-static-website/research.md`
- Data model: `specs/001-phase1-static-website/data-model.md`
- Contracts: `specs/001-phase1-static-website/contracts/` (routes.md, forms.md)
- Quickstart (build order): `specs/001-phase1-static-website/quickstart.md`

Stack: Next.js 16 App Router + Tailwind v4 (CSS-first `@theme`) + shadcn/ui (ported from
`/design-ref`), react-hook-form + zod, sonner, framer-motion, embla. Static content from
`src/data` (no DB in Phase 1). Light theme + English only. Payload admin untouched.
Constitution: `.specify/memory/constitution.md`.
<!-- SPECKIT END -->
