import { RuleTester, type RuleTesterConfig } from "@typescript-eslint/rule-tester";
import * as vitest from "vitest";

import { type TsconfigFixtureName, tsconfigFixtures } from "./fixtures";
import { type TestLanguageOptionsInput, defineTestLanguageOptions } from "./options";

RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.itSkip = vitest.it.skip;
RuleTester.describe = vitest.describe;
RuleTester.describeSkip = vitest.describe.skip;
RuleTester.afterAll = vitest.afterAll;

/**
 * The single construction site for `RuleTester` instances. Pass
 * `types: true` for type-aware rules backed by the project service, or
 * `types: { tsconfig }` to pin a specific tsconfig (see
 * `createRuleTesterForTsconfig` for the fixture-keyed convenience).
 */
export function createRuleTester(options: TestLanguageOptionsInput = {}): RuleTester {
  return new RuleTester({
    languageOptions: defineTestLanguageOptions(options),
  });
}

/**
 * Creates a `RuleTester` pinned to a registered tsconfig fixture (e.g.
 * `"react-classic"` for the classic JSX runtime, `"preact"` for
 * `jsxImportSource: preact`).
 */
export function createRuleTesterForTsconfig(name: TsconfigFixtureName): RuleTester {
  return createRuleTester({ types: { tsconfig: tsconfigFixtures[name] } });
}

export const ruleTester = createRuleTester();

export const ruleTesterWithTypes = createRuleTester({ types: true });

export const defaultLanguageOptions: RuleTesterConfig["languageOptions"] = defineTestLanguageOptions();

export const defaultLanguageOptionsWithTypes: RuleTesterConfig["languageOptions"] = defineTestLanguageOptions({ types: true });
