# Delta Spec: Trip Sharing Domain Alignment

## Added Requirements

### Requirement: Official Domain Link Generation
The system MUST use `https://quempo.tech` (or `window.location.origin` when available) as the primary base URL when generating shareable trip links.

#### Scenario: User shares trip link on WhatsApp
- **GIVEN** a published trip
- **WHEN** the user copies or shares the trip link to WhatsApp
- **THEN** the generated share text MUST contain `https://quempo.tech` or the active production domain URL instead of legacy `.vercel.app` domains.
