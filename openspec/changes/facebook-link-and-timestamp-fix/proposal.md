## Why

Testing with real live Facebook groups identified two key enhancements: (1) Some posts had user profile links instead of exact post permalinks, causing false-positive "Reciente" timestamps for posts published days ago, and (2) Telegram approval confirmation messages need to include the direct clickable link to the Facebook post so the user can easily review the published comment.

## What Changes

- Enhance timestamp and permalink extraction in `scripts/facebook/extract-posts.ts` to prioritize exact post permalinks (`/posts/<id>`, `/permalink/<id>`) and accurate relative age tokens (*"6 d"*, *"11 de agosto"*, *"hace 3 días"*).
- Update Telegram confirmation message in `scripts/facebook/telegram-service.ts` to include the clickable link to the Facebook post upon successful comment posting.
- Ensure expired posts from previous weeks/days are strictly filtered out in `scripts/facebook/temporal-parser.ts`.

## Capabilities

### New Capabilities
- `facebook-timestamp-and-telegram-feedback`: Exact post permalink and publication age extraction combined with direct post links in Telegram success notifications.

### Modified Capabilities
<!-- No modified capabilities -->

## Impact

- **Affected Areas**: `scripts/facebook/` (standalone developer tool).
- **Production impact**: 0% (developer tooling only).
