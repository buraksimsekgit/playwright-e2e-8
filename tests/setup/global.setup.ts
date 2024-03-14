import { test as setup, expect, chromium } from '@playwright/test'

// async function globalSetup() {

//     const browser = await chromium.launch({ headless: false })
//     const context = await browser.newContext()
//     const page = await context.newPage()

//     await page.goto('https://demoblaze.com/')

//     await page.getByRole('link', { name: 'Log in' }).click()
//     await page.locator('#loginusername').fill('test')
//     await page.locator('#loginpassword').fill('test')
//     await page.getByRole('button', { name: 'Log in' }).click()
//     await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible()
  
//     await page.context().storageState({ path: './user-data/authorization.json' })
//     console.log('THE STATE IS SAVED!')

//     await page.close()
// }

setup('do login', async({ page }) => {

    await page.goto('https://demoblaze.com/')

    await page.getByRole('link', { name: 'Log in' }).click()
    await page.locator('#loginusername').fill('test')
    await page.locator('#loginpassword').fill('test')
    await page.getByRole('button', { name: 'Log in' }).click()
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible()
  
    await page.context().storageState({ path: './user-data/loginAuth.json' })
    console.log('THE STATE IS SAVED!')
})



// export default globalSetup;