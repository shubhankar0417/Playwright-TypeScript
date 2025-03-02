import { test, Browser, BrowserContext, Page } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test.only('basic authentication', async () => {
    const url = 'https://the-internet.herokuapp.com/basic_auth';
    const browser:Browser = await chromium.launch({ headless: false });
    const context:BrowserContext = await browser.newContext();
    const page:Page = await context.newPage();

    // create a username and password variable pass it to btoa method and setextra https headers in order to pass the authorisation step
    const username = 'admin';
    const password = 'admin';
    page.setExtraHTTPHeaders({ Authorization : createAuthHeader(username, password) });
    
    await page.goto(url);
    //await new Promise(() => {});
});

function createAuthHeader(username:any, password: any) {
    return 'Basic ' + btoa(username + ':' + password);
}