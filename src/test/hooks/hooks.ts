import {
  Before,
  After,
  setWorldConstructor,
  World,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import path from "path";
import fs from "fs";

const ROOT = path.resolve(__dirname, "../../../");
process.chdir(ROOT);

class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(120 * 10000);
Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.page = await this.browser.newPage();
  await this.page.goto("https://app.joinditto.in/fq");
});

After(async function (scenario) {
  try {
    if (this.page) {
      const screenshot = await this.page.screenshot({ fullPage: true });

      const dir = path.join(process.cwd(), "screenshots");
      fs.mkdirSync(dir, { recursive: true });

      const safe = scenario.pickle.name.replace(/[^\w]/g, "_");
      const filePath = path.join(dir, `${safe}_${Date.now()}.png`);
      fs.writeFileSync(filePath, screenshot);
      await this.attach(screenshot, "image/png");
    }
  } catch (e) {
    console.error("Screenshot failed:", e);
  } finally {
    if (this.page) await this.page.close().catch(() => {});
    if (this.browser) await this.browser.close().catch(() => {});
  }
});
