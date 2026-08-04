## Why

Drivers and passengers traveling to mountain resorts (Farellones, El Colorado, La Parva, Valle Nevado) need to know current weather and Ruta G-21 road status (open/chains/schedule). However, this utility component must remain discreet and space-efficient so it does not distract from the primary focus of publishing and browsing trips.

## What Changes

- Create a non-intrusive `MountainStatusPill` component displaying live weather (from Open-Meteo API) and G-21 traffic status in a compact 1-line pill format.
- Integrate Open-Meteo API (free, open-access) for Farellones coordinates (`-33.35, -70.31`) to fetch temperature and snowfall depth without API keys.
- Place the component as a subtle, space-saving element (e.g. top notification banner or collapsible sidebar badge) that takes up zero primary feed real estate.

## Capabilities

### New Capabilities
- `mountain-weather-road-status`: Fetch and display real-time weather and Ruta G-21 status in a compact, non-intrusive component.

## Impact

- `src/components/MountainStatusPill.tsx`: [NEW] Micro-pill component fetching Open-Meteo data and displaying G-21 road status.
- `src/app/page.tsx`: Position component in a discreet location without shifting primary feed layout.
