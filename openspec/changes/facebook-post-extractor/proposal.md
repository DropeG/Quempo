## Why

Now that we have established a persistent Facebook browser session (Paso 1), we need a simple way to extract the latest posts from snow groups (Paso 2). Applying **KISS** (Keep It Simple, Stupid) and **YAGNI** (You Aren't Gonna Need It), this change focuses strictly on reading and extracting raw post text, authors, timestamps, and URLs without over-engineering complex database models or queues.

## What Changes

- Add a simple extraction script: `scripts/facebook/extract-posts.ts`.
- Automate gentle scrolling to load the 10-15 most recent feed posts in a target group.
- Extract structured post data: `author`, `text`, `relativeTime`, `postUrl`, and `extractedAt`.
- Save output locally to `scripts/facebook/data/recent-posts.json` and display a clean summary table in the terminal.
- Add `npm run fb:extract` command.

## Capabilities

### New Capabilities
- `facebook-post-extraction`: Automated extraction of raw posts, author names, and relative timestamps from target Facebook groups.

### Modified Capabilities
<!-- No modified capabilities -->

## Impact

- **Affected Areas**: `scripts/facebook/` (standalone developer tool).
- **Production impact**: 0% (does not affect Next.js app bundle or Supabase schema).
