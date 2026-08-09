## Context

On mobile viewports (e.g. smartphones with screen width <= 768px), iOS Safari and mobile WebKit browsers automatically zoom in on interactive form controls (`<input>`, `<select>`, `<textarea>`) whose computed font-size is less than 16px. In Quempo, form components like `PublishModal`, `PhoneInput`, `ProfileModal`, and search inputs use Tailwind utility classes such as `text-xs` (12px) or `text-sm` (14px). When focused on mobile devices, Safari auto-zooms into the field, shifting the modal layout and viewport.

## Goals / Non-Goals

**Goals:**
- Prevent automatic browser zoom on input focus across all mobile form controls.
- Enforce a minimum 16px font-size for inputs on viewports <= 768px.
- Provide a global, low-maintenance CSS solution in `src/app/globals.css`.

**Non-Goals:**
- Disabling manual user pinch-to-zoom (which violates web accessibility standards).
- Modifying desktop component styles or layout structures.

## Decisions

- **Decision 1: Global `@media (max-width: 768px)` CSS Rule in `globals.css`**
  - Enforce `font-size: 16px !important;` on `input`, `select`, and `textarea` within mobile viewports.
  - *Rationale*: iOS Safari explicitly checks for `< 16px` font size. Ensuring 16px font size on mobile satisfies iOS requirements while maintaining proper touch target legibility and accessibility.

- **Alternatives Considered:**
  - *Viewport `userScalable: false`*: Rejected because it degrades accessibility and fails Web Vitals / Lighthouse audits.
  - *Manual per-component Tailwind overrides*: Rejected due to high maintenance overhead across present and future forms.

## Risks / Trade-offs

- *[Risk]* Text inside mobile inputs will render at 16px instead of 12px or 14px.
  - *Mitigation*: 16px text improves legibility and prevents fat-finger typing errors on small screens. Flex container padding handles the 16px font cleanly.
