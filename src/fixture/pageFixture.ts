import { test as base } from "@playwright/test";
import { HomePage } from "pom/page/homePage";
import { LoginPage } from "pom/page/loginPage";

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
export { expect } from "@playwright/test";
