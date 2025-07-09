import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { WebHelper } from "helpers/web/webHelper";
import type { ProductItemInfo } from "../../types/product.types";

export class ProductPage extends BasePage {
  webHelper = new WebHelper(this.page);
  readonly expect: ProductPageAssertion | undefined;

  //search
  readonly searchProductFieldLocator: Locator;
  readonly searchProductButtonLocator: Locator;

  //product list
  readonly productListHeaderLocator: Locator;
  readonly singleProductItem: Locator;

  constructor(page: Page) {
    super(page);
    this.expect = new ProductPageAssertion(this);

    //search
    this.searchProductFieldLocator = this.page.locator(
      "//input[@id='search_product']"
    );
    this.searchProductButtonLocator = this.page.locator(
      "//button[@id='submit_search']"
    );

    //product list
    this.productListHeaderLocator = this.page.locator(".title.text-center");
    this.singleProductItem = this.page.locator(
      "(//div[@class='single-products'])"
    );

    async function getSingleProductItem(id: number): Promise<Locator> {
      return page.locator(`(//div[@class='single-products'])[${id}]`);
    }
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("/products");
  }

  async getSingleProductItemLocatorWithIndex(id: number): Promise<string> {
    return `(//div[@class='single-products'])[${id}]`;
  }
  async clickActionCustomOnProductItemWithIndex(
    index: number,
    action: string
  ): Promise<void> {
    const itemLocator = await this.getSingleProductItemLocatorWithIndex(index);
    const actionLocator =
      "(" + itemLocator + `//parent::div//a[contains(text(),'${action}')])[1]`;
    //example
    //((//div[@class='single-products'])[1]//parent::div//a[contains(text(),'View Product')])[1]

    await this.page.locator(actionLocator).click();
  }

  async getProductItemInfoByIndex(index: number): Promise<ProductItemInfo> {
    const item = await this.getSingleProductItemLocatorWithIndex(index);
    const image =
      (await this.page
        .locator(item)
        .locator("img")
        .first()
        .getAttribute("src")) ?? "";
    const name = (
      await this.page.locator(item).locator("h2").first().innerText()
    ).trim();

    let shortDescription = "";
    try {
      shortDescription = (
        await this.page.locator(item).locator("p").nth(1).innerText()
      ).trim();
    } catch {}
    return { image, name, shortDescription };
  }

  async VerifyProductHeaderTitle(title: string): Promise<void> {
    await this.webHelper.assertText(this.productListHeaderLocator, title);
  }

  //search product
  async inputSearchProductAndFind(productDes: string): Promise<void> {
    await this.webHelper.enterText(this.searchProductFieldLocator, productDes);
    await this.webHelper.click(this.searchProductButtonLocator);
  }

  async verifyAllSearchedProductRelatedToSearchProduct(
    productSearch: string
  ): Promise<void> {
    const totalSearchedResult = await this.page
      .locator("//div[@class='single-products']")
      .count();
    for (let i = 1; i <= totalSearchedResult; i++) {
      await this.clickActionCustomOnProductItemWithIndex(i, "View Product");
      let shortDescription = (
        await this.page
          .locator("//div[@class='product-details']")
          .locator("div.product-information")
          .locator("h2")
          .innerText()
      ).trim();

      let category = (
        await this.page
          .locator("//div[@class='product-details']")
          .locator("div.product-information")
          .locator("p")
          .first()
          .innerText()
      ).trim();
      const testPass =
        shortDescription.toLowerCase().includes(productSearch) ||
        category.toLowerCase().includes(productSearch);
      expect(testPass).toBeTruthy();
      await this.page.goBack();
    }
  }
}

class ProductPageAssertion {
  private readonly webHelper: WebHelper | undefined;
  constructor(readonly productPage: ProductPage) {
    this.webHelper = new WebHelper(productPage.page);
  }

  async toBeOnProductPage(): Promise<void> {
    await this.webHelper?.assertPageURL("/products");
  }

  async toHaveProductTitle(): Promise<void> {
    await this.webHelper?.assertPageTitle("Automation Exercise - All Products");
  }

  async toHaveSearchParam(param: string): Promise<void> {
    await this.webHelper?.assertPageURL(`/products?search=${param}`);
  }
}
