# User Profile Spec

## ADDED Requirements

### Requirement: Propagate Instagram handle to all trips on profile update
When a user updates their Instagram handle or contact info in ProfileModal, the system SHALL update all published trips belonging to that `user_id` in Supabase and refresh active trip feeds.

#### Scenario: Driver updates Instagram in profile
- **WHEN** a driver updates their Instagram handle in ProfileModal and saves
- **THEN** all past and active trips created by that driver SHALL immediately reflect the new Instagram handle across all cards and detail modals.
