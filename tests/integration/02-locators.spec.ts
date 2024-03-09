import { test } from "@playwright/test";

test.describe("Playwright locators", () => {
  test("Playwright Locator API", async ({ page }) => {
    await page.goto("https://techglobal-training.com");

    // await page.click('#logo')

    const myLogo = page.locator("#logo");

    await myLogo.click();
  });

  test("Playwright - Custom Pesuedo Classes", async ({ page }) => {
    await page.goto("https://techglobal-training.com/frontend");

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await page.locator('a:has-text("Html Elements")').click();

    // These locates the given elements by their text using "text() or has-text()"
    await page.locator('button:text("Register")').highlight();
    await page.locator('button:has-text("Sign in"):visible').highlight();

    await page
      .locator("#radio-button-group", { has: page.locator("#java_radio") })
      .highlight();
    await page.locator("#radio-button-group:has(#java_radio)").highlight();
  });

  test("Playwright - Chaining Locators", async ({ page }) => {
    await page.goto("https://techglobal-training.com/frontend");

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await page.locator('a:has-text("Html Elements")').click();

    const unorderedList = page.locator("#unordered_list");

    const getText = await unorderedList
      .locator('li:has-text("JavaScript")')
      .highlight();

  });

  test("Playwright - Handling multiple elements", async ({ page }) => {
    await page.goto("https://techglobal-training.com/frontend");

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await page.locator('a:has-text("Html Elements")').click();

    const unorderedList = page.locator("#unordered_list > li");

    await unorderedList.first().click();
    await unorderedList.nth(1).click();
    await unorderedList.last().click();

    const checkboxGroup = page.locator("#checkbox-button-group input");
    const checkboxCount = await checkboxGroup.count();

    for (let i = 0; i < checkboxCount; i++) {
      await checkboxGroup.nth(i).click();
    }

    const checkboxGroup2 = await page
      .locator("#checkbox-button-group input")
      .all();

    for (const checkbox of checkboxGroup2) {
      await checkbox.click();
    }
  });

  test("Playwright built-in locators", async ({ page }) => {
    await page.goto("https://techglobal-training.com/frontend");

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await page.getByRole("link", { name: "Html Elements" }).click();

    await page.getByRole("heading", { name: "Unordered List" }).highlight();

    await page.getByRole("button", { name: "Register" }).highlight();

    await page.getByPlaceholder("Enter text here").highlight();
  });

  test("Playwright - filter() locator API", async ({ page }) => {
    await page.goto("https://techglobal-training.com/frontend");

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await page.getByRole("link", { name: "Html Elements" }).click();

    const testingParagraphs = page.locator("p").filter({ hasText: "testing" });

    await testingParagraphs.highlight();

    const languageHeadings = await page.locator('label').count()

    console.log(`Amount of elements with label tag is: ${languageHeadings}`)

    const noneLanguageHeadings = await page.locator("label").filter({ hasNotText: "Java" }).count();

    console.log(`Amount of elements with label tag is but Java: ${noneLanguageHeadings}`)

    const wrappers = await page.locator('[data-identifier*="a"]').count()

    console.log(`The located elements returns: ${wrappers}`)

    const uniqueWrapper = await page.locator('[data-identifier*="a"]').filter({ has: page.locator('#java_radio')}).count()

    console.log(`The located elements returns: ${uniqueWrapper}`)
  });
});
