import { test } from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

test.describe("Eleement Properties", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://techglobal-training.com/frontend");

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await clickLink(page, "Html Elements");
  });

  test("Getting Element Properties", async ({ page }) => {
    const headings = page.locator('[data-identifier="Headings"]');

    // will always return an array
    const allInnerText = await headings.allInnerTexts();

    // returns a signle string, which already has the child elements
    const innerText = await headings.innerText();

    // Returns the element of inner elements
    const innerHtml = await headings.innerHTML();

    console.log(allInnerText);
    console.log(innerText);
    console.log(innerHtml);

    const textContent = await headings.textContent();

    console.log(textContent);

    const innerElements = headings.locator("h4");

    console.log((await innerElements.count()) + " count of web elements");

    const attr = await headings.getAttribute("data-identifier");

    console.log(attr);

    const companyDropdown = page.locator("#company_dropdown1");
    await companyDropdown.selectOption({ index: 2 });

    const valueOfDropdown = await companyDropdown.inputValue()

    console.log(valueOfDropdown)
  });

  test('Executing JavaScript code in Playwright', async ({ page }) => {
    
    const title = await page.title()

    console.log(title)

    const result = await page.evaluate(() => {
        return document.title
    })

    console.log(result)

    const href = await page.evaluate(() => {
        return document.location.href
    })

    const element = page.locator('#main_heading')

    const backgroundColor = await element.evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('color')
    })

    console.log(backgroundColor)

    const x = 10
    const y = 20

    const getResult = await page.evaluate(
        ([a, b]) => {
        return a + b
    },
    [x,y]
    )

    console.log(getResult)
  })
});
