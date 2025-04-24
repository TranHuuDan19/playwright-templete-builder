import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../page/basePage";
import { WebHelper } from "helper/web/webHelper";

export class LoginPage extends BasePage {
  webHelper = new WebHelper(this.page);
  readonly expect: LoginPageAssertion | undefined;
  readonly emailFieldLocator: Locator;
  readonly passwordFieldLocator: Locator;
  readonly loginButtonFieldLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.expect = new LoginPageAssertion(this);

    this.emailFieldLocator = this.page.locator(
      "//input[@data-qa='login-email']"
    );
    this.passwordFieldLocator = this.page.locator(
      "//input[@data-qa='login-password']"
    );
    this.loginButtonFieldLocator = this.page.locator(
      "button[data-qa='login-button']"
    );
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("/login");
  }

  async setEmail(email: string): Promise<void> {
    await this.webHelper.enterText(this.emailFieldLocator, email);
  }

  async setPassword(pass: string): Promise<void> {
    await this.webHelper.enterText(this.passwordFieldLocator, pass);
  }

  async fillFormWithValidDetails(email: string, pass: string): Promise<void> {
    await this.setEmail(email);
    await this.setPassword(pass);
  }

  async submitLoginForm(): Promise<void> {
    await this.webHelper.click(this.loginButtonFieldLocator);
  }
}

class LoginPageAssertion {
  constructor(readonly loginPage: LoginPage) {}
  async toBeOnLoginPage(): Promise<void> {
    await expect(this.loginPage.page).toHaveURL("/login");
  }

  async toHaveTitle(title: string): Promise<void> {
    await expect(this.loginPage.page).toHaveTitle(title);
  }
}
