import test, { chromium, Page } from "playwright/test";
import { Browser } from "playwright/test";


test('Different types of mouse clicks', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page:Page = await context.newPage();

    await page.goto('https://demo.guru99.com/test/simple_context_menu.html');    
    
    // double click
    await page.getByText('Double-Click Me To See Alert').dblclick();
    await page.waitForTimeout(3000);

    // right click
    await page.getByText('right click me').click({ button: "right" });
    await page.waitForTimeout(3000);

    // go to another url
    await page.goto('http://the-internet.herokuapp.com/shifting_content');

    // shift click - to open another browser page
    await page.getByText('Example 1: Menu Element').click({ modifiers: ["Shift"] });
    await page.waitForTimeout(3000);
    const pages = context.pages();
    await pages[1].close();
    await page.waitForTimeout(3000);

    // position click
    await page.goto('https://www.airnewzealand.co.nz');

    const element =  page.locator('//div[@class="pw-HeaderItem__content"]//a[@href="/help-and-contact"]').nth(0);
    const boundBox = await element.boundingBox();
    if (boundBox) {
        console.log('Bounding box :', boundBox);
        const clickX = boundBox.x + boundBox.width/2;
        const clickY = boundBox.y + boundBox.height/2;
        await page.mouse.click(clickX, clickY);
        console.log('Clicked element at position');
        await page.waitForTimeout(2000);

    } else {
        console.log('Element not found or bounding box is unavailable');
        await element.click();
    }
    
    // mouse hover
    await page.getByText('Book').first().hover();
    await page.getByText('Book a flight').first().click();
    await page.waitForTimeout(2000);

});