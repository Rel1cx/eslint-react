import * as tsParser from "@typescript-eslint/parser";
import type { TSESTree } from "@typescript-eslint/types";
import { Linter, type RuleContext, type RuleListener } from "@typescript-eslint/utils/ts-eslint";

import type { ParseCodeOptions } from "./parse";

/**
 * The rule context surface handed to unit-test harness callbacks.
 * Structurally identical to `@eslint-react/eslint`'s `RuleContext`
 * (both are `tseslint.RuleContext<string, readonly unknown[]>` and the
 * whole workspace resolves a single `@typescript-eslint/utils` instance),
 * so values of this type are assignable in both directions; any
 * `context as never` casts at call sites are unnecessary leftovers.
 */
export type TestRuleContext = RuleContext<string, readonly unknown[]>;

/**
 * Parser-facing options for the rule-channel helpers. `filePath` is passed
 * to `Linter#verify` as the filename (a `.ts` name disables TSX parsing),
 * `jsx` toggles JSX in `parserOptions`, and `sourceType` maps to
 * `parserOptions.sourceType`.
 */
export type RuleRunOptions = Pick<ParseCodeOptions, "filePath" | "jsx" | "sourceType">;

function getTestRuleLanguageOptions(options: RuleRunOptions) {
  const { jsx = true, sourceType } = options;
  return {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: { jsx },
      jsx,
      ...(sourceType == null ? {} : { sourceType }),
    },
  } as const;
}

/**
 * Runs `code` through a real `Linter` with an inline test rule.
 * The supplied `createVisitor` callback receives the real rule context
 * and returns the visitor that the rule should use.
 */
function runInlineRule(code: string, createVisitor: (context: TestRuleContext) => RuleListener, options: RuleRunOptions = {}): TestRuleContext {
  let context: TestRuleContext | null = null;
  // Flat config only applies a config entry to a filename it matches, so a
  // `files` pattern for the extension is required when a filename is passed.
  const files = options.filePath == null
    ? {}
    : { files: [`**/*${options.filePath.match(/\.[^./\\]+$/)?.[0] ?? ""}`] };
  new Linter().verify(code, {
    ...files,
    languageOptions: getTestRuleLanguageOptions(options),
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
  }, options.filePath);
  return context!;
}

/**
 * Runs `code` through a real `Linter` with an inline test rule and calls `fn`
 * from its `Program` listener, giving the callback a real rule context
 * (scope manager, static evaluation, ...).
 * @param code The source code to lint.
 * @param fn The callback invoked from the rule's `Program` listener.
 * @param options Parser options (filename, JSX, source type).
 * @returns The value returned by `fn`.
 */
export function runInRule<T>(code: string, fn: (context: TestRuleContext, program: TSESTree.Program) => T, options: RuleRunOptions = {}): T {
  const state = { called: false };
  let fact: T | undefined;
  runInlineRule(code, (context) => ({
    Program(program: TSESTree.Program) {
      state.called = true;
      fact = fn(context, program);
    },
  }), options);
  if (!state.called) {
    throw new Error("runInRule: the rule's Program listener was not invoked");
  }
  // tsl-ignore dx/no-unsafe-as
  return fact as T;
}

/**
 * Runs `code` through a real `Linter` and captures the first node visited by
 * `visitorKey` (e.g. `"JSXElement"`) together with the rule context.
 * @param code The source code to lint.
 * @param visitorKey The visitor key whose first match is captured.
 * @param options Parser options (filename, JSX, source type).
 * @returns The captured node and the rule context.
 */
export function getNodeInRule<T extends TSESTree.Node>(code: string, visitorKey: string, options: RuleRunOptions = {}): { context: TestRuleContext; node: T } {
  const found: { node: T | null } = { node: null };
  const context = runInlineRule(code, () => ({
    [visitorKey](node: T) {
      found.node ??= node;
    },
  }), options);
  if (found.node == null) {
    throw new Error(`expected a node matching "${visitorKey}" in the code`);
  }
  return { context, node: found.node };
}

/**
 * Runs `code` through a real `Linter`, spreads the collector's own `visitor`
 * into the rule, and harvests the result via the collector's `api` on
 * `Program:exit`.
 * @param code The source code to lint.
 * @param getCollector Builds the collector from the rule context.
 * @param harvest Extracts the result from the collector's api.
 * @param options Parser options (filename, JSX, source type).
 * @returns The value returned by `harvest`.
 */
export function runCollector<A, R>(
  code: string,
  getCollector: (context: TestRuleContext) => { api: A; visitor: RuleListener },
  harvest: (api: A, program: TSESTree.Program) => R,
  options: RuleRunOptions = {},
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
  }, options);
  if (!state.harvested) {
    throw new Error("runCollector: the harvest callback was not invoked");
  }
  // tsl-ignore dx/no-unsafe-as
  return fact as R;
}
