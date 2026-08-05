## Context

 The main page (`src/app/page.tsx`) previously rendered `<MountainStatusPill />` in the sidebar and bottom container to show mountain weather and Ruta G-21 traffic rules. The user requested removing this card completely.

## Goals / Non-Goals

**Goals:**
- Remove all references to `MountainStatusPill` in `src/app/page.tsx`.
- Delete `src/components/MountainStatusPill.tsx`.
- Ensure no unused imports or compilation issues.

**Non-Goals:**
- Modifying other unrelated components or layout structures.

## Decisions

- **Direct Removal**: Cleanly remove `<MountainStatusPill />` jsx and import. Delete `MountainStatusPill.tsx` file.

## Risks / Trade-offs

- **None**: Simple visual removal with no dependency side-effects.
