# Trip Publishing Spec

## ADDED Requirements

### Requirement: Support edit mode in PublishModal
The trip publishing form SHALL accept an existing trip payload (`tripToEdit`) to populate all fields and update the record in Supabase upon submission.

#### Scenario: Submitting form in edit mode
- **WHEN** a user submits the PublishModal form with `tripToEdit` set
- **THEN** the system SHALL update the existing trip record in Supabase instead of inserting a new record, displaying a success confirmation message.
