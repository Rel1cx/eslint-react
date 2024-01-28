import { RuleTester, type RuleTesterConfig } from "@typescript-eslint/rule-tester";
import path from "pathe";
import * as vitest from "vitest";

RuleTester.afterAll = vitest.afterAll;
// if you are not using vitest with globals: true
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

export function getFixturesRootDir(): string {
  return path.join(__dirname, "fixtures");
}

export { RuleTester } from "@typescript-eslint/rule-tester";

export const defaultParserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  ecmaVersion: 2021,
  sourceType: "module",
  tsconfigRootDir: getFixturesRootDir(),
} as const satisfies RuleTesterConfig["parserOptions"];
