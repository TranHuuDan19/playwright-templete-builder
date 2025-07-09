import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { WebHelper } from "helpers/web/webHelper";
import type { ProductItemInfo } from "../../types/product.types";

export class ProductDetailPage extends BasePage {
  webHelper = new WebHelper(this.page);
  readonly expect: ProductDetailPageAssertion | undefined;

  //product detail
  readonly singleProductDetailItem: Locator;

  constructor(page: Page) {
    super(page);
    this.expect = new ProductDetailPageAssertion(this);

    //product detail
    this.singleProductDetailItem = this.page.locator(
      "//div[@class='product-details']"
    );
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("/product_details");
  }

  async getProductDetailItemInfo(): Promise<ProductItemInfo> {
    const image =
      (await this.singleProductDetailItem
        .locator("img")
        .first()
        .getAttribute("src")) ?? "";
    const name = (
      await this.singleProductDetailItem
        .locator("span")
        .locator("span")
        .innerText()
    ).trim();

    let shortDescription = "";
    try {
      shortDescription = (
        await this.singleProductDetailItem
          .locator("div.product-information")
          .locator("h2")
          .innerText()
      ).trim();
    } catch {}
    return { image, name, shortDescription };
  }
}

class ProductDetailPageAssertion {
  private readonly webHelper: WebHelper | undefined;
  constructor(readonly productPage: ProductDetailPage) {
    this.webHelper = new WebHelper(productPage.page);
  }

  async toBeOnProductDetailPage(): Promise<void> {
    await this.webHelper?.assertPageURL("/product_details");
  }

  async toHaveProductDetailTitle(): Promise<void> {
    await this.webHelper?.assertPageTitle(
      "Automation Exercise - Product Details"
    );
  }
}
