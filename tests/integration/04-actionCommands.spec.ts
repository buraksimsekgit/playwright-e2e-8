import { test } from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

test.describe("User Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://techglobal-training.com/frontend");

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await clickLink(page, "Html Elements");
  });

  test("User Actions - Click and Hover", async ({ page }) => {
    const dropdownButton = page.locator("#dropdown-button");

    await dropdownButton.hover();
  });

  test("User Actions, Type", async ({ page }) => {
    const textInput1 = page.locator("#text_input1");

    await textInput1.fill("Cypress");
    await textInput1.fill("Playwright");
    //CypressPlaywright

    console.log(page.viewportSize());
  });

  test('User Actions - Checkbox and Radio Buttons', async ({ page }) => {

    const apple = page.getByRole('checkbox', { name: 'Apple' })
    const microsoft = page.getByRole('checkbox', { name: 'Microsoft' })
    const tesla = page.getByRole('checkbox', { name: 'Tesla' })

    await apple.check()
    await apple.uncheck()

    const checkboxGroup = await page.locator('#checkbox-button-group input').all()

    for(const checkbox of checkboxGroup) {
        await checkbox.check()
        await checkbox.uncheck()
    }
  })

  test('User Actions - Dropdowns', async ({ page }) => {

    const companyDropdown = page.locator('#company_dropdown1')

    // Select the option with the index
    await companyDropdown.selectOption({ index: 2 })

    // Select the options with the text
    await companyDropdown.selectOption({ label: 'Apple' })

    // Select the option with value attribute
    await companyDropdown.selectOption({ value: 'Tesla' })

  })

  test('User Actions - Calendar / Date Pi`````cker', async ({ page }) => {

    const date1 = page.locator('#date_input1')
    const date2 = page.locator('#date_input2')

    await date1.fill('01/01/2000')
    await page.keyboard.press('Enter')

    // await date2.clear()
    await date2.fill('01/01/2000')
    await page.keyboard.press('Enter')

  })
});
