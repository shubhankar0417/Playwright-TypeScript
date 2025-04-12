import { test, expect } from '@playwright/test';
import { PageObject } from './pages/Page';
import * as testData from './data/testData.json';

test.describe('Implementing POM design pattern', ()=> {
    let pageObject : PageObject;        // declare pageObject object for class PageObject and page the browser page instace to it

    test.beforeEach('Run before each test', async ({ browser }) => {
        const page = await browser.newPage();
        pageObject = new PageObject(page);    // passing page instance of new browser and passing it to PageObject class
        await pageObject.open('file:////Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop7/index.html');
    })

    test('Task 1: Fill all inputs', async() => {
        await pageObject.fillFirstName('John');
        await pageObject.fillAge('30');
        await pageObject.clickIsStudent();
        await pageObject.wait(5000);
        await pageObject.applyData();
        expect(await pageObject.text(pageObject.displayFirstName)).toBe('John');
        expect(await pageObject.text(pageObject.displayAge )).toBe('30');
        expect(await pageObject.text(pageObject.displayIsStudent)).toBe('Yes');
    })

    for(const data of Object.values(testData)) {
        if(data.testName === "Test 1 - Fill Input" || data.testName === "Test 1 - Negative Input") {
            test.only(data.testName, async ({ }) => {
                await pageObject.fillFirstName(data.firstName);
                await pageObject.fillAge(data.age);
                if (data.isStudent) {
                    await pageObject.clickIsStudent();
                }
                await pageObject.applyData();
                await pageObject.wait(5000);
                expect(await pageObject.text(pageObject.displayFirstName)).toBe(data.expectedFirstName);
                expect(await pageObject.text(pageObject.displayAge )).toBe(data.expectedAge);
                expect(await pageObject.text(pageObject.displayIsStudent)).toBe(data.expectedIsStudent);

            })
        }
    }
})
    