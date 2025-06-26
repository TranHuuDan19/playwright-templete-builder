import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { WebHelper } from "helper/web/webHelper";

export class DeleteAccountPage extends BasePage {
  webHelper = new WebHelper(this.page);
  readonly expect: DeleteAccountPageAssertion | undefined;

  readonly deleteTitleFieldLocator: Locator;
  readonly continueButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.expect = new DeleteAccountPageAssertion(this);

    this.deleteTitleFieldLocator = this.page.locator(
      "//b[normalize-space()='Account Deleted!']"
    );
    this.continueButtonLocator = this.page.locator(
      "//a[normalize-space()='Continue']"
    );
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("/delete_account");
  }

  async submitContinueForm(): Promise<void> {
    await this.webHelper.click(this.continueButtonLocator);
  }
}

class DeleteAccountPageAssertion {
  private readonly webHelper: WebHelper | undefined;
  constructor(readonly deleteAccountPage: DeleteAccountPage) {}

  async toBeOnDeleteAccountPage(): Promise<void> {
    await this.webHelper?.assertPageURL("/delete_account");
  }

  async toHaveDeleteAccountTitle(): Promise<void> {
    await this.webHelper?.assertPageTitle(
      "Automation Exercise - Account Created"
    );
  }
}
