# Onboarding Tour Capability

## MODIFIED Requirements

### Requirement: 6-Step Interactive Spotlight Navigation with Dynamic Modal Expansion & Layer Elevation
The system SHALL guide the user step-by-step through the 6 core features of Quempo, automatically opening the Trip Detail View during step 4 so the user can inspect mountain gear and the direct WhatsApp contact button.

#### Scenario: User reaches step 4 (Trip Detail & WhatsApp Contact)
- **WHEN** the tour enters step 4
- **THEN** the system SHALL automatically expand the `TripDetailModal` displaying trip details (4x4, Cadenas, Porta-skis) and highlight the direct $0 commission WhatsApp button.

#### Scenario: User transitions away from step 4
- **WHEN** the user navigates to step 3 or step 5
- **THEN** the system SHALL automatically close `TripDetailModal` and return focus to the main home view.
