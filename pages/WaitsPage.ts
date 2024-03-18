import { type Locator, type Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class WaitsPage extends BasePage {
  readonly redBoxButton: Locator
  readonly blueBoxBUtton: Locator
  readonly redBox: Locator
  readonly bluebox: Locator

  constructor(page: Page) {
    super(page)
    this.redBoxButton = page.locator('#red')
    this.blueBoxBUtton = page.locator('#blue')
    this.redBox = page.locator('.box.has-background-danger')
    this.bluebox = page.locator('button[class*="Waits_blue_box"]')
  }

  async clickRedBoxButton() {
    await this.redBoxButton.click()
  }

  async clickBlueBoxButton() {
    await this.blueBoxBUtton.click()
  }
}
