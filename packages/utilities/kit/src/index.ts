/* eslint-disable perfectionist/sort-object-types */
/* eslint-disable perfectionist/sort-objects */
import type { TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleContext, RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { Linter, Rule } from "eslint";
export type { RuleContext };

import pkg from "../package.json";

export interface Collector<T> {
  query: {
    all(program: TSESTree.Program): T[];
  };
  visitor: RuleListener;
}

export interface CollectorWithContext<T> extends Collector<T> {
  query: {
    all(program: TSESTree.Program): T[];
  };
}

function components(
  ctx: RuleContext<string, unknown[]>,
  options?: {
    collectDisplayName?: boolean;
    hint?: bigint;
  },
): CollectorWithContext<core.FunctionComponentSemanticNode> {
  const { api, visitor } = core.getComponentCollector(ctx, options);
  return {
    query: {
      all: (program) => api.getAllComponents(program),
    },
    visitor,
  };
}

function hooks(
  ctx: RuleContext<string, unknown[]>,
): CollectorWithContext<core.HookSemanticNode> {
  const { api, visitor } = core.getHookCollector(ctx);
  return {
    query: {
      all: (program) => api.getAllHooks(program),
    },
    visitor,
  };
}

export interface RuleToolkit {
  is: {
    componentDefinition: (node: TSESTreeFunction, hint: bigint) => boolean;
    componentName: typeof core.isComponentName;
    componentNameLoose: typeof core.isComponentNameLoose;
    componentWrapperCall: (node: TSESTree.Node) => boolean;
    componentWrapperCallLoose: (node: TSESTree.Node) => boolean;
    componentWrapperCallback: (node: TSESTree.Node) => boolean;
    hook: typeof core.isHook;
    hookCall: typeof core.isHookCall;
    hookName: typeof core.isHookName;
    useEffectLikeCall: typeof core.isUseEffectLikeCall;
    useStateLikeCall: typeof core.isUseStateLikeCall;
    useEffectSetupCallback: typeof core.isUseEffectSetupCallback;
    useEffectCleanupCallback: typeof core.isUseEffectCleanupCallback;
    useCall: typeof core.isUseCall;
    useActionStateCall: typeof core.isUseActionStateCall;
    useCallbackCall: typeof core.isUseCallbackCall;
    useContextCall: typeof core.isUseContextCall;
    useDebugValueCall: typeof core.isUseDebugValueCall;
    useDeferredValueCall: typeof core.isUseDeferredValueCall;
    useEffectCall: typeof core.isUseEffectCall;
    useFormStatusCall: typeof core.isUseFormStatusCall;
    useIdCall: typeof core.isUseIdCall;
    useImperativeHandleCall: typeof core.isUseImperativeHandleCall;
    useInsertionEffectCall: typeof core.isUseInsertionEffectCall;
    useLayoutEffectCall: typeof core.isUseLayoutEffectCall;
    useMemoCall: typeof core.isUseMemoCall;
    useOptimisticCall: typeof core.isUseOptimisticCall;
    useReducerCall: typeof core.isUseReducerCall;
    useRefCall: typeof core.isUseRefCall;
    useStateCall: typeof core.isUseStateCall;
    useSyncExternalStoreCall: typeof core.isUseSyncExternalStoreCall;
    useTransitionCall: typeof core.isUseTransitionCall;
    reactAPI: (api: string) => (node: null | TSESTree.Node) => boolean;
    reactAPICall: (api: string) => (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    captureOwnerStack: (node: null | TSESTree.Node) => boolean;
    childrenCount: (node: null | TSESTree.Node) => boolean;
    childrenForEach: (node: null | TSESTree.Node) => boolean;
    childrenMap: (node: null | TSESTree.Node) => boolean;
    childrenOnly: (node: null | TSESTree.Node) => boolean;
    childrenToArray: (node: null | TSESTree.Node) => boolean;
    cloneElement: (node: null | TSESTree.Node) => boolean;
    createContext: (node: null | TSESTree.Node) => boolean;
    createElement: (node: null | TSESTree.Node) => boolean;
    createRef: (node: null | TSESTree.Node) => boolean;
    forwardRef: (node: null | TSESTree.Node) => boolean;
    memo: (node: null | TSESTree.Node) => boolean;
    lazy: (node: null | TSESTree.Node) => boolean;
    captureOwnerStackCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenCountCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenForEachCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenMapCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenOnlyCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenToArrayCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    cloneElementCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    createContextCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    createElementCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    createRefCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    forwardRefCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    memoCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    lazyCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    initializedFromReact: typeof core.isInitializedFromReact;
    initializedFromReactNative: typeof core.isInitializedFromReactNative;
  };

  hint: {
    component: typeof core.ComponentDetectionHint & { Default: bigint };
  };

  flag: {
    component: typeof core.ComponentFlag;
  };

  collect: {
    components: typeof components;
    hooks: typeof hooks;
  };
}

function createKit(ctx: RuleContext<string, unknown[]>): RuleToolkit {
  return {
    is: {
      componentDefinition: (node, hint) => core.isComponentDefinition(ctx, node, hint),
      componentName: core.isComponentName,
      componentNameLoose: core.isComponentNameLoose,
      componentWrapperCall: (node) => core.isComponentWrapperCall(ctx, node),
      componentWrapperCallLoose: (node) => core.isComponentWrapperCallLoose(ctx, node),
      componentWrapperCallback: (node) => core.isComponentWrapperCallback(ctx, node),
      hook: core.isHook,
      hookCall: core.isHookCall,
      hookName: core.isHookName,
      useEffectLikeCall: core.isUseEffectLikeCall,
      useStateLikeCall: core.isUseStateLikeCall,
      useEffectSetupCallback: core.isUseEffectSetupCallback,
      useEffectCleanupCallback: core.isUseEffectCleanupCallback,
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
      reactAPI: (api) => core.isReactAPI(api)(ctx),
      reactAPICall: (api) => core.isReactAPICall(api)(ctx),
      captureOwnerStack: core.isCaptureOwnerStack(ctx),
      childrenCount: core.isChildrenCount(ctx),
      childrenForEach: core.isChildrenForEach(ctx),
      childrenMap: core.isChildrenMap(ctx),
      childrenOnly: core.isChildrenOnly(ctx),
      childrenToArray: core.isChildrenToArray(ctx),
      cloneElement: core.isCloneElement(ctx),
      createContext: core.isCreateContext(ctx),
      createElement: core.isCreateElement(ctx),
      createRef: core.isCreateRef(ctx),
      forwardRef: core.isForwardRef(ctx),
      memo: core.isMemo(ctx),
      lazy: core.isLazy(ctx),
      captureOwnerStackCall: core.isCaptureOwnerStackCall(ctx),
      childrenCountCall: core.isChildrenCountCall(ctx),
      childrenForEachCall: core.isChildrenForEachCall(ctx),
      childrenMapCall: core.isChildrenMapCall(ctx),
      childrenOnlyCall: core.isChildrenOnlyCall(ctx),
      childrenToArrayCall: core.isChildrenToArrayCall(ctx),
      cloneElementCall: core.isCloneElementCall(ctx),
      createContextCall: core.isCreateContextCall(ctx),
      createElementCall: core.isCreateElementCall(ctx),
      createRefCall: core.isCreateRefCall(ctx),
      forwardRefCall: core.isForwardRefCall(ctx),
      memoCall: core.isMemoCall(ctx),
      lazyCall: core.isLazyCall(ctx),
      initializedFromReact: core.isInitializedFromReact,
      initializedFromReactNative: core.isInitializedFromReactNative,
    },

    hint: {
      component: {
        ...core.ComponentDetectionHint,
        Default: core.DEFAULT_COMPONENT_DETECTION_HINT,
      },
    },

    flag: {
      component: core.ComponentFlag,
    },

    collect: {
      components,
      hooks,
    },
  };
}

interface RuleDefinition {
  name: string;
  make(ctx: RuleContext<string, unknown[]>, kit: RuleToolkit): RuleListener;
}

export function defineConfig(...rules: RuleDefinition[]): Linter.Config {
  return {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      [pkg.name]: {
        meta: { name: pkg.name, version: pkg.version },
        rules: rules.reduce<Record<string, Rule.RuleModule>>((acc, { name, make }) => {
          Reflect.set(acc, name, {
            meta: {
              fixable: "code",
              hasSuggestions: true,
            },
            create(ctx: RuleContext<string, unknown[]>) {
              return make(ctx, createKit(ctx));
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

export default defineConfig;

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface RuleContext<MessageIds extends string, Options extends readonly unknown[]> {
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
