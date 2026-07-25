## ADDED Requirements

### Requirement: Direct WhatsApp Contact Link
The system SHALL generate a pre-formatted `wa.me` deep link for contacting the driver of a trip.

#### Scenario: User clicks contact button
- **WHEN** user clicks "Contactar por WhatsApp" on a trip card
- **THEN** system opens WhatsApp web or native app targeted to driver's phone number with pre-filled message containing trip date, direction, and destination.
