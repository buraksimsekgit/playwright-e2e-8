import { test as base } from '@playwright/test'
import { TodoPage } from '../pages/TodoPage'

// Declare the types of your fixtures.
type MyFixtures = {
  todoPage: TodoPage
}

// Extend the base test to include your custom fixture.
export const test = base.extend<MyFixtures>({
  // Define the fixture name and provide the fixture function
  todoPage: async ({ page }, use) => {
    // Create the fixture instance.
    const todoPage = new TodoPage(page)

    // Setup phase: Navigate to the app and add initial todo items.
    // This setup is done before each test that uses this fixture.
    await todoPage.goto()
    await todoPage.addTodo('item1')
    await todoPage.addTodo('item2')

    // Pause the test to allow the test to perform operations.
    // The 'use' call seperates the setup and teardown phases.
    await use(todoPage)

    // Theardown phase: Remove all todo items.
    await todoPage.removeAll()

  },
})

export { expect } from '@playwright/test'
