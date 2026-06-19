# Form Contract — Contact & Careers Apply (no backend)

Both forms are client islands using `react-hook-form` + `zod` (`@hookform/resolvers/zod`) and the
ported shadcn `form` primitives. No network call, no persistence, no email (FR-014). On valid submit:
fire a `sonner` success toast and reset. reCAPTCHA markup is shown but NOT enforced (FR-015).

## Behavior contract (both forms)

| Trigger | Expected |
|---------|----------|
| Submit with invalid/empty required fields | Inline field errors (aria-described), submit blocked (FR-013, SC-004) |
| Submit with valid input | Success toast shown, form resets, no network/DB call (FR-014, SC-004) |
| Field blur/change | Validate on `onTouched` (errors after first interaction) |
| Keyboard / screen reader | Labels tied to inputs, errors associated via `aria-describedby`, focus moves to first error (FR-018) |

## Contact form — `features/contact/contactSchema.ts`

```text
name:    string  — required, min 2, max 80
email:   string  — required, valid email
phone:   string  — optional; if present, valid phone
subject: string  — optional, max 120
message: string  — required, min 10, max 2000
```

- Submit handler signature: `(values: ContactFormValues) => void` → toast + reset.
- Fields/labels/placeholder text match the live `/contact` form.

## Careers Apply form — `features/careers/applySchema.ts`

```text
fullName:    string  — required, min 2, max 80
email:       string  — required, valid email
phone:       string  — required, valid phone
position:    string  — required (from sample CareerListing or free text)
cv:          File    — optional in Phase 1; if present, validate type (pdf/doc/docx) + size ≤ 5MB
coverLetter: string  — optional, max 2000
```

- Submit handler signature: `(values: ApplyFormValues) => void` → toast + reset.
- Fields/labels match the live `/careers/apply` form.

## Non-goals (Phase 1)

- No server action / API route / email provider.
- No real reCAPTCHA token verification.
- No file upload to storage (CV is validated client-side only, not transmitted).
