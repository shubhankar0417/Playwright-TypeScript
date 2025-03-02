import { BrowserContext, test, expect, Page } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test('No incognito mode', async() => {
    const browser:BrowserContext = await chromium.launchPersistentContext('', { headless: false });
    const page:Page = await browser.newPage();

    // default behaviour code
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    expect(page.locator('xpath=//div[@id="account-register"]//ul//li//a//i[@class="fa fa-home"]')).toBeVisible();
    await page.locator('xpath=//div[@id="account-register"]//ul//li//a//i[@class="fa fa-home"]').click();
    await page.waitForTimeout(5000);
    await browser.close();

    // get pages list and use second page context
    const browser1:BrowserContext = await chromium.launchPersistentContext('', { headless: false });
    const pages = await browser1.pages();
    const page1:Page = pages[0];
    await page1.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    expect(page1.locator('xpath=//div[@id="account-register"]//ul//li//a//i[@class="fa fa-home"]')).toBeVisible();
    await page1.locator('xpath=//div[@id="account-register"]//ul//li//a//i[@class="fa fa-home"]').click();
    await page1.waitForTimeout(5000);
});