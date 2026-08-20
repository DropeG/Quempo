## Context

Paso 4 generates human, personalized, non-repetitive comments for each classified trip lead. Following **KISS** and **YAGNI**, it uses a modular combinatorial phrasing engine in TypeScript that ensures distinct wording, natural Chilean snow community tone, and clear Quempo/WhatsApp CTAs.

## Goals / Non-Goals

**Goals:**
- Implement `scripts/facebook/generate-replies.ts`.
- Build phrasing slot randomizer (Greeting, Context, Value Proposition, Call-To-Action, Sign-off).
- Personalize with author's first name, destination, timing, and gear.
- Provide 2 alternative reply options per lead (Casual vs Direct).
- Save results to `scripts/facebook/data/actionable-replies.json`.
- Add `fb:replies` and `fb:pipeline` (extract -> classify -> reply in one go).

**Non-Goals:**
- Auto-posting to Facebook without review (deferred to Paso 5).

## Decisions

### 1. Slot-Based Combinatorial Phrasing Engine
* **Decision**: Deconstruct replies into 4 distinct interchangeable components (Greeting, Context Reference, Quempo Intro, CTA & Links).
* **Rationale**: Generates hundreds of authentic-sounding combinations without repeating text or triggering spam filters.

### 2. Community & App Link Strategy
* **Decision**: Provide both the web link (`quempo.com`) and WhatsApp community mention naturally.
* **Rationale**: Gives users immediate flexibility to either check live trips on the site or join the WhatsApp chat.

## Risks / Trade-offs

- **[Risk] Link penalty on Facebook comments**: Facebook sometimes deprioritizes comments with external links.
  - *Mitigation*: The generator formats the URL cleanly (`quempo.com`) and offers a variation that invites them to DM or join the group without raw messy tracking params.
