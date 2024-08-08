import type { TSESTreeFunction } from "@eslint-react/ast";
import { getNestedIdentifiers, isFunction, isFunctionOfImmediatelyInvoked, traverseUpGuard } from "@eslint-react/ast";
import { isReactHookCallWithNameAlias } from "@eslint-react/core";
import { decodeSettings } from "@eslint-react/shared";
import { F, MutRef, O } from "@eslint-react/tools";
import { findVariable, getVariableNode } from "@eslint-react/var";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import {
  createRule,
  isFromUseStateCall,
  isSetFunctionCall,
  isThenCall,
  isVariableDeclaratorFromHookCall,
} from "../utils";

export const RULE_NAME = "no-direct-set-state-in-use-layout-effect";

type MessageID = CamelCase<typeof RULE_NAME>;
type CallKind = "other" | "setState" | "then" | "useLayoutEffect" | "useState";
type FunctionKind = "cleanup" | "deferred" | "effect" | "immediate" | "other";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow direct calls to the 'set' function of 'useState' in 'useLayoutEffect'",
    },
    messages: {
      noDirectSetStateInUseLayoutEffect: "Do not call the 'set' function of 'useState' directly in 'useLayoutEffect'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = decodeSettings(context.settings);
    const additionalHooks = settings.additionalHooks ?? {};
    const isUseEffectCall = isReactHookCallWithNameAlias(
      "useLayoutEffect",
      context,
      additionalHooks.useLayoutEffect ?? [],
    );
    const isUseStateCall = isReactHookCallWithNameAlias("useState", context, additionalHooks.useState ?? []);
    const isUseMemoCall = isReactHookCallWithNameAlias("useMemo", context, additionalHooks.useMemo ?? []);
    const isUseCallbackCall = isReactHookCallWithNameAlias("useCallback", context, additionalHooks.useCallback ?? []);
    const isSetStateCall = isSetFunctionCall(context, settings);
    const isIdFromUseStateCall = isFromUseStateCall(context, settings);
    const functionStack: [node: TSESTreeFunction, kind: FunctionKind][] = [];
    const effectFunctionRef = MutRef.make<TSESTreeFunction | null>(null);
    const effectFunctionIdentifiers: TSESTree.Identifier[] = [];
    const indirectFunctionCalls: TSESTree.CallExpression[] = [];
    const indirectSetStateCalls = new WeakMap<TSESTreeFunction, TSESTree.CallExpression[]>();
    const indirectSetStateCallsAsEFs = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
    const indirectSetStateCallsAsArgs = new WeakMap<TSESTree.CallExpression, TSESTree.Identifier[]>();
    const indirectSetStateCallsInHooks = new WeakMap<
      TSESTree.VariableDeclarator["init"] & {},
      TSESTree.CallExpression[]
    >();
    const onEffectFunctionEnter = (node: TSESTreeFunction) => {
      MutRef.set(effectFunctionRef, node);
    };
    const onEffectFunctionExit = (node: TSESTreeFunction) => {
      MutRef.update(effectFunctionRef, (current) => current === node ? null : current);
    };
    function isEffectFunction(node: TSESTree.Node) {
      return node.parent?.type === AST_NODE_TYPES.CallExpression
        && node.parent.callee !== node
        && isUseEffectCall(node.parent);
    }
    function getCallKind(node: TSESTree.CallExpression) {
      return match<TSESTree.CallExpression, CallKind>(node)
        .when(isUseStateCall, () => "useState")
        .when(isUseEffectCall, () => "useLayoutEffect")
        .when(isSetStateCall, () => "setState")
        .when(isThenCall, () => "then")
        .otherwise(() => "other");
    }
    function getFunctionKind(node: TSESTreeFunction) {
      return match<TSESTreeFunction, FunctionKind>(node)
        .when(isEffectFunction, () => "effect")
        .when(isFunctionOfImmediatelyInvoked, () => "immediate")
        .otherwise(() => "other");
    }
    return {
      ":function"(node: TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        functionStack.push([node, functionKind]);
        if (functionKind === "effect") onEffectFunctionEnter(node);
      },
      ":function:exit"(node: TSESTreeFunction) {
        const [_, functionKind] = functionStack.at(-1) ?? [];
        functionStack.pop();
        if (functionKind === "effect") onEffectFunctionExit(node);
      },
      CallExpression(node) {
        const effectFn = MutRef.get(effectFunctionRef);
        const [parentFn, parentFnKind] = functionStack.at(-1) ?? [];
        if (parentFn?.async) return;
        match(getCallKind(node))
          .with("setState", () => {
            if (!parentFn) return;
            if (parentFn !== effectFn && parentFnKind !== "immediate") {
              const maybeVd = traverseUpGuard(node, isVariableDeclaratorFromHookCall);
              if (O.isSome(maybeVd)) {
                const vd = maybeVd.value;
                const calls = indirectSetStateCallsInHooks.get(vd.init) ?? [];
                indirectSetStateCallsInHooks.set(vd.init, [...calls, node]);
                return;
              }
              const calls = indirectSetStateCalls.get(parentFn) ?? [];
              indirectSetStateCalls.set(parentFn, [...calls, node]);
              return;
            }
            context.report({
              messageId: "noDirectSetStateInUseLayoutEffect",
              node,
            });
          })
          // .with(P.union("useMemo", "useCallback"), () => {})
          .with("useLayoutEffect", () => {
            const [firstArg] = node.arguments;
            if (isFunction(firstArg)) return;
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
      Identifier(node) {
        if (node.parent.type === AST_NODE_TYPES.CallExpression && node.parent.callee === node) return;
        if (!isIdFromUseStateCall(node)) return;
        switch (node.parent.type) {
          case AST_NODE_TYPES.CallExpression: {
            const [firstArg] = node.parent.arguments;
            if (node !== firstArg) break;
            // const [state, setState] = useState();
            // const set = useCallback(setState, []);
            // useLayoutEffect(set, []);
            if (isUseCallbackCall(node.parent)) {
              const maybeVd = traverseUpGuard(node.parent, isVariableDeclaratorFromHookCall);
              if (O.isNone(maybeVd)) break;
              const vd = maybeVd.value;
              const calls = indirectSetStateCallsAsArgs.get(vd.init) ?? [];
              indirectSetStateCallsAsArgs.set(vd.init, [...calls, node]);
            }
            // const [state, setState] = useState();
            // useLayoutEffect(setState);
            if (isUseEffectCall(node.parent)) {
              const calls = indirectSetStateCallsAsArgs.get(node.parent) ?? [];
              indirectSetStateCallsAsEFs.set(node.parent, [...calls, node]);
            }
            break;
          }
          case AST_NODE_TYPES.ArrowFunctionExpression: {
            const parent = node.parent.parent;
            if (parent.type !== AST_NODE_TYPES.CallExpression) break;
            // const [state, setState] = useState();
            // const set = useMemo(() => setState, []);
            // useLayoutEffect(set, []);
            if (!isUseMemoCall(parent)) break;
            const maybeVd = traverseUpGuard(parent, isVariableDeclaratorFromHookCall);
            if (O.isNone(maybeVd)) break;
            const vd = maybeVd.value;
            const calls = indirectSetStateCallsAsArgs.get(vd.init) ?? [];
            indirectSetStateCallsAsArgs.set(vd.init, [...calls, node]);
          }
        }
      },
      "Program:exit"() {
        const getSetStateCalls = (
          id: TSESTree.Identifier | string,
          initialScope: Scope.Scope,
        ): TSESTree.CallExpression[] | TSESTree.Identifier[] => {
          const node = O.flatMap(findVariable(id, initialScope), getVariableNode(0)).pipe(O.getOrNull);
          switch (node?.type) {
            case AST_NODE_TYPES.FunctionDeclaration:
            case AST_NODE_TYPES.FunctionExpression:
            case AST_NODE_TYPES.ArrowFunctionExpression:
              return indirectSetStateCalls.get(node) ?? [];
            case AST_NODE_TYPES.CallExpression:
              return indirectSetStateCallsInHooks.get(node) ?? indirectSetStateCallsAsArgs.get(node) ?? [];
          }
          return [];
        };
        for (const [_, calls] of indirectSetStateCallsAsEFs) {
          for (const call of calls) {
            context.report({
              data: { name: call.name },
              messageId: "noDirectSetStateInUseLayoutEffect",
              node: call,
            });
          }
        }
        for (const { callee } of indirectFunctionCalls) {
          if (!("name" in callee)) continue;
          const { name } = callee;
          const setStateCalls = getSetStateCalls(name, context.sourceCode.getScope(callee));
          for (const setStateCall of setStateCalls) {
            context.report({
              data: { name },
              messageId: "noDirectSetStateInUseLayoutEffect",
              node: setStateCall,
            });
          }
        }
        for (const id of effectFunctionIdentifiers) {
          const setStateCalls = getSetStateCalls(id.name, context.sourceCode.getScope(id));
          for (const setStateCall of setStateCalls) {
            context.report({
              data: { name: id.name },
              messageId: "noDirectSetStateInUseLayoutEffect",
              node: setStateCall,
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
