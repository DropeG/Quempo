## ADDED Requirements

### Requirement: Intent classification
The system SHALL classify Facebook post text into structured intents: `SEARCHING_RIDE`, `OFFERING_RIDE`, `TICKET_SALES`, or `OTHER`.

#### Scenario: Searching for ride detection
- **WHEN** a post text states "Alguien que suba a colorado mañana ??" or "Alguien que baje hoy o mañana lunes"
- **THEN** the system classifies intent as `SEARCHING_RIDE`

#### Scenario: Ticket resale rejection
- **WHEN** a post text states "Tengo 2 pases por $80" or "Busco ticket para hoy"
- **THEN** the system classifies intent as `TICKET_SALES` and excludes it from ride lead lists

### Requirement: Temporal calculation and future validity
The system SHALL compute an estimated ISO datetime for the trip based on relative expressions ("mañana", "hoy lunes", "el finde", "próximo lunes 17") and compare against current local datetime.

#### Scenario: Future trip estimation
- **WHEN** a post published today references a trip "mañana" or "el próximo lunes 17"
- **THEN** the system sets `isFuture: true` and calculates the estimated ISO target datetime

#### Scenario: Expired trip rejection
- **WHEN** a post published 5 days ago says "subo hoy a las 6am"
- **THEN** the system sets `isFuture: false` and excludes the trip from active leads

### Requirement: Noise and own-post exclusion
The system SHALL identify and exclude posts created by the Quempo operator (Pedro González Honorato) or posts containing promotional Quempo links.

#### Scenario: Exclude self posts
- **WHEN** the post author matches "Pedro González Honorato"
- **THEN** the system tags `isOwnPost: true` and discards it from lead generation
