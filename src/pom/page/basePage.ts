import { Locator, Page } from "@playwright/test";
import { WebHelper } from "helper/web/webHelper";

export abstract class BasePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly productLink: Locator;
  readonly cartLink: Locator;
  readonly signUpLink: Locator;
  readonly deleteLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = this.page.locator("#username");
    this.productLink = this.page.locator("#password");
    this.cartLink = this.page.locator('"Login"');
    this.signUpLink = this.page.locator('"Login"');
    this.deleteLink = this.page.locator('"Login"');
    this.loginLink = this.page.locator('"Login"');
  }
}
