import { expect, Locator, Page } from '@playwright/test';

export class CalculationResultsPopupPage {
   private modalTitle: Locator;
   private modalBodyHeading: Locator;
   private modelCloseButton: Locator;
   private passengerRegistered: Locator;
   private purchasePrice: Locator;
   private dutyPayable: Locator;


   constructor(private page: Page) {
      this.modalTitle = page.locator('h4.modal-title');
      this.modalBodyHeading = page.locator('.modal-body h4');
      this.modelCloseButton = page.locator('.modal-footer').getByRole('button', { name: 'Close' });
      this.passengerRegistered = page.locator('td', { hasText: 'Is this registration for a passenger vehicle?' });
      this.purchasePrice = page.locator('td', { hasText: 'Purchase price or value' });
      this.dutyPayable = page.locator('td', { hasText: 'Duty payable' });
   }

   async verifyPopupIsDisplayed() {
      await expect(this.modalBodyHeading).toHaveText('Motor vehicle registration')
      await expect(this.modelCloseButton).toBeVisible();
      console.log(`Verifying the popup is present`);

   }

   async verifyPassengerVehicle(regristration: string) {
      await expect(this.passengerRegistered).toBeVisible();
      await expect(this.passengerRegistered.locator('xpath=following-sibling::td')).toHaveText(regristration);
   }

   async verifyPurchasePrice(purchasePriceValue: string) {
      await expect(this.purchasePrice).toBeVisible();
      await expect(this.purchasePrice.locator('xpath=following-sibling::td')).toHaveText(purchasePriceValue);
   }

   async verifyDutyPayable(dutyPayableValue: string) {
      console.log(`Verifying the duty payable value`);
      await expect(this.dutyPayable).toBeVisible();
      await expect(this.dutyPayable.locator('xpath=following-sibling::td')).toHaveText(dutyPayableValue);
   }
}