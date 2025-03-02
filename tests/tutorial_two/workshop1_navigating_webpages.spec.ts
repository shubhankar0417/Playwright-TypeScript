import { test } from '@playwright/test';


// declare test 
test('Basic navigation', async({page}) => { // declared default page fixtures which automatically provides page object in playwright test
    await page.goto('https://gitlab.com');
    await page.waitForTimeout(4000);
    await page.reload();
    await page.close();
})

test('Interact with elements on gitlab page', async ({page}) => {
    await page.goto('https://gitlab.com');
    await page.getByText('Want to decrease cycle times by 7x?').hover();
    await page.click('')
})