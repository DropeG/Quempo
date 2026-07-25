## ADDED Requirements

### Requirement: Publish Trip
The system SHALL allow authenticated drivers to publish a ride listing with trip details.

#### Scenario: Driver creates a trip
- **WHEN** an authenticated driver submits the trip form specifying direction (SUBIDA, BAJADA, ROUND_TRIP), origin, destination, date, time, available seats, price per seat, vehicle options (4x4, chains, rack), and WhatsApp number
- **THEN** system saves the trip in the database linked to the driver's user ID and makes it publicly visible.

### Requirement: Manage Own Trips
The system SHALL allow drivers to delete or update only their own published trips.

#### Scenario: Driver deletes their trip
- **WHEN** an authenticated driver requests to delete a trip they created
- **THEN** system removes the trip from the active listings list.
