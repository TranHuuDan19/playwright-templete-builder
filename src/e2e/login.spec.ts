import { test } from "@playwright/test";
import { JsonReader } from "../utils/json/jsonReader";
import { LoginPage } from "pom/page/loginPage";
import { HomePage } from "pom/page/homePage";

test.describe("End to End Login tests", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let email: string;
  let pass: string;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    const json = new JsonReader("src/data/user.json");
    const jsonData = json.readJsonFile();

    if (jsonData) {
      email = json.getJsonValue(jsonData, "email");
      pass = json.getJsonValue(jsonData, "password");
    } else console.log("Not Found");
  });

  test("Can Login with valid email and password", async () => {
    await loginPage.navigateTo();
    await loginPage.expect?.toBeOnLoginPage();
    await loginPage.fillFormWithValidDetails(email, pass);
    await loginPage.submitLoginForm();
    await homePage.expect.toBeOnHomePage();
  });

  test.afterEach(async ({ browser }) => {
    browser.close();
  });
});
