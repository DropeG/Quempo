# trip-sharing Specification

## Purpose
TBD - created by archiving change remove-instagram-from-trip-share. Update Purpose after archive.
## Requirements
### Requirement: Simplified Trip Sharing Options
The system SHALL provide simplified trip sharing options in the trip detail modal (`TripDetailModal`), containing exclusively the options to share to a WhatsApp group and copy the trip link.

#### Scenario: Display share options in trip detail modal
- **WHEN** a user opens the trip detail modal
- **THEN** the "Compartir & Difundir Viaje" section SHALL display only "En Grupo WhatsApp" and "Copiar Link" buttons in a balanced 2-column responsive layout
- **THEN** no option for downloading an Instagram Story or Instagram story branding SHALL be present in the share section

