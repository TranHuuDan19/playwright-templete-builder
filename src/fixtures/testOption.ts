//This file is used for merging all extended test fixtures
import { test as base, mergeTests } from "@playwright/test";
import { test as pageFixture } from "./pageFixture";

const test = mergeTests(pageFixture);

const expect = base.expect;
export { test, expect };
