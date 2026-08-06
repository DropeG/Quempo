## Why

Currently, the Quempo application uses the default Vercel / Next.js boilerplate favicon (`src/app/favicon.ico`). Replacing it with a custom, high-resolution, multi-device favicon suite based on the official Quempo logo (`logo_quempo.svg`) establishes brand identity, improves visual professionalism across desktop/mobile browsers, and supports PWA/iOS home screen shortcuts.

## What Changes

- Extract the Quempo isotype from `public/logo/logo_quempo.svg` into a clean 1:1 ratio vector icon (`src/app/icon.svg`).
- Generate retrocompatible favicon formats (`src/app/favicon.ico` and `src/app/apple-icon.png`).
- Create web app manifest metadata (`src/app/manifest.json`) for Android and PWA integration.
- Update RootLayout metadata in `src/app/layout.tsx` to reference the complete icon suite and theme colors.

## Capabilities

### New Capabilities
- `branding-favicon`: Multi-platform favicon and Web App Manifest suite for Quempo.

### Modified Capabilities
<!-- None -->

## Impact

- Affected code: `src/app/layout.tsx`, `src/app/favicon.ico`, `src/app/icon.svg`, `src/app/apple-icon.png`, `src/app/manifest.json`.
- Visual impact: Replaces default Vercel triangle in browser tabs, bookmarks, and mobile home screen icons with Quempo branding.
