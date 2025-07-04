import { test } from "../fixture/testOption";
import { JsonReader } from "../utils/json/jsonReader";

test.describe("Test Case 02: Login User with correct email and password", () => {
  test.describe.configure({ mode: "serial" });
  //data login
  let loginUsername: string;
  let loginEmail: string;
  let loginPassword: string;

  test.beforeEach(async () => {
    //Load user credentials
    const json = new JsonReader("src/data-test/loginUser.json");
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
      await test.step("Verify navigated to home page", async () => {
        await homePage.expect.toBeOnHomePage();
      });
      await test.step("Verify home page show logout button", async () => {
        await homePage.expect.toHaveLogoutLink();
      });
      await test.step("Verify home page show delete account button", async () => {
        await homePage.expect.toHaveDeleteAccountLink();
      });
      await test.step("Verify user login success and correct username", async () => {
        await homePage.expect.toLoginAsUsername(loginUsername);
      });
    }
  );
});
