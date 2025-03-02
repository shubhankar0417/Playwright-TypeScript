import { test, Browser, Page, Locator } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test('', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const page:Page = await browser.newPage();

    await page.goto('https://www.apple.com');
    const unit:Locator = page.getByTestId('iphone-16-pro');
    await unit.click();
});