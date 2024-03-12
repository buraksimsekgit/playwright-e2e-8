import { Page } from '@playwright/test'

async function clickButton(page: Page, buttonText: string): Promise<void> {
  await page.getByRole('button', { name: buttonText }).click()
}

async function clickLink(page: Page, linkText: string): Promise<void> {
  await page.getByRole('link', { name: linkText }).click()
}

export { clickButton, clickLink }