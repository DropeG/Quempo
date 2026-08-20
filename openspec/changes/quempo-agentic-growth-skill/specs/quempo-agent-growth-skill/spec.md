## ADDED Requirements

### Requirement: Agent Skill Definition for Quempo Growth
The project SHALL define a dedicated agent skill in `.agent/skills/quempo-social-growth/SKILL.md` detailing Quempo's mission, WhatsApp community link (`https://chat.whatsapp.com/HSYkGEhRxGgCpPsd6S4Rid`), website (`https://quempo.tech`), Chilean snow culture context, and guidelines for autonomous reasoning, evaluation, and personalized drafting.

#### Scenario: Agent loads growth context
- **WHEN** the agent is instructed to perform growth social listening
- **THEN** it reads `.agent/skills/quempo-social-growth/SKILL.md` and applies native reasoning to analyze posts and craft personalized replies

### Requirement: Mechanical Tools Decoupling
The tools in `scripts/facebook/` SHALL be lightweight CLI utilities handling exclusively mechanical operations (scraping, comment submission, Telegram alerts, and history logging) without hardcoded heuristic templates.

#### Scenario: Tool execution
- **WHEN** the agent needs to fetch live Facebook feed data
- **THEN** it invokes the `fb:extract` tool which writes raw posts to `scripts/facebook/data/recent-posts.json`
