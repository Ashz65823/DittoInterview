import { expect, Page } from "@playwright/test";
import { DittoLocators } from "../locator/DittoPage";

export class SummaryPage {
  private locators: DittoLocators;

  constructor(page: Page) {
    this.locators = new DittoLocators(page);
  }

  async validatePremium() {
    const basePremiumTotalAmt = await this.getAmountValue(
      this.locators.getBasePremiumTotal(),
    );
    const unlimitedRestorationCheckBox = await this.locators
      .getUnlimitedRestorationCheckBox()
      .isVisible();
    if (!unlimitedRestorationCheckBox) {
      await this.locators.getRecommendedAddOn().click();
    }
    await this.locators
      .getUnlimitedRestorationCheckBox()
      .click({ timeout: 2000 });
    const hospitalCashBenefitVisible = await this.locators
      .getHospitalCashBenefitCheckBox()
      .isVisible();
    const locatorIs = await this.locators.getOtherAddOn().isVisible();
    if (!hospitalCashBenefitVisible && locatorIs) {
      await this.locators
        .getOtherAddOn()
        .scrollIntoViewIfNeeded({ timeout: 2000 });
      await this.locators.getOtherAddOn().click({ timeout: 2000 });
    }
    await this.locators
      .getHospitalCashBenefitCheckBox()
      .click({ timeout: 2000 });
    await this.locators.getAddTopUp().click();

    const unlimitedRestorationAmt = await this.getAmountValue(
      await this.locators.getUnlimitedRestorationAmt(),
    );
    const hospitalCashAmt = await this.getAmountValue(
      await this.locators.getHospitalCashBenefitAmt(),
    );
    let actualTotal =
      basePremiumTotalAmt + unlimitedRestorationAmt + hospitalCashAmt;
    const expectedTotal = await this.getAmountValue(
      await this.locators.getTotalPremium(),
    );
    //Validating the sum of premim which includes base premiums, riders selected in the plan and GST
    await expect(actualTotal).toEqual(expectedTotal);
  }

  async getAmountValue(locator: any) {
    const text = await locator.innerText();
    return Number(text.replace(/[₹,]/g, "").trim());
  }
}
