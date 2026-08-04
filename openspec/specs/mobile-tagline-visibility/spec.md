# mobile-tagline-visibility Specification

## Requirements

### Requirement: Hide tagline on mobile devices
The Navbar tagline element SHALL be hidden on mobile screen sizes (below Tailwind `sm` breakpoint of 640px) and visible on desktop screen sizes (`sm` breakpoint and above).

#### Scenario: Mobile viewport viewing
- **WHEN** a user visits the site on a screen narrower than 640px
- **THEN** the tagline text "Conecta viajes a Farellones, El Colorado, La Parva y Valle Nevado en segundos" is not displayed in the Navbar

#### Scenario: Desktop viewport viewing
- **WHEN** a user visits the site on a screen 640px wide or greater
- **THEN** the tagline text "Conecta viajes a Farellones, El Colorado, La Parva y Valle Nevado en segundos" is displayed below the brand logo in the Navbar
