## ADDED Requirements

### Requirement: Quempo Branded Favicon Suite
The web application MUST serve a complete branded favicon suite derived from the Quempo logo (`logo_quempo.svg`), replacing default boilerplate icons.

#### Scenario: Vector Favicon Rendering
- **WHEN** a user opens the web application in a modern desktop browser (Chrome, Firefox, Safari)
- **THEN** the browser displays `src/app/icon.svg` featuring the Quempo isotype in crisp vector quality in the tab title bar

#### Scenario: Legacy Favicon Fallback
- **WHEN** a client requests standard fallback favicon requests (`/favicon.ico`)
- **THEN** the web application serves a valid `favicon.ico` icon asset

#### Scenario: iOS Shortcut Icon
- **WHEN** a user saves the website to their iOS home screen
- **THEN** iOS uses `src/app/apple-icon.png` as the home screen shortcut icon

#### Scenario: Web App Manifest Metadata
- **WHEN** a mobile browser or PWA browser engine inspects the web application
- **THEN** it reads `src/app/manifest.json` containing the application name "Quempo", short name, background color, display mode, and theme color `#1A447E`
