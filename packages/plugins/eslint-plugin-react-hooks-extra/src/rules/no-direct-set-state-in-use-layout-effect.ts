import type { TSESTreeFunction } from "@eslint-react/ast";
import { getNestedIdentifiers, isFunction, isIIFE, NodeType, traverseUpGuard } from "@eslint-react/ast";
import { isReactHookCallWithNameAlias } from "@eslint-react/core";
import { decodeSettings } from "@eslint-react/shared";
import { F, MutRef, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { findVariable, getVariableNode } from "@eslint-react/var";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import * as R from "remeda";
import type { ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule, isSetStateCall, isThenCall, isVariableDeclaratorFromHookCall } from "../utils";

export const RULE_NAME = "no-direct-set-state-in-use-layout-effect";

type MessageID = ConstantCase<typeof RULE_NAME>;

function isEffectFunction(
  context: RuleContext,
  useSomeEffectAlias: string[],
) {
  return (node: TSESTree.Node) =>
    node.parent?.type === NodeType.CallExpression
    && node.parent.callee !== node
    && isReactHookCallWithNameAlias("useLayoutEffect", context, useSomeEffectAlias)(node.parent);
}

type CallKind = "other" | "setState" | "then" | "useLayoutEffect" | "useState";
type FunctionKind = "cleanup" | "deferred" | "effect" | "immediate" | "other";

function getCallKind(
  node: TSESTree.CallExpression,
  context: RuleContext,
  alias: readonly [useState: string[], useLayoutEffect: string[]],
) {
  const [useStateAlias, useLayoutEffectAlias] = alias;
  return match<TSESTree.CallExpression, CallKind>(node)
    .when(isReactHookCallWithNameAlias("useState", context, useStateAlias), () => "useState")
    .when(isReactHookCallWithNameAlias("useLayoutEffect", context, useLayoutEffectAlias), () => "useLayoutEffect")
    .when(isSetStateCall(context, useStateAlias), () => "setState")
    .when(isThenCall, () => "then")
    .otherwise(() => "other");
}

function getFunctionKind(
  node: TSESTreeFunction,
  context: RuleContext,
  useLayoutEffectAlias: string[],
) {
  return match<TSESTreeFunction, FunctionKind>(node)
    .when(isEffectFunction(context, useLayoutEffectAlias), () => "effect")
    // .when(isCleanUpFunction, () => "cleanup")
    .when(isIIFE, () => "immediate")
    .otherwise(() => "other");
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow direct calls to the 'set' function of 'useState' in 'useLayoutEffect'",
    },
    messages: {
      NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT:
        "Do not call the 'set' function of 'useState' directly in 'useLayoutEffect'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = decodeSettings(context.settings);
    const { useLayoutEffect: useLayoutEffectAlias = [], useState: useStateAlias = [] } = settings.additionalHooks ?? {};
    const functionStack: [node: TSESTreeFunction, kind: FunctionKind][] = [];
    const effectFunctionRef = MutRef.make<TSESTreeFunction | null>(null);
    const effectFunctionIdentifiers: TSESTree.Identifier[] = [];
    const indirectFunctionCalls: TSESTree.CallExpression[] = [];
    const indirectSetStateCalls = new WeakMap<TSESTreeFunction, TSESTree.CallExpression[]>();
    const indirectSetStateCallsInHooks = new WeakMap<
      TSESTree.VariableDeclarator["init"] & {},
      TSESTree.CallExpression[]
    >();
    const onEffectFunctionEnter = (node: TSESTreeFunction) => {
      MutRef.set(effectFunctionRef, node);
    };
    const onEffectFunctionExit = (node: TSESTreeFunction) => {
      MutRef.update(effectFunctionRef, (current) => (current === node ? null : current));
    };
    return {
      ":function"(node: TSESTreeFunction) {
        const functionKind = getFunctionKind(node, context, useLayoutEffectAlias);
        functionStack.push([node, functionKind]);
        match(functionKind)
          .with("effect", () => {
            onEffectFunctionEnter(node);
          })
          .otherwise(F.constVoid);
      },
      ":function:exit"(node: TSESTreeFunction) {
        onEffectFunctionExit(node);
        functionStack.pop();
      },
      CallExpression(node) {
        const effectFn = MutRef.get(effectFunctionRef);
        const [parentFn, parentFnKind] = R.last(functionStack) ?? [];
        if (parentFn?.async) return;
        match(getCallKind(node, context, [useStateAlias, useLayoutEffectAlias]))
          .with("setState", () => {
            if (!parentFn) return;
            if (parentFn !== effectFn && parentFnKind !== "immediate") {
              const variableDeclaratorFromHookCall = traverseUpGuard(node, isVariableDeclaratorFromHookCall);
              if (O.isSome(variableDeclaratorFromHookCall)) {
                const vd = variableDeclaratorFromHookCall.value;
                const calls = indirectSetStateCallsInHooks.get(vd.init) ?? [];
                indirectSetStateCallsInHooks.set(vd.init, [...calls, node]);
                return;
              }
              const calls = indirectSetStateCalls.get(parentFn) ?? [];
              indirectSetStateCalls.set(parentFn, [...calls, node]);
              return;
            }
            context.report({
              messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT",
              node,
            });
          })
          // .with(P.union("useMemo", "useCallback"), () => {})
          .with("useLayoutEffect", () => {
            if (node.arguments.every(isFunction)) return;
            const identifiers = getNestedIdentifiers(node);
            effectFunctionIdentifiers.push(...identifiers);
          })
          .with("other", () => {
            const isInEffectFunction = effectFn === parentFn;
            if (!isInEffectFunction) return;
            indirectFunctionCalls.push(node);
          })
          .otherwise(F.constVoid);
      },
      "Program:exit"() {
        const getSetStateCalls = (id: TSESTree.Identifier | string, initialScope: Scope.Scope) => {
          const node = O.flatMap(findVariable(id, initialScope), getVariableNode(0)).pipe(O.getOrNull);
          switch (node?.type) {
            case NodeType.FunctionDeclaration:
            case NodeType.FunctionExpression:
            case NodeType.ArrowFunctionExpression:
              return indirectSetStateCalls.get(node) ?? [];
            case NodeType.CallExpression:
              return indirectSetStateCallsInHooks.get(node) ?? [];
          }
          return [];
        };
        for (const { callee } of indirectFunctionCalls) {
          if (!("name" in callee)) continue;
          const { name } = callee;
          const setStateCalls = getSetStateCalls(name, context.sourceCode.getScope(callee));
          for (const setStateCall of setStateCalls) {
            context.report({
              data: { name },
              messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT",
              node: setStateCall,
            });
          }
        }
        for (const id of effectFunctionIdentifiers) {
          const setStateCalls = getSetStateCalls(id.name, context.sourceCode.getScope(id));
          for (const setStateCall of setStateCalls) {
            context.report({
              data: { name: id.name },
              messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT",
              node: setStateCall,
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
