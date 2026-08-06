## Context

The current application lacks a complete, branded favicon configuration. Standard web best practices and Next.js App Router guidelines recommend supplying a vector `icon.svg` (for modern desktop browsers), a 1:1 ratio `apple-icon.png` (for iOS shortcuts), a standard `favicon.ico` (for legacy fallback), and a `manifest.json` file for PWA and Android devices.

## Goals / Non-Goals

**Goals:**
- Extract the Quempo mountain isotype from `public/logo/logo_quempo.svg` into a clean, 1:1 aspect ratio vector icon (`src/app/icon.svg`).
- Provide retrocompatible fallback favicon assets (`src/app/favicon.ico` and `src/app/apple-icon.png`).
- Configure a web manifest (`src/app/manifest.json`) specifying application name, theme color (`#1A447E`), background color, and display mode.
- Update RootLayout in `src/app/layout.tsx` to register metadata icons and manifest.

**Non-Goals:**
- Changing brand typography or full header logos.
- Implementing offline PWA service workers.

## Decisions

- **SVG Isotype as Primary Icon**: Use SVG for `icon.svg` because modern browsers scale SVG crispness automatically on Retina/4K displays.
- **Next.js App Router Metadata Standard**: Declare metadata directly in `src/app/layout.tsx` using `metadata.icons` and `metadata.manifest` properties, aligning with Next.js 14/15 conventions.
- **Dedicated Manifest File**: Provide `src/app/manifest.json` for web app shortcuts and mobile theme bar color consistency.

## Risks / Trade-offs

- **[Risk]** Aspect ratio distortion if full text logo is used instead of isotype.
  ➔ *Mitigation*: Isolate only the mountain symbol (isotype) inside a 512x512 square canvas with safe-area padding.
