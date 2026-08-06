## ADDED Requirements

### Requirement: Quempo Branded Favicon Suite (Option 2)
The web application MUST serve a tightly-cropped transparent Quempo mountain isotype as its favicon suite, eliminating extra canvas margins.

#### Scenario: Vector Favicon Rendering
- **WHEN** a user opens the web application in a browser
- **THEN** `src/app/icon.svg` renders the Quempo mountain isotype filling ~85-90% of the 16x16 / 32x32 tab space cleanly

#### Scenario: Legacy Favicon Fallback
- **WHEN** a browser requests `/favicon.ico`
- **THEN** the web application serves a valid `favicon.ico` generated from the cropped mountain isotype

#### Scenario: iOS Shortcut Icon
- **WHEN** a user saves the website to an iOS device
- **THEN** iOS uses `src/app/apple-icon.png` generated from the cropped mountain isotype

#### Scenario: Web App Manifest Metadata
- **WHEN** a mobile browser or PWA engine requests app manifest metadata
- **THEN** `src/app/manifest.json` provides theme color `#1A447E` and application name Quempo
