import { Browser, test, Locator, Page } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test('Select based drop down operation', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const page:Page = await browser.newPage();

    // go to url
    await page.goto('https://jqueryui.com/resources/demos/droppable/default.html');

    // method 1 - drag and drop
    const dragElement = page.locator('div#draggable');
    const dropElement = page.locator('div#droppable');

    await dragElement.dragTo(dropElement);
    await page.waitForTimeout(4000);

    await page.reload();

    // method 2 - drag and drop using mouse action
    await dragElement.hover();
    await page.mouse.down();
    await dropElement.hover();
    await page.mouse.up();
    await page.waitForTimeout(4000);

});