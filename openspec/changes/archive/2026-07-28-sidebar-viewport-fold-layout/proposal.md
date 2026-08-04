## Why

The left sidebar currently presents the `MountainStatusPill` card partially cut-off at the bottom edge of standard desktop viewports (peek cut-off artifact). To deliver an impeccable user experience, the top control cards (Route Selector and Publish CTA) should fill the initial viewport height (`100vh`), ensuring the `MountainStatusPill` component starts cleanly below the viewport fold and only reveals when the user scrolls.

## What Changes

- Wrap top sidebar cards in a container calculated to fill the initial viewport (`min-h-[calc(100vh-120px)] flex flex-col justify-between`).
- Position `MountainStatusPill` below the initial viewport fold so it reveals cleanly upon scroll without awkward vertical clipping.

## Capabilities

### Modified Capabilities
- `mountain-weather-road-status`: Adjust vertical placement below initial viewport fold.

## Impact

- `src/app/page.tsx`: Update sidebar layout container heights with CSS viewport units (`100vh`).
