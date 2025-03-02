import { assert } from "console";
import { Browser, test, Locator, Page, expect } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test('Mouse hovering and select element', async() => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    // go to url
    const page = await context.newPage();
    await page.goto('https://www.airnewzealand.co.nz');
    await page.getByText('Book').first().hover();
    await page.getByText('Book a flight').first().click();
    await page.waitForTimeout(2000);
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Air New Zealand | Flights, Hotels & Rental Cars');
    console.log(pageTitle);
    const pages = context.pages();
    const secondTab = pages[pages.length - 1];
    console.log('Closing second tab :', secondTab.url());
    await secondTab.close();
    await page.goto('https://www.bigbasket.com');
    await page.locator('//span[text()="Shop by"]').nth(-1).click();
    await page.waitForTimeout(2000);
    await page.locator('//a[text()="Fruits & Vegetables"]').nth(-1).hover();
    await page.getByText('Fresh Vegetables').hover();
    await page.getByText('Cucumber & Capsicum').click();
    const heading = page.getByRole('heading', { name: 'Cucumber & Capsicum'});
    await expect(heading).toBeVisible();
    await page.waitForTimeout(2000);

});
