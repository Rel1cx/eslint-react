import { RuleTester, type RuleTesterConfig } from "@typescript-eslint/rule-tester";
import * as vitest from "vitest";
import { getFixturesRootDir } from "./helpers";

RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.itSkip = vitest.it.skip;
RuleTester.describe = vitest.describe;
RuleTester.describeSkip = vitest.describe.skip;
RuleTester.afterAll = vitest.afterAll;

export const defaultLanguageOptions = {
  ecmaVersion: "latest",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    warnOnUnsupportedTypeScriptVersion: false,
  },
} as const satisfies RuleTesterConfig["languageOptions"];

export const defaultLanguageOptionsWithTypes = {
  ecmaVersion: "latest",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    project: "tsconfig.json",
    projectService: true,
    tsconfigRootDir: getFixturesRootDir(),
    warnOnUnsupportedTypeScriptVersion: false,
  },
} as const satisfies RuleTesterConfig["languageOptions"];

export const ruleTester = new RuleTester({
  languageOptions: defaultLanguageOptions,
});

export const ruleTesterWithTypes = new RuleTester({
  languageOptions: defaultLanguageOptionsWithTypes,
});
