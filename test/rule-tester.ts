import tsEsLintParser from "@typescript-eslint/parser";
import { RuleTester } from "@typescript-eslint/utils/ts-eslint";
import path from "pathe";
import * as vitest from "vitest";

RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

export function getFixturesRootDir(): string {
  return path.join(__dirname, "fixtures");
}

export const defaultLanguageOptions = {
  ecmaVersion: "latest",
  parser: tsEsLintParser,
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  sourceType: "module",
} as const;

export const defaultLanguageOptionsWithTypes = {
  ecmaVersion: "latest",
  parser: tsEsLintParser,
  parserOptions: {
    ecmaFeatures: { jsx: true },
    project: "./tsconfig.json",
    tsconfigRootDir: getFixturesRootDir(),
  },
  sourceType: "module",
} as const;

export const ruleTester = new RuleTester({
  languageOptions: defaultLanguageOptions,
} as never);

export const ruleTesterWithTypes = new RuleTester({
  languageOptions: defaultLanguageOptionsWithTypes,
} as never);
