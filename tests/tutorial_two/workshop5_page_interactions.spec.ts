import { expect, test} from '@playwright/test';

test('Open new page and navigate back', async({context, page}) => {
    await page.goto('file://///Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop5/index.html');
    const defaultPageTitle = await page.title();
    console.log(`Default page title: ${defaultPageTitle}`); // print the title of the page.

    const pagePromise = context.waitForEvent('page'); // wait for the new page promise
    await page.click('#openNewWindow'); // click on the new page button
    
    const newPage = await pagePromise;
    await newPage.waitForLoadState(); // wait for the new page to load
    const newPageTitle = await newPage.title();
    console.log(`New page title: ${newPageTitle}`); // print the new page title
    
    const heading = await newPage.innerText('h1'); // get the inner text of the new page heading
    expect(heading).toBe('Welcome to the New Page');
    const isImgAvailable = await newPage.getByAltText('cat').isVisible(); // verify if the new page contains cat img
    expect(isImgAvailable).toBeTruthy();
    
    await newPage.close(); // close the new page 
    await page.waitForTimeout(1000);
})

test('Set cookies', async({page})=> {
    await page.goto('file://///Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop5/index.html');
    await page.click('#setCookie');
    await page.waitForTimeout(3000);
    const presentCookies = await page.context().cookies('file://///Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop5/index.html');
    const sessionCookie = presentCookies.find(cookies => cookies.name === 'session');
    console.log(`Session cookie: ${sessionCookie}`);
    expect(sessionCookie).toBeDefined();
})


test('Delete cookies', async({page}) => {
    await page.goto('file://///Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop5/index.html');
    await page.click('#setCookie');
    const cookies = await page.context().cookies();
    const sessionCookies = cookies.find(cookies => cookies.name === 'session');
    console.log(`Session cookie: ${sessionCookies}`);

    await page.click('#deleteCookie');
    const deletedCookies = await page.context().cookies();
    const deletedSessionCookies = deletedCookies.find(cookies => cookies.name === 'session');
    console.log(`Deleted session cookie: ${deletedSessionCookies}`);
    expect(deletedSessionCookies).toBeUndefined();

})