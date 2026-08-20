## Context

Paso 3 implements the brain of the detector: parsing extracted posts, classifying ride intent, and resolving dates/times to keep only upcoming, unfulfilled trips. Following **KISS** and **YAGNI**, this runs locally without requiring external paid API keys or complex setups.

## Goals / Non-Goals

**Goals:**
- Implement `scripts/facebook/classify-trips.ts`.
- Build a fast semantic and temporal rule engine tailored to Chilean snow slang.
- Extract key trip entities: `intent`, `destination`, `direction` (Subida/Bajada), `estimatedTripDate`, `isFutureTrip`, `hasGear`.
- Filter out ticket sales, past trips, and self posts.
- Output clean candidates to `scripts/facebook/data/classified-trips.json` and print formatted terminal report.

**Non-Goals:**
- Automated commenting or DMing (deferred to Paso 4/5).
- Webhook notifications to external phones (YAGNI).

## Decisions

### 1. Robust Heuristic Rule & Temporal Engine
* **Decision**: Implement a regex/NLP tokenizer and temporal resolver in TypeScript.
* **Rationale**: Instant execution (<10ms), zero API cost, 100% reliable for standard Chilean snow phrasing (*"alguien que suba mañana"*, *"alguien que baje hoy"*, *"busco cupo"*).

### 2. Temporal Offset Calculation
* **Decision**: Convert relative post age (e.g. *"5 días"*, *"hace 2 h"*) into an anchor date, then calculate relative trip expressions (*"mañana"*, *"el lunes 17"*, *"este finde"*) relative to the anchor.
* **Rationale**: Prevents a post that said "mañana" 5 days ago from being mistakenly classified as tomorrow's trip.

## Risks / Trade-offs

- **[Risk] Sarcasm or ambiguous slang**:
  - *Mitigation*: Flag ambiguous posts with `confidence: "medium"` so the user can quickly glance during review.
