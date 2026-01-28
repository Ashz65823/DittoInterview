import { Page } from "@playwright/test";
import { DittoLocators } from "../locator/DittoPage";

export class FormPage {
  private locators: DittoLocators;

  constructor(page: Page) {
    this.locators = new DittoLocators(page);
  }

  async fillUserForm() {
    await this.locators.getFemale().click();
    await this.locators.getNextStep().click();
    await this.locators.getAge().fill("30");
    await this.locators.getPincode().fill("560075");
    await this.locators.getCalculate().click();
  }
}
