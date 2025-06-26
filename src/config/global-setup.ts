import { chromium, FullConfig } from "@playwright/test";
import fs from "fs";
import GenerateUsers from "../utils/generateData/signupUser";

async function globalSetup(config: FullConfig) {
  //generate data
  const data = GenerateUsers();
  fs.writeFileSync("src/data/signupUser.json", JSON.stringify(data, null, 2));

  //config browser
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL!);
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
