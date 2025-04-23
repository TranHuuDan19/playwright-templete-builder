import * as fs from "fs";

export class JsonReader {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  readJsonFile(): any {
    try {
      const fileContent = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error("Error reading or parsing JSON file:", error);
      return null;
    }
  }

  getJsonValue(jsonObj: any, path: string): any {
    return path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
        jsonObj
      );
  }
}
