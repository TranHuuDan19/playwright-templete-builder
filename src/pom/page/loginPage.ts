import { Page, Locator } from "@playwright/test";
import { BasePage } from "../page/basePage";
import { WebHelper } from "helper/web/webHelper";

export class LoginPage extends BasePage {
  webHelper = new WebHelper(this.page);
  readonly usernameFieldLocator: Locator;
  readonly passwordFieldLocator: Locator;
  readonly submitButtonFieldLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameFieldLocator = this.page.locator("#username");
    this.passwordFieldLocator = this.page.locator("#password");
    this.submitButtonFieldLocator = this.page.locator('"Login"');
  }

  async setUsername(data: string): Promise<void> {
    await this.webHelper.enterText(this.usernameFieldLocator, "name");
  }

  async setPassword(data: string): Promise<void> {
    await this.webHelper.enterText(this.passwordFieldLocator, "pass");
  }

  async fillFormWithValidDetails(): Promise<void> {
    await this.webHelper.enterText(this.usernameFieldLocator, "name");
    await this.webHelper.enterText(this.passwordFieldLocator, "pass");
  }

  async submitForm(): Promise<void> {
    await this.webHelper.click(this.submitButtonFieldLocator);
  }
}
