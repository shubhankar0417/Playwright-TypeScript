import  { test, expect } from "playwright/test";

test('Automating form submission', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    const toDo = page.getByPlaceholder('What needs to be done?');
    await toDo.fill('Task 1');
    await toDo.press('Enter');
    await page.waitForTimeout(3000);
    await toDo.fill('Task 2');
    await toDo.press('Enter');
    const firstToDo = page.getByLabel('Toggle Todo').nth(0);
    const secondToDo = page.getByLabel('Toggle Todo').nth(1);
    await firstToDo.check();
    // verify the assertion
    await expect(firstToDo).toBeChecked();
    await expect(secondToDo).not.toBeChecked();
    await page.waitForTimeout(3000);
})