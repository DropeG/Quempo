## ADDED Requirements

### Requirement: ENV Admin Authentication Access
The system SHALL provide a login interface at `/admin/login` for platform administrators that validates credentials against environment variables (`ADMIN_USERNAME` and `ADMIN_PASSWORD`) and restricts access to `/admin` based on a session cookie.

#### Scenario: Admin signs in with valid environment credentials
- **WHEN** an administrator enters matching `ADMIN_USERNAME` and `ADMIN_PASSWORD` credentials at `/admin/login`
- **THEN** the system SHALL create a secure session cookie `quempo_admin_session` and redirect to `/admin`.

#### Scenario: Access attempt without valid session cookie
- **WHEN** an unauthenticated request without a valid `quempo_admin_session` cookie accesses `/admin`
- **THEN** the system SHALL redirect the request to `/admin/login`.

### Requirement: Platform Metrics Summary
The system SHALL display summary metric cards on the `/admin` dashboard reflecting global application activity.

#### Scenario: View global metrics
- **WHEN** an authenticated administrator views the `/admin` dashboard
- **THEN** the system SHALL render the total count of registered users and the total count of created trips.

### Requirement: User Directory and Search
The system SHALL render a list of registered users on the `/admin` dashboard and allow real-time filtering by name or email.

#### Scenario: Search users by keyword
- **WHEN** the administrator types a query into the user search field
- **THEN** the system SHALL filter the user list to show only users whose name, email, phone, or instagram matches the search query.

#### Scenario: View user details
- **WHEN** the user directory is loaded on the dashboard
- **THEN** the system SHALL display each user's avatar/name, email/phone, registration date, and total number of trips created.
