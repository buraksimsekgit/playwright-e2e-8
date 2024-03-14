import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/')

  await page.getByRole('link', { name: 'Log in' }).click()
  await page.locator('#loginusername').fill('test')
  await page.locator('#loginpassword').fill('test')
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible()

  await page.context().storageState({ path: './authorization.json' })
})
