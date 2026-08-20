## Why

Fully autonomous commenting without human supervision creates significant risks of Facebook account flagging, spam detection, or out-of-context replies. To guarantee 100% safety, high conversion, and account longevity, Paso 5 provides an **Interactive Co-Pilot mode** where Pedro reviews candidates, approves or tweaks suggested replies, and triggers automated posting on demand while tracking history to prevent double-commenting.

## What Changes

- Add interactive reviewer: `scripts/facebook/copilot-review.ts`.
- Add automated comment poster module: `scripts/facebook/post-comment.ts` that navigates to the specific post and enters the comment with humanized delays.
- Add local history tracking in `scripts/facebook/data/replied-history.json` to avoid commenting on previously addressed posts.
- Provide interactive CLI choices per lead:
  - `[1] Enviar respuesta recomendada`
  - `[2] Editar mensaje antes de enviar`
  - `[3] Abrir post en Chrome para revisar`
  - `[4] Saltar / Ignorar`
- Add `npm run fb:review` and `npm run fb:run` (unified run: pipeline + co-pilot review).

## Capabilities

### New Capabilities
- `facebook-copilot-review`: Supervised co-pilot workflow allowing interactive approval, editing, automated posting, and response deduplication.

### Modified Capabilities
<!-- No modified capabilities -->

## Impact

- **Affected Areas**: `scripts/facebook/` (standalone developer tool).
- **Production impact**: 0% (development scripts only).
