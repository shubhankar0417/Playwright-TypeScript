import test, { Browser, expect } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test('Aria role locator test', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    // use locators - heading, img, textbox, checkbox, radio
    await expect(page.getByRole('heading', { name: 'Register Account' })).toBeVisible();
    await expect(page.getByPlaceholder('First Name')).toBeVisible();
    await page.getByPlaceholder('First Name').fill('Shubhankar');
    await page.getByRole('radio', { name: 'Yes'}).click();
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Last Name must be between 1 and 32 characters!')).toBeVisible();
    await page.waitForTimeout(5000);

});