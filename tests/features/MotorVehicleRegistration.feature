Feature: MotorVehicleStampDuty

@CheckMotorVehicleStampDuty
Scenario Outline: Verify motor vehicle stamp duty calculation
    Given I open the browser and load the NSW Services stamp duty verification page
    When I click the Check online button
    Then I should be navigated to the Revenue NSW calculator page
    When I select "<PassengerVehicle>" to register a passenger vehicle
    And I enter a purchase value of "<PurchasePrice>" $
    And I click the Calculate button
    Then I should see the Motor Vehicle Registration details
    And I verify the passenger vehicle is "<PassengerVehicle>" 
    And the purchase price is "<ExpectedPrice>"
    And the duty payable is "<DutyPayable>"

Examples:
| PassengerVehicle | PurchasePrice | ExpectedPrice | DutyPayable |
| Yes              | 10000         | $10,000.00    | $300.00     |
| Yes              | 25000         | $25,000.00    | $750.00     |
