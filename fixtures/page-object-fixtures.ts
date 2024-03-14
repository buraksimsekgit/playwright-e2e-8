import { test as base } from '@playwright/test'
import { BasePage } from '../pages/BasePage'
import { LoginPage } from '../pages/LoginPage'
import { TodoPage } from '../pages/TodoPage'



type MyFixture = {
    basePage: BasePage
    loginPage: LoginPage
    todoPage: TodoPage
}

export const test = base.extend<MyFixture>({
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page)
        await use(basePage)
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page)
        await use(todoPage)
    }
})

export { expect } from '@playwright/test'