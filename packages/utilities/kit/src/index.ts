import * as toolkit from "@eslint-react/core";
import type { Pretty } from "@local/eff";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleContext, RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { Linter, Rule } from "eslint";

import pkg from "../package.json";

type Toolkit = Pretty<typeof toolkit>;

type CustomRuleDefinition = [
  name: string,
  make: (context: RuleContext<string, unknown[]>, toolkit: Toolkit) => RuleListener,
];

/**
 * Defines an ESLint config with custom rules.
 *
 * @param rules One or more custom rule definitions to include in the config.
 * @returns An ESLint flat config object with the custom rules registered and enabled.
 *
 * @example
 * ```ts
 * import eslintJs from "@eslint/js";
 * import eslintReact from "@eslint-react/eslint-plugin";
 * import eslintReactKit, { defineRuleListener } from "@eslint-react/kit";
 * import { defineConfig } from "eslint/config";
 * import tseslint from "typescript-eslint";
 *
 * export default defineConfig(
 *   {
 *     extends: [
 *       eslintJs.configs.recommended,
 *       tseslint.configs.recommended,
 *       eslintReact.configs["recommended-typescript"],
 *       eslintReactKit(
 *         ["function-component-definition", (ctx, kit) => {
 *           const { api, visitor } = kit.getComponentCollector(ctx);
 *
 *           return defineRuleListener(
 *             visitor,
 *             {
 *               "Program:exit"(program) {
 *                 for (const { node } of api.getAllComponents(program)) {
 *                   if (node.type === "ArrowFunctionExpression") continue;
 *                   ctx.report({
 *                     node,
 *                     message: "Function components must be defined with arrow functions.",
 *                   });
 *                 }
 *               },
 *             },
 *           );
 *         }],
 *       ),
 *     ],
 *   },
 * );
 * ```
 */
export default function defineConfig(...rules: CustomRuleDefinition[]): Linter.Config {
  return {
    files: ["**/*.ts", "**/*.tsx"],
    rules: rules.reduce<Linter.Config["rules"] & {}>((acc, [name]) => {
      acc[`${pkg.name}/${name}`] = "error";
      return acc;
    }, {}),
    plugins: {
      [pkg.name]: {
        meta: { name: pkg.name, version: pkg.version },
        rules: rules.reduce<Record<string, Rule.RuleModule>>((acc, [name, make]) => {
          Reflect.set(acc, name, {
            meta: {
              fixable: "code",
              hasSuggestions: true,
            },
            create(context: RuleContext<string, unknown[]>) {
              return make(context, toolkit);
            },
          });
          return acc;
        }, {}),
      },
    },
  };
}

/**
 * Defines a rule listener by merging multiple visitor objects
 *
 * @param base Base visitor object (target of merge)
 * @param rest Additional visitor objects to merge (one or more)
 * @returns Merged RuleListener object
 *
 * @example
 * ```ts
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
