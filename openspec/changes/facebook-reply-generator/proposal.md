## Why

Replying with generic, identical text triggers Facebook's automated spam filters and reduces conversion. To convert snow enthusiasts into Quempo users, we need a smart reply generator (Paso 4) that constructs natural, hyper-personalized responses based on the author's first name, destination (*El Colorado*, *Farellones*), timing (*mañana*, *el lunes*), and equipment (*tablas*, *esquíes*).

## What Changes

- Add reply generator engine: `scripts/facebook/generate-replies.ts`.
- Implement dynamic template and phrasing variations to ensure no two comments are identical (anti-spam protection).
- Include personalized Call-To-Action (CTA) referencing the Quempo web app and the community WhatsApp group.
- Save draft replies with metadata to `scripts/facebook/data/actionable-replies.json`.
- Add `npm run fb:replies` command and unified pipeline command `npm run fb:pipeline`.

## Capabilities

### New Capabilities
- `facebook-reply-generation`: Hyper-personalized contextual comment drafting for classified ride leads with semantic variations.

### Modified Capabilities
<!-- No modified capabilities -->

## Impact

- **Affected Areas**: `scripts/facebook/` (standalone developer tool).
- **Production impact**: 0% (development scripts only).
