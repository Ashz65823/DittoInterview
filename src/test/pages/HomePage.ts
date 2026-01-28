import { Page } from "@playwright/test";
import { DittoLocators } from "../locator/DittoPage";

export class HomePage {
  private locators: DittoLocators;

  constructor(page: Page) {
    this.locators = new DittoLocators(page);
  }

  async selectProduct(product: string) {
    await this.locators.getProduct(product).click();
    await this.locators.getNext().click();
    await this.locators.getNext().click();
    await this.locators.getNext().click();
    await this.locators.getContinue().click();
  }
}
