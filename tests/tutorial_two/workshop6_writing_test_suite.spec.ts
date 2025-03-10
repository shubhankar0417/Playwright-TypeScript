import { test, expect } from '@playwright/test';

const testData = {
    firstName : 'John',
    lastName: 'Doe',
    address: 'Auckland',
    phone: '9898989898'
}

test.describe('User registration tests', () => {
    test.beforeEach('Open URL', async ({page}) => {
        console.log(`Running test: ${test.info().title}`);
        await page.goto('file:///Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop6/registration form.html');
    })
    test('Register with valid data', async ({page})=> {
        await page.fill('#firstName', testData.firstName);
        await page.fill('#lastName', testData.lastName);
        await page.fill('#address', testData.address);
        await page.fill('#number', testData.phone);
        await page.click('#register');

        await page.waitForTimeout(5000);

        const displayFirstName = await page.locator('#displayFirstName').textContent();
        const displayLastName = await page.locator('#displayLastName').textContent();
        const displayAddress = await page.locator('#displayAddress').textContent();
        const displayNumber = await page.locator('#displayNumber').textContent();

        expect(displayFirstName).toEqual(testData.firstName);
        expect(displayLastName).toEqual(testData.lastName);
        expect(displayAddress).toEqual(testData.address);
        expect(displayNumber).toEqual(testData.phone);
        
    })

    test('Validate error message when some fields are filled', async({page}) => {
        await page.fill('#firstName', testData.firstName);
        await page.fill('#lastName', testData.lastName);
        await page.click('#register');

        await page.waitForTimeout(5000);
        const errorMsg = await page.locator('#error p').textContent();
        expect(errorMsg).toEqual('Please fill in all fields.');
    })

    test('Validate error message without filling fields', async({page}) => {
        await page.click('#register');

        await page.waitForTimeout(2000);
        const errorMsg = await page.locator('#error p').textContent();
        expect(errorMsg).toEqual('Please fill in all fields.');
    })
})