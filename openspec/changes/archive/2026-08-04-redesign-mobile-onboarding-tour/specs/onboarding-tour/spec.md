# Onboarding Tour Capability

## MODIFIED Requirements

### Requirement: 6-Step Interactive Spotlight Navigation with Dynamic Modal Expansion & Layer Elevation
The system SHALL guide the user step-by-step through the 6 core features of Quempo using a mobile-first Bottom Sheet interface (`fixed bottom-0 z-[220] pb-safe`), smart auto-scroll positioning to the upper viewport area (`block: 'start'`), and non-obstructive spotlight cutouts.

#### Scenario: User advances through tour steps on mobile
- **WHEN** the user clicks "Siguiente ➔" or taps a progress dot on a tour step
- **THEN** the system SHALL smoothly scroll the target element into the upper viewport area without covering it with the Bottom Sheet instruction card, updating the step count (e.g. 1/6) and progress dots bar.

#### Scenario: User reaches step 4 (Trip Detail & WhatsApp Contact)
- **WHEN** the tour enters step 4
- **THEN** the system SHALL highlight the trip details card or trigger the sample trip details view so the user can inspect mountain gear (4x4, cadenas, porta-skis) and the direct $0 commission WhatsApp CTA button.

#### Scenario: User reaches step 5 (Driver Trip Publishing)
- **WHEN** the tour enters step 5
- **THEN** the system SHALL highlight the "Publicar Viaje" trigger button, displaying driver instructions inside the Bottom Sheet without launching full-screen modal overlays that obstruct the tutorial.

#### Scenario: Displaying step card without overlapping target element
- **WHEN** any tour step is active on a mobile screen
- **THEN** the system SHALL dock the step instruction card at the bottom of the screen (`fixed bottom-0 left-0 right-0 z-[220]`), using safe area padding (`pb-safe`) and ensuring the target element is 100% visible in the upper viewport zone.

#### Scenario: User completes tour or exits at any time
- **WHEN** the user completes step 6 or clicks "Omitir", "X", or "Explorar Rutas"
- **THEN** the system SHALL immediately close the tutorial, set `quempo_onboarding_completed_v1` in local storage, and display the clean home view.

### Requirement: Glassmorphic spotlight tour overlay and tooltip cards
The spotlight tour overlay and step instruction card SHALL render using the "Clean Alpine Frost & Sky Glass" design tokens with elevated z-index, crystalline borders, sky celeste progress indicators, and high-contrast touch targets.

#### Scenario: User navigates through spotlight tour steps
- **WHEN** the spotlight tour is active on any step
- **THEN** the Bottom Sheet step card displays over a translucent backdrop with glassmorphic blur, specular border shine (`border-white/30`), sky-blue step counter badge ("Paso X de 6"), progress dots indicator, and minimum 48px action buttons ("Anterior", "Siguiente ➔").
