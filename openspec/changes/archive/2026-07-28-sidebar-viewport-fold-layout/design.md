## Context

Users want the main controls (Trip Route Selector and Publish Trip CTA) to fill the initial screen view without any cut-off artifacts. The `MountainStatusPill` card should start cleanly below the fold.

## Goals / Non-Goals

**Goals:**
- Use native CSS `100vh` viewport math (`min-h-[calc(100vh-120px)]`) for the primary sidebar controls.
- Push `MountainStatusPill` below the fold so it only reveals smoothly when scrolling down.

**Non-Goals:**
- Shrinking or reducing the visual prominence of Cards 1 and 2.

## Decisions

### 1. CSS Viewport Container Structuring
- Wrap Panel 1 (Route Selector) and Panel 2 (Publish CTA) in a `min-h-[calc(100vh-110px)] flex flex-col justify-between` wrapper.
- Place Panel 3 (`MountainStatusPill`) immediately after this wrapper so it starts below the viewport boundary on any screen resolution.

## Migration Plan

1. Edit `src/app/page.tsx` sidebar structure.
