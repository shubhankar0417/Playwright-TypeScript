import { Page } from '@playwright/test';

export class Input {
    private page: Page;   // keeping the page object private so that it is used inside this class only

    constructor(page: Page) {
        this.page = page;
    }

    async setInputValue(selector: string, value: string): Promise<void>{
        await this.page.fill(selector, value);
    }
}