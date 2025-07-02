import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { test } from "../fixture/pageFixture";
import { JsonReader } from "../utils/json/jsonReader";

test.describe("Test Case 02: Login User with correct email and password", () => {
  test.describe.configure({ mode: "serial" });
  //data login
  let loginUsername: string;
  let loginEmail: string;
  let loginPassword: string;

  test.beforeEach(async () => {
    //Load user credentials
    const json = new JsonReader("src/data/loginUser.json");
    const jsonData = json.readJsonFile();

    if (jsonData) {
      loginUsername = json.getJsonValue(jsonData, "username");
      loginEmail = json.getJsonValue(jsonData, "email");
      loginPassword = json.getJsonValue(jsonData, "password");
    } else {
      console.error("User data not found!");
    }
  });

  test(
    "Test Case 02: Login User with correct email and password",
    { tag: "@regression" },
    async ({ loginPage, homePage }) => {
      await homePage.navigateTo();
      await homePage.expect.toBeOnHomePage();
      await homePage.goToLoginPage();
      await loginPage.expect?.toBeOnLoginPage();
      await loginPage.fillLoginFormWithValidDetails(loginEmail, loginPassword);
      await loginPage.submitLoginForm();
      await homePage.expect.toBeOnHomePage();
      await homePage.expect.toHaveLogoutLink();
      await homePage.expect.toHaveDeleteAccountLink();
      await homePage.expect.toLoginAsUsername(loginUsername);
    }
  );
});
