import { test, expect } from '@playwright/test';

test.describe('Typescript varibales and types', async() => {
    const selectors = {
        firstName: '#firstName',
        age: '#age',
        student: '#isStudent'
    }
    test('Typescript variables and their types working', async({page})=> {
        await page.goto('file:////Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop7/index.html')
        let firstname: string = 'Shubhankar';
        let age: number = 30;
        let isStudent: boolean = false; 
        
        // perform actions on the webpage and verify assertions
        await page.fill(selectors.firstName, firstname);
        await page.fill(selectors.age, age.toString());
        await page.check(selectors.student);
        expect(await page.isChecked(selectors.student)).not.toBe(isStudent);
        await page.waitForTimeout(2000);
    })

    test('Type definition and interfaces', async({page}) => {
        type User = {
            firstName: string,
            age: number,
            student: boolean
        }

        let user: User = {
            firstName: 'Shubh',
            age: 30,
            student: true
        }
        await page.goto('file:////Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop7/index.html')
        
        // perform actions on the webpage and verify assertions
        await page.fill(selectors.firstName, user.firstName);
        await page.fill(selectors.age, user.age.toString());
        await page.check(selectors.student);
        expect(await page.isChecked(selectors.student)).toBe(user.student);
        await page.waitForTimeout(2000);
    })
})