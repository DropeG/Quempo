## ADDED Requirements

### Requirement: Feed scrolling and post collection
The system SHALL navigate to a target Facebook group URL and scroll smoothly to load recent posts without rapid spam scrolling.

#### Scenario: Scroll and collect feed elements
- **WHEN** the extraction script navigates to a group
- **THEN** it performs 2 to 3 gentle page scrolls and locates all loaded feed post containers

### Requirement: Post metadata extraction
The system SHALL parse each feed post container and extract the author's name, post text, relative timestamp (e.g. "2 h", "Ayer a las 18:30"), and permalink/URL when available.

#### Scenario: Successful post extraction
- **WHEN** a valid group post is rendered in the DOM
- **THEN** the system extracts non-empty `text`, `author`, `relativeTime`, and `postUrl` fields

#### Scenario: Resilient parsing of media-only or empty posts
- **WHEN** a post contains only photos or stickers with no textual body
- **THEN** the system marks the text as empty or placeholder without crashing

### Requirement: Local JSON persistence
The system SHALL persist all extracted posts to a local JSON file for downstream analysis.

#### Scenario: Save extracted posts to file
- **WHEN** extraction completes
- **THEN** the array of extracted post objects is written to `scripts/facebook/data/recent-posts.json` with a timestamp
