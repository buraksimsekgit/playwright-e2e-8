import { test, expect } from "../../fixtures/todo-fixtures";

test.describe('todo test', async () => {

    test('should add an item', async ({ todoPage, page }) => {
        await todoPage.addTodo('My Item')
        await todoPage.addTodo('Nice Item')

        await expect(page.locator('.mr-auto')).toContainText(['Nice Item'])
    })

    test('should remove an item', async ({ todoPage }) => {
        await todoPage.remove('item1')
    })
})