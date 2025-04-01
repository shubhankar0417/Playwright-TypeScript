import { test, expect } from '@playwright/test';


test('Handling alerts', async({page}) => {
    await page.goto('file:////Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop4/index.html');
    let msgText = '';
    // event listener 
    page.on('dialog', async(dialog) => {
        expect(dialog.type()).toBe('alert');
        await page.waitForTimeout(3000);
        msgText = dialog.message();
        await dialog.accept();
    })
    await page.click('#show-alert');
    await page.waitForTimeout(3000);
    expect(msgText).toEqual('This is a simple alert.');
})

test('Handling confirm on alert', async({page}) => {
    await page.goto('file:////Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop4/index.html');
    let msgText = '';
    page.on('dialog', async (dialog) => {
        msgText = dialog.message();
        console.log(msgText);
        await page.waitForTimeout(4000);
        await dialog.dismiss();
    })
    await page.click('#show-confirm');
    await page.waitForTimeout(4000);
    expect(msgText).toEqual('You clicked Cancel.');
})

test('Handling pop-ups', async({page}) => {
    await page.goto('file:////Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop4/index.html');
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('#open-popup'),
        page.waitForTimeout(3000)
    ]);
    await popup.close();
})