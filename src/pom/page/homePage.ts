import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../page/basePage";
import { WebHelper } from "helper/web/webHelper";

export class HomePage extends BasePage {
  readonly expect: HomePageAssertions;
  readonly homeLinkLocator: Locator;
  readonly productLinkLocator: Locator;
  readonly cartLinkLocator: Locator;
  readonly signUpLinkLocator: Locator;
  readonly deleteLinkLocator: Locator;
  readonly loginLinkLocator: Locator;
  readonly logoutLinkLocator: Locator;
  readonly loggedUsernameLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.expect = new HomePageAssertions(this);

    //menu bar
    this.homeLinkLocator = this.page.locator("//a[normalize-space()='Home']");
    this.productLinkLocator = this.page.locator("//a[@href='/products']");
    this.cartLinkLocator = this.page.locator("a[href='/view_cart']");
    this.signUpLinkLocator = this.page.locator("a[href='/login']");
    this.deleteLinkLocator = this.page.locator("a[href='/delete_account']");
    this.logoutLinkLocator = this.page.locator("a[href='/logout']");
    this.loginLinkLocator = this.page.locator("a[href='/login']");
    this.loggedUsernameLocator = this.page.locator(
      "//a[normalize-space()='Contact us']/parent::li/following-sibling::li"
    );
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("/");
  }
  async goToHomePage(): Promise<void> {
    await this.homeLinkLocator.click();
  }
  async goToProductPage(): Promise<void> {
    await this.productLinkLocator.click();
  }
  async goToCartPage(): Promise<void> {
    await this.cartLinkLocator.click();
  }
  async goToSignUpPage(): Promise<void> {
    await this.signUpLinkLocator.click();
  }
  async goToDeleteAccountPage(): Promise<void> {
    await this.deleteLinkLocator.click();
  }
  async goToLoginPage(): Promise<void> {
    await this.loginLinkLocator.click();
  }
  async goToLogoutPage(): Promise<void> {
    await this.logoutLinkLocator.click();
  }
}

class HomePageAssertions {
  private readonly webHelper: WebHelper | undefined;
  constructor(readonly homePage: HomePage) {
    this.webHelper = new WebHelper(homePage.page);
  }

  async toBeOnHomePage(): Promise<void> {
    this.webHelper?.assertPageURL("/");
  }

  async toHaveHomeTitle(): Promise<void> {
    await this.webHelper?.assertPageTitle("Automation Exercise");
  }

  async toHaveLogoutLink(): Promise<void> {
    await this.webHelper?.elementIsVisible(this.homePage.logoutLinkLocator);
  }

  async toHaveDeleteAccountLink(): Promise<void> {
    await this.webHelper?.elementIsVisible(this.homePage.deleteLinkLocator);
  }

  async toLoginAsUsername(target: string): Promise<void> {
    await this.webHelper?.elementContainText(
      this.homePage.loggedUsernameLocator,
      target
    );
  }
}
