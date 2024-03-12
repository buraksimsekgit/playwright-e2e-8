import { test, expect } from '@playwright/test'
import { clickButton, clickLink } from '../../helpers/clickHelpers'
import fs from 'fs'
import path from 'path'

test.describe('Download & Upload', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/frontend')

    // await page.locator('a', { hasText: 'Html Elements'}).click()
    await clickLink(page, "File Download & Upload")
  })

  test('Download a file', async ({ page }) => {
    // Handle file download

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#file_download'),
    ])

    // We call path() method to see temporarly path location that handled by Playwright
    // const path = await download.path();
    // console.log(path);

    /**
     * Provide the correct path to save the file
     * const downloadPath = <ourPath/fileName>
     */


    // This will work with all machines in case if you get a failure
    const downloadPath = path.join('downloads', download.suggestedFilename())
    // const downloadPath = "downloads/" + download.suggestedFilename();

    // Save the file
    await download.saveAs(downloadPath)

    /**
     * using fs (file system) module to check if the file exist
     * It allows you to work with files and directories on the computer where the Node.js code is running.
     * This inlcudes like rading, writing files or creating directories, and much more
     */

    console.log(fs.existsSync(downloadPath))

    expect(fs.existsSync(downloadPath)).toBeTruthy()
  })

  test('Upload a file', async ({ page }) => {
    const uploadLink = page.locator('#file_upload')
    const uploadPath = 'downloads/SampleText.txt'

    // setInputFiles(path/path)
    await uploadLink.setInputFiles(uploadPath)
    // uploading multiple files use array of paths
    // await uploadLink.setInputFiles(['path/file', 'path/file2'])

    await clickButton(page, 'UPLOAD')

    const result = page.locator('#result')

    await expect(result).toHaveText(
      `You uploaded ${uploadPath.slice(uploadPath.lastIndexOf('/') + 1)}`
    )


    console.log(process.env.BASE_URL)
    console.log(process.env.USER_NAME)
    console.log(process.env.USER_PASSWORD)
  })
})
