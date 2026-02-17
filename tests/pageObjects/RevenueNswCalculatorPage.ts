import { Locator, Page } from 'playwright';

export class RevenueNswCalculatorPage {
    private calculatorPageTitle: Locator;
    private passengerVehicle: Locator;
    private purchasePrice: Locator;
    private calculateButton: Locator;


    constructor(private page: Page) {
        this.calculatorPageTitle = page.locator('h1', { hasText: 'Revenue NSW calculators' });
        this.passengerVehicle = page.locator('label[for="passenger_Y"]');
        this.purchasePrice = page.locator('input#purchasePrice');
        this.calculateButton = page.getByRole('button', { name: 'Calculate' });

    }

    async verifyPageIsLoaded() {
        await this.calculatorPageTitle.waitFor({ state: 'visible', timeout: 5000 });
    }

    async clickPassengerVehicleOption() {
        await this.passengerVehicle.click();
    }

    async enterPurchasePrice(purchaseValue: string) {
        console.log(`Entering purchase price: ${purchaseValue}`);
        await this.purchasePrice.fill(purchaseValue);
    }

    async clickCalculateButton() {
        await this.calculateButton.click();
    }
}