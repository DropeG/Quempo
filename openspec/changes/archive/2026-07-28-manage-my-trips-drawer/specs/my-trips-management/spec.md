# My Trips Management Spec

## Purpose
Allow logged-in drivers to access, view, manage, and delete their published trips through a dedicated drawer interface.

## ADDED Requirements

### Requirement: Dedicated drawer interface for user's published trips
The system SHALL provide a `MyTripsDrawer` component accessible for logged-in users to list their published trips separated into Active and Past trips.

#### Scenario: User opens My Trips drawer
- **WHEN** a logged-in user clicks "Mis Viajes" in the Navbar menu
- **THEN** the system SHALL open a slide-over drawer showing a list of trips authored by the user.

### Requirement: Inline seat management and trip deletion
The drawer SHALL allow quick inline actions on active trips including modifying available seat count and deleting/canceling a trip.

#### Scenario: User adjusts available seats
- **WHEN** the user clicks the increment or decrement seat count button on an active trip in the drawer
- **THEN** the system SHALL update `seats_available` in Supabase and reflect the new seat count immediately.

#### Scenario: User deletes a published trip
- **WHEN** the user confirms deletion of a published trip
- **THEN** the system SHALL delete the trip record from Supabase and remove it from the drawer and feed list.

### Requirement: Trigger trip edit modal from drawer
The drawer SHALL provide an "Editar" button for each active trip that opens the trip publishing modal pre-populated with the trip's current data.

#### Scenario: User clicks edit trip
- **WHEN** the user clicks "Editar" on a trip card inside the drawer
- **THEN** the system SHALL open the PublishModal in edit mode populated with that trip's details.
