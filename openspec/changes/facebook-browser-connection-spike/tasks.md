## 1. Setup and Dependencies

- [x] 1.1 Add `playwright` to `package.json` devDependencies and initialize `scripts/facebook/` directory
- [x] 1.2 Create `scripts/facebook/config.ts` with persistent session paths, viewport, and default snow group URLs

## 2. Browser Connector Implementation

- [x] 2.1 Implement `scripts/facebook/browser-session.ts` to manage launching and closing persistent browser context
- [x] 2.2 Implement `scripts/facebook/check-connection.ts` to open Facebook group and verify authenticated session and profile name

## 3. Verification and Diagnostics

- [x] 3.1 Run verification test script in headed mode and confirm session persistence
- [x] 3.2 Verify clean terminal diagnostic output showing connection status and user identity

