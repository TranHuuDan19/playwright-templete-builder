import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../page/basePage";

export class HomePage extends BasePage {
  readonly expect: HomePageAssertions;
  readonly productLinkLocator: Locator;
  readonly cartLinkLocator: Locator;
  readonly signUpLinkLocator: Locator;
  readonly deleteLinkLocator: Locator;
  readonly loginLinkLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.expect = new HomePageAssertions(this);
    this.productLinkLocator = this.page.locator("#password");
    this.cartLinkLocator = this.page.locator('"Login"');
    this.signUpLinkLocator = this.page.locator("a[href='/login']");
    this.deleteLinkLocator = this.page.locator('"Login"');
    this.loginLinkLocator = this.page.locator("a[href='/login']");
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("/");
  }
  async goToProduct(): Promise<void> {
    await this.productLinkLocator.click();
  }
  async goToCart(): Promise<void> {
    await this.cartLinkLocator.click();
  }
  async goToSignUp(): Promise<void> {
    await this.signUpLinkLocator.click();
  }
  async goToDeleteAccount(): Promise<void> {
    await this.deleteLinkLocator.click();
  }
  async goToLogin(): Promise<void> {
    await this.loginLinkLocator.click();
  }
}

class HomePageAssertions {
  constructor(readonly homePage: HomePage) {}

  async toBeOnHomePage(): Promise<void> {
    await expect(this.homePage.page).toHaveURL("/");
  }
}
