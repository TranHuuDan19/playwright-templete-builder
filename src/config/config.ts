import * as dotenv from "dotenv";

//Load environment variables from .env
dotenv.config();

export class Config {
  static readonly BASE_URL: string = process.env.BASE_URL || "";
  static readonly WORKERS: number = parseInt(process.env.WORKERS || "1");
  static readonly RETRY_FAILED: number = parseInt(
    process.env.RETRY_FAILED || "0"
  );
  static readonly MAX_TEST_RUNTIME: number = parseInt(
    process.env.MAX_TEST_RUNTIME || "1000"
  );
  static readonly HEADLESS_BROWSER: boolean =
    process.env.HEADLESS_BROWSER === "true";
}
