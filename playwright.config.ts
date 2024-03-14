import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv'
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* You can globally setup to run once before your tests */
  // globalSetup: 'tests/setup/global.setup.ts',

  testDir: './tests',
  /* Run tests in files in parallel */

  snapshotDir: './snapshots',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    // ["json", { outputFile: "json/results.json" }],
    // ["junit", { outputFile: "junit/results.xml" }],
    ['list'],
  ],

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example, in 'await expect(locator).toHaveText();'
     */

    timeout: 5 * 1000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: true,
    baseURL: process.env.BASE_URL,

    // storageState: "user-data/authorization.json"
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
      testIgnore: ['test/setup/*.ts', 'tests/integration/17-globalSetup.spec.ts'],
    },

    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
      teardown: 'teardown'
    },
    {
      name: 'teardown',
      testMatch: /global\.teardown\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: './user-data/loginAuth.json'
      },
    },
    {
      name: 'loggedIn',
      testMatch: '**/17-globalSetup.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: './user-data/loginAuth.json'
      },
    },



    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
