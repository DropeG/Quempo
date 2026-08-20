## Why

Raw posts extracted from Facebook groups contain a high amount of noise, including ticket/pass sales, equipment trading, general questions, own posts, and trips that have already taken place. Following **KISS** and **YAGNI**, this change implements a dedicated classifier (Paso 3) to accurately filter out noise and isolate only **active, future ride requests** for snow destinations.

## What Changes

- Add a fast classifier script: `scripts/facebook/classify-trips.ts`.
- Implement Chilean snow intent classification (`SEARCHING_RIDE`, `OFFERING_RIDE`, `TICKET_SALES`, `OTHER`).
- Implement temporal resolver that parses relative date/time expressions (*"mañana"*, *"hoy lunes"*, *"el finde"*, *"hace 17 h"*) and compares against current time (`isFuture: true/false`).
- Detect destination (*El Colorado*, *Farellones*, *Valle Nevado*, *La Parva*) and direction (*Subida / Bajada*).
- Discard own posts by Pedro González Honorato and expired trips.
- Save valid trip leads to `scripts/facebook/data/classified-trips.json` and print a highlighted leads summary in the terminal.
- Add `npm run fb:classify` command.

## Capabilities

### New Capabilities
- `facebook-trip-classification`: Rule and temporal intelligence to filter snow group posts by ride intent, future validity, and resort destination.

### Modified Capabilities
<!-- No modified capabilities -->

## Impact

- **Affected Areas**: `scripts/facebook/` (standalone developer tool).
- **Production impact**: 0% (development scripts only).
