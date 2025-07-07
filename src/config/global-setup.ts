import { chromium, FullConfig } from "@playwright/test";
import fs from "fs";
import generateUserInformation from "../utils/generateTestData/signupUser";

async function globalSetup(config: FullConfig) {
  //generate user test data
  fs.writeFileSync(
    "src/data-test/TC01_signupUser.json",
    JSON.stringify(generateUserInformation(), null, 2)
  );

  //config browser
  const { baseURL, storageState } = config.projects[0].use;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL!);
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
