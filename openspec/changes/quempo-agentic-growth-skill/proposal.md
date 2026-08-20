## Why

Replacing rigid code heuristics with the **Agent Reasoning + Mechanical Tools** pattern allows the Agent to use its native language intelligence to analyze complex ski group posts, understand nuanced passenger needs (gear, timing, mountain conditions), and craft 100% natural, human responses without artificial templates or external paid APIs.

## What Changes

- Create the project skill `.agent/skills/quempo-social-growth/SKILL.md` containing Quempo context, WhatsApp community details, snow community guidelines, and reasoning instructions for the AI Agent.
- Structure `scripts/facebook/` into modular CLI mechanical tools:
  - `fb:extract` (Input Tool): Playwright scraper that populates `recent-posts.json`.
  - `fb:alerts` (Output / Approval Tool): Dispatches structured leads to Telegram and handles approval callbacks.
  - `fb:post` (Output Tool): Submits approved comments to Facebook.
  - `history-manager` (Memory Tool): Tracks replied posts in `replied-history.json`.

## Capabilities

### New Capabilities
- `quempo-agent-growth-skill`: Official agent skill defining autonomous social listening, intelligent lead evaluation, and supervised response drafting for Quempo.

### Modified Capabilities
<!-- No modified capabilities -->

## Impact

- **Affected Areas**: `.agent/skills/quempo-social-growth/` and `scripts/facebook/`.
- **Production impact**: 0% (developer and growth tooling).
