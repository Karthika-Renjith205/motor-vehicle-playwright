import { Locator, Page } from 'playwright';

export class CheckStampDutyHomePage {
    private checkOnlineButton: Locator;
    private title: Locator;

    constructor(private page: Page) {
        this.checkOnlineButton = page.locator('a', { hasText: 'Check online' });
        this.title = page.locator('#page-title');
    }

    async verifyPageIsLoaded() {
        await this.title.waitFor({ state: 'visible' });
    }

    async clickCheckOnlineButton() {
        await this.checkOnlineButton.click();
    }

}