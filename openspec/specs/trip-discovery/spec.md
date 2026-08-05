# trip-discovery Specification

## Requirements

### Requirement: Mobile Direction Swap Horizontal Icon
The system SHALL display horizontal swap arrows (`ArrowLeftRight`) on the 1-tap direction swap button in the mobile layout view.

#### Scenario: Mobile swap button displays horizontal arrows
- **WHEN** user views the trip discovery header on a mobile screen viewport (`< lg`)
- **THEN** the direction swap button displays horizontal left-right arrows instead of vertical up-down arrows
- **WHEN** user taps the direction swap button in mobile view
- **THEN** the horizontal arrows smoothly rotate 180 degrees and direction swaps between SUBIDA and BAJADA
