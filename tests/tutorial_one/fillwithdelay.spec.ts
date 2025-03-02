import { Browser, test, Locator, Page } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test('Select based drop down operation', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const page:Page = await browser.newPage();

    // go to url
    await page.goto('https://flipkart.com');
    await page.getByPlaceholder('Search for Products, Brands and More').pressSequentially('Macbook pro M4', {delay: 500});
    await page.waitForTimeout(5000);
});