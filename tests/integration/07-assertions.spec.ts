import { test, expect } from '@playwright/test'
import { clickLink } from '../../helpers/clickHelpers'

test.describe('Assertions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await clickLink(page, 'Html Elements')
  })

  test('Auto-retry, web-first async locator assertions', async ({ page }) => {
    const mainHeading = page.locator('#main_heading')

    // Check if element is visible
    await expect(mainHeading).toBeVisible()

    // Check if element is attached to the DOM
    await expect(mainHeading).toBeAttached()

    // Check if element have 'Html Elements' text
    await expect(mainHeading).toHaveText('Html Elements')

    // Check if element contains 'Html Elements' text
    await expect(mainHeading).toContainText('Html Elements')

    // Check if element has attribute, or attribute and its value
    await expect(mainHeading).toHaveAttribute('id')
    await expect(mainHeading).toHaveAttribute('id', 'main_heading')

    // Check the amount of element your locator returns
    await expect(mainHeading).toHaveCount(1)

    const checkbox1 = page.locator('#checkbox_1')

    await expect(checkbox1).toBeEnabled()

    await checkbox1.check()
    await expect(checkbox1).toBeChecked()

    const textInput = page.locator('#text_input1')
    await expect(textInput).toBeEmpty()

    await textInput.fill('TechGlobal')
    await expect(textInput).toHaveValue('TechGlobal')

    await expect(mainHeading).toHaveCSS('color', 'rgb(105, 105, 105)')

    const orderedList = page.locator('#ordered_list > li')

    const arr = ['Cypress', 'Playwright', 'Selenium Webdriver']

    // arr.forEach(async (el, index) => {
    //   await expect(orderedList.nth(index)).toHaveText(el);
    // });

    // for (let i = 0; i < (await orderedList.count()); i++) {
    //     await expect(orderedList.nth(i)).toHaveText(arr[i])
    // }

    await expect(orderedList).toHaveText(arr)

    // await expect(orderedList).toBeVisible()
  })

  test('Non-retry Assertions', async ({ page }) => {

    expect(true).toBe(true)

    const num = 1

    expect(num).toBe(1)

    expect(num).toBeLessThan(2)

    expect(num).toBeLessThanOrEqual(1)

    expect(num).toBeGreaterThan(0)

    expect(num).toEqual(1)

    const mainHeading = page.locator('#main_heading')
    const mainHeadingText = await mainHeading.textContent()

    expect(mainHeadingText).toBe('Html Elements')
  })

  test('Creating custom assertions', async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await clickLink(page, 'Project - Infinite Scroll')

    const articles = page.locator('.infinite-scroll-component > div')
    const articlesCount = await articles.count()

    console.log(articlesCount + ' is the count of the artciles')

    // 40th element
    await articles.last().scrollIntoViewIfNeeded()


    await expect(async () => {
        const newCount = await articles.count()
        console.log('Trying here! ' + newCount)
        expect(newCount).toBeGreaterThan(articlesCount)
    }).toPass({
        // Using 'toPass()' will force assertion to retry here for 3 seconds.
        timeout: 3000,
    })
  })

  test('Soft Assertions', async ({ page }) => {
    const mainHeading = page.locator('#main_heading')

    // Flaky assertions here - means; sometimes fails, sometimes passes. So it's inconsistent
    // await expect.soft(mainHeading).toHaveText('Html Elementsasdasdsa')

    const checkBoxGroup = await page.locator('#checkbox-button-group input').all()

    for(const check of checkBoxGroup) {
        await check.check()
        console.log('Checked')
        await expect(check).toBeChecked()
    }
  })
})
