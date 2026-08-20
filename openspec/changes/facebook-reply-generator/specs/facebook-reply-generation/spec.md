## ADDED Requirements

### Requirement: Contextual personalized message drafting
The system SHALL generate customized comment drafts addressing the user by their first name and referencing their specific destination, direction, and timing.

#### Scenario: Draft for passenger seeking ride
- **WHEN** a lead for "Diego Paradis" seeking a ride to "El Colorado" for "mañana" is processed
- **THEN** the system generates a draft mentioning Diego, El Colorado, and tomorrow's trip

### Requirement: Anti-spam variety and phrasing randomization
The system SHALL use randomized phrasing variations for greetings, explanations, and sign-offs to ensure subsequent comments do not share identical character sequences.

#### Scenario: Diverse response styles
- **WHEN** multiple leads are processed simultaneously
- **THEN** the generated drafts exhibit distinct sentence openings, emoji placements, and structures

### Requirement: Call-To-Action (CTA) inclusion
The system SHALL embed clear, friendly references to Quempo and the WhatsApp community link without aggressive hard-selling.

#### Scenario: Organic community invitation
- **WHEN** a reply is synthesized
- **THEN** it invites the user to check available rides on Quempo or join the snow community group
