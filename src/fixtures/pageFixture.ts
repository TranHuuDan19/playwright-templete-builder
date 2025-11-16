//This file is used for extending the test fixture from @playwright/test

import { test as base } from "@playwright/test";
import { ContactUsPage } from "pom/pages/contactUs";
import { CreatedAccountPage } from "pom/pages/createdAccountPage";
import { DeleteAccountPage } from "pom/pages/deleteAccountPage";
import { HomePage } from "pom/pages/homePage";
import LoginPage from "pom/pages/loginPage";
import { ProductDetailPage } from "pom/pages/productDetailPage";
import { ProductPage } from "pom/pages/productPage";
import { SignupPage } from "pom/pages/signupPage";
import { TestCasePage } from "pom/pages/testcasePage";

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  deleteAccountPage: DeleteAccountPage;
  createdAccountPage: CreatedAccountPage;
  contactUsPage: ContactUsPage;
  testcasePage: TestCasePage;
  productPage: ProductPage;
  productDetailPage: ProductDetailPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },

  deleteAccountPage: async ({ page }, use) => {
    await use(new DeleteAccountPage(page));
  },

  createdAccountPage: async ({ page }, use) => {
    await use(new CreatedAccountPage(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  testcasePage: async ({ page }, use) => {
    await use(new TestCasePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
});
export { expect } from "@playwright/test";
