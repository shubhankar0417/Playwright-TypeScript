import { Browser, test, Locator, Page } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test('Select based drop down operation', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const page:Page = await browser.newPage();

    // go to url
    await page.goto('https://www.magupdate.co.uk/magazine-subscription/phrr');

    // select country by value, label and index
    const country:Locator = page.locator('select#Contact_CountryCode');
    await country.scrollIntoViewIfNeeded();
    await country.selectOption({ value: 'AG' }); // select by value attribute
    await page.waitForTimeout(5000);
    await country.selectOption({ index: 100 }); // select by index
    await page.waitForTimeout(5000);
    await country.selectOption({ label: 'Australia' }); // select by label

    // get the count of countries
    const allCountries = await page.$$('select#Contact_CountryCode' + '> option');
    console.log(`Total countries: ${allCountries.length}`);

    // run for loop and break the loop at india
    for( const c of allCountries){
        const countryName = await c.textContent();
        if ( countryName === 'India' ) {
            console.log(`Country Name: ${countryName}`);
            await country.selectOption({ label: countryName });
            break;
        }
    }
    await page.waitForTimeout(5000);

});