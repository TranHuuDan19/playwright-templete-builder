import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { test } from "../fixture/pageFixture";
import { JsonReader } from "../utils/json/jsonReader";

test.describe("End to End Login tests", () => {
  test.describe.configure({ mode: "serial" });

  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let email: string;
  let pass: string;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();

    // Load user credentials
    const json = new JsonReader("src/data/user.json");
    const jsonData = json.readJsonFile();

    if (jsonData) {
      email = json.getJsonValue(jsonData, "email");
      pass = json.getJsonValue(jsonData, "password");
    } else {
      console.error("User data not found.");
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

  test("Can Login with valid email and password", async ({
    loginPage,
    homePage,
  }) => {
    await loginPage.navigateTo();
    await loginPage.expect?.toBeOnLoginPage();
    await loginPage.fillFormWithValidDetails(email, pass);
    await loginPage.submitLoginForm();
    await homePage.expect.toBeOnHomePage();
  });

  test("Can't Login with invalid email and password", async ({ loginPage }) => {
    await loginPage.navigateTo();
    await loginPage.expect?.toBeOnLoginPage();
    await loginPage.fillFormWithValidDetails("email@gmail.com", "pass");
    await loginPage.submitLoginForm();
    await loginPage.expect?.errorMessageShow();
  });
});
