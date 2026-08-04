## Why

The tagline text "Conecta viajes a Farellones, El Colorado, La Parva y Valle Nevado en segundos" in the Navbar takes up significant vertical and horizontal space on mobile screens, cluttering the mobile navigation header. Hiding it on mobile improves screen real estate and header clarity.

## What Changes

- Hide the Navbar tagline element on mobile viewports (`hidden sm:block`) while preserving it on desktop viewports.

## Capabilities

### New Capabilities

- `mobile-tagline-visibility`: Defines responsive display behavior for the main header tagline.

### Modified Capabilities

## Impact

- `src/components/Navbar.tsx`: Will update the paragraph styling to hide on mobile devices and display on small screens and above (`hidden sm:block`).
