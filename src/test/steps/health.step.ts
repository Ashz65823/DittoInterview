import { Given, When, Then } from "@cucumber/cucumber";
import { HomePage } from "../pages/HomePage";
import { FormPage } from "../pages/FormPage";
import { SummaryPage } from "../pages/SummaryPage";
let home: HomePage;
let form: FormPage;
let premium: SummaryPage;

Given(
  "user on Ditto website selects health product {string}",
  async function (product: string) {
    home = new HomePage(this.page);
    await home.selectProduct(product);
  },
);

When("user fills Tell us about you form", async function () {
  form = new FormPage(this.page);
  await form.fillUserForm();
});

Then("user validates premium breakup", async function () {
  premium = new SummaryPage(this.page);
  await premium.validatePremium();
});
