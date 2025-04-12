import { Page } from '@playwright/test';

export class Button {
    private page: Page;   // keeping the page object private so that it is used inside this class only

    constructor(page: Page) {
        this.page = page;
    }

    async clickButton(selector: string): Promise<void>{
        await this.page.click(selector);
    }
}