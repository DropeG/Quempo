## Context

Following live testing, two key fixes are designed:
1. **Timestamp & Permalink Accuracy**: Facebook groups contain both user profile links and post permalinks. The extractor will explicitly prioritize `/posts/` and `/permalink/` URLs and extract exact relative timestamp text (e.g., *"6 d"*, *"11 de agosto"*) so `temporal-parser.ts` accurately filters out expired posts.
2. **Telegram Success Link**: Telegram confirmation edits will include the active link to the Facebook post for immediate inspection.

## Goals / Non-Goals

**Goals:**
- Improve `extract-posts.ts` DOM selectors for permalinks and relative time tokens.
- Add `<a href="...">Ver publicación en Facebook</a>` to the Telegram success message in `telegram-service.ts`.
- Ensure multi-day past posts saying *"mañana"* evaluate as expired in `temporal-parser.ts`.

**Non-Goals:**
- External third-party scraping APIs (maintain native Playwright persistent session).

## Decisions

### 1. Robust Permalink & Timestamp Disambiguation
* **Decision**: Scan all `a` tags in each post container and match regex `/\/posts\/|\/permalink\//`. For timestamp, match `span` or `a` elements with patterns `/\d+\s*(d|h|min)|ayer|agosto|julio/i`.
* **Rationale**: Prevents falling back to user profile links and captures exact post publication age.

### 2. Clickable Links in Telegram Confirmations
* **Decision**: Append `🔗 <a href="${lead.postUrl}">Ver publicación en Facebook</a>` to the final edited message.
* **Rationale**: Gives Pedro a 1-click verification link right inside the confirmation message.
