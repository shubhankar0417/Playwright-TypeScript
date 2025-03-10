import { test, Browser, BrowserContext } from "playwright/test";
import { webkit, firefox, chromium } from "playwright/test";
import users from "../../testData/workshop1/userdata.json";

test('set browser context for two users', async() => {

    // Create a browser const 
    const browser:Browser = await chromium.launch({headless: false});

    // Now create two different browser context from same browser
    const context1:BrowserContext = await browser.newContext();
    const context2:BrowserContext = await browser.newContext();

    // Now create two different page object to interact with page elements
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Login with page1 and user1
    await page1.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

    const emailId1 = page1.locator('#input-email');
    const password1 = page1.locator('#input-password');
    const loginButton1 = page1.locator("[value='Login']");

    // Perform actions by filing data into locators
    await emailId1.fill(users.user1.email);
    await password1.fill(users.user1.password);
    await loginButton1.click();

    // Login with page2 and user2
    await page2.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const emailId2 = page2.locator('#input-email');
    const password2 = page2.locator('#input-password');
    const loginButton2 = page2.locator("[value='Login']");

    // Perform actions by filing data into locators
    await emailId2.fill(users.user2.email);
    await password2.fill(users.user2.password);
    await loginButton2.click();

    // Close contexts and then browser
    await context1.close();
    await context2.close();

    await browser.close();
});