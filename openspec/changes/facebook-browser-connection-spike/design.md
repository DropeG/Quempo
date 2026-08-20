## Context

To enable automated social listening in Facebook groups for snow travel requests, we need a reliable way to interact with Facebook using the user's authenticated session. This technical design covers Paso 1: establishing the Playwright automation foundation and verifying session connectivity.

## Goals / Non-Goals

**Goals:**
- Set up a lightweight, isolated automation script (`scripts/facebook/check-connection.ts` or `.mjs`) with Playwright.
- Connect using a persistent browser context (or Chrome profile data directory) to preserve Facebook login session without storing raw credentials in code.
- Navigate to a target snow group URL (e.g. *Subidas a El Colorado centro de ski*) and confirm authenticated state.
- Output clear diagnostics in terminal reporting session health and detected user profile.

**Non-Goals:**
- Extracting or parsing multiple feed posts (deferred to Paso 2).
- LLM temporal/intent classification (deferred to Paso 3).
- Automated posting or replying to comments (deferred to Paso 4 & 5).

## Decisions

### 1. Standalone Script in `scripts/facebook/`
* **Decision**: Place all Facebook automation utilities in a dedicated `scripts/facebook/` folder rather than mixing them with Next.js web application code.
* **Rationale**: Keeps client/server Next.js build clean and avoids bundling Playwright into the production web bundle.
* **Alternatives considered**: Next.js API route (rejected because Playwright browser binaries should not run inside Vercel serverless functions).

### 2. Persistent Browser Context with Headed Option
* **Decision**: Use Playwright's `chromium.launchPersistentContext(userDataDir, { headless: false, ... })` with option to run headed for initial verification.
* **Rationale**: Allows the user to visually inspect the browser during initial setup, perform one-time login if needed, and re-use the persistent session cookie cache for subsequent automated runs.
* **Alternatives considered**: Headless-only with cookie injection (more fragile and prone to Facebook bot detection flags).

### 3. Session Health Check Selectors
* **Decision**: Detect session status by inspecting standard Facebook authenticated anchors (e.g. user navigation bar, "Comentar como [Nombre]" or profile aria-labels).
* **Rationale**: Fast, non-destructive check that doesn't trigger Facebook rate limits.

## Risks / Trade-offs

- **[Risk] Chrome Profile Directory Lock**: If Google Chrome is already running with the primary user profile, Chromium cannot open the exact same active lockfile simultaneously.
  - *Mitigation*: Configure the script to use a dedicated `.facebook-session/` persistent data folder. On first run, it opens headed for quick login (or cookie import), and keeps that session indefinitely.
- **[Risk] Facebook Bot Detection**:
  - *Mitigation*: Use standard user-agent strings, realistic viewports (1280x800), and humanized interaction delays.
