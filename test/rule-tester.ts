import { RuleTester, type RuleTesterConfig } from "@typescript-eslint/rule-tester";
import * as vitest from "vitest";
import { getFixturesRootDir } from "./helpers";
import { JsxEmit } from "typescript";

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
    project: false,
    projectService: false,
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

export function getProjectForJsxEmit(jsxEmit: JsxEmit) {
  switch (jsxEmit) {
    case JsxEmit.None:
    case JsxEmit.ReactJSX:
    case JsxEmit.ReactJSXDev:
      return "tsconfig.json";
    case JsxEmit.React:
      return "tsconfig.jsx-react.json";
    case JsxEmit.ReactNative:
      return "tsconfig.jsx-react-native.json";
    case JsxEmit.Preserve:
      return "tsconfig.jsx-preserve.json";
  }
}
