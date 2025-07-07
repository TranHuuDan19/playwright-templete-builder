import { test } from "../fixture/testOption";
import { JsonReader } from "../utils/json/jsonReader";

test.describe("Test Case 05: Register user with existing email", () => {
  test.describe.configure({ mode: "serial" });
  //data login
  let signupUsername: string;
  let signupEmail: string;
  let signupPassword: string;

  test.beforeEach(async () => {
    //Load user credentials
    const json = new JsonReader("src/data-test/TC02_validLoginUser.json");
    const jsonData = json.readJsonFile();

    if (jsonData) {
      signupUsername = json.getJsonValue(jsonData, "username");
      signupEmail = json.getJsonValue(jsonData, "email");
      signupPassword = json.getJsonValue(jsonData, "password");
    } else {
      console.error("User data not found!");
    }
  });

  test(
    "Test Case 05: Register user with existing email",
    { tag: "@regression" },
    async ({ loginPage, signupPage, homePage }) => {
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
      await test.step("Fill username and email on login page", async () => {
        await loginPage.fillSignupFormWithValidDetails(
          signupUsername,
          signupEmail
        );
      });
      await test.step("Submit signup form on login page", async () => {
        await loginPage.submitSignupForm();
      });

      await test.step("Verify Error Exist Email Message Show", async () => {
        await signupPage.expect?.signupExistEMailErrorMessageShow();
      });
      await test.step("Verify stay on signup page", async () => {
        await signupPage.expect?.toBeOnSignupPage();
      });
    }
  );
});
