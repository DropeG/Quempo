## Context

Currently, `Navbar.tsx` renders the tagline text "Conecta viajes a Farellones, El Colorado, La Parva y Valle Nevado en segundos" directly under the brand logo. On smaller screens (mobile viewports), this text takes up valuable vertical header space.

## Goals / Non-Goals

**Goals:**
- Hide the tagline text on mobile viewports (< 640px / `sm:` breakpoint).
- Retain tagline visibility on desktop viewports (`sm:` and larger).

**Non-Goals:**
- Modifying the tagline text string or meta tags in `src/app/layout.tsx`.

## Decisions

- **Use Tailwind responsive utility classes (`hidden sm:block`)**: Add `hidden sm:block` to the tagline `<p>` element in `Navbar.tsx`.
  - *Rationale*: Simple, clean declarative CSS display toggling without JavaScript runtime overhead.

## Risks / Trade-offs

None.
