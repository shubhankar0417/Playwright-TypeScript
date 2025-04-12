import { Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage'; // importing abstract methods from class 
import { Input } from './Input';
import { Button } from './Button';

export class PageObject extends AbstractPage {

    private button: Button;
    private input: Input;

    // declare the selectors here
    readonly firstNameInputSelector = '#firstName';
    readonly ageInputSelector = '#age';
    readonly isStudentCheckboxSelector = '#isStudent';
    readonly applyDataButtonSelector = '#applyData';
    readonly displayFirstName = '#displayFirstName';
    readonly displayAge = '#displayAge';
    readonly displayIsStudent = '#displayIsStudent';

    constructor(page: Page) {
        super(page);
        this.button = new Button(page);
        this.input = new Input(page);
    }

    async open(url: string): Promise<void> {  // implementing in the 
        await this.page.goto(url);  
    }

    async applyData(): Promise<void>{
        await this.button.clickButton(this.applyDataButtonSelector);
    }

    async fillFirstName(value: string): Promise<void> {
        await this.input.setInputValue(this.firstNameInputSelector, value);
    }

    async fillAge(value: string): Promise<void> {
        await this.input.setInputValue(this.ageInputSelector, value);
    }

    async clickIsStudent(): Promise<void> {
        await this.page.check(this.isStudentCheckboxSelector);
    }

    async text(selector: string): Promise<string | null> {
        const textContext = this.page.textContent(selector);
        return textContext ?? null;
    }

    async wait(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }
}
