import { defineConfig, devices } from "@playwright/test";
import { Config } from "./src/configs/config";

export default defineConfig({
  globalSetup: require.resolve("src/configs/global-setup.ts"),
  testDir: "src/e2e",
  //timeout
  timeout: 100 * 1000,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : Config.RETRY_FAILED,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : Config.WORKERS,

  reporter: [
    [`./src/utils/report/CustomReporterConfig.ts`],
    ["html", { open: "always", host: "127.0.0.1", port: 5723 }],
  ],

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: Config.BASE_URL,
        storageState: "state.json",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        headless: Config.HEADLESS_BROWSER,
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
