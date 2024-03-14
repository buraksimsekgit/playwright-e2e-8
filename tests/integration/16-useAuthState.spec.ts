import { test, expect } from '@playwright/test'

test.use({
  storageState: 'authorization.json',
})

test('menu', async ({ page }) => {
  await page.goto('https://demoblaze.com/')

  console.log('signed in')
  await expect(page.locator('#nameofuser')).toBeVisible()
})

test('menu validate', async ({ page }) => {
  await page.goto('https://demoblaze.com/')

  console.log('signed in')
  await expect(page.locator('#logout2')).toBeVisible()
})
