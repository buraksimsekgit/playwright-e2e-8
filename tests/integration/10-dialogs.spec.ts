import { test } from '@playwright/test'
import { clickButton, clickLink } from '../../helpers/clickHelpers'

test.describe('Dialogs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await clickLink(page, 'Alerts')
  })

  test('Handling Dialogs', async ({ page }) => {
    // Setup a dialog handler for one time if you want to handle it with single logic
    page.on('dialog', async (dialog) => {
      if (dialog.type() === 'alert') {
        await dialog.accept()
      } else if (dialog.type() === 'confirm') {
        await dialog.dismiss()
      } else {
        await dialog.accept('My Message')
      }

      console.log(dialog.message())
    })

    await clickButton(page, 'Warning alert')
    await clickButton(page, 'Confirmation alert')
    await clickButton(page, 'Prompt alert')
  })
})
