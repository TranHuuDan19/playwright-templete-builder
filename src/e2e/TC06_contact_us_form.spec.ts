import { JsonReader } from "utils/json/jsonReader";
import { test } from "../fixtures/testOption";

test.describe("Test Case 06: Contact Us Form", () => {
  //contact us data
  let contactUsName: string;
  let contactUsEmail: string;
  let contactUsSubject: string;
  let contactUsMessage: string;
  let filePath: string;

  test.beforeEach(async () => {
    //Load contact us form data
    const json = new JsonReader("src/data-test/TC06_contactUsForm.json");
    const jsonData = json.readJsonFile();

    if (jsonData) {
      contactUsName = json.getJsonValue(jsonData, "contactUsName");
      contactUsEmail = json.getJsonValue(jsonData, "contactUsEmail");
      contactUsSubject = json.getJsonValue(jsonData, "contactUsSubject");
      contactUsMessage = json.getJsonValue(jsonData, "contactUsMessage");
      filePath = json.getJsonValue(jsonData, "filePath");
    } else {
      console.error("User data not found!");
    }
  });

  test(
    "Test Case 06: Contact Us Form",
    { tag: "@regression" },
    async ({ contactUsPage, homePage }) => {
      await test.step("Navigate to home page", async () => {
        await homePage.navigateTo();
      });
      await test.step("Verify stay on home page", async () => {
        await homePage.expect.toBeOnHomePage();
      });
      await test.step("Navigate to contact us page", async () => {
        await homePage.goToContactUsPage();
      });
      await test.step("Verify stay on contact us page", async () => {
        await contactUsPage.expect?.toBeOnContactUsPage();
      });

      await test.step("Fill all require fields on contact us form", async () => {
        await contactUsPage.fillContactFormWithValidDetails(
          contactUsName,
          contactUsEmail,
          contactUsSubject,
          contactUsMessage
        );
      });
      await test.step("Upload file on contact us page", async () => {
        await contactUsPage.chooseFileToUpload(filePath);
      });
      await test.step("Accept Dialog on contact us page", async () => {
        await contactUsPage.acceptDialogContactUsForm();
      });
      await test.step("Submit form on contact us page", async () => {
        await contactUsPage.submitContactUsForm();
      });
      await test.step("Verify submit contact us form successfully", async () => {
        await contactUsPage.VerifySubmitContactUsFormSuccess();
      });
      await test.step("Verify stay on contact us page", async () => {
        await contactUsPage.expect?.toBeOnContactUsPage();
      });
    }
  );
});
