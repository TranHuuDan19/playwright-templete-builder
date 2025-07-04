import { test } from "../fixture/testOption";
import { JsonReader } from "../utils/json/jsonReader";

test.describe("Test Case 01: Register", () => {
  test.describe.configure({ mode: "serial" });

  //account information
  let title: string;
  let signupUsername: string;
  let signupEmail: string;
  let signupPassword: string;
  let day: string;
  let month: string;
  let year: string;
  let newsLetter: boolean;
  let specialOffer: boolean;

  //address information
  let firstName: string;
  let lastName: string;
  let street: string;
  let country: string;
  let state: string;
  let city: string;
  let zipcode: string;
  let phone: string;

  test.beforeEach(async () => {
    //Load user credentials
    const json = new JsonReader("src/data-test/signupUser.json");
    const jsonData = json.readJsonFile();

    if (jsonData) {
      //account information
      title = json.getJsonValue(jsonData.account, "title");
      signupUsername = json.getJsonValue(jsonData.account, "name");
      signupEmail = json.getJsonValue(jsonData.account, "email");
      signupPassword = json.getJsonValue(jsonData.account, "password");
      day = json.getJsonValue(jsonData.account, "day");
      month = json.getJsonValue(jsonData.account, "month");
      year = json.getJsonValue(jsonData.account, "year");
      newsLetter = json.getJsonValue(jsonData.account, "newsletter");
      specialOffer = json.getJsonValue(jsonData.account, "specialOffer");

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

  test(
    "Test Case 01: Register",
    { tag: "@smoke" },
    async ({ loginPage, signupPage, homePage, createdAccountPage }) => {
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
      await test.step("Verify stay on signup page", async () => {
        await signupPage.expect?.toBeOnSignupPage();
      });

      await test.step("Select title on signup page", async () => {
        await signupPage.selectTitle(title);
      });
      await test.step("Fill password on signup page", async () => {
        await signupPage.fillPassword(signupPassword);
      });

      await test.step("Select day on signup page", async () => {
        await signupPage.selectDate("day", day);
      });
      await test.step("Select month on signup page", async () => {
        await signupPage.selectDate("month", month);
      });
      await test.step("Select year on signup page", async () => {
        await signupPage.selectDate("year", year);
      });

      await test.step("Check newsletter on signup page", async () => {
        await signupPage.checkOnCheckbox("newsLetter", newsLetter);
      });
      await test.step("Check offer on signup page", async () => {
        await signupPage.checkOnCheckbox("specialOffer", specialOffer);
      });

      //address
      await test.step("Fill address information on signup page", async () => {
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
      });

      await test.step("submit signup form on signup page", async () => {
        await signupPage.submitCreateAccountForm();
      });
      await test.step("Verify stay on Created Account page", async () => {
        await createdAccountPage.expect?.toBeOnCreatedAccountPage();
      });
      await test.step("Verify correct title on Created Account page", async () => {
        await createdAccountPage.expect?.toHaveCreatedAccountTitle();
      });
    }
  );
});
