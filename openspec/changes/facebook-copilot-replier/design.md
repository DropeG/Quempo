## Context

Paso 5 provides the final piece of the Growth tool: supervised interactive review and automated comment publishing. Following **KISS** and **YAGNI**, this is implemented as an interactive terminal Co-Pilot using standard Node.js `readline/promises` and Playwright comment submission.

## Goals / Non-Goals

**Goals:**
- Implement `scripts/facebook/post-comment.ts` to navigate to a Facebook post and post a comment with human-like timing.
- Implement `scripts/facebook/copilot-review.ts` for interactive approval, custom edits, and skipping.
- Maintain `scripts/facebook/data/replied-history.json` to prevent re-commenting on previously handled posts.
- Provide a unified command `npm run fb:review`.

**Non-Goals:**
- Mass automated unattended commenting without human approval.
- Multi-threaded parallel commenting (YAGNI / high anti-spam risk).

## Decisions

### 1. Human-in-the-loop (Co-Pilot) Review
* **Decision**: Require single-key approval in terminal before posting to Facebook.
* **Rationale**: Eliminates the risk of hallucinations, incorrect dates, or bot flags, keeping 100% human supervision.

### 2. Persistent Reply History (`replied-history.json`)
* **Decision**: Store a lightweight list of replied post URLs and author IDs locally.
* **Rationale**: Guarantees idempotency across multiple runs so that previously contacted users are never messaged twice.

## Risks / Trade-offs

- **[Risk] Post comment input blocked by group permissions**:
  - *Mitigation*: The poster module detects if comments are disabled or if approval is required and logs a graceful warning without crashing.
