import * as toolkit from "@eslint-react/core";
import type { RuleContext, RuleListener } from "@eslint-react/shared";
import type { Pretty } from "@local/eff";
import type { ESLint } from "eslint";

import { name, version } from "../package.json";

/**
 * The eslint-react toolkit type, re-exported from `@eslint-react/core`.
 * `JsxInspector` is omitted because it is an unstable API.
 */
export type Toolkit = Pretty<Omit<typeof toolkit, "JsxInspector">>;

/**
 * Definition for a custom ESLint rule powered by the eslint-react toolkit.
 */
export interface CustomRuleDefinition {
  /**
   * The name of the rule.
   * This will be used as the rule ID within the plugin (e.g. `"react-custom/my-rule"`).
   */
  name: string;
  /**
   * Factory function that receives the ESLint rule context and the eslint-react
   * toolkit, and returns a rule listener (AST visitor).
   *
   * The `toolkit` parameter provides access to all of `@eslint-react/core`,
   * including utilities like `useComponentCollector`,
   * `useHookCollector`, `isReactAPI`, and more.
   *
   * @param context - The ESLint rule context.
   * @param toolkit - The eslint-react core toolkit, providing utilities for analyzing React patterns.
   * @returns A rule listener object mapping AST node types to visitor functions.
   */
  make: (context: RuleContext, toolkit: Toolkit) => RuleListener;
}

/**
 * Define a custom ESLint plugin with rules powered by the eslint-react toolkit.
 *
 * @param rules - Array of custom rule definitions.
 * @returns An ESLint plugin object with the defined rules.
 *
 * @example
 * ```ts
 * import { definePlugin, defineRuleListener } from "eslint-plugin-react-custom";
 *
 * const plugin = definePlugin([
 *   {
 *     name: "function-component-definition",
 *     make: (context, toolkit) => {
 *       // Collect all function components detected in the file
 *       const { ctx, visitor } = toolkit.useComponentCollector(context, { hint });
 *
 *       return defineRuleListener(visitor, {
 *         "Program:exit"(program) {
 *           for (const { node } of ctx.getAllComponents(program)) {
 *             if (node.type === "ArrowFunctionExpression") continue;
 *             context.report({
 *               node,
 *               message: "Function components must be defined with arrow functions.",
 *             });
 *           }
 *         },
 *       });
 *     },
 *   },
 * ]);
 * ```
 */
export function definePlugin(rules: CustomRuleDefinition[]): ESLint.Plugin {
  const pluginRules: ESLint.Plugin["rules"] = {};
  for (const { name, make } of rules) {
    Reflect.set(pluginRules, name, {
      meta: {
        fixable: "code",
        hasSuggestions: true,
      },
      create(context: RuleContext) {
        const { JsxInspector: _, ...stableToolkit } = toolkit;
        return make(context, stableToolkit);
      },
    });
  }
  return { meta: { name, version }, rules: pluginRules };
}

/**
 * Defines a rule listener by merging multiple visitor objects
 *
 * @param base Base visitor object (target of merge)
 * @param rest Additional visitor objects to merge (one or more)
 * @returns Merged RuleListener object
 *
 * @example
 * ```typescript
 * const listener1 = { Identifier: () => console.log(1) };
 * const listener2 = { Identifier: () => console.log(2) };
 * const merged = defineRuleListener(listener1, listener2);
 * // When encountering Identifier nodes, outputs 1 then 2
 * ```
 */
export function defineRuleListener(base: RuleListener, ...rest: RuleListener[]): RuleListener {
  for (const r of rest) {
    for (const key in r) {
      const existing = base[key];
      // tsl-ignore core/strictBooleanExpressions
      base[key] = existing
        ? (...args) => {
          existing(...args);
          r[key]?.(...args);
        }
        : r[key];
    }
  }
  return base;
}

// The upstream `@typescript-eslint/utils/ts-eslint` module does not include `message` in its `ReportDescriptor` type, unlike ESLint's own type definitions which support both `message` and `messageId`, this is bad for custom rules that don't define a static `meta.messages` map.
declare module "@typescript-eslint/utils/ts-eslint" {
  export interface RuleContext<MessageIds extends string, Options extends readonly unknown[]> {
    /**
     * Report a problem with the code, using a plain `message` string instead of `messageId`.
     * This is useful for custom rules that don't define a static `meta.messages` map.
     */
    report(
      descriptor: {
        readonly data?: Readonly<Record<string, unknown>>;
        readonly fix?:
          | ((
            fixer: import("@typescript-eslint/utils/ts-eslint").RuleFixer,
          ) =>
            | IterableIterator<import("@typescript-eslint/utils/ts-eslint").RuleFix>
            | readonly import("@typescript-eslint/utils/ts-eslint").RuleFix[]
            | import("@typescript-eslint/utils/ts-eslint").RuleFix
            | null)
          | null;
        readonly loc?:
          | Readonly<import("@typescript-eslint/types").TSESTree.SourceLocation>
          | Readonly<import("@typescript-eslint/types").TSESTree.Position>;
        readonly message: string;
        readonly node: import("@typescript-eslint/types").TSESTree.Node;
        readonly suggest?:
          | readonly {
            readonly data?: Readonly<Record<string, unknown>>;
            readonly desc: string;
            readonly fix: (
              fixer: import("@typescript-eslint/utils/ts-eslint").RuleFixer,
            ) =>
              | IterableIterator<import("@typescript-eslint/utils/ts-eslint").RuleFix>
              | readonly import("@typescript-eslint/utils/ts-eslint").RuleFix[]
              | import("@typescript-eslint/utils/ts-eslint").RuleFix
              | null;
          }[]
          | null;
      },
    ): void;
  }
}
