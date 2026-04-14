import type { TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleFix, RuleFixer, RuleListener } from "@eslint-react/eslint";
import { type ESLintReactSettingsNormalized, getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import type { ESLint, Linter } from "eslint";
import { kebabCase } from "string-ts";
import { ulid } from "ulid";

import pkg from "../package.json";

export { merge } from "@eslint-react/eslint";

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

export interface RuleToolkit {
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
    APIFromReact: typeof core.isAPIFromReact;
    APIFromReactNative: typeof core.isAPIFromReactNative;
    captureOwnerStackCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenCountCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenForEachCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenMapCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenOnlyCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    childrenToArrayCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    cloneElementCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    componentDecl: (node: TSESTreeFunction, hint: bigint) => boolean;
    componentName: typeof core.isFunctionComponentName;
    componentNameLoose: typeof core.isFunctionComponentNameLoose;
    componentWrapperCall: (node: TSESTree.Node) => boolean;
    componentWrapperCallback: (node: TSESTree.Node) => boolean;
    createContextCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    createElementCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    createRefCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    forwardRefCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
    hookCall: typeof core.isHookCall;
    hookDecl: typeof core.isHookDefinition;
    hookName: typeof core.isHookName;
    lazyCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression;
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
      APIFromReact: core.isAPIFromReact,
      APIFromReactNative: core.isAPIFromReactNative,
      captureOwnerStackCall: core.isCaptureOwnerStackCall(context),
      childrenCountCall: core.isChildrenCountCall(context),
      childrenForEachCall: core.isChildrenForEachCall(context),
      childrenMapCall: core.isChildrenMapCall(context),
      childrenOnlyCall: core.isChildrenOnlyCall(context),
      childrenToArrayCall: core.isChildrenToArrayCall(context),
      cloneElementCall: core.isCloneElementCall(context),
      componentDecl: (node, hint) => core.isFunctionComponentDefinition(context, node, hint),
      componentName: core.isFunctionComponentName,
      componentNameLoose: core.isFunctionComponentNameLoose,
      componentWrapperCall: (node) => core.isFunctionComponentWrapperCall(context, node),
      componentWrapperCallback: (node) => core.isFunctionComponentWrapperCallback(context, node),
      createContextCall: core.isCreateContextCall(context),
      createElementCall: core.isCreateElementCall(context),
      createRefCall: core.isCreateRefCall(context),
      forwardRefCall: core.isForwardRefCall(context),
      hookCall: core.isHookCall,
      hookDecl: core.isHookDefinition,
      hookName: core.isHookName,
      lazyCall: core.isLazyCall(context),
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
