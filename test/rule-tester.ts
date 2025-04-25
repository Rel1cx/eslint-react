import { RuleTester, type RuleTesterConfig } from "@typescript-eslint/rule-tester";
import * as vitest from "vitest";
import { getFixturesRootDir } from "./helpers";
import ts from "typescript";

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

export function getProjectForJsxEmit(jsxEmit: ts.JsxEmit) {
  switch (jsxEmit) {
    case ts.JsxEmit.None:
    case ts.JsxEmit.ReactJSX:
    case ts.JsxEmit.ReactJSXDev:
      return "tsconfig.json";
    case ts.JsxEmit.React:
      return "tsconfig.jsx-react.json";
    case ts.JsxEmit.ReactNative:
      return "tsconfig.jsx-react-native.json";
    case ts.JsxEmit.Preserve:
      return "tsconfig.jsx-preserve.json";
  }
}
