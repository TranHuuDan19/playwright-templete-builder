import { test, expect } from "@playwright/test";
import { JsonReader } from "../utils/json/jsonReader";

test("Go To", async ({ page }) => {
  await page.goto("/");

  // Example usage
  const json = new JsonReader("src/data/user.json");
  const jsonData = json.readJsonFile();

  if (jsonData) {
    const value = json.getJsonValue(jsonData, "name");
    console.log("Extracted Value:", value);
  } else {
    console.log("Not Found");
  }
});
