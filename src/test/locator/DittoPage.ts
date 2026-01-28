import { Page, Locator, LocatorScreenshotOptions } from "@playwright/test";

export class DittoLocators {
  //Home page Locators
  private productCardFn: (name: string) => Locator;
  private nextBtn: Locator;
  private continueBtn: Locator;
  //Form page Locators
  private femaleOption: Locator;
  private nextStepBtn: Locator;
  private ageInput: Locator;
  private pincodeInput: Locator;
  private calculateBtn: Locator;
  //Summary Page Locator
  private basePremiumTotal: Locator;
  private unlimitedRestorationCheckBox: Locator;
  private includeBtn: Locator;
  private hospitalCashBenefitCheckBox: Locator;
  private addTopUp: Locator;
  private recommendedAddOn: Locator;
  private otherAddOn: Locator;
  private unlimitedRestorationAmt: Locator;
  private hospitalCashBenefitAmt: Locator;
  private closeBtn: Locator;
  private totalPremiun: Locator;

  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.productCardFn = (name: string) => this.page.getByText(name).nth(1);

    this.nextBtn = page.getByRole("button", { name: "Next" });
    this.continueBtn = page.getByRole("button", { name: "Continue" });
    this.femaleOption = page.getByText("Female").first();
    this.nextStepBtn = page.getByRole("button", { name: "Next step" });
    this.ageInput = page.getByRole("textbox", { name: "Your age" });
    this.pincodeInput = page.getByRole("textbox", {
      name: "Proposer's Pincode",
    });
    this.calculateBtn = page.getByRole("button", {
      name: "Calculate Premium",
    });
    this.basePremiumTotal = page.locator(
      "//span[normalize-space()='Base Premium']/following-sibling::span[1]",
    );
    this.unlimitedRestorationCheckBox = page
      .locator('input[type="checkbox"][name="Unlimited Restoration"]')
      .nth(1);
    this.hospitalCashBenefitCheckBox = page
      .locator('input[type="checkbox"][name="Hospital Cash Benefit"]')
      .nth(1);
    this.includeBtn = page.getByRole("button", { name: "Include Add-on" });
    this.addTopUp = page.locator('input[type="radio"][value="2000"]').nth(1);
    this.recommendedAddOn = page.locator(
      '//span[contains(text(),"Recommended Add-ons")]',
    );
    this.otherAddOn = page.locator(
      '(//button[contains(@id,"other-add-ons")])[2]',
    );
    this.unlimitedRestorationAmt = page
      .getByLabel("Recommended Add-ons (1/3)₹")
      .getByText("₹195.91")
      .nth(0);
    this.hospitalCashBenefitAmt = page
      .getByLabel("Other Add-ons (1/3)₹")
      .getByText("₹2,586.02")
      .nth(0);
    this.closeBtn = page.locator(".mantine-CloseButton-root svg");
    this.totalPremiun = page
      .getByText("Total Premium", { exact: true })
      .locator("..")
      .locator("span")
      .nth(1);
  }

  // getters
  getProduct(name: string): Locator {
    return this.productCardFn(name);
  }

  getNext(): Locator {
    return this.nextBtn;
  }

  getContinue(): Locator {
    return this.continueBtn;
  }

  getFemale(): Locator {
    return this.femaleOption;
  }

  getNextStep(): Locator {
    return this.nextStepBtn;
  }

  getAge(): Locator {
    return this.ageInput;
  }

  getPincode(): Locator {
    return this.pincodeInput;
  }

  getCalculate(): Locator {
    return this.calculateBtn;
  }
  getBasePremiumTotal(): Locator {
    return this.basePremiumTotal;
  }

  getUnlimitedRestorationCheckBox(): Locator {
    return this.unlimitedRestorationCheckBox;
  }

  getIncludeButton(): Locator {
    return this.includeBtn;
  }

  getHospitalCashBenefitCheckBox(): Locator {
    return this.hospitalCashBenefitCheckBox;
  }

  getAddTopUp(): Locator {
    return this.addTopUp;
  }

  getRecommendedAddOn(): Locator {
    return this.recommendedAddOn;
  }

  getOtherAddOn(): Locator {
    return this.otherAddOn;
  }

  getUnlimitedRestorationAmt(): Locator {
    return this.unlimitedRestorationAmt;
  }

  getHospitalCashBenefitAmt(): Locator {
    return this.hospitalCashBenefitAmt;
  }

  getCloseBtn(): Locator {
    return this.closeBtn;
  }

  getTotalPremium(): Locator {
    return this.totalPremiun;
  }
}
