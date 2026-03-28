import type { TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { ESLintReactSettingsNormalized, RuleFix, RuleFixer, RuleListener } from "@eslint-react/shared";
import { IdGenerator, getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import type { ESLint, Linter } from "eslint";
import { kebabCase } from "string-ts";
export { defineRuleListener as merge } from "@eslint-react/shared";

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
    component: typeof core.ComponentFlag;
  };

  hint: {
    component: typeof core.ComponentDetectionHint & { Default: bigint };
  };

  is: {
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
    componentDefinition: (node: TSESTreeFunction, hint: bigint) => boolean;
    componentName: typeof core.isComponentName;
    componentNameLoose: typeof core.isComponentNameLoose;
    componentWrapperCall: (node: TSESTree.Node) => boolean;
    componentWrapperCallback: (node: TSESTree.Node) => boolean;
    componentWrapperCallLoose: (node: TSESTree.Node) => boolean;
    createContext: (node: null | TSESTree.Node) => boolean;
    createContextCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    createElement: (node: null | TSESTree.Node) => boolean;
    createElementCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    createRef: (node: null | TSESTree.Node) => boolean;
    createRefCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    forwardRef: (node: null | TSESTree.Node) => boolean;
    forwardRefCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    hook: typeof core.isHook;
    hookCall: typeof core.isHookCall;
    hookName: typeof core.isHookName;
    initializedFromReact: typeof core.isInitializedFromReact;
    initializedFromReactNative: typeof core.isInitializedFromReactNative;
    lazy: (node: null | TSESTree.Node) => boolean;
    lazyCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    memo: (node: null | TSESTree.Node) => boolean;
    memoCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    reactAPI: (api: string) => (node: null | TSESTree.Node) => boolean;
    reactAPICall: (api: string) => (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    useActionStateCall: typeof core.isUseActionStateCall;
    useCall: typeof core.isUseCall;
    useCallbackCall: typeof core.isUseCallbackCall;
    useContextCall: typeof core.isUseContextCall;
    useDebugValueCall: typeof core.isUseDebugValueCall;
    useDeferredValueCall: typeof core.isUseDeferredValueCall;
    useEffectCall: typeof core.isUseEffectCall;
    useEffectCleanupCallback: typeof core.isUseEffectCleanupCallback;
    useEffectLikeCall: typeof core.isUseEffectLikeCall;
    useEffectSetupCallback: typeof core.isUseEffectSetupCallback;
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
    useStateLikeCall: typeof core.isUseStateLikeCall;
    useSyncExternalStoreCall: typeof core.isUseSyncExternalStoreCall;
    useTransitionCall: typeof core.isUseTransitionCall;
  };

  settings: ESLintReactSettingsNormalized;
}

function makeRuleToolkit(context: RuleContext): RuleToolkit {
  return {
    collect: {
      components(context, options?) {
        const { api, visitor } = core.getComponentCollector(context, options);
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
      component: core.ComponentFlag,
    },

    hint: {
      component: {
        ...core.ComponentDetectionHint,
        Default: core.DEFAULT_COMPONENT_DETECTION_HINT,
      },
    },

    is: {
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
      componentDefinition: (node, hint) => core.isComponentDefinition(context, node, hint),
      componentName: core.isComponentName,
      componentNameLoose: core.isComponentNameLoose,
      componentWrapperCall: (node) => core.isComponentWrapperCall(context, node),
      componentWrapperCallback: (node) => core.isComponentWrapperCallback(context, node),
      componentWrapperCallLoose: (node) => core.isComponentWrapperCallLoose(context, node),
      createContext: core.isCreateContext(context),
      createContextCall: core.isCreateContextCall(context),
      createElement: core.isCreateElement(context),
      createElementCall: core.isCreateElementCall(context),
      createRef: core.isCreateRef(context),
      createRefCall: core.isCreateRefCall(context),
      forwardRef: core.isForwardRef(context),
      forwardRefCall: core.isForwardRefCall(context),
      hook: core.isHook,
      hookCall: core.isHookCall,
      hookName: core.isHookName,
      initializedFromReact: core.isInitializedFromReact,
      initializedFromReactNative: core.isInitializedFromReactNative,
      lazy: core.isLazy(context),
      lazyCall: core.isLazyCall(context),
      memo: core.isMemo(context),
      memoCall: core.isMemoCall(context),
      reactAPI: (api) => core.isReactAPI(api)(context),
      reactAPICall: (api) => core.isReactAPICall(api)(context),
      useActionStateCall: core.isUseActionStateCall,
      useCall: core.isUseCall,
      useCallbackCall: core.isUseCallbackCall,
      useContextCall: core.isUseContextCall,
      useDebugValueCall: core.isUseDebugValueCall,
      useDeferredValueCall: core.isUseDeferredValueCall,
      useEffectCall: core.isUseEffectCall,
      useEffectCleanupCallback: core.isUseEffectCleanupCallback,
      useEffectLikeCall: core.isUseEffectLikeCall,
      useEffectSetupCallback: core.isUseEffectSetupCallback,
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
      useStateLikeCall: core.isUseStateLikeCall,
      useSyncExternalStoreCall: core.isUseSyncExternalStoreCall,
      useTransitionCall: core.isUseTransitionCall,
    },

    settings: getSettingsFromContext(context),
  };
}

export type RuleDefinition = (context: RuleContext, toolkit: RuleToolkit) => RuleListener;

export interface Builder {
  getConfig(options?: { files?: string[] }): Linter.Config;
  getPlugin(): ESLint.Plugin;
  use<F extends (...args: any[]) => RuleDefinition>(factory: F, ...args: Parameters<F>): Builder;
}

export default function build(): Builder {
  const idGen = new IdGenerator();
  const rules: ESLint.Plugin["rules"] & {} = {};
  const builder: Builder = {
    getConfig({ files = ["**/*.ts", "**/*.tsx"] } = {}): Linter.Config {
      return {
        files,
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
      return {
        meta: { name: pkg.name, version: pkg.version },
        rules,
      };
    },
    use(make: (...args: any[]) => RuleDefinition, ...args: any[]): Builder {
      const name = kebabCase(make.name === "" ? idGen.next() : make.name);
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
