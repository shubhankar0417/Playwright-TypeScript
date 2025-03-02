import { Browser, BrowserContext, expect, test, Page } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test('Chaining locators', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const page:Page = await browser.newPage();

    await page.goto('https://www.orangehrm.com/en/30-day-free-trial');

    // chain multiple elements parent >> child - using selector strategy
    await page.locator('form#Form_getForm >> #Form_getForm_Name').fill('Shubhankar');
    await page.locator('form#Form_getForm >> text=Get Your Free Trial').click();
   
    // chain multiple elements using locator strategy
    const form = page.locator('form#Form_getForm');
    const button = page.getByRole('button', { name: 'Get Your Free Trial' });
    await form.locator(button).click();
    await page.waitForTimeout(5000);
    // await new Promise(()=>{});
});