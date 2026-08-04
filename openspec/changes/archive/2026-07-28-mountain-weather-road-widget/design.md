## Context

The primary goal of Faredeo is publishing and finding rides to mountain resorts. Weather and G-21 road status are valuable secondary utilities that must not consume main feed real estate.

## Goals / Non-Goals

**Goals:**
- Fetch real-time weather data for Farellones (`-33.35, -70.31`) via Open-Meteo REST API (`temperature_2m`, `snowfall`, `weathercode`).
- Compute G-21 road direction status based on current time (Subida 08-13h / Bajada 15-20h / Normal).
- Render a compact 1-line glassmorphic pill badge (`MountainStatusPill.tsx`) in an unobtrusive header/sidebar position.

**Non-Goals:**
- Creating a heavy multi-card dashboard or dedicated full-page weather portal.

## Decisions

### 1. Data Fetching via Open-Meteo API
- **Endpoint**: `https://api.open-meteo.com/v1/forecast?latitude=-33.35&longitude=-70.31&current=temperature_2m,weather_code&daily=snowfall_sum&timezone=auto`
- **Cache**: Fetch client-side with 10-minute in-memory caching or fallback defaults if offline.

### 2. Compact Placement Options
- **Option A (Discreet Top Bar)**: A thin 1-line bar directly below or inside the Navbar container (`🟢 Ruta G-21: Abierto (Subida) • ❄️ 15cm Nieve • 🌡️ -2°C`).
- **Option B (Sidebar Micro-Badge)**: A small clickable pill inside the left sidebar control box below the publish button.
- **Option C (Header Tagline Integration)**: A small live status badge next to the "Faredeo" logo in the main navbar.
- **Option D (Below Feed / Footer Section - Zero Screen Real Estate Above the Fold)**: Positioned at the bottom of the page below all trips, requiring scrolling to view.

## Risks / Trade-offs

- **[Risk]**: Open-Meteo API temporary downtime.
  - **Mitigation**: Graceful fallback showing standard schedule rules (`Ruta G-21: Subida 08-13h / Bajada 15-20h`) without breaking the UI.

## Migration Plan

1. Create `src/components/MountainStatusPill.tsx`.
2. Integrate Open-Meteo fetch logic and G-21 schedule status calculation.
3. Wire `MountainStatusPill` into `Navbar.tsx` or `page.tsx` as a sleek, 1-line element.
