## ADDED Requirements

### Requirement: My Trips Access via Profile Submenu
The system SHALL provide access to "Mis viajes" inside the user profile dropdown submenu when an authenticated user opens the profile menu.

#### Scenario: User opens My Trips from Profile Submenu
- **WHEN** an authenticated user clicks on their avatar/profile button in the top navigation bar and selects "Mis viajes" from the dropdown menu
- **THEN** the profile dropdown menu closes and the "Mis viajes" drawer (`MyTripsDrawer`) opens.

## REMOVED Requirements

### Requirement: Standalone Header My Trips Button
**Reason**: Removed from top navigation bar to prevent visual crowding on mobile devices and unify user actions inside the profile menu.
**Migration**: Users access "Mis viajes" via the profile dropdown menu.
