import { Browser, BrowserContext, expect, test, Page } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test.use({
    actionTimeout: 10000
});

test('Autowait timeout set for particular action', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const page:Page = await browser.newPage();

    await page.goto('https://api.cogmento.com/register/');
    await page.locator('input#ageree').check();
    await page.locator('input#ageree').uncheck();
    await page.locator('input#ageree1').check({ timeout: 5000});
})

test('Autowait timeout set for particular action as 30s', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const page:Page = await browser.newPage();

    await page.goto('https://api.cogmento.com/register/');
    await page.locator('input#ageree').check();
    await page.locator('input#ageree').uncheck();
    await page.locator('input#ageree1').check({ timeout: 30000});
})

test('Autowait timeout set for particular action as global timeout of 10s', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const page:Page = await browser.newPage();

    await page.goto('https://api.cogmento.com/register/');
    await page.locator('input#ageree').check();
    await page.locator('input#ageree').uncheck();
    await page.locator('input#ageree1').check();
})