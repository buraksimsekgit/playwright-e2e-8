import { test as base } from '@playwright/test'
import pageText from '../test-data/pageText.json'
import studentsData from '../test-data/studentsData.json'

export const test = base.extend({
  pageText: async ({}, use) => {
    await use(pageText)
  },
  studentsData: async ({}, use) => {
    await use(studentsData)
  },
})

export { expect } from '@playwright/test'
