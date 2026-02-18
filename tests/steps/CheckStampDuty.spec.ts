import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CheckStampDutyHomePage } from "../pageObjects/CheckStampDutyHomePage";
import { RevenueNswCalculatorPage } from '../pageObjects/RevenueNswCalculatorPage';
import { CalculationResultsPopupPage } from '../pageObjects/CalculationResultsPopupPage';
import { config } from "../../src/config/config";

let checkStampDutyHomePage: CheckStampDutyHomePage;
let revenueNswCalculatorPage: RevenueNswCalculatorPage;
let calculaticonResultsPopup: CalculationResultsPopupPage;

Given('I open the browser and load the NSW Services stamp duty verification page', async function () {
    checkStampDutyHomePage = new CheckStampDutyHomePage(this.page);
    await this.page.goto(config.baseUrl);
    await checkStampDutyHomePage.verifyPageIsLoaded();
});

When('I click the Check online button', async function () {
    await checkStampDutyHomePage.clickCheckOnlineButton();
});

Then('I should be navigated to the Revenue NSW calculator page', async function () {
    await expect(this.page).toHaveURL(/.*calculators.*/);
});

When('I select {string} to register a passenger vehicle', async function (vehicleType: string) {
    revenueNswCalculatorPage = new RevenueNswCalculatorPage(this.page);
    if (vehicleType === 'Yes') {
        await revenueNswCalculatorPage.clickPassengerVehicleOption();
    }
});

When('I enter a purchase value of {string} $', async function (purchaseValue: string) {
    await revenueNswCalculatorPage.enterPurchasePrice(purchaseValue);
});

When('I click the Calculate button', async function () {
    await Promise.all([
        this.page.waitForSelector('h4.modal-title', { state: 'visible', timeout: 5000 }),
        revenueNswCalculatorPage.clickCalculateButton({ force: true })
    ]);

});

Then('I should see the Motor Vehicle Registration details', async function () {
    calculaticonResultsPopup = new CalculationResultsPopupPage(this.page);
    await calculaticonResultsPopup.verifyPopupIsDisplayed();

});

Then('I verify the passenger vehicle is {string}', async function (passengerVehicle: string) {
    await calculaticonResultsPopup.verifyPassengerVehicle(passengerVehicle);
});

Then('the purchase price is {string}', async function (purchasePrice: string) {
    await calculaticonResultsPopup.verifyPurchasePrice(purchasePrice);
});

Then('the duty payable is {string}', async function (dutyPayable: string) {
    await calculaticonResultsPopup.verifyDutyPayable(dutyPayable);
});



