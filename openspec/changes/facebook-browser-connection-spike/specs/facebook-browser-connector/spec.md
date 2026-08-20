## ADDED Requirements

### Requirement: Persistent browser session configuration
The automation system SHALL support launching a Chromium browser instance using a persistent user data directory or connecting to an existing Chrome user session to maintain authenticated Facebook cookies without storing credentials.

#### Scenario: Launching with existing user session
- **WHEN** the connection spike script is executed with persistent context configuration
- **THEN** the browser opens without requesting Facebook login credentials or 2-factor authentication prompts

### Requirement: Group navigation and authentication verification
The system SHALL navigate to a target Facebook group URL and verify whether the current session is authenticated as a logged-in user.

#### Scenario: Verified authenticated session
- **WHEN** the browser opens the Facebook group URL
- **THEN** the system detects the authenticated user interface elements (e.g. comment box with user name/avatar) and reports successful authentication

#### Scenario: Unauthenticated session fallback
- **WHEN** the browser opens the Facebook group URL but a login wall or prompt is presented
- **THEN** the system logs a descriptive error indicating that a manual login or valid user data directory profile is required and terminates gracefully

### Requirement: Connection diagnostics and profile detection
The system SHALL output structured diagnostics indicating session status, logged-in profile identity (if available), and page load latency.

#### Scenario: Diagnostic summary output
- **WHEN** the verification finishes successfully
- **THEN** the console outputs a JSON or clean formatted summary including `status: "connected"`, `user: "<profile_name>"`, and `target_group: "<group_name_or_id>"`
