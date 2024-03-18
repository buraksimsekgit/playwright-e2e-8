import { test, expect } from '../../fixtures/page-object-fixtures'
import { clickLink } from '../../helpers/clickHelpers'

// test.use({
//   launchOptions: {
//     headless: false,
//     slowMo: 100,
//     devtools: true
//   }
// })

test.describe.configure({ mode: 'serial', retries: 2 })

test.describe('Timeouts & Waits', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/frontend', { timeout: 30000 })
    await clickLink(page, 'Waits')
  })

  // test('should wait for an element to be visible', async ({ waitsPage }) => {
  //   // test.setTimeout(120000)

  //   await waitsPage.redBoxButton.click({ timeout: 10000 })
  //   await expect(waitsPage.redBox).toBeVisible({ timeout: 11000 })
  // })

  test('Waits', async ({ page, dynamicTablesPage }) => {
    await page.goto('/frontend/project-4')
    await dynamicTablesPage.clickAddProductButton()

    // 1st Way
    // await page.waitForSelector('#locator', { state: 'visible' })
    await dynamicTablesPage.productModal.waitFor({ state: 'visible' })

    await dynamicTablesPage.closeProductModal()

    await dynamicTablesPage.productModal.waitFor({ state: 'hidden' })
  })
})
