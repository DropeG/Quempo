## ADDED Requirements

### Requirement: Precise post permalink and relative timestamp extraction
The system SHALL extract exact post permalinks (containing `/posts/`, `/permalink/`, or `multi_permalinks=`) rather than user profile links, and accurately capture relative age text (e.g. "6 d", "11 de agosto", "Ayer") from post metadata elements.

#### Scenario: Permalink prioritization
- **WHEN** a post has both user profile links and a permalink anchor
- **THEN** the extractor saves the permalink as `postUrl` and extracts the timestamp text from that anchor

### Requirement: Telegram post link in success message
The system SHALL include a clickable link to the target Facebook post in Telegram confirmation messages upon both successful comment submission and errors.

#### Scenario: Clickable link on approval
- **WHEN** a user taps "✅ Aprobar y Publicar" on Telegram and the comment is posted
- **THEN** the updated Telegram message includes `🔗 Ver en Facebook: <postUrl>`
