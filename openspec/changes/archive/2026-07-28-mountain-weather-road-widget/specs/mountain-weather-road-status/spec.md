# Mountain Weather & Road Status Spec

## Purpose
Provide a compact, non-intrusive weather and Ruta G-21 road status indicator for mountain travelers.

## ADDED Requirements

### Requirement: Open-Meteo API Weather Fetching
The system SHALL fetch current temperature and daily snowfall sum for Farellones coordinates (`-33.35, -70.31`) from the free Open-Meteo API.

#### Scenario: Open-Meteo fetch succeeds
- **WHEN** the MountainStatusPill mounts on the page
- **THEN** it SHALL request Open-Meteo weather data and display the current temperature in °C and fresh snowfall in cm.

### Requirement: Ruta G-21 Schedule & Status Calculation
The system SHALL compute current G-21 direction rules based on time of day (08:00-13:00 Subida ⬆️, 15:00-20:00 Bajada ⬇️, Doble vía / Abierto 🟢).

#### Scenario: Time of day during morning subida
- **WHEN** local time is between 08:00 and 13:00
- **THEN** the status badge SHALL display "🟢 Ruta G-21: Horario Subida Exclusivo".

### Requirement: Compact Non-Intrusive Layout
The MountainStatusPill SHALL render as a single-line glassmorphic badge without shifting or occluding the trip list and publishing actions.

#### Scenario: Displaying status pill on desktop and mobile
- **WHEN** a user visits Faredeo
- **THEN** the pill renders with `.glass-card` styling in a compact 1-line format that fits neatly within the header/navigation space.
