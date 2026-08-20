import { chromium, type BrowserContext } from 'playwright';
import fs from 'fs';
import { FB_CONFIG } from './config';

export interface LaunchOptions {
  headless?: boolean;
  slowMo?: number;
}

/**
 * Launches or connects to a persistent Chromium browser context.
 * This stores and loads cookies, session data, and localStorage in .facebook-session/
 */
export async function getPersistentBrowserContext(
  options: LaunchOptions = {}
): Promise<BrowserContext> {
  const headless = options.headless ?? false;
  const slowMo = options.slowMo ?? 50;

  // Ensure session directory exists
  if (!fs.existsSync(FB_CONFIG.sessionDir)) {
    fs.mkdirSync(FB_CONFIG.sessionDir, { recursive: true });
  }

  const context = await chromium.launchPersistentContext(FB_CONFIG.sessionDir, {
    headless,
    slowMo,
    viewport: FB_CONFIG.viewport,
    userAgent: FB_CONFIG.userAgent,
    locale: 'es-CL',
    timezoneId: 'America/Santiago',
    permissions: [],
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-infobars',
      '--no-default-browser-check',
      '--disable-notifications',
    ],
  });

  return context;
}

/**
 * Safely closes the browser context.
 */
export async function closeBrowserContext(context: BrowserContext): Promise<void> {
  try {
    await context.close();
  } catch (error) {
    console.warn('[Facebook Connector] Warning closing browser context:', error);
  }
}
