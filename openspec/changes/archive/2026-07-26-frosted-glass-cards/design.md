## Context

The current user interface uses solid dark background cards (`#163F41`). The user wants to apply a modern, high-end "Frosted Glass" aesthetic inspired by the provided mockup images, which feature translucent surfaces, rich background blurs, subtle border specular reflections, and ambient color refractions behind the cards.

## Goals / Non-Goals

**Goals:**
- Upgrade `.glass-card` and related card elements in Faredeo with high-definition glassmorphism CSS properties (`backdrop-filter: blur(16px)`, `rgba()` translucency, specular borders, inner highlights).
- Add subtle ambient gradient blobs in the background layout so the frosted glass cards visually refract background light and colors.
- Maintain top-tier readability, WCAG accessibility, and responsive performance.

**Non-Goals:**
- Modifying backend APIs or trip data models.
- Changing form validation logic inside Publish, Profile, or Detail modals.

## Decisions

### 1. CSS Glassmorphism Token Architecture
In `src/app/globals.css`, refine `.glass-card` and utility classes:
- Background: `rgba(22, 63, 65, 0.55)` layered over deep spruce background.
- Backdrop Blur: `backdrop-filter: blur(16px) saturate(180%)`, with `-webkit-backdrop-filter` fallback for WebKit browsers.
- Border: `1px solid rgba(255, 255, 255, 0.14)` for a crisp, icy edge.
- Shadow & Reflection: Multi-layered `box-shadow: 0 12px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.18)` to mimic top edge glass reflection.
- Rounded corners: standard `border-radius: 1.25rem` (`rounded-2xl`) or `1.5rem` (`rounded-3xl`).

### 2. Ambient Background Glows
To make frosted glass blur visible and stunning (like the aurora/space backgrounds in the reference photos), place fixed ambient ambient radial light sources (soft cyan/blush gradients) in `layout.tsx` behind the content layer with low opacity.

### 3. Component Coverage
Update:
- `TripCard.tsx` / `TripCardAccordion.tsx`: Main feed cards with hover reflection shift.
- `ProfileModal.tsx`, `PublishModal.tsx`, `TripDetailModal.tsx`: Modal dialog popups.

## Risks / Trade-offs

- [Backdrop Blur Performance on Older Browsers] → Include standard dark fallback background (`background: rgba(22, 63, 65, 0.95)`) for browsers that do not support `@supports (backdrop-filter: blur(1px))`.
- [Content Readability Over Blurry Backgrounds] → Ensure inner card typography maintains full opacity chalk white `#EFEEEC` and proper text shadows if needed.
