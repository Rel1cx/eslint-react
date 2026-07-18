import * as tsParser from "@typescript-eslint/parser";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { Linter } from "eslint";

/**
 * The rule context surface handed to unit-test harness callbacks.
 * Matches `@eslint-react/eslint`'s `RuleContext` without depending on it.
 */
export type TestRuleContext = RuleContext<string, readonly unknown[]>;

const testRuleLanguageOptions = {
  parser: tsParser,
  parserOptions: { ecmaFeatures: { jsx: true }, jsx: true },
} as const;

/**
 * Runs `code` through a real `Linter` with an inline test rule and calls `fn`
 * from its `Program` listener, giving the callback a real rule context
 * (scope manager, static evaluation, ...).
 */
export function runInRule<T>(code: string, fn: (context: TestRuleContext, program: TSESTree.Program) => T): T {
  const state = { called: false };
  let fact: T | undefined;
  new Linter().verify(code, {
    languageOptions: testRuleLanguageOptions,
    plugins: {
      test: {
        rules: {
          "test-rule": {
            meta: { type: "problem", messages: {}, schema: [] },
            create(context: unknown) {
              return {
                Program(program: TSESTree.Program) {
                  state.called = true;
                  // tsl-ignore dx/no-unsafe-as
                  fact = fn(context as TestRuleContext, program);
                },
              };
            },
          },
        },
      },
    },
    rules: { "test/test-rule": "error" },
  });
  if (!state.called) {
    throw new Error("runInRule: the rule's Program listener was not invoked");
  }
  // tsl-ignore dx/no-unsafe-as
  return fact as T;
}

/**
 * Runs `code` through a real `Linter` and captures the first node visited by
 * `visitorKey` (e.g. `"JSXElement"`) together with the rule context.
 */
export function getNodeInRule<T extends TSESTree.Node>(
  code: string,
  visitorKey: string,
): { context: TestRuleContext; node: T } {
  const found: { context: TestRuleContext | null; node: T | null } = { context: null, node: null };
  new Linter().verify(code, {
    languageOptions: testRuleLanguageOptions,
    plugins: {
      test: {
        rules: {
          "test-rule": {
            meta: { type: "problem", messages: {}, schema: [] },
            create(context: unknown) {
              // tsl-ignore dx/no-unsafe-as
              found.context = context as TestRuleContext;
              return {
                [visitorKey](node: T) {
                  found.node ??= node;
                },
              };
            },
          },
        },
      },
    },
    rules: { "test/test-rule": "error" },
  });
  if (found.context == null || found.node == null) {
    throw new Error(`expected a node matching "${visitorKey}" in the code`);
  }
  return { context: found.context, node: found.node };
}

/**
 * Runs `code` through a real `Linter`, spreads the collector's own `visitor`
 * into the rule, and harvests the result via the collector's `api` on
 * `Program:exit`.
 */
export function runCollector<A, R>(
  code: string,
  getCollector: (context: TestRuleContext) => { api: A; visitor: object },
  harvest: (api: A, program: TSESTree.Program) => R,
): R {
  const state = { harvested: false };
  let program: TSESTree.Program | null = null;
  let fact: R | undefined;
  new Linter().verify(code, {
    languageOptions: testRuleLanguageOptions,
    plugins: {
      test: {
        rules: {
          "test-rule": {
            meta: { type: "problem", messages: {}, schema: [] },
            create(context: unknown) {
              // tsl-ignore dx/no-unsafe-as
              const { api, visitor } = getCollector(context as TestRuleContext);
              return {
                ...visitor,
                Program(node: TSESTree.Program) {
                  program = node;
                },
                "Program:exit"() {
                  if (program == null) return;
                  state.harvested = true;
                  fact = harvest(api, program);
                },
              };
            },
          },
        },
      },
    },
    rules: { "test/test-rule": "error" },
  });
  if (!state.harvested) {
    throw new Error("runCollector: the harvest callback was not invoked");
  }
  // tsl-ignore dx/no-unsafe-as
  return fact as R;
}
