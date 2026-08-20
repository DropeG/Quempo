## Why

To grow the Quempo user base and community, we want to monitor snow travel Facebook groups for trip requests. Since Meta does not provide an open Graph API for external group monitoring, we need a secure, local browser connector using Playwright. This initial change (Paso 1) establishes a reliable connection to Facebook using the user's existing Chrome profile session, verifying access without triggering security warnings or requiring manual re-authentication.

## What Changes

- Add a standalone automation script and helper module using Playwright in Node.js/TypeScript.
- Configure persistent browser context support to reuse the local Chrome profile/cookies safely.
- Implement a connection verification routine that opens a target Facebook snow group in a headless or headed browser and validates authenticated status.
- Add clear diagnostics output confirming session validity and current user profile name.

## Capabilities

### New Capabilities
- `facebook-browser-connector`: Automated connection and session verification with Facebook groups using persistent browser context.

### Modified Capabilities
<!-- No existing web app capabilities are modified -->

## Impact

- **New Dependencies**: `@playwright/test` or `playwright` dev dependencies for local scripting.
- **Affected Areas**: Standalone scripts/tools directory (does not impact core Next.js production build or app runtime).
- **Security/Storage**: Stores temporary browser state or links to local Chrome user data directory without hardcoding credentials.
