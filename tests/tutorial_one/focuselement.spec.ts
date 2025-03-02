import { Browser, BrowserContext, expect, test, Page } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test('Chaining locators', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const page:Page = await browser.newPage();

    await page.goto('https://www.orangehrm.com/en/30-day-free-trial');

    const fullNameLocator = page.locator('input#Form_getForm_Name');
    await fullNameLocator.focus();
    await fullNameLocator.fill('Shubhankar Bhardwaj');

    await page.goto('https://www.geeksforgeeks.org/ai-ml-ds/?ref=home-articlecards');
    const cookieButton = page.locator('button.consent-btn');
    await cookieButton.focus();
    await page.waitForTimeout(4000);
    await cookieButton.click();
    await page.locator('//a[contains(text(), "World GK")]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(4000);

});