import { test } from '@playwright/test';


// declare test 
test('Basic navigation', async({page}) => { // declared default page fixtures which automatically provides page object in playwright test
    await page.goto('https://gitlab.com');
    await page.waitForTimeout(4000);
    await page.reload();
    await page.close();
})

test('Interact with elements on gitlab page', async ({page}) => {
    await page.goto('https://gitlab.com');
    await page.waitForLoadState('load');
    await page.getByRole('button', { name: 'Platform' }).hover();
    await page.getByRole('link', { name: 'Get free trial' }).nth(0).click();
    await page.locator('input#new_user_first_name').fill('John1');
    await page.locator('input#new_user_last_name').fill('Snow1');
})

test('Using various locator methods', async ({page}) => {
    await page.goto('https://gitlab.com');
    await page.waitForLoadState('load');
    // await page.getByRole('button', { name: 'Main menu' }).click();
    await page.getByLabel('Search').nth(0).click();
    await page.waitForTimeout(5000);

    await page.getByRole('textbox', {name:'Search'}).fill('abc@com');
    await page.waitForTimeout(5000);
})