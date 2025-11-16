import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { WebHelper } from "helpers/web/webHelper";

export default class LoginPage extends BasePage {
  webHelper = new WebHelper(this.page);
  readonly expect: LoginPageAssertion | undefined;

  //login
  readonly loginTitleFieldLocator: Locator;
  readonly loginEmailFieldLocator: Locator;
  readonly loginPasswordFieldLocator: Locator;
  readonly loginButtonFieldLocator: Locator;
  readonly loginErrorMessageLocator: Locator;

  //signup
  readonly signupTitleFieldLocator: Locator;
  readonly signupNameFieldLocator: Locator;
  readonly signupEmailFieldLocator: Locator;
  readonly signupButtonFieldLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.expect = new LoginPageAssertion(this);

    //login
    this.loginTitleFieldLocator = this.page.locator(
      "//h2[normalize-space()='Login to your account']"
    );
    this.loginEmailFieldLocator = this.page.locator(
      "//input[@data-qa='login-email']"
    );
    this.loginPasswordFieldLocator = this.page.locator(
      "//input[@data-qa='login-password']"
    );
    this.loginButtonFieldLocator = this.page.locator(
      "button[data-qa='login-button']"
    );
    this.loginErrorMessageLocator = this.page.locator(
      "//p[normalize-space()='Your email or password is incorrect!']"
    );

    //signup
    this.signupTitleFieldLocator = this.page.locator(
      "//h2[normalize-space()='New User Signup!']"
    );
    this.signupNameFieldLocator = this.page.locator(
      "//input[@placeholder='Name']"
    );
    this.signupEmailFieldLocator = this.page.locator(
      "//input[@data-qa='signup-email']"
    );
    this.signupButtonFieldLocator = this.page.locator(
      "//button[normalize-space()='Signup']"
    );
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("/login");
  }

  //login
  async fillLoginFormWithValidDetails(
    email: string,
    pass: string
  ): Promise<void> {
    await this.webHelper.enterText(this.loginEmailFieldLocator, email);
    await this.webHelper.enterText(this.loginPasswordFieldLocator, pass);
  }

  async submitLoginForm(): Promise<void> {
    await this.webHelper.click(this.loginButtonFieldLocator);
  }

  //signup
  async fillSignupFormWithValidDetails(
    name: string,
    email: string
  ): Promise<void> {
    await this.webHelper.enterText(this.signupNameFieldLocator, name);
    await this.webHelper.enterText(this.signupEmailFieldLocator, email);
  }

  async submitSignupForm(): Promise<void> {
    await this.webHelper.click(this.signupButtonFieldLocator);
  }
}

class LoginPageAssertion {
  private readonly webHelper: WebHelper | undefined;
  constructor(readonly loginPage: LoginPage) {
    this.webHelper = new WebHelper(loginPage.page);
  }

  async toBeOnLoginPage(): Promise<void> {
    await this.webHelper?.assertPageURL("/login");
  }

  async toHaveLoginTitle(): Promise<void> {
    await this.webHelper?.assertPageTitle(
      "Automation Exercise - Signup / Login"
    );
  }

  async loginErrorMessageShow(): Promise<void> {
    await this.webHelper?.assertText(
      this.loginPage.loginErrorMessageLocator,
      "Your email or password is incorrect!"
    );
  }
}
