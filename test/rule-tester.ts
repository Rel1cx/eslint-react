import { RuleTester } from "@typescript-eslint/utils/ts-eslint";
import path from "pathe";
import * as vitest from "vitest";
import tsEsLintParser from "@typescript-eslint/parser";

RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

export function getFixturesRootDir(): string {
  return path.join(__dirname, "fixtures");
}

export const defaultLanguageOptions = {
  sourceType: "module",
  ecmaVersion: "latest",
  parser: tsEsLintParser,
  parserOptions: {
    tsconfigRootDir: getFixturesRootDir(),
    project: true,
    ecmaFeatures: { jsx: true },
  },
} as const;

export const ruleTester = new RuleTester({ languageOptions: defaultLanguageOptions } as never);
