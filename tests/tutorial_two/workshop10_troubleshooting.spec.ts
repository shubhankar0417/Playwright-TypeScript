import { test, expect } from '@playwright/test';

test('Capture screeshot on failure', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
    const flaky = Math.random() < 0.5;
    console.log(`Flaky value :${flaky}`);
    if (flaky) {
        await page.waitForTimeout(300);
        await page.click('.no-existing-element');
    }
})