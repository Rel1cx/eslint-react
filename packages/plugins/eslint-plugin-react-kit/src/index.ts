import * as toolkit from "@eslint-react/core";
import type { Pretty } from "@local/eff";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleContext, RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { ESLint } from "eslint";

import { name, version } from "../package.json";

export type Toolkit = Pretty<Omit<typeof toolkit, "JsxInspector">>;

export interface CustomRuleDefinition {
  /**
   * The name of the rule. Must be unique within the plugin and should follow ESLint's naming conventions (e.g., "my-rule-name").
   */
  name: string;
  /**
   * Factory function to create the rule listener for this rule.
   *
   * @param context - The ESLint rule context.
   * @param toolkit - The eslint-react core toolkit, providing utilities for analyzing React patterns.
   * @returns A rule listener object mapping AST node types to visitor functions.
   */
  make: (context: RuleContext<string, unknown[]>, toolkit: Toolkit) => RuleListener;
}

/**
 * Define a custom ESLint plugin with rules powered by the eslint-react toolkit.
 *
 * @param rules - Array of custom rule definitions.
 * @returns An ESLint plugin object with the defined rules.
 *
 * @example
 * ```ts
 * import { definePlugin, defineRuleListener } from "eslint-plugin-react-kit";
 *
 * const plugin = definePlugin([
 *   {
 *     name: "function-component-definition",
 *     make: (ctx, kit) => {
 *       // Collect all function components detected in the file
 *       const { api, visitor } = kit.getComponentCollector(ctx, { hint });
 *
 *       return defineRuleListener(visitor, {
 *         "Program:exit"(program) {
 *           for (const { node } of api.getAllComponents(program)) {
 *             if (node.type === "ArrowFunctionExpression") continue;
 *             ctx.report({
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
      create(context: RuleContext<string, unknown[]>) {
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

// Fix mismatch between ESLint's RuleContext and @typescript-eslint/utils' RuleContext, allowing rules to use the `message` or `desc` properties directly in the report descriptor without needing to define a `messageId` and corresponding entry in `meta.messages`.
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
            fixer: RuleFixer,
          ) =>
            | IterableIterator<RuleFix>
            | readonly RuleFix[]
            | RuleFix
            | null)
          | null;
        readonly loc?:
          | Readonly<TSESTree.SourceLocation>
          | Readonly<TSESTree.Position>;
        readonly message: string;
        readonly node: TSESTree.Node;
        readonly suggest?:
          | readonly {
            readonly data?: Readonly<Record<string, unknown>>;
            readonly desc: string;
            readonly fix: (
              fixer: RuleFixer,
            ) =>
              | IterableIterator<RuleFix>
              | readonly RuleFix[]
              | RuleFix
              | null;
          }[]
          | null;
      },
    ): void;
  }
}
