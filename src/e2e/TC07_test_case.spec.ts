import { test } from "../fixtures/testOption";

test.describe("Test Case 07: Verify Test Case Page", () => {
  test(
    "Test Case 07: Verify Test Case Page",
    { tag: "@regression" },
    async ({ testcasePage, homePage }) => {
      await test.step("Navigate to home page", async () => {
        await homePage.navigateTo();
      });
      await test.step("Verify stay on home page", async () => {
        await homePage.expect.toBeOnHomePage();
      });
      await test.step("Navigate to test case page", async () => {
        await homePage.goToTestCasePage();
      });
      await test.step("Verify stay on test case page", async () => {
        await testcasePage.expect?.toBeOnTestCasePage();
      });
    }
  );
});
