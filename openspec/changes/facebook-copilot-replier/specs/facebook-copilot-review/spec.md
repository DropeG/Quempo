## ADDED Requirements

### Requirement: Interactive review CLI
The system SHALL present actionable replies sequentially in terminal and prompt the operator for an action before taking any write action.

#### Scenario: Operator approvals
- **WHEN** the operator selects option 1 ("Enviar respuesta recomendada")
- **THEN** the system proceeds to post the selected message to the specific Facebook post

#### Scenario: Operator skips lead
- **WHEN** the operator selects option 4 ("Saltar / Ignorar")
- **THEN** the system advances to the next candidate without commenting

### Requirement: Safe automated comment delivery
The system SHALL open the target post container using the persistent browser session, locate the comment input box, simulate realistic typing delays, and submit the comment.

#### Scenario: Successful comment posting
- **WHEN** the poster module receives a verified post URL and message content
- **THEN** it enters the text into the post comment input, presses Enter, and confirms the comment is submitted

### Requirement: Deduplication and response history
The system SHALL record every replied post URL or ID in a persistent local history file `scripts/facebook/data/replied-history.json` and skip already-replied posts in future runs.

#### Scenario: Preventing double commenting
- **WHEN** a post has already been recorded in `replied-history.json`
- **THEN** the system automatically marks it as already processed and omits it from active review
