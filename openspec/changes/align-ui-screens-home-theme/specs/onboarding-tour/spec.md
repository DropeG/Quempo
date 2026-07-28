# Onboarding Tour Capability

## MODIFIED Requirements

### Requirement: First-time user onboarding modal trigger
The system SHALL trigger the initial onboarding welcome prompt only once when a user logs in for the first time, rendering the welcome modal using Frosted Snow Glass aesthetics and sky-blue action buttons.

#### Scenario: User logs in for the first time
- **WHEN** a user logs in and `has_seen_onboarding` is false or not set in storage
- **THEN** the system SHALL display the Onboarding Welcome Modal styled with glassmorphism (`backdrop-filter: blur(26px)`), specular highlight borders (`border-white/30`), sky-blue CTA button (`#38BDF8`), and clear "Omitir por ahora" action.

## ADDED Requirements

### Requirement: Glassmorphic spotlight tour overlay and tooltip cards
The spotlight tour overlay and step tooltips SHALL render using the "Clean Alpine Frost & Sky Glass" design tokens with elevated z-index, crystalline borders, sky celeste progress indicators, and high-contrast navy/white action buttons.

#### Scenario: User navigates through spotlight tour steps
- **WHEN** the spotlight tour is active on any of the 6 steps
- **THEN** the step tooltip card displays over a translucent backdrop with glassmorphic blur, specular border shine (`border-sky-300/40`), sky-blue step counter badge ("Paso X de 6"), and primary "Siguiente ➔" action button.
