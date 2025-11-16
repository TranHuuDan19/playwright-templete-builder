import { expect, test } from "../fixtures/testOption";

test.describe("Test Case 09: Search Products ", () => {
  let searchProductName: string = "dress";
  test(
    "Test Case 09: Search Products",
    { tag: "@regression" },
    async ({ productPage, homePage }) => {
      await test.step("Navigate to home page", async () => {
        await homePage.navigateTo();
      });
      await test.step("Verify stay on home page", async () => {
        await homePage.expect.toBeOnHomePage();
      });
      await test.step("Navigate to product page", async () => {
        await homePage.goToProductPage();
      });
      await test.step("Verify stay on product page", async () => {
        await productPage.expect?.toBeOnProductPage();
      });
      await test.step("Verify All Product Header on product page", async () => {
        await productPage.VerifyProductHeaderTitle("All Products");
      });
      await test.step("Input and click search button on product page", async () => {
        await productPage.inputSearchProductAndFind(searchProductName);
      });
      await test.step("Verify Searched Product Header on product page", async () => {
        await productPage.VerifyProductHeaderTitle("Searched Products");
      });
      await test.step("Verify url have the params on product page", async () => {
        await productPage.expect?.toHaveSearchParam(searchProductName);
      });
      await test.step("Verify all searched product related to search product on product page", async () => {
        await productPage.verifyAllSearchedProductRelatedToSearchProduct(
          searchProductName
        );
      });
    }
  );
});
