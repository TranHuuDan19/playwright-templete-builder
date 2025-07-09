import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { WebHelper } from "helpers/web/webHelper";

export class TestCasePage extends BasePage {
  webHelper = new WebHelper(this.page);
  readonly expect: TestCasePageAssertion | undefined;

  constructor(page: Page) {
    super(page);
    this.expect = new TestCasePageAssertion(this);
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("/test_cases");
  }
}

class TestCasePageAssertion {
  private readonly webHelper: WebHelper | undefined;
  constructor(readonly testcasePage: TestCasePage) {
    this.webHelper = new WebHelper(testcasePage.page);
  }

  async toBeOnTestCasePage(): Promise<void> {
    await this.webHelper?.assertPageURL("/test_cases");
  }

  async toHaveTestCaseTitle(): Promise<void> {
    await this.webHelper?.assertPageTitle(
      "Automation Practice Website for UI Testing - Test Cases"
    );
  }
}
