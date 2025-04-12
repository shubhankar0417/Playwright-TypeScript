import { Page } from '@playwright/test';

export abstract class AbstractPage {
    protected page: Page        // can be used within the class and the subclass

    constructor(page: Page) {
        this.page = page
    }

    abstract open(url: string): Promise<void>
}
