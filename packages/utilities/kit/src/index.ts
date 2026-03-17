import { findParent, isFunction } from "@eslint-react/ast";
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
 *
 * @typeParam T The semantic node type yielded by the collector.
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
 * An extended collector that also provides access to the current traversal
 * context. Useful for rules that need to inspect which component or hook the
 * traversal is currently inside.
 *
 * @typeParam T The semantic node type yielded by the collector.
 * @typeParam E The entry type tracking the current traversal position.
 */
export interface CollectorWithContext<T, E> extends Collector<T> {
  /** Query API with additional contextual access. */
  query: {
    /** Returns all collected semantic nodes for the given program. */
    all(program: TSESTree.Program): T[];
  };
}

/**
 * Creates a function component collector that detects React function
 * components in the AST.
 *
 * @param ctx The ESLint rule context.
 * @param options Optional configuration for component detection.
 * @returns A {@link CollectorWithContext} whose `query.all()` yields
 *   {@link core.FunctionComponentSemanticNode} entries.
 *
 * @example
 * ```ts
 * const { query, visitor } = kit.collect.components(ctx);
 *
 * return merge(visitor, {
 *   "Program:exit"(program) {
 *     for (const { node, name, flag } of query.all(program)) {
 *       // inspect each detected function component
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
): CollectorWithContext<core.FunctionComponentSemanticNode, core.FunctionComponentSemanticNode> {
  const { api, visitor } = core.getComponentCollector(ctx, options);
  return {
    query: {
      all: (program) => api.getAllComponents(program),
      // current: () => api.getCurrentEntry() as core.FunctionComponentSemanticNode | null,
      // currentStack: () => api.getCurrentEntries() as core.FunctionComponentSemanticNode[],
    },
    visitor,
  };
}

/**
 * Creates a hook collector that detects custom React hooks in the AST.
 *
 * @param ctx The ESLint rule context.
 * @returns A {@link CollectorWithContext} whose `query.all()` yields
 *   {@link core.HookSemanticNode} entries.
 *
 * @example
 * ```ts
 * const { query, visitor } = kit.collect.hooks(ctx);
 *
 * return merge(visitor, {
 *   "Program:exit"(program) {
 *     for (const { node, name, hookCalls } of query.all(program)) {
 *       // inspect each detected hook and its internal hook calls
 *     }
 *   },
 * });
 * ```
 */
function hooks(
  ctx: RuleContext<string, unknown[]>,
): CollectorWithContext<core.HookSemanticNode, { key: string; node: TSESTree.Node }> {
  const { api, visitor } = core.getHookCollector(ctx);
  return {
    query: {
      all: (program) => api.getAllHooks(program),
      // current: () => api.getCurrentEntry(),
      // currentStack: () => api.getCurrentEntries(),
    },
    visitor,
  };
}

export interface Kit {
  is: {
    // ── Function ─────────────────────────────────────────────────────────────

    /** Checks whether a node is a function. */
    function: typeof isFunction;

    // ── Component ──────────────────────────────────────────────────────────

    /** Checks whether a function node qualifies as a component definition under the given hint. */
    componentDefinition: typeof core.isComponentDefinition;
    /** Checks whether a name matches the strict PascalCase component naming convention. */
    componentName: typeof core.isComponentName;
    /** Checks whether a name matches the loose component naming convention. */
    componentNameLoose: typeof core.isComponentNameLoose;
    /** Checks whether a node is a call to `React.memo` or `React.forwardRef`. */
    componentWrapperCall: typeof core.isComponentWrapperCall;
    /** Like `componentWrapperCall` but also matches `useCallback`. */
    componentWrapperCallLoose: typeof core.isComponentWrapperCallLoose;
    /** Checks whether a function node is the callback passed to a component wrapper. */
    componentWrapperCallback: typeof core.isComponentWrapperCallback;

    // ── Hook ───────────────────────────────────────────────────────────────

    /** Checks whether a function node is a React hook (based on its name). */
    hook: typeof core.isHook;
    /** Checks whether a node is a React hook call. */
    hookCall: typeof core.isHookCall;
    /** Checks whether a name matches the hook naming convention (`use` prefix). */
    hookName: typeof core.isHookName;
    /** Checks whether a node is a call to a useEffect-like hook. */
    useEffectLikeCall: typeof core.isUseEffectLikeCall;
    /** Checks whether a node is a call to a useState-like hook. */
    useStateLikeCall: typeof core.isUseStateLikeCall;
    /** Checks whether a node is the setup callback of a useEffect-like hook. */
    useEffectSetupCallback: typeof core.isUseEffectSetupCallback;
    /** Checks whether a node is the cleanup callback of a useEffect-like hook. */
    useEffectCleanupCallback: typeof core.isUseEffectCleanupCallback;

    // Built-in hook calls
    /** Checks for `use(...)` calls. */
    useCall: typeof core.isUseCall;
    /** Checks for `useActionState(...)` calls. */
    useActionStateCall: typeof core.isUseActionStateCall;
    /** Checks for `useCallback(...)` calls. */
    useCallbackCall: typeof core.isUseCallbackCall;
    /** Checks for `useContext(...)` calls. */
    useContextCall: typeof core.isUseContextCall;
    /** Checks for `useDebugValue(...)` calls. */
    useDebugValueCall: typeof core.isUseDebugValueCall;
    /** Checks for `useDeferredValue(...)` calls. */
    useDeferredValueCall: typeof core.isUseDeferredValueCall;
    /** Checks for `useEffect(...)` calls. */
    useEffectCall: typeof core.isUseEffectCall;
    /** Checks for `useFormStatus(...)` calls. */
    useFormStatusCall: typeof core.isUseFormStatusCall;
    /** Checks for `useId(...)` calls. */
    useIdCall: typeof core.isUseIdCall;
    /** Checks for `useImperativeHandle(...)` calls. */
    useImperativeHandleCall: typeof core.isUseImperativeHandleCall;
    /** Checks for `useInsertionEffect(...)` calls. */
    useInsertionEffectCall: typeof core.isUseInsertionEffectCall;
    /** Checks for `useLayoutEffect(...)` calls. */
    useLayoutEffectCall: typeof core.isUseLayoutEffectCall;
    /** Checks for `useMemo(...)` calls. */
    useMemoCall: typeof core.isUseMemoCall;
    /** Checks for `useOptimistic(...)` calls. */
    useOptimisticCall: typeof core.isUseOptimisticCall;
    /** Checks for `useReducer(...)` calls. */
    useReducerCall: typeof core.isUseReducerCall;
    /** Checks for `useRef(...)` calls. */
    useRefCall: typeof core.isUseRefCall;
    /** Checks for `useState(...)` calls. */
    useStateCall: typeof core.isUseStateCall;
    /** Checks for `useSyncExternalStore(...)` calls. */
    useSyncExternalStoreCall: typeof core.isUseSyncExternalStoreCall;
    /** Checks for `useTransition(...)` calls. */
    useTransitionCall: typeof core.isUseTransitionCall;

    // ── React API ──────────────────────────────────────────────────────────

    /**
     * Factory: creates a predicate that checks whether a node is a given
     * React API (e.g. `"memo"`). Supports both data-first and data-last
     * calling conventions.
     */
    reactAPI: typeof core.isReactAPI;
    /**
     * Factory: creates a predicate that checks whether a node is a call to
     * a given React API. Supports both data-first and data-last calling
     * conventions.
     */
    reactAPICall: typeof core.isReactAPICall;

    // Pre-built React API identifier checks
    /** Checks for `captureOwnerStack` identifiers. */
    captureOwnerStack: typeof core.isCaptureOwnerStack;
    /** Checks for `Children.count` identifiers. */
    childrenCount: typeof core.isChildrenCount;
    /** Checks for `Children.forEach` identifiers. */
    childrenForEach: typeof core.isChildrenForEach;
    /** Checks for `Children.map` identifiers. */
    childrenMap: typeof core.isChildrenMap;
    /** Checks for `Children.only` identifiers. */
    childrenOnly: typeof core.isChildrenOnly;
    /** Checks for `Children.toArray` identifiers. */
    childrenToArray: typeof core.isChildrenToArray;
    /** Checks for `cloneElement` identifiers. */
    cloneElement: typeof core.isCloneElement;
    /** Checks for `createContext` identifiers. */
    createContext: typeof core.isCreateContext;
    /** Checks for `createElement` identifiers. */
    createElement: typeof core.isCreateElement;
    /** Checks for `forwardRef` identifiers. */
    forwardRef: typeof core.isForwardRef;
    /** Checks for `memo` identifiers. */
    memo: typeof core.isMemo;
    /** Checks for `lazy` identifiers. */
    lazy: typeof core.isLazy;

    // Pre-built React API call checks
    /** Checks for `captureOwnerStack(...)` calls. */
    captureOwnerStackCall: typeof core.isCaptureOwnerStackCall;
    /** Checks for `Children.count(...)` calls. */
    childrenCountCall: typeof core.isChildrenCountCall;
    /** Checks for `Children.forEach(...)` calls. */
    childrenForEachCall: typeof core.isChildrenForEachCall;
    /** Checks for `Children.map(...)` calls. */
    childrenMapCall: typeof core.isChildrenMapCall;
    /** Checks for `Children.only(...)` calls. */
    childrenOnlyCall: typeof core.isChildrenOnlyCall;
    /** Checks for `Children.toArray(...)` calls. */
    childrenToArrayCall: typeof core.isChildrenToArrayCall;
    /** Checks for `cloneElement(...)` calls. */
    cloneElementCall: typeof core.isCloneElementCall;
    /** Checks for `createContext(...)` calls. */
    createContextCall: typeof core.isCreateContextCall;
    /** Checks for `createElement(...)` calls. */
    createElementCall: typeof core.isCreateElementCall;
    /** Checks for `forwardRef(...)` calls. */
    forwardRefCall: typeof core.isForwardRefCall;
    /** Checks for `memo(...)` calls. */
    memoCall: typeof core.isMemoCall;
    /** Checks for `lazy(...)` calls. */
    lazyCall: typeof core.isLazyCall;

    // ── Import source ──────────────────────────────────────────────────────

    /** Checks whether a variable is initialized from a React import. */
    initializedFromReact: typeof core.isInitializedFromReact;
    /** Checks whether a variable is initialized from a React Native import. */
    initializedFromReactNative: typeof core.isInitializedFromReactNative;
  };

  // ── Hint & Flag ────────────────────────────────────────────────────────────

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

  // ── Finders ────────────────────────────────────────────────────────────────

  find: {
    parent: typeof findParent;
  };

  // ── Collectors ──────────────────────────────────────────────────────────────

  /** Collector factories for semantic analysis. */
  collect: {
    /** Collects React function components. Returns a {@link CollectorWithContext}. */
    components: typeof components;
    /** Collects React hooks. Returns a {@link CollectorWithContext}. */
    hooks: typeof hooks;
  };
}

const kit = {
  is: {
    // Function
    function: isFunction,
    // Component
    componentDefinition: core.isComponentDefinition,
    componentName: core.isComponentName,
    componentNameLoose: core.isComponentNameLoose,
    componentWrapperCall: core.isComponentWrapperCall,
    componentWrapperCallLoose: core.isComponentWrapperCallLoose,
    componentWrapperCallback: core.isComponentWrapperCallback,
    // Hook
    hook: core.isHook,
    hookCall: core.isHookCall,
    hookName: core.isHookName,
    useEffectLikeCall: core.isUseEffectLikeCall,
    useStateLikeCall: core.isUseStateLikeCall,
    useEffectSetupCallback: core.isUseEffectSetupCallback,
    useEffectCleanupCallback: core.isUseEffectCleanupCallback,
    // Built-in hook calls
    useCall: core.isUseCall,
    useActionStateCall: core.isUseActionStateCall,
    useCallbackCall: core.isUseCallbackCall,
    useContextCall: core.isUseContextCall,
    useDebugValueCall: core.isUseDebugValueCall,
    useDeferredValueCall: core.isUseDeferredValueCall,
    useEffectCall: core.isUseEffectCall,
    useFormStatusCall: core.isUseFormStatusCall,
    useIdCall: core.isUseIdCall,
    useImperativeHandleCall: core.isUseImperativeHandleCall,
    useInsertionEffectCall: core.isUseInsertionEffectCall,
    useLayoutEffectCall: core.isUseLayoutEffectCall,
    useMemoCall: core.isUseMemoCall,
    useOptimisticCall: core.isUseOptimisticCall,
    useReducerCall: core.isUseReducerCall,
    useRefCall: core.isUseRefCall,
    useStateCall: core.isUseStateCall,
    useSyncExternalStoreCall: core.isUseSyncExternalStoreCall,
    useTransitionCall: core.isUseTransitionCall,
    // React API (factories)
    reactAPI: core.isReactAPI,
    reactAPICall: core.isReactAPICall,
    // React API identifiers
    captureOwnerStack: core.isCaptureOwnerStack,
    childrenCount: core.isChildrenCount,
    childrenForEach: core.isChildrenForEach,
    childrenMap: core.isChildrenMap,
    childrenOnly: core.isChildrenOnly,
    childrenToArray: core.isChildrenToArray,
    cloneElement: core.isCloneElement,
    createContext: core.isCreateContext,
    createElement: core.isCreateElement,
    forwardRef: core.isForwardRef,
    memo: core.isMemo,
    lazy: core.isLazy,
    // React API calls
    captureOwnerStackCall: core.isCaptureOwnerStackCall,
    childrenCountCall: core.isChildrenCountCall,
    childrenForEachCall: core.isChildrenForEachCall,
    childrenMapCall: core.isChildrenMapCall,
    childrenOnlyCall: core.isChildrenOnlyCall,
    childrenToArrayCall: core.isChildrenToArrayCall,
    cloneElementCall: core.isCloneElementCall,
    createContextCall: core.isCreateContextCall,
    createElementCall: core.isCreateElementCall,
    forwardRefCall: core.isForwardRefCall,
    memoCall: core.isMemoCall,
    lazyCall: core.isLazyCall,
    // Import source
    initializedFromReact: core.isInitializedFromReact,
    initializedFromReactNative: core.isInitializedFromReactNative,
  },

  hint: {
    component: core.ComponentDetectionHint,
    defaultComponent: core.DEFAULT_COMPONENT_DETECTION_HINT,
  },

  flag: {
    component: core.ComponentFlag,
  },

  find: {
    parent: findParent,
  },

  collect: {
    components,
    hooks,
  },
} as const satisfies Kit;

/**
 * Re-export semantic node types so custom rule authors can annotate their
 * code without adding `@eslint-react/core` as a direct dependency.
 */
export type {
  /** A detected React function component. */
  FunctionComponentSemanticNode,
  /** A detected React hook definition. */
  HookSemanticNode,
  /** Base interface for all semantic nodes. */
  SemanticNode,
} from "@eslint-react/core";

/**
 * Describes a custom ESLint rule for React.
 *
 * - `name`  — unique rule identifier (used as `<plugin>/<name>` in config)
 * - `make`  — factory receiving the ESLint rule context and a structured {@link Kit}
 */
interface RuleDefinition {
  /** Unique rule name, used as the suffix in `<plugin-name>/<rule-name>`. */
  name: string;
  /**
   * Rule factory — called once per file with the ESLint rule context and a
   * structured {@link Kit} toolkit.
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
 * @param rules One or more {@link RuleDefinition} objects.
 * @returns An ESLint `Linter.Config` ready to be spread into / placed in `extends`.
 *
 * @example
 * ```ts
 * import { defineConfig as defineReactConfig, merge } from "@eslint-react/kit";
 * import { defineConfig } from "eslint/config";
 *
 * export default defineConfig({
 *   files: ["**\/*.{ts,tsx}"],
 *   extends: [
 *     defineReactConfig(
 *       {
 *         name: "no-large-components",
 *         make: (ctx, kit) => {
 *           const { query, visitor } = kit.collect.components(ctx);
 *
 *           return merge(visitor, {
 *             "Program:exit"(program) {
 *               for (const component of query.all(program)) {
 *                 const lines = component.node.loc.end.line - component.node.loc.start.line;
 *                 if (lines > 100) {
 *                   ctx.report({
 *                     node: component.node,
 *                     message: `Component "${component.name}" is ${lines} lines long. Keep components under 100 lines.`,
 *                   });
 *                 }
 *               }
 *             },
 *           });
 *         },
 *       },
 *     ),
 *   ],
 * });
 * ```
 */
export function defineConfig(...rules: RuleDefinition[]): Linter.Config {
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
 * const { query, visitor } = kit.collect.components(ctx);
 *
 * return merge(
 *   visitor,
 *   {
 *     "Program:exit"(program) {
 *       for (const component of query.all(program)) {
 *         // inspect components
 *       }
 *     },
 *   },
 * );
 * ```
 *
 * @example
 * ```ts
 * // Merging a component collector and a hook collector
 * const fc = kit.collect.components(ctx);
 * const hk = kit.collect.hooks(ctx);
 *
 * return merge(fc.visitor, hk.visitor, {
 *   "Program:exit"(program) {
 *     const components = fc.query.all(program);
 *     const hooks = hk.query.all(program);
 *     // analyze everything together
 *   },
 * });
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
