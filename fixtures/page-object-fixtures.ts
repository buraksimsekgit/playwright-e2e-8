import { test as base } from '@playwright/test'
import { BasePage } from '../pages/BasePage'
import { LoginPage } from '../pages/LoginPage'
import { TodoPage } from '../pages/TodoPage'
import { WaitsPage } from '../pages/WaitsPage'
import { DynamicTablesPage } from '../pages/DynamicTablesPage'



type MyFixture = {
    basePage: BasePage
    loginPage: LoginPage
    todoPage: TodoPage
    waitsPage: WaitsPage
    dynamicTablesPage: DynamicTablesPage
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
    },
    waitsPage: async ({ page }, use) => {
        const waitsPage = new WaitsPage(page)
        await use(waitsPage)
    },
    dynamicTablesPage: async ({ page }, use) => {
        const dynamicTablesPage = new DynamicTablesPage(page)
        await use(dynamicTablesPage)
    }
})

export { expect } from '@playwright/test'