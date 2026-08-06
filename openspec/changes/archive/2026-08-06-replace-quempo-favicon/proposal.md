## Why

Currently, the Quempo application favicon appears as an unreadable, tiny blue sliver in browser tabs because the SVG canvas contains huge empty whitespace padding. We need to crop and re-center the Quempo mountain isotype cleanly as a transparent, high-contrast vector icon (Option 2) that fills 85-90% of the tab icon space across all browsers and devices.

## What Changes

- Extract and crop the Quempo mountain isotype from `public/logo/logo_quempo.svg` into a tight, transparent 1:1 ratio vector icon (`src/app/icon.svg`).
- Generate properly cropped retrocompatible favicon formats (`src/app/favicon.ico` and `src/app/apple-icon.png`).
- Create web app manifest metadata (`src/app/manifest.json`) for Android and PWA integration.
- Update RootLayout metadata in `src/app/layout.tsx` to reference the complete icon suite and theme colors.

## Capabilities

### New Capabilities
- `branding-favicon`: Multi-platform transparent Quempo mountain favicon suite.

### Modified Capabilities
<!-- None -->

## Impact

- Affected code: `src/app/layout.tsx`, `src/app/favicon.ico`, `src/app/icon.svg`, `src/app/apple-icon.png`, `src/app/manifest.json`.
- Visual impact: Replaces the tiny specks/boilerplate icon with a bold, legible Quempo mountain isotype in browser tabs.
