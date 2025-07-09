import * as dotenv from "dotenv";

//select env
switch (process.env.NODE_ENV) {
  case "dev": {
    dotenv.config({
      path: "./environments/dev.env",
    });
    break;
  }
  case "prod": {
    dotenv.config({
      path: "./environments/prod.env",
    });
    break;
  }
  default:
    break;
}

//Load environment variables from .env
dotenv.config();

export class Config {
  static readonly BASE_URL: string = process.env.BASE_URL || "";
  static readonly WORKERS: number = parseInt(process.env.WORKERS || "1");
  static readonly RETRY_FAILED: number = parseInt(
    process.env.RETRY_FAILED || "1"
  );
  static readonly MAX_TEST_RUNTIME: number = parseInt(
    process.env.MAX_TEST_RUNTIME || "500"
  );
  static readonly HEADLESS_BROWSER: boolean =
    process.env.HEADLESS_BROWSER === "true";
}
