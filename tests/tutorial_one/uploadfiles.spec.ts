import path from "path";
import { Browser, BrowserContext, expect, test, Page } from "playwright/test";
import { chromium, webkit, firefox } from "playwright/test";

test('Upload single and multiple files', async() => {
    const browser:Browser = await chromium.launch({ headless: false });
    const page:Page = await browser.newPage();

    // upload a single file and deselect it
    await page.goto('https://practice.expandtesting.com/upload');
    const filePath = path.join(__dirname, '..' ,'..', 'testData/workshop1/uploadFile1.txt');
    const chooseFileButton = page.locator('//input[@type="file"]');
    const uploadButton = page.locator('button#fileSubmit');
    await chooseFileButton.setInputFiles(filePath);
    await uploadButton.click();
    await page.waitForSelector('div#uploaded-files');
    await page.waitForTimeout(4000);
    const uploadedFileText = await page.locator('#uploaded-files p').textContent();
    console.log(`File uploaded successfully : ${uploadedFileText}`);

    // upload the buffer text as a file and press button to see the content of the file
    await page.goBack();
    await chooseFileButton.setInputFiles([]); // removes the selected file
    await chooseFileButton.setInputFiles({
        name: 'test.txt',
        mimeType: 'test/plain',
        buffer: Buffer.from('This is new text')
    });
    await page.waitForTimeout(3000);

    // go to another url and upload multiple files.
    
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    const multipleUploadButton = page.locator('input[name="filesToUpload"]');
    await multipleUploadButton.setInputFiles([
        path.join('/Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop1/uploadFiles/a.txt'),
        path.join('/Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop1/uploadFiles/b.txt')
    ]);

    // deselect some or all files
    await multipleUploadButton.setInputFiles([
        path.join('/Users/shubhankar/Desktop/Programming/Automation/Playwright-Typescript/testData/workshop1/uploadFiles/b.txt')
    ]);
    await page.waitForTimeout(3000);
    
});