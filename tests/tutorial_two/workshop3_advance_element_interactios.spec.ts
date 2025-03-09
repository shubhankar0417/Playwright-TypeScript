import { test, expect } from "playwright/test";

test('Advance element interactions', async ({ page }) => {
    await page.goto('file:///Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop2/index.html');
    await page.hover('button#hover-me');
    expect(await page.textContent('button#hover-me')).toContain('Text Changed!');

    await page.click('button#context-menu', { button : 'right'});
    expect(page.getByText('Context Menu Appears!')).toBeVisible();

    await page.dblclick('button#double-click');
    expect(await page.locator('img.cat-image').count()).toBe(1);
    await page.waitForTimeout(10000);
})

test('Drag and Drop', async ({ page })=> {
    await page.goto('file:///Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop2/index.html');

    // drag and drop without mouse action
    await page.dragAndDrop('.drag-source', '.drop-target');
    expect(await page.textContent('.drop-target')).toContain('Success');
    await page.waitForTimeout(10000);

    // drag and drop with mouse action
    await page.reload();
    await page.hover('.drag-source');
    await page.mouse.down();
    await page.hover('.drop-target');
    await page.mouse.up();
    expect(await page.textContent('.drop-target')).toContain('Success');
    await page.waitForTimeout(5000);

})


test('Handling iframe', async ({page}) => {
    await page.goto('file:///Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop2/index.html');
    const iframeElement = page.frame({name: 'iframeName'});
    const inputSelector = 'input#iframe-input';
    if (iframeElement) {
        await iframeElement.fill(inputSelector, 'Hello playwright');
        expect(await iframeElement.locator(inputSelector).inputValue()).toContain('Hello playwright');
    } else {
        console.log('Iframe is not available!');
    }
})