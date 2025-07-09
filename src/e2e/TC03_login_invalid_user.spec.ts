import { test } from "../fixtures/testOption";
import { JsonReader } from "../utils/json/jsonReader";

test.describe("Test Case 03: Login User with incorrect email and password", () => {
  test.describe.configure({ mode: "serial" });
  //data login
  let loginUsername: string;
  let loginEmail: string;
  let loginPassword: string;

  test.beforeEach(async () => {
    //Load user credentials
    const json = new JsonReader("src/data-test/TC03_invalidLoginUser.json");
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
    "Test Case 03: Login User with incorrect email and password",
    { tag: "@regression" },
    async ({ loginPage, homePage }) => {
      await test.step("Navigate to home page", async () => {
        await homePage.navigateTo();
      });
      await test.step("Verify stay on home page", async () => {
        await homePage.expect.toBeOnHomePage();
      });
      await test.step("Navigate to login page", async () => {
        await homePage.goToLoginPage();
      });
      await test.step("Verify stay on login page", async () => {
        await loginPage.expect?.toBeOnLoginPage();
      });
      await test.step("Fill email and password on login page", async () => {
        await loginPage.fillLoginFormWithValidDetails(
          loginEmail,
          loginPassword
        );
      });
      await test.step("Submit login form on login page", async () => {
        await loginPage.submitLoginForm();
      });
      await test.step("Verify still stay to login page", async () => {
        await loginPage.expect?.toBeOnLoginPage();
      });
      await test.step("Verify Error Login invalid Message Show", async () => {
        await loginPage.expect?.loginErrorMessageShow();
      });
    }
  );
});
