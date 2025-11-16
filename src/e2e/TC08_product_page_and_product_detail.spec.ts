import { ProductItemInfo } from "types/product.types";
import { expect, test } from "../fixtures/testOption";

test.describe("Test Case 08: Verify All Products and product detail page", () => {
  test(
    "Test Case 08: Verify All Products and product detail page",
    { tag: "@regression" },
    async ({ productPage, productDetailPage, homePage }) => {
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

      await test.step("Get product info on product page, go product detail page and compare value", async () => {
        const listInfo = await productPage.getProductItemInfoByIndex(1);
        await productPage.clickActionCustomOnProductItemWithIndex(
          1,
          "View Product"
        );
        const detailInfo = await productDetailPage.getProductDetailItemInfo();
        expect(detailInfo.name).toBe(listInfo.name);
        expect(detailInfo.image).toContain(listInfo.image.split("/").pop()!);
        if (listInfo.shortDescription) {
          expect(detailInfo.shortDescription).toContain(
            listInfo.shortDescription
          );
        }
      });
    }
  );
});
