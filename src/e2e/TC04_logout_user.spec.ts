import { test } from "../fixtures/testOption";
import { JsonReader } from "../utils/json/jsonReader";

test.describe("Test Case 04: Logout User", () => {
  //data login
  let loginUsername: string;
  let loginEmail: string;
  let loginPassword: string;

  test.beforeEach(async () => {
    //Load user credentials
    const json = new JsonReader("src/data-test/TC02_validLoginUser.json");
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
    "Test Case 04: Logout User",
    { tag: "@smoke" },
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
      await test.step("Verify home page show logout button", async () => {
        await homePage.expect.toHaveLogoutLink();
      });
      await test.step("Click logout button", async () => {
        await homePage.goToLogoutPage();
      });
      await test.step("Verify navigated to login page", async () => {
        await loginPage.expect?.toBeOnLoginPage();
      });
    }
  );
});
