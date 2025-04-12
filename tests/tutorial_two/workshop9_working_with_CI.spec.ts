import { test, expect } from '@playwright/test';

test('Automating form submission with @githubActions', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');

    const newToDo = page.getByPlaceholder('What needs to be done?');

    // fill the names in placeholder
    await newToDo.fill('John DoE');
    await newToDo.press('Enter');
    await newToDo.fill('ABC');
    await newToDo.press('Enter');
    await page.waitForTimeout(2000);

    const firstToDo = page.getByLabel('Toggle Todo').nth(0);
    const secondToDo = page.getByLabel('Toggle Todo').nth(1);
    await firstToDo.check();
    // verify the assertion
    await expect(firstToDo).toBeChecked();
    await expect(secondToDo).not.toBeChecked();
    await page.waitForTimeout(3000);
})

test('Handling forms @githubAction', async({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
    const placeholder = '[placeholder="What needs to be done?"]';
    await page.fill(placeholder, 'John Doe');
    await page.press(placeholder, 'Enter');

    const checkbox = page.locator('.toggle');
    await checkbox.check();
    await page.waitForTimeout(2000);
})