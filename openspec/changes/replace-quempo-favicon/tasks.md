## 1. Asset Preparation

- [x] 1.1 Extract Quempo mountain isotype from `public/logo/logo_quempo.svg` into a 1:1 ratio square SVG canvas (`src/app/icon.svg`).
- [x] 1.2 Generate retrocompatible `src/app/favicon.ico` and 180x180 `src/app/apple-icon.png`.

## 2. Manifest & App Router Integration

- [x] 2.1 Create `src/app/manifest.json` with app name "Quempo", short name, display mode, background color, and theme color `#1A447E`.
- [x] 2.2 Update metadata configuration in `src/app/layout.tsx` to reference `icon.svg`, `favicon.ico`, `apple-icon.png`, and `manifest.json`.

## 3. Verification

- [x] 3.1 Verify Next.js build compilation and check asset routes in browser preview.
