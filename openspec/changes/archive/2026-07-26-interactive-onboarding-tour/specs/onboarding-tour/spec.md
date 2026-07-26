## ADDED Requirements

### Requirement: First-time user onboarding modal trigger
The system SHALL trigger the initial onboarding welcome prompt only once when a user logs in for the first time.

#### Scenario: User logs in for the first time
- **WHEN** a user logs in and `has_seen_onboarding` is false or not set in storage
- **THEN** the system SHALL display the Onboarding Welcome Modal offering to start the Express Tour or Skip.

#### Scenario: User logs in on subsequent sessions
- **WHEN** a user logs in and `has_seen_onboarding` is true
- **THEN** the system SHALL NOT display the Onboarding Welcome Modal automatically.

### Requirement: Friendly and attractive Skip action
The system SHALL provide a clear, welcoming, and frictionless "Skip" ("Omitir por ahora") button on the welcome modal and every step of the tour.

#### Scenario: User clicks Skip on Welcome Modal
- **WHEN** the user clicks "Omitir por ahora" on the welcome modal
- **THEN** the system SHALL close the modal, mark `has_seen_onboarding` as true, and allow normal navigation without presenting the tour again.

#### Scenario: User clicks Skip during Spotlight Tour
- **WHEN** the user clicks "Omitir" or the close icon at any step of the spotlight tour
- **THEN** the system SHALL immediately terminate the tour, close any tour-opened modals, restore normal screen view, and set `has_seen_onboarding` to true.

### Requirement: 6-Step Interactive Spotlight Navigation with Dynamic Modal Expansion & Layer Elevation
The system SHALL guide the user step-by-step through the 6 core features of Faredeo using a focused backdrop spotlight, non-overlapping tooltip positioning, and modal layer z-index elevation.

#### Scenario: User advances through tour steps
- **WHEN** the user clicks "Siguiente ➔" on a tour step
- **THEN** the system SHALL smoothly scroll to and highlight the next element target, updating the tooltip position and progress indicator (e.g. 1 de 6).

#### Scenario: User reaches step 4 (Trip Detail & WhatsApp Contact)
- **WHEN** the tour enters step 4
- **THEN** the system SHALL automatically expand a trip detail modal (or select the first available trip) so the user can inspect the mountain gear and direct WhatsApp button inside the form.

#### Scenario: User reaches step 5 (Driver Trip Publishing)
- **WHEN** the tour enters step 5
- **THEN** the system SHALL automatically open the `PublishModal` so the user can view the driver trip publication form.

#### Scenario: Modal layer z-index elevation during tour steps
- **WHEN** a modal is open during a tour step (step 4 or step 5)
- **THEN** the system SHALL elevate the modal wrapper to `z-[220]`, above the tour backdrop's `z-[200]`, and suppress all backdrop blur/overlay inside the modal container so the modal form is 100% bright, crisp, and readable.

#### Scenario: Displaying modal step without overlapping tooltip
- **WHEN** a tour step involves an expanded modal (step 4 or step 5)
- **THEN** the system SHALL position the tour tooltip card docked at the bottom of the screen on mobile or side-offset on desktop, ensuring the modal form content is 100% visible and un-obscured.

#### Scenario: User exits modal steps or completes tour
- **WHEN** the tour transitions away from modal steps or reaches step 6 (Profile & Instagram)
- **THEN** the system SHALL automatically close open tour modals and show the final completion modal.

### Requirement: Replaying tour from User Profile
The system SHALL allow users to manually restart the onboarding tour at any time from their profile/settings page.

#### Scenario: User selects "Ver tutorial de inicio" in settings
- **WHEN** the user clicks "Ver tutorial de inicio" in their profile
- **THEN** the system SHALL restart the 6-step spotlight tour from step 1 regardless of previous completion status.
