import { defineConfig, devices } from "@playwright/test";
import { Config } from "./src/config/config";

export default defineConfig({
  testDir: "src/e2e",
  //timeout
  timeout: 50 * 1000,

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : Config.RETRY_FAILED,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : Config.WORKERS,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [`./src/utils/report/CustomReporterConfig.ts`],
    ["html", { open: "always", host: "127.0.0.1", port: 5723 }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: Config.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    headless: Config.HEADLESS_BROWSER,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        deviceScaleFactor: undefined,
        viewport: null,
        launchOptions: {
          slowMo: 700,
          args: [
            "--start-maximized",
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
    },
  ],
});
