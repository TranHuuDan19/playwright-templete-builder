import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { WebHelper } from "helpers/web/webHelper";

export class ContactUsPage extends BasePage {
  webHelper = new WebHelper(this.page);
  readonly expect: ContactUsPageAssertion | undefined;

  //login
  readonly getInTouchHeaderLocator: Locator;
  readonly contactUsNameFieldLocator: Locator;
  readonly contactUsEmailFieldLocator: Locator;
  readonly contactUsSubjectFieldLocator: Locator;
  readonly contactUsMessageFieldLocator: Locator;
  readonly contactUsChooseFileFieldLocator: Locator;
  readonly contactUsSubmitButtonLocator: Locator;
  readonly contactUsSuccessTextLocator: Locator;
  readonly contactUsBackHomeButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.expect = new ContactUsPageAssertion(this);

    //login
    this.getInTouchHeaderLocator = this.page.locator(
      "//h2[normalize-space()='Get In Touch']"
    );
    this.contactUsNameFieldLocator = this.page.locator(
      "//input[@placeholder='Name']"
    );
    this.contactUsEmailFieldLocator = this.page.locator(
      "//input[@placeholder='Email']"
    );
    this.contactUsSubjectFieldLocator = this.page.locator(
      "//input[@placeholder='Subject']"
    );
    this.contactUsMessageFieldLocator = this.page.locator(
      "//textarea[@id='message']"
    );
    this.contactUsChooseFileFieldLocator = this.page.locator(
      "//input[@name='upload_file']"
    );
    this.contactUsSubmitButtonLocator = this.page.locator(
      "input[value='Submit']"
    );
    this.contactUsSuccessTextLocator = this.page.locator(
      "//div[@class='status alert alert-success']"
    );
    this.contactUsBackHomeButtonLocator = this.page.locator(
      "//a[@class='btn btn-success']"
    );
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("/contact_us");
  }

  //contact us form
  async fillContactFormWithValidDetails(
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<void> {
    await this.webHelper.enterText(this.contactUsNameFieldLocator, name);
    await this.webHelper.enterText(this.contactUsEmailFieldLocator, email);
    await this.webHelper.enterText(this.contactUsSubjectFieldLocator, subject);
    await this.webHelper.enterText(this.contactUsMessageFieldLocator, message);
  }

  async chooseFileToUpload(filePath: string): Promise<void> {
    await this.webHelper.uploadFile(
      filePath,
      this.contactUsChooseFileFieldLocator
    );
  }

  async acceptDialogContactUsForm(): Promise<void> {
    this.webHelper.acceptConfirmBox();
  }

  async VerifySubmitContactUsFormSuccess(): Promise<void> {
    await this.webHelper.assertText(
      this.contactUsSuccessTextLocator,
      "Success! Your details have been submitted successfully."
    );
  }

  async submitContactUsForm(): Promise<void> {
    await this.webHelper.click(this.contactUsSubmitButtonLocator);
  }
}

class ContactUsPageAssertion {
  private readonly webHelper: WebHelper | undefined;
  constructor(readonly contactUsPage: ContactUsPage) {
    this.webHelper = new WebHelper(contactUsPage.page);
  }

  async toBeOnContactUsPage(): Promise<void> {
    await this.webHelper?.assertPageURL("/contact_us");
  }

  async toHaveContactUsTitle(): Promise<void> {
    await this.webHelper?.assertPageTitle("Automation Exercise - Contact Us");
  }
}
