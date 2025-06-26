import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { WebHelper } from "helper/web/webHelper";

export class CreatedAccountPage extends BasePage {
  webHelper = new WebHelper(this.page);
  readonly expect: CreatedAccountPageAssertion | undefined;

  readonly createdTitleFieldLocator: Locator;
  readonly continueButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.expect = new CreatedAccountPageAssertion(this);

    this.createdTitleFieldLocator = this.page.locator(
      "//b[normalize-space()='Account Created!']"
    );
    this.continueButtonLocator = this.page.locator(
      "//a[normalize-space()='Continue']"
    );
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("/account_created");
  }

  async submitContinueForm(): Promise<void> {
    await this.webHelper.click(this.continueButtonLocator);
  }
}

class CreatedAccountPageAssertion {
  private readonly webHelper: WebHelper | undefined;
  constructor(readonly createdAccountPage: CreatedAccountPage) {}

  async toBeOnCreatedAccountPage(): Promise<void> {
    await this.webHelper?.assertPageURL("/account_created");
  }

  async toHaveCreatedAccountTitle(): Promise<void> {
    await this.webHelper?.assertPageTitle(
      "Automation Exercise - Account Created"
    );
  }
}
