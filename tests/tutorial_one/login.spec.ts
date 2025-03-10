import { test, expect, Browser, Page } from '@playwright/test'
import { webkit, firefox, chromium } from '@playwright/test' 
import users from "../../testData/workshop1/userdata.json"

// create a test block 
test('login test', async() => {

    // Create a browser const using firefox launch method
    const browser = await firefox.launch({headless: false});

    // Create a page const using browser
    const page = await browser.newPage();

    // Go to url 
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

    // Create locators for the email username and password
    const emailId = page.locator('#input-email');
    const password = page.locator('#input-password');
    const loginButton = page.locator("[value='Login']");

    // Perform actions by filing data into locators
    await emailId.fill(users.user1.email);

    await password.fill(users.user1.password);
    await loginButton.click();

    // Capture the title and validate the value againt actual value
    const title = await page.title();
    console.log("Home page title :", title);

    // Capture the screenshot
    await page.screenshot();

    // Validate the title 
    expect(title).toEqual('My Account');

    // Close the browser 
    await browser.close();
});