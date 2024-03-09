import { test, expect } from "@playwright/test";

test.describe("First test suite", () => {
  test("Refresh, navigate back and forward", async ({ page }) => {
    // Navigate to a page
    await page.goto("https://techglobal-training.com");

    // Refresh the page
    await page.reload();

    // Navigate to another page
    await page.goto("https://techglobal-training.com/frontend");

    // Navigating back
    await page.goBack();

    // Navigate forward
    await page.goForward();
  });

  test("Validate page Title", async ({ page }) => {
    await page.goto("https://techglobal-training.com");

    const title = await page.title();

    // 1st way to assert Title
    // expect(title).toBe('TechGlobal Training | Home')

    // 2nd way to assert Title
    await expect(page).toHaveTitle("TechGlobal Training | Home");
  });

  test("Validate page URL", async ({ page }) => {
    await page.goto("https://techglobal-training.com");

    const url = page.url();

    // 1st way to assert URL
    // expect(url).toBe("https://techglobal-training.com");

    // 2nd way to assert Title
    await expect(page).toHaveURL("https://techglobal-training.com");
  });

  test("My First Test", async ({ page }) => {

    await page.goto("https://techglobal-training.com");

    // await page.click('#logo')

    const myLogo = page.locator('#logo')

    await myLogo.click()

    await expect(myLogo).toBeVisible()
  });
});
