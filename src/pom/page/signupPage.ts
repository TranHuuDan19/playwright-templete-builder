import { WebHelper } from "helper/web/webHelper";
import { BasePage } from "./basePage";
import { expect, Locator, Page } from "@playwright/test";

export class SignupPage extends BasePage {
  webHelper = new WebHelper(this.page);
  readonly expect: SignupPageAssertion | undefined;

  //account information
  readonly signupTitleRadioLocator: Locator;
  readonly signupNameFieldLocator: Locator;
  readonly signupEmailFieldLocator: Locator;
  readonly signupPasswordFieldLocator: Locator;
  readonly signupDayFieldLocator: Locator;
  readonly signupMonthFieldLocator: Locator;
  readonly signupYearFieldLocator: Locator;
  readonly signupNewsletterCheckboxLocator: Locator;
  readonly signupSpecialOfferCheckboxLocator: Locator;

  //address information
  readonly signupFirstNameFieldLocator: Locator;
  readonly signupLastNameFieldLocator: Locator;
  readonly signupCompanyFieldLocator: Locator;
  readonly signupAddressFieldLocator: Locator;
  readonly signupCountryFieldLocator: Locator;
  readonly signupStateFieldLocator: Locator;
  readonly signupCityFieldLocator: Locator;
  readonly signupZipcodeFieldLocator: Locator;
  readonly signupPhoneFieldLocator: Locator;
  readonly signupCreateAccountButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.expect = new SignupPageAssertion(this);

    //account information
    this.signupTitleRadioLocator = this.page.locator(
      "//label[normalize-space()='Title']//parent::div"
    );
    this.signupNameFieldLocator = this.page.locator("");
    this.signupEmailFieldLocator = this.page.locator("");
    this.signupPasswordFieldLocator = this.page.locator(
      "//input[@id='password']"
    );
    this.signupDayFieldLocator = this.page.locator("//select[@id='days']");
    this.signupMonthFieldLocator = this.page.locator("//select[@id='months']");
    this.signupYearFieldLocator = this.page.locator("//select[@id='years']");
    this.signupNewsletterCheckboxLocator = this.page.locator(
      "//input[@id='newsletter']"
    );
    this.signupSpecialOfferCheckboxLocator = this.page.locator(
      "//input[@id='optin']"
    );

    //address information
    this.signupFirstNameFieldLocator = this.page.locator(
      "//input[@id='first_name']"
    );
    this.signupLastNameFieldLocator = this.page.locator(
      "//input[@id='last_name']"
    );
    this.signupCompanyFieldLocator = this.page.locator("");
    this.signupAddressFieldLocator = this.page.locator(
      "//input[@id='address1']"
    );
    this.signupCountryFieldLocator = this.page.locator(
      "//select[@id='country']"
    );
    this.signupStateFieldLocator = this.page.locator("//input[@id='state']");
    this.signupCityFieldLocator = this.page.locator("//input[@id='city']");
    this.signupZipcodeFieldLocator = this.page.locator(
      "//input[@id='zipcode']"
    );
    this.signupPhoneFieldLocator = this.page.locator(
      "//input[@id='mobile_number']"
    );
    this.signupCreateAccountButtonLocator = this.page.locator(
      "button[data-qa='create-account']"
    );
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("/signup");
  }

  //pass
  async fillPassword(pass: string): Promise<void> {
    await this.webHelper.enterText(this.signupPasswordFieldLocator, pass);
  }

  async fillAddressInformationDetails(
    firstName: string,
    lastName: string,
    address: string,
    country: string,
    state: string,
    city: string,
    zip: string,
    phone: string
  ): Promise<void> {
    await this.webHelper.enterText(this.signupFirstNameFieldLocator, firstName);
    await this.webHelper.enterText(this.signupLastNameFieldLocator, lastName);
    await this.webHelper.enterText(this.signupAddressFieldLocator, address);
    await this.webHelper.setSelectOption(
      this.signupCountryFieldLocator,
      country
    );
    await this.webHelper.enterText(this.signupStateFieldLocator, state);
    await this.webHelper.enterText(this.signupCityFieldLocator, city);
    await this.webHelper.enterText(this.signupZipcodeFieldLocator, zip);
    await this.webHelper.enterText(this.signupPhoneFieldLocator, phone);
  }

  async submitCreateAccountForm(): Promise<void> {
    await this.webHelper.click(this.signupCreateAccountButtonLocator);
  }

  async checkOnCheckbox(el: string, state: boolean): Promise<void> {
    if (el === "newsLetter") {
      await this.webHelper.setCheckBox(
        this.signupNewsletterCheckboxLocator,
        state
      );
    } else {
      await this.webHelper.setCheckBox(
        this.signupSpecialOfferCheckboxLocator,
        state
      );
    }
  }

  async selectTitle(value: string): Promise<void> {
    await this.webHelper.setRadioButton(this.signupTitleRadioLocator, value);
  }

  async selectDate(select: string, value: string): Promise<void> {
    select === "day"
      ? await this.webHelper.setSelectOption(this.signupDayFieldLocator, value)
      : select === "month"
        ? await this.webHelper.setSelectOption(
            this.signupMonthFieldLocator,
            value
          )
        : await this.webHelper.setSelectOption(
            this.signupYearFieldLocator,
            value
          );
  }
}

class SignupPageAssertion {
  private readonly webHelper: WebHelper | undefined;
  constructor(readonly signupPage: SignupPage) {
    this.webHelper = new WebHelper(signupPage.page);
  }

  async toBeOnSignupPage(): Promise<void> {
    await this.webHelper?.assertPageURL("/signup");
  }

  async toHaveSignupTitle(): Promise<void> {
    await this.webHelper?.assertPageTitle("Automation Exercise - Signup");
  }
}
