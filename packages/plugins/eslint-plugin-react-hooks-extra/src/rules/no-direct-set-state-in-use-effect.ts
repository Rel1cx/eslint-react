/* eslint-disable better-mutation/no-mutating-methods */
import * as AST from "@eslint-react/ast";
import { isReactHookCallWithNameAlias } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import { decodeSettings } from "@eslint-react/shared";
import type { RuleFeature } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
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

export const RULE_NAME = "no-direct-set-state-in-use-effect";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

type MessageID = CamelCase<typeof RULE_NAME>;
type CallKind = "other" | "setState" | "then" | "useEffect" | "useState";
type FunctionKind = "cleanup" | "deferred" | "immediate" | "other" | "setup";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow direct calls to the 'set' function of 'useState' in 'useEffect'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDirectSetStateInUseEffect: "Do not call the 'set' function '{{name}}' of 'useState' directly in 'useEffect'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};
    const settings = decodeSettings(context.settings);
    const additionalHooks = settings.additionalHooks ?? {};
    const isUseEffectLikeCall = isReactHookCallWithNameAlias("useEffect", context, additionalHooks.useEffect ?? []);
    const isUseStateCall = isReactHookCallWithNameAlias("useState", context, additionalHooks.useState ?? []);
    const isUseMemoCall = isReactHookCallWithNameAlias("useMemo", context, additionalHooks.useMemo ?? []);
    const isUseCallbackCall = isReactHookCallWithNameAlias("useCallback", context, additionalHooks.useCallback ?? []);
    const isSetStateCall = isSetFunctionCall(context, settings);
    const isIdFromUseStateCall = isFromUseStateCall(context, settings);
    const functionStack: [node: AST.TSESTreeFunction, kind: FunctionKind][] = [];
    const setupFunctionRef = { current: O.none<AST.TSESTreeFunction>() };
    const setupFunctionIdentifiers: TSESTree.Identifier[] = [];
    const indirectFunctionCalls: TSESTree.CallExpression[] = [];
    const indirectSetStateCalls = new WeakMap<AST.TSESTreeFunction, TSESTree.CallExpression[]>();
    const indirectSetStateCallsAsArgs = new WeakMap<TSESTree.CallExpression, TSESTree.Identifier[]>();
    const indirectSetStateCallsAsSetups = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
    const indirectSetStateCallsInHooks = new WeakMap<
      TSESTree.VariableDeclarator["init"] & {},
      TSESTree.CallExpression[]
    >();
    const onSetupFunctionEnter = (node: AST.TSESTreeFunction) => {
      // eslint-disable-next-line better-mutation/no-mutation
      setupFunctionRef.current = O.some(node);
    };
    const onSetupFunctionExit = (node: AST.TSESTreeFunction) => {
      // eslint-disable-next-line better-mutation/no-mutation
      setupFunctionRef.current = O.filter(setupFunctionRef.current, (current) => current !== node);
    };
    function isSetupFunction(node: TSESTree.Node) {
      return node.parent?.type === AST_NODE_TYPES.CallExpression
        && node.parent.callee !== node
        && isUseEffectLikeCall(node.parent);
    }
    function getCallKind(node: TSESTree.CallExpression) {
      return match<TSESTree.CallExpression, CallKind>(node)
        .when(isUseStateCall, () => "useState")
        .when(isUseEffectLikeCall, () => "useEffect")
        .when(isSetStateCall, () => "setState")
        .when(isThenCall, () => "then")
        .otherwise(() => "other");
    }
    function getFunctionKind(node: AST.TSESTreeFunction) {
      return match<AST.TSESTreeFunction, FunctionKind>(node)
        .when(isSetupFunction, () => "setup")
        .when(AST.isFunctionOfImmediatelyInvoked, () => "immediate")
        .otherwise(() => "other");
    }
    return {
      ":function"(node: AST.TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        functionStack.push([node, functionKind]);
        if (functionKind === "setup") onSetupFunctionEnter(node);
      },
      ":function:exit"(node: AST.TSESTreeFunction) {
        const [_, functionKind] = functionStack.at(-1) ?? [];
        functionStack.pop();
        if (functionKind === "setup") onSetupFunctionExit(node);
      },
      CallExpression(node) {
        const effectFn = O.getOrNull(setupFunctionRef.current);
        const [parentFn, parentFnKind] = functionStack.at(-1) ?? [];
        if (parentFn?.async) return;
        match(getCallKind(node))
          .with("setState", () => {
            if (!parentFn) return;
            if (parentFn !== effectFn && parentFnKind !== "immediate") {
              const maybeVd = AST.traverseUpGuard(node, isVariableDeclaratorFromHookCall);
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
              messageId: "noDirectSetStateInUseEffect",
              node,
              data: { name: context.sourceCode.getText(node.callee) },
            });
          })
          // .with(P.union("useMemo", "useCallback"), () => {})
          .with("useEffect", () => {
            const [firstArg] = node.arguments;
            if (AST.isFunction(firstArg)) return;
            const identifiers = AST.getNestedIdentifiers(node);
            setupFunctionIdentifiers.push(...identifiers);
          })
          .with("other", () => {
            const isInSetupFunction = effectFn === parentFn;
            if (!isInSetupFunction) return;
            indirectFunctionCalls.push(node);
          })
          .otherwise(F.constVoid);
      },
      Identifier(node) {
        if (node.parent.type === AST_NODE_TYPES.CallExpression && node.parent.callee === node) return;
        if (!isIdFromUseStateCall(node)) return;
        switch (node.parent.type) {
          case AST_NODE_TYPES.ArrowFunctionExpression: {
            const parent = node.parent.parent;
            if (parent.type !== AST_NODE_TYPES.CallExpression) break;
            // const [state, setState] = useState();
            // const set = useMemo(() => setState, []);
            // useEffect(set, []);
            if (!isUseMemoCall(parent)) break;
            const maybeVd = AST.traverseUpGuard(parent, isVariableDeclaratorFromHookCall);
            if (O.isNone(maybeVd)) break;
            const vd = maybeVd.value;
            const calls = indirectSetStateCallsAsArgs.get(vd.init) ?? [];
            indirectSetStateCallsAsArgs.set(vd.init, [...calls, node]);
            break;
          }
          case AST_NODE_TYPES.CallExpression: {
            const [firstArg] = node.parent.arguments;
            if (node !== firstArg) break;
            // const [state, setState] = useState();
            // const set = useCallback(setState, []);
            // useEffect(set, []);
            if (isUseCallbackCall(node.parent)) {
              const maybeVd = AST.traverseUpGuard(node.parent, isVariableDeclaratorFromHookCall);
              if (O.isNone(maybeVd)) break;
              const vd = maybeVd.value;
              const calls = indirectSetStateCallsAsArgs.get(vd.init) ?? [];
              indirectSetStateCallsAsArgs.set(vd.init, [...calls, node]);
            }
            // const [state, setState] = useState();
            // useEffect(setState);
            if (isUseEffectLikeCall(node.parent)) {
              const calls = indirectSetStateCallsAsArgs.get(node.parent) ?? [];
              indirectSetStateCallsAsSetups.set(node.parent, [...calls, node]);
            }
            break;
          }
        }
      },
      "Program:exit"() {
        const getSetStateCalls = (
          id: string | TSESTree.Identifier,
          initialScope: Scope.Scope,
        ): TSESTree.CallExpression[] | TSESTree.Identifier[] => {
          const node = O.flatMap(VAR.findVariable(id, initialScope), VAR.getVariableNode(0)).pipe(O.getOrNull);
          switch (node?.type) {
            case AST_NODE_TYPES.ArrowFunctionExpression:
            case AST_NODE_TYPES.FunctionDeclaration:
            case AST_NODE_TYPES.FunctionExpression:
              return indirectSetStateCalls.get(node) ?? [];
            case AST_NODE_TYPES.CallExpression:
              return indirectSetStateCallsInHooks.get(node) ?? indirectSetStateCallsAsArgs.get(node) ?? [];
          }
          return [];
        };
        for (const [_, calls] of indirectSetStateCallsAsSetups) {
          for (const call of calls) {
            context.report({
              messageId: "noDirectSetStateInUseEffect",
              node: call,
              data: { name: call.name },
            });
          }
        }
        for (const { callee } of indirectFunctionCalls) {
          if (!("name" in callee)) continue;
          const { name } = callee;
          const setStateCalls = getSetStateCalls(name, context.sourceCode.getScope(callee));
          for (const setStateCall of setStateCalls) {
            context.report({
              messageId: "noDirectSetStateInUseEffect",
              node: setStateCall,
              data: {
                name: AST.toReadableNodeName(setStateCall, (n) => context.sourceCode.getText(n)),
              },
            });
          }
        }
        for (const id of setupFunctionIdentifiers) {
          const setStateCalls = getSetStateCalls(id.name, context.sourceCode.getScope(id));
          for (const setStateCall of setStateCalls) {
            context.report({
              messageId: "noDirectSetStateInUseEffect",
              node: setStateCall,
              data: {
                name: AST.toReadableNodeName(setStateCall, (n) => context.sourceCode.getText(n)),
              },
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
});
