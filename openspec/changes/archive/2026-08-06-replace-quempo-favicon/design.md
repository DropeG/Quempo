## Context

The user selected Option 2: Transparent cropped mountain isotype. To solve the issue where the logo appears as a tiny sliver, we must recalculate the SVG viewBox coordinates around the mountain geometry, removing empty outer whitespace so the mountain icon occupies ~85-90% of the canvas area.

## Goals / Non-Goals

**Goals:**
- Recalculate tight bounding box coordinates for the Quempo mountain isotype.
- Save `src/app/icon.svg` with transparent background and precise 1:1 viewBox.
- Generate matching `src/app/favicon.ico` and `src/app/apple-icon.png`.
- Provide `src/app/manifest.json` and update `src/app/layout.tsx` metadata.

**Non-Goals:**
- Solid color background badge container (Option 1 was declined).

## Decisions

- **Tight Bounding Box SVG**: Set the viewBox directly on the mountain paths (eliminating the 575x434 canvas margins) so the vector icon fills the tab area cleanly.
- **Transparent Background**: Keep background transparent as per user preference (Option 2).
- **Next.js App Router Integration**: Direct registration via `layout.tsx` metadata and asset placement in `src/app/`.

## Risks / Trade-offs

- **[Risk]** Visibility on dark browser tabs if colors are too dark.
  ➔ *Mitigation*: Ensure mountain paths use high-contrast cyan/sky-blue fills (`#39B0EB`, `#3FB9F2`, `#256B9E`) that stand out on both dark and light tab bars.
