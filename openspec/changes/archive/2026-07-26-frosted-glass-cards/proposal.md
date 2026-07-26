## Why

The current card components rely on solid background fills (`var(--card-bg) = #163F41`) with standard borders, lacking modern visual depth, refraction, and tactile polish. 
Implementing a high-end, premium Frosted Glass aesthetic—inspired by modern frosted mockups with multi-layered specular borders, smooth backdrop blurs (`backdrop-filter: blur`), subtle inner highlights, and translucent surface fills—will elevate Faredeo's UI to feel state-of-the-art and visually captivating.

## What Changes

- **Enhanced Glassmorphism CSS Utility (`.glass-card`)**: Update global card visual tokens in `globals.css` to use translucent fills (`rgba(...)`), high-definition backdrop blur (`backdrop-filter: blur(16px)`), specular inner highlights (`inset 0 1px 0 rgba(255,255,255,0.15)`), and crisp semi-transparent borders.
- **Card Component Refinement (`TripCard`, `TripCardAccordion`, modals)**: Ensure all card elements (`.glass-card`) utilize rounded corners (`rounded-2xl` / `rounded-3xl`), proper background stacking context, hover elevation micro-interactions, and contrast-safe text colors for seamless readability over frosted glass.
- **Visual Depth & Background Atmosphere**: Add subtle ambient background glow spots / light blobs in the layout or page containers to allow the frosted refraction effect to visibly blur underlying ambient highlights.

## Capabilities

### New Capabilities
- `frosted-glass-cards`: Premium frosted glass visual style system for cards, including backdrop blurring, translucent surface layering, specular borders, and micro-hover reflections across trip cards and modal cards.

### Modified Capabilities

## Impact

- `src/app/globals.css`: Updates `.glass-card` styling definitions, hover states, and CSS custom variables for frosted opacity and blur.
- `src/components/TripCard.tsx`: Applied `.glass-card` and frosted glass aesthetics.
- `src/components/TripCardAccordion.tsx`: Updated trip list items with frosted glass styling and smooth border transitions.
- `src/components/ProfileModal.tsx`, `src/components/PublishModal.tsx`, `src/components/TripDetailModal.tsx`: Updated modal overlay card containers to use frosted glass styling.
