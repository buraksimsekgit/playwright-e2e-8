import { test } from '@playwright/test'
import { clickLink } from '../../helpers/clickHelpers'

test.describe('Element State', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await clickLink(page, 'Html Elements')
  })

  test('Getting Element State', async ({ page }) => {


    const registerButton = page.getByRole('button', { name: 'Register' })
    const signInButton = page.getByRole('button', { name: 'Sign in' })

    const buttonMessage = page.locator('.mt-1')

    // lets say, we only want to click register button when its enabled, and click on the sign in when message is visible

    const registerButtonState = await registerButton.isEnabled()
    const isMessageVisible = await buttonMessage.isVisible()

    // Playwright automatically will check the element state, so this is just for demonstration purposes
    if(registerButtonState) {
        await registerButton.click()
    }

    isMessageVisible ? await signInButton.click() : registerButton.click()

  })

  test('Getting Element State - Checkbox and Radio Buttons', async ({ page }) => {

    const apple = page.getByRole('checkbox', { name: 'Apple' })
    const microsoft = page.getByRole('checkbox', { name: 'Microsoft' })
    const tesla = page.locator('#checkbox_3')

    await apple.check()
    const isAppleChecked = await apple.isChecked()

    if(isAppleChecked) {
        await microsoft.check()
        await tesla.check()
    } else {
        await apple.check()
    }

  })
})

