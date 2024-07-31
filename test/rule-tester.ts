import { RuleTester, type RuleTesterConfig } from "@typescript-eslint/rule-tester";
import path from "pathe";
import * as vitest from "vitest";

RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.itSkip = vitest.it.skip;
RuleTester.describe = vitest.describe;
RuleTester.describeSkip = vitest.describe.skip;
RuleTester.afterAll = vitest.afterAll;

export function getFixturesRootDir(): string {
  return path.join(__dirname, "fixtures");
}

export const defaultLanguageOptions = {
  ecmaVersion: "latest",
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
} as const satisfies RuleTesterConfig["languageOptions"];

export const defaultLanguageOptionsWithTypes = {
  ecmaVersion: "latest",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    project: "tsconfig.json",
    // projectService: true,
    tsconfigRootDir: getFixturesRootDir(),
  },
} as const satisfies RuleTesterConfig["languageOptions"];

export const ruleTester = new RuleTester({
  languageOptions: defaultLanguageOptions,
});

export const ruleTesterWithTypes = new RuleTester({
  languageOptions: defaultLanguageOptionsWithTypes,
});
