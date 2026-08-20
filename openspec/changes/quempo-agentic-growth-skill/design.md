## Context

This design formalizes the **Agent Reasoning + Mechanical Tools** pattern for Quempo's social growth operations. The Agent uses native LLM reasoning to evaluate Facebook ride requests and draft contextual replies, using lightweight TypeScript scripts as input/output tools.

## Goals / Non-Goals

**Goals:**
- Author `.agent/skills/quempo-social-growth/SKILL.md` as the official instruction manual for the AI Agent.
- Maintain clean, mechanical scripts in `scripts/facebook/` (`extract-posts.ts`, `send-alerts.ts`, `post-comment.ts`, `history-manager.ts`).
- Enable seamless end-to-end execution where the Agent scans, reasons, drafts, and dispatches to Telegram for supervised approval.

**Non-Goals:**
- Relying on external paid LLM API services (the Agent uses its native reasoning).

## Decisions

### 1. Skill Manual in `.agent/skills/quempo-social-growth/SKILL.md`
* **Decision**: Codify community background, WhatsApp links, resort destinations, and reasoning guidelines in a dedicated skill file.
* **Rationale**: Enables any Antigravity session or autonomous worker to immediately understand and execute social growth tasks for Quempo with zero onboarding friction.

### 2. Pure Mechanical Tools
* **Decision**: Keep scraping, Telegram dispatching, and Facebook commenting as standalone CLI tools without internal heuristics.
* **Rationale**: Decouples mechanical browser/API actions from cognitive reasoning.
