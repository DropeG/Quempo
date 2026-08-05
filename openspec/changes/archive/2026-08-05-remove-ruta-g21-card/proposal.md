## Why

The user requested the removal of the "Estado Ruta G-21" card (`MountainStatusPill`) from the application layout as it is no longer desired.

## What Changes

- **Removal**: Remove all renderings of `<MountainStatusPill />` from `src/app/page.tsx` (sidebar section and bottom mobile/desktop sections).
- **Removal**: Delete the `src/components/MountainStatusPill.tsx` component file.
- **Cleanup**: Clean up unused imports related to `MountainStatusPill` in `src/app/page.tsx`.

## Capabilities

### New Capabilities

- None

### Modified Capabilities

- `mountain-status-pill`: Removal of Estado Ruta G-21 y Clima widget.

## Impact

- `src/app/page.tsx`: Removed the Ruta G-21 widget from both desktop sidebar and page bottom.
- `src/components/MountainStatusPill.tsx`: Deleted file.
