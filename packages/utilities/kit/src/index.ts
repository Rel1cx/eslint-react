import type { TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import {
  type ESLintReactSettingsNormalized,
  type RuleFix,
  type RuleFixer,
  type RuleListener,
  getSettingsFromContext,
} from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import type { ESLint, Linter } from "eslint";
import { kebabCase } from "string-ts";
export { defineRuleListener as merge } from "@eslint-react/shared";
import { ulid } from "ulid";

import pkg from "../package.json";

export type { RuleFix, RuleFixer, RuleListener };

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

interface RuleToolkit {
  collect: {
    components(
      context: RuleContext,
      options?: {
        collectDisplayName?: boolean;
        hint?: bigint;
      },
    ): CollectorWithContext<core.FunctionComponentSemanticNode>;
    hooks(context: RuleContext): CollectorWithContext<core.HookSemanticNode>;
  };

  flag: {
    component: typeof core.FunctionComponentFlag;
  };

  hint: {
    component: typeof core.FunctionComponentDetectionHint & { Default: bigint };
  };

  is: {
    API: (api: string) => (node: null | TSESTree.Node) => boolean;
    APICall: (api: string) => (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    captureOwnerStack: (node: null | TSESTree.Node) => boolean;
    captureOwnerStackCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenCount: (node: null | TSESTree.Node) => boolean;
    childrenCountCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenForEach: (node: null | TSESTree.Node) => boolean;
    childrenForEachCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenMap: (node: null | TSESTree.Node) => boolean;
    childrenMapCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenOnly: (node: null | TSESTree.Node) => boolean;
    childrenOnlyCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenToArray: (node: null | TSESTree.Node) => boolean;
    childrenToArrayCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    cloneElement: (node: null | TSESTree.Node) => boolean;
    cloneElementCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    componentDecl: (node: TSESTreeFunction, hint: bigint) => boolean;
    componentName: typeof core.isFunctionComponentName;
    componentNameLoose: typeof core.isFunctionComponentNameLoose;
    componentWrapperCall: (node: TSESTree.Node) => boolean;
    componentWrapperCallback: (node: TSESTree.Node) => boolean;
    createContext: (node: null | TSESTree.Node) => boolean;
    createContextCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    createElement: (node: null | TSESTree.Node) => boolean;
    createElementCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    createRef: (node: null | TSESTree.Node) => boolean;
    createRefCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    forwardRef: (node: null | TSESTree.Node) => boolean;
    forwardRefCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    hookCall: typeof core.isHookCall;
    hookDecl: typeof core.isHookDefinition;
    hookName: typeof core.isHookName;
    initializedFromReact: typeof core.isAPIFromReact;
    initializedFromReactNative: typeof core.isAPIFromReactNative;
    lazy: (node: null | TSESTree.Node) => boolean;
    lazyCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    memo: (node: null | TSESTree.Node) => boolean;
    memoCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useActionStateCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useCallbackCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useContextCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useDebugValueCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useDeferredValueCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useEffectCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useEffectCleanupCallback: typeof core.isUseEffectCleanupCallback;
    useEffectLikeCall: typeof core.isUseEffectLikeCall;
    useEffectSetupCallback: typeof core.isUseEffectSetupCallback;
    useFormStatusCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useIdCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useImperativeHandleCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useInsertionEffectCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useLayoutEffectCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useMemoCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useOptimisticCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useReducerCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useRefCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useStateCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useStateLikeCall: typeof core.isUseStateLikeCall;
    useSyncExternalStoreCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useTransitionCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
  };

  settings: ESLintReactSettingsNormalized;
}

function makeRuleToolkit(context: RuleContext): RuleToolkit {
  return {
    collect: {
      components(context, options?) {
        const { api, visitor } = core.getFunctionComponentCollector(context, options);
        return {
          query: {
            all(program) {
              return api.getAllComponents(program);
            },
          },
          visitor,
        };
      },
      hooks(context) {
        const { api, visitor } = core.getHookCollector(context);
        return {
          query: {
            all(program) {
              return api.getAllHooks(program);
            },
          },
          visitor,
        };
      },
    },

    flag: {
      component: core.FunctionComponentFlag,
    },

    hint: {
      component: {
        ...core.FunctionComponentDetectionHint,
        Default: core.DEFAULT_COMPONENT_DETECTION_HINT,
      },
    },

    is: {
      API: (api) => core.isAPI(api)(context),
      APICall: (api) => core.isAPICall(api)(context),
      captureOwnerStack: core.isCaptureOwnerStack(context),
      captureOwnerStackCall: core.isCaptureOwnerStackCall(context),
      childrenCount: core.isChildrenCount(context),
      childrenCountCall: core.isChildrenCountCall(context),
      childrenForEach: core.isChildrenForEach(context),
      childrenForEachCall: core.isChildrenForEachCall(context),
      childrenMap: core.isChildrenMap(context),
      childrenMapCall: core.isChildrenMapCall(context),
      childrenOnly: core.isChildrenOnly(context),
      childrenOnlyCall: core.isChildrenOnlyCall(context),
      childrenToArray: core.isChildrenToArray(context),
      childrenToArrayCall: core.isChildrenToArrayCall(context),
      cloneElement: core.isCloneElement(context),
      cloneElementCall: core.isCloneElementCall(context),
      componentDecl: (node, hint) => core.isFunctionComponentDefinition(context, node, hint),
      componentName: core.isFunctionComponentName,
      componentNameLoose: core.isFunctionComponentNameLoose,
      componentWrapperCall: (node) => core.isFunctionComponentWrapperCall(context, node),
      componentWrapperCallback: (node) => core.isFunctionComponentWrapperCallback(context, node),
      createContext: core.isCreateContext(context),
      createContextCall: core.isCreateContextCall(context),
      createElement: core.isCreateElement(context),
      createElementCall: core.isCreateElementCall(context),
      createRef: core.isCreateRef(context),
      createRefCall: core.isCreateRefCall(context),
      forwardRef: core.isForwardRef(context),
      forwardRefCall: core.isForwardRefCall(context),
      hookCall: core.isHookCall,
      hookDecl: core.isHookDefinition,
      hookName: core.isHookName,
      initializedFromReact: core.isAPIFromReact,
      initializedFromReactNative: core.isAPIFromReactNative,
      lazy: core.isLazy(context),
      lazyCall: core.isLazyCall(context),
      memo: core.isMemo(context),
      memoCall: core.isMemoCall(context),
      useActionStateCall: core.isUseActionStateCall(context),
      useCall: core.isUseCall(context),
      useCallbackCall: core.isUseCallbackCall(context),
      useContextCall: core.isUseContextCall(context),
      useDebugValueCall: core.isUseDebugValueCall(context),
      useDeferredValueCall: core.isUseDeferredValueCall(context),
      useEffectCall: core.isUseEffectCall(context),
      useEffectCleanupCallback: core.isUseEffectCleanupCallback,
      useEffectLikeCall: core.isUseEffectLikeCall,
      useEffectSetupCallback: core.isUseEffectSetupCallback,
      useFormStatusCall: core.isUseFormStatusCall(context),
      useIdCall: core.isUseIdCall(context),
      useImperativeHandleCall: core.isUseImperativeHandleCall(context),
      useInsertionEffectCall: core.isUseInsertionEffectCall(context),
      useLayoutEffectCall: core.isUseLayoutEffectCall(context),
      useMemoCall: core.isUseMemoCall(context),
      useOptimisticCall: core.isUseOptimisticCall(context),
      useReducerCall: core.isUseReducerCall(context),
      useRefCall: core.isUseRefCall(context),
      useStateCall: core.isUseStateCall(context),
      useStateLikeCall: core.isUseStateLikeCall,
      useSyncExternalStoreCall: core.isUseSyncExternalStoreCall(context),
      useTransitionCall: core.isUseTransitionCall(context),
    },

    settings: getSettingsFromContext(context),
  };
}

export type RuleFunction = (context: RuleContext, toolkit: RuleToolkit) => RuleListener;

export interface Builder {
  getConfig(): Linter.Config;
  getPlugin(): ESLint.Plugin;
  use<F extends (...args: any[]) => RuleFunction>(factory: F, ...args: Parameters<F>): Builder;
}

export default function build(): Builder {
  const rules: ESLint.Plugin["rules"] & {} = {};
  const builder: Builder = {
    getConfig(): Linter.Config {
      const name = pkg.name;
      return {
        name,
        files: ["**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}"],
        plugins: {
          [pkg.name]: builder.getPlugin(),
        },
        rules: Object.keys(rules).reduce<Linter.Config["rules"] & {}>((acc, name) => {
          acc[`${pkg.name}/${name}`] = "error";
          return acc;
        }, {}),
      };
    },
    getPlugin(): ESLint.Plugin {
      const name = pkg.name;
      const version = pkg.version;
      return {
        meta: { name, version },
        rules,
      };
    },
    use(make: (...args: any[]) => RuleFunction, ...args: any[]): Builder {
      const name = make.name === "" ? ulid() : kebabCase(make.name);
      Reflect.set(rules, name, {
        meta: {
          fixable: "code",
          hasSuggestions: true,
        },
        create: (context: RuleContext) => make(...args)(context, makeRuleToolkit(context)),
      });
      return builder;
    },
  };
  return builder;
}

// #region Module Augmentation

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface RuleContext<
    MessageIds extends string = string,
    Options extends readonly unknown[] = readonly unknown[],
  > {
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

// #endregion
