import { test, Browser, expect, Page, Locator } from "playwright/test";
import { webkit, chromium, firefox } from "playwright/test";

test('Basic locators in playwright', async() => {
    const url = 'https://naveenautomationlabs.com/opencart/index.php?route=account/register';
    const browser:Browser = await chromium.launch({ headless: false });
    const page:Page = await browser.newPage();
    await page.goto(url);

    // 1. ID
    const firstName:Locator = page.locator('id=input-firstname');
    const lastName:Locator = page.locator('id=input-lastname');

    await firstName.fill('Test');
    await lastName.fill('User');

    // 2. Class
    const image:Locator = page.locator('.img-responsive');
    const imageVisible = await image.isVisible();
    console.log(imageVisible);

    // 3. Text
    const heading:Locator = page.locator('text=Register Account');
    const headingVisible = await heading.isVisible();
    console.log(headingVisible);

    // 4. CSS
    const email:Locator = page.locator('css=input#input-email');
    const telephone:Locator = page.locator('css=input[placeholder="Telephone"]');
    const password:Locator = page.locator('css=input[name="password"]');
    
    await email.fill('Test-User@gmail.com');
    await telephone.fill('888888888');
    await password.fill('Test@123');

    // 5. Xpath
    const checkbox:Locator = page.locator('xpath=//input[@type="checkbox" and @name="agree"]');
    await checkbox.click();

    //await new Promise(() => {}); 
});