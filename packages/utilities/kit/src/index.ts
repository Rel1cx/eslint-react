import * as core from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleContext, RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { Linter, Rule } from "eslint";

import pkg from "../package.json";

/**
 * The return type of a collector — a query API paired with an AST visitor.
 *
 * The `visitor` must be merged into the rule's listener (via {@link merge})
 * so the collector can traverse the AST and populate its query results.
 */
export interface Collector<T> {
  /** Query API for accessing collected semantic nodes after traversal. */
  query: {
    /** Returns all collected semantic nodes for the given program. */
    all(program: TSESTree.Program): T[];
  };
  /** AST visitor that drives the collection — merge this into your rule listener. */
  visitor: RuleListener;
}

/**
 * Creates a component collector that detects React function components in the AST.
 *
 * @param ctx The ESLint rule context.
 * @param options Optional configuration for component detection.
 * @param options.hint
 * @param options.collectDisplayName
 * @returns A {@link Collector} whose `query.all()` yields {@link FunctionComponentSemanticNode} entries.
 *
 * @example
 * ```ts
 * import { merge } from "@eslint-react/kit";
 *
 * // inside a rule's make function:
 * const { query, visitor } = kit.collect.components(ctx);
 *
 * return merge(visitor, {
 *   "Program:exit"(program) {
 *     for (const { node } of query.all(program)) {
 *       // inspect each detected component
 *     }
 *   },
 * });
 * ```
 */
function components(
  ctx: RuleContext<string, unknown[]>,
  options?: {
    collectDisplayName?: boolean;
    hint?: bigint;
  },
): Collector<core.FunctionComponentSemanticNode> {
  const { api, visitor } = core.getComponentCollector(ctx, options);
  return {
    query: { all: (program) => api.getAllComponents(program) },
    visitor,
  };
}

/**
 * Creates a hook collector that detects custom React hooks in the AST.
 *
 * @param ctx The ESLint rule context.
 * @returns A {@link Collector} whose `query.all()` yields {@link HookSemanticNode} entries.
 *
 * @example
 * ```ts
 * import { merge } from "@eslint-react/kit";
 *
 * // inside a rule's make function:
 * const { query, visitor } = kit.collect.hooks(ctx);
 *
 * return merge(visitor, {
 *   "Program:exit"(program) {
 *     for (const { node } of query.all(program)) {
 *       // inspect each detected hook
 *     }
 *   },
 * });
 * ```
 */
function hooks(ctx: RuleContext<string, unknown[]>): Collector<core.HookSemanticNode> {
  const { api, visitor } = core.getHookCollector(ctx);
  return {
    query: { all: (program) => api.getAllHooks(program) },
    visitor,
  };
}

/**
 * A structured core passed as the second argument to a rule's `make`
 * function. Members are organized by domain rather than presented as a
 * flat namespace.
 *
 * For the most common use-cases (collecting components or hooks) you can
 * import {@link components} or {@link hooks} directly — they are also
 * available here as `kit.collect.components` / `kit.collect.hooks`.
 */
export interface Kit {
  /** Collector factories for semantic analysis. */
  collect: {
    /** Alias for the top-level {@link components} function. */
    components: typeof components;
    /** Alias for the top-level {@link hooks} function. */
    hooks: typeof hooks;
  };

  /** Predicate functions for identifying React-specific AST patterns. */
  is: {
    /** Checks whether a function node qualifies as a component definition under the given hint. */
    componentDefinition: typeof core.isComponentDefinition;
    /** Checks whether a name matches the strict PascalCase component naming convention. */
    componentName: typeof core.isComponentName;
    /** Checks whether a name matches the loose component naming convention. */
    componentNameLoose: typeof core.isComponentNameLoose;

    /** Checks whether a function node is a React hook (based on its name). */
    hook: typeof core.isHook;
    /** Checks whether a node is a React hook call. */
    hookCall: typeof core.isHookCall;
    /** Checks whether a name matches the hook naming convention (`use` prefix). */
    hookName: typeof core.isHookName;

    /** Factory: creates a predicate that checks whether a node is a given React API (e.g. `"memo"`). */
    reactAPI: typeof core.isReactAPI;
    /** Factory: creates a predicate that checks whether a node is a call to a given React API. */
    reactAPICall: typeof core.isReactAPICall;

    /** Checks whether a variable is initialized from a React import. */
    initializedFromReact: typeof core.isInitializedFromReact;
    /** Checks whether a variable is initialized from a React Native import. */
    initializedFromReactNative: typeof core.isInitializedFromReactNative;
  };

  /** Component detection hint bit-flags. */
  hint: {
    /** All available hint flags — use bitwise operations to combine. */
    component: typeof core.ComponentDetectionHint;
    /** The default hint used when none is specified. */
    defaultComponent: bigint;
  };

