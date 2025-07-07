//This file is used for extending the test fixture from @playwright/test

import { test as base } from "@playwright/test";
import { ContactUsPage } from "pom/page/contactUs";
import { CreatedAccountPage } from "pom/page/createdAccountPage";
import { DeleteAccountPage } from "pom/page/deleteAccountPage";
import { HomePage } from "pom/page/homePage";
import { LoginPage } from "pom/page/loginPage";
import { SignupPage } from "pom/page/signupPage";

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  deleteAccountPage: DeleteAccountPage;
  createdAccountPage: CreatedAccountPage;
  contactUsPage: ContactUsPage;
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
});
export { expect } from "@playwright/test";
