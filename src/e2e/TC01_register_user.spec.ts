import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { test } from "../fixture/pageFixture";
import { JsonReader } from "../utils/json/jsonReader";

test.describe("Test Case 01: Register", () => {
  test.describe.configure({ mode: "serial" });

  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  //account information
  let title: string;
  let signupUsername: string;
  let signupEmail: string;
  let signupPassword: string;
  let newsLetter: boolean;
  let specialOffer: boolean;
  let day: string;
  let month: string;
  let year: string;

  //address information
  let firstName: string;
  let lastName: string;
  let street: string;
  let country: string;
  let state: string;
  let city: string;
  let zipcode: string;
  let phone: string;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();

    //Load user credentials
    const json = new JsonReader("src/data/signupUser.json");
    const jsonData = json.readJsonFile();

    if (jsonData) {
      //account information
      title = json.getJsonValue(jsonData.account, "title");
      signupUsername = json.getJsonValue(jsonData.account, "name");
      signupEmail = json.getJsonValue(jsonData.account, "email");
      signupPassword = json.getJsonValue(jsonData.account, "password");
      newsLetter = json.getJsonValue(jsonData.account, "newsletter");
      specialOffer = json.getJsonValue(jsonData.account, "specialOffer");
      day = json.getJsonValue(jsonData.account, "day");
      month = json.getJsonValue(jsonData.account, "month");
      year = json.getJsonValue(jsonData.account, "year");

      //address information
      firstName = json.getJsonValue(jsonData.address, "firstName");
      lastName = json.getJsonValue(jsonData.address, "lastName");
      street = json.getJsonValue(jsonData.address, "street");
      country = json.getJsonValue(jsonData.address, "country");
      state = json.getJsonValue(jsonData.address, "state");
      city = json.getJsonValue(jsonData.address, "city");
      zipcode = json.getJsonValue(jsonData.address, "zipcode");
      phone = json.getJsonValue(jsonData.address, "phone");
    } else {
      console.error("User data not found!");
    }
  });

  test.afterAll(async () => {
    await context.close();
    await browser.close();
  });

  test.beforeEach(async () => {
    page = await context.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test(
    "Test Case 01: Register",
    { tag: "@dev" },
    async ({ loginPage, signupPage, homePage, createdAccountPage }) => {
      await homePage.navigateTo();
      await homePage.expect.toBeOnHomePage();
      await homePage.goToLoginPage();
      await loginPage.expect?.toBeOnLoginPage();
      await loginPage.fillSignupFormWithValidDetails(
        signupUsername,
        signupEmail
      );
      await loginPage.submitSignupForm();
      await signupPage.expect?.toBeOnSignupPage();

      await signupPage.selectTitle(title);
      await signupPage.fillPassword(signupPassword);
      await signupPage.checkOnCheckbox("newsLetter", newsLetter);
      await signupPage.checkOnCheckbox("specialOffer", specialOffer);

      await signupPage.selectDate("day", day);
      await signupPage.selectDate("month", month);
      await signupPage.selectDate("year", year);

      //address
      await signupPage.fillAddressInformationDetails(
        firstName,
        lastName,
        street,
        country,
        state,
        city,
        zipcode,
        phone
      );
      await signupPage.submitCreateAccountForm();
      await createdAccountPage.expect?.toBeOnCreatedAccountPage();
      await createdAccountPage.expect?.toHaveCreatedAccountTitle();
    }
  );
});
