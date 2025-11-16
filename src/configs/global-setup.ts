import { chromium, FullConfig } from "@playwright/test";
import LoginPage from "pom/pages/loginPage";
import { JsonReader } from "utils/json/jsonReader";

async function globalSetup(config: FullConfig) {
  //Load user credentials
  const json = new JsonReader("src/data-test/TC02_validLoginUser.json");
  const jsonData = json.readJsonFile();

  if (!jsonData) {
    throw new Error("User data not found!");
  }

  let loginEmail = json.getJsonValue(jsonData, "email");
  let loginPassword = json.getJsonValue(jsonData, "password");

  //initial chromium launch
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${baseURL}/login`);
  let loginPage: LoginPage = new LoginPage(page);
  await loginPage.fillLoginFormWithValidDetails(loginEmail, loginPassword);
  await loginPage.submitLoginForm();

  //save storage state into the file specified in the config
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
