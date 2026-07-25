## ADDED Requirements

### Requirement: Google OAuth Login
The system SHALL allow users to authenticate using their Google account via Supabase Auth.

#### Scenario: Successful Google authentication
- **WHEN** user clicks the "Iniciar sesión con Google" button
- **THEN** system redirects user to Google OAuth consent and creates or restores their user session with profile data (name, email, avatar).

### Requirement: Session Management
The system SHALL maintain user authentication state across page reloads and browser sessions.

#### Scenario: Persistent session check
- **WHEN** user opens the app while previously authenticated
- **THEN** system restores user session automatically without requesting credentials again.
