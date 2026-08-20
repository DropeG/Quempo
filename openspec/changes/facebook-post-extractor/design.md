## Context

With browser session persistence established in Paso 1, Paso 2 implements the post extractor. Following **KISS** and **YAGNI**, this is kept as a single, robust script without complex databases, distributed queues, or unnecessary abstractions.

## Goals / Non-Goals

**Goals:**
- Implement `scripts/facebook/extract-posts.ts` using the existing `getPersistentBrowserContext`.
- Navigate to the designated group URL and extract the top 10-15 recent posts.
- Extract: `author`, `text`, `relativeTime`, and `postUrl`.
- Save results to `scripts/facebook/data/recent-posts.json` and print a readable summary in console.

**Non-Goals:**
- Database schema / Supabase storage (YAGNI: a simple JSON file is sufficient for exploration and Paso 3).
- LLM analysis or prompt evaluation (deferred to Paso 3).
- Automated replying / commenting (deferred to Paso 4 & 5).

## Decisions

### 1. Robust DOM Extraction Strategy (KISS)
* **Decision**: Facebook frequently obfuscates class names, so we target semantic attributes (`[role="feed"]`, `[role="article"]`, `[dir="auto"]`, and heading links).
* **Rationale**: Resilient against CSS minification and class hashing across Facebook updates.

### 2. File-based Output (`scripts/facebook/data/recent-posts.json`)
* **Decision**: Write extracted posts directly to a local JSON file.
* **Rationale**: Completely decoupled from backend storage; can be piped directly into Paso 3 (LLM analysis) or inspected in any editor.

## Risks / Trade-offs

- **[Risk] Infinite Scroll virtualization**: Facebook unloads offscreen DOM nodes when scrolling too far.
  - *Mitigation*: Only perform 2 shallow scrolls (loading ~10-15 posts), which is the exact sweet spot for fresh requests without triggering performance issues.
