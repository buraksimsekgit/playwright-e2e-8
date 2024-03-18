import { test, chromium } from '@playwright/test'


// test.describe.configure({ mode: 'serial'})

// This will trigget the test runner.
// test("Playwright 101 - Test Case", () => {
//   // Test to be executed
// });

// Test runner will trigger the browser context
// using the { page } fixture
test('Playwright 101 - Test Case 2', ({ page }) => {
  // Test to be executed
})

// Marks a function as asynchronous using 'async'
// meaning it might take some time to complete.
test('Playwright 101 - Test Case 3', async ({ page }) => {
  // The await keyword pauses function exection until a Promise is resolved,
  // ensuring code runs only after the Promise is fulfilled or rejected.
  await page.goto('https://techglobal-training.com')
})

test('Playwright 101 - Test Case 4', async () => {

    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://techglobal-training.com')

    await page.close()
})

test('Playwright 101 | Incognito example with browser fixture - Test Case 5', async ({ browser }) => {

    // Create a new incognito browser context
    const context = await browser.newContext()

    const page = await context.newPage()

    await page.goto('https://techglobal-training.com')

    await page.close()

  })