  /** Component flag bit-flags. */
  flag: {
    /** Flags indicating component characteristics (Memo, ForwardRef, etc.). */
    component: typeof core.ComponentFlag;
  };
}

const kit = {
  collect: {
    components,
    hooks,
  },
  flag: {
    component: core.ComponentFlag,
  },
  hint: {
    component: core.ComponentDetectionHint,
    defaultComponent: core.DEFAULT_COMPONENT_DETECTION_HINT,
  },
  is: {
    componentDefinition: core.isComponentDefinition,
    // Component
    componentName: core.isComponentName,
    componentNameLoose: core.isComponentNameLoose,
    // Hook
    hook: core.isHook,
    hookCall: core.isHookCall,
    hookName: core.isHookName,
    // Import source
    initializedFromReact: core.isInitializedFromReact,
    initializedFromReactNative: core.isInitializedFromReactNative,
    // React API
    reactAPI: core.isReactAPI,
    reactAPICall: core.isReactAPICall,
  },
} as const satisfies Kit;

/**
 * Describes a custom ESLint rule for React.
 *
 * - `name`  — unique rule identifier (used as `<plugin>/<name>` in config)
 * - `meta`  — optional, declares what the rule can do (fix / suggest)
 * - `make`  — factory receiving the ESLint rule context and a structured {@link Kit}
 */
interface RuleDefinition {
  /** Unique rule name, used as the suffix in `<plugin-name>/<rule-name>`. */
  name: string;
  /**
   * Rule factory — called once per file with the ESLint rule context and a
   * structured {@link Kit} core.
   *
   * Return a `RuleListener` (visitor object). Use {@link merge} to combine
   * a collector's visitor with your own inspection visitor.
   */
  make(ctx: RuleContext<string, unknown[]>, kit: Kit): RuleListener;
}

/**
 * Creates an ESLint flat-config object from one or more custom rule definitions.
 *
 * The returned config registers all rules under the `@eslint-react/kit` plugin
 * namespace and enables every rule at `"error"` severity by default.
 *
 * @param rules One or more {@link RuleDef} objects.
 * @returns An ESLint `Linter.Config` ready to be spread into / placed in `extends`.
 *
 * @example
 * ```ts
 * import eslintJs from "@eslint/js";
 * import eslintReact from "@eslint-react/eslint-plugin";
 * import eslintReactKit, { merge } from "@eslint-react/kit";
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
 *         {
 *           name: "function-component-definition",
 *           make: (ctx, kit) => {
 *             const { query, visitor } = kit.collect.components(ctx);
 *
 *             return merge(
 *               visitor,
 *               {
 *                 "Program:exit"(program) {
 *                   for (const { node } of query.all(program)) {
 *                     if (node.type === "ArrowFunctionExpression") continue;
 *                     ctx.report({
 *                       node,
 *                       message: "Function components must be defined with arrow functions.",
 *                     });
 *                   }
 *                 },
 *               },
 *             );
 *           },
 *         },
 *       ),
 *     ],
 *   },
 * );
 * ```
 */
export default function defineConfig(...rules: RuleDefinition[]): Linter.Config {
  return {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      [pkg.name]: {
        meta: { name: pkg.name, version: pkg.version },
        rules: rules.reduce<Record<string, Rule.RuleModule>>((acc, rule) => {
          Reflect.set(acc, rule.name, {
            meta: {
              fixable: "code",
              hasSuggestions: true,
            },
            create(context: RuleContext<string, unknown[]>) {
              return rule.make(context, kit);
            },
          });
          return acc;
        }, {}),
      },
    },
    rules: rules.reduce<Linter.Config["rules"] & {}>((acc, { name }) => {
      acc[`${pkg.name}/${name}`] = "error";
      return acc;
    }, {}),
  };
}

/**
 * Merges multiple RuleListener (visitor) objects into a single listener.
 *
 * When two or more listeners define the same visitor key, the handlers are
 * chained so that they execute in order. This is essential for combining a
 * collector's visitor with your own inspection logic.
 *
 * @param listeners The visitor objects to merge.
 * @returns A single merged RuleListener.
 *
 * @example
 * ```ts
 * const collectorVisitor = { Identifier: () => console.log("collect") };
 * const inspectVisitor   = { Identifier: () => console.log("inspect") };
 * const merged = merge(collectorVisitor, inspectVisitor);
 * // When encountering Identifier nodes, outputs "collect" then "inspect"
 * ```
 */
export function merge(...listeners: RuleListener[]): RuleListener {
  const [base = {}, ...rest] = listeners;
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

// Allows rules to use `ctx.report({ message: "..." })` directly without
// needing a `messageId` and a corresponding `meta.messages` entry.
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
