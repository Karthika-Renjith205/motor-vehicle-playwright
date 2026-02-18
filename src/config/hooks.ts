import { chromium, Browser, BrowserContext, Page, firefox } from "playwright";
import { Before, After } from "@cucumber/cucumber";
import { setDefaultTimeout } from '@cucumber/cucumber';

let browser: Browser;
let context: BrowserContext;
let page: Page;
setDefaultTimeout(30000);

Before(async function () {
  // this.browser = await firefox.launch({ headless: false });
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  page = await this.context.newPage();
  this.page = page;
});

After(async function (scenario) {
  await this.context?.close();
  await this.browser?.close();
});
