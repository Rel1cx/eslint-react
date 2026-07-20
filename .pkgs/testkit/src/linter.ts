import * as tsParser from "@typescript-eslint/parser";
import type { TSESTree } from "@typescript-eslint/types";
import { Linter, type RuleContext, type RuleListener } from "@typescript-eslint/utils/ts-eslint";

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
 * Runs `code` through a real `Linter` with an inline test rule.
 * The supplied `createVisitor` callback receives the real rule context
 * and returns the visitor that the rule should use.
 */
function runInlineRule(code: string, createVisitor: (context: TestRuleContext) => RuleListener): TestRuleContext {
  let context: TestRuleContext | null = null;
  new Linter().verify(code, {
    languageOptions: testRuleLanguageOptions,
    plugins: {
      test: {
        rules: {
          "test-rule": {
            meta: { type: "problem", messages: {}, schema: [] },
            create(ctx: unknown) {
              // tsl-ignore dx/no-unsafe-as
              context = ctx as TestRuleContext;
              return createVisitor(context);
            },
          },
        },
      },
    },
    rules: { "test/test-rule": "error" },
  });
  return context!;
}

/**
 * Runs `code` through a real `Linter` with an inline test rule and calls `fn`
 * from its `Program` listener, giving the callback a real rule context
 * (scope manager, static evaluation, ...).
 */
export function runInRule<T>(code: string, fn: (context: TestRuleContext, program: TSESTree.Program) => T): T {
  const state = { called: false };
  let fact: T | undefined;
  runInlineRule(code, (context) => ({
    Program(program: TSESTree.Program) {
      state.called = true;
      fact = fn(context, program);
    },
  }));
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
export function getNodeInRule<T extends TSESTree.Node>(code: string, visitorKey: string): { context: TestRuleContext; node: T } {
  const found: { node: T | null } = { node: null };
  const context = runInlineRule(code, () => ({
    [visitorKey](node: T) {
      found.node ??= node;
    },
  }));
  if (found.node == null) {
    throw new Error(`expected a node matching "${visitorKey}" in the code`);
  }
  return { context, node: found.node };
}

/**
 * Runs `code` through a real `Linter`, spreads the collector's own `visitor`
 * into the rule, and harvests the result via the collector's `api` on
 * `Program:exit`.
 */
export function runCollector<A, R>(
  code: string,
  getCollector: (context: TestRuleContext) => { api: A; visitor: RuleListener },
  harvest: (api: A, program: TSESTree.Program) => R,
): R {
  const state = { harvested: false };
  let program: TSESTree.Program | null = null;
  let fact: R | undefined;
  let api: A | undefined;
  runInlineRule(code, (context) => {
    const collector = getCollector(context);
    api = collector.api;
    return {
      ...collector.visitor,
      Program(node: TSESTree.Program) {
        program = node;
      },
      "Program:exit"() {
        if (program == null || api == null) return;
        state.harvested = true;
        fact = harvest(api, program);
      },
    };
  });
  if (!state.harvested) {
    throw new Error("runCollector: the harvest callback was not invoked");
  }
  // tsl-ignore dx/no-unsafe-as
  return fact as R;
}
