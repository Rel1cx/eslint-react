/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TSESTreeFunction } from "@eslint-react/ast";
import { is, isFunction, isIIFE, NodeType, traverseUp, traverseUpGuard } from "@eslint-react/ast";
import { isReactHookCallWithNameLoose, isUseEffectCall, isUseStateCall } from "@eslint-react/core";
import { getESLintReactSettings } from "@eslint-react/shared";
import { F, MutList, MutRef, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { findVariable, getVariableInit } from "@eslint-react/var";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ConstantCase } from "string-ts";
import { isMatching, match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-direct-set-state-in-use-effect";

export type MessageID = ConstantCase<typeof RULE_NAME>;

type CallKind = "other" | "setState" | "useEffect" | "useState";
type FunctionKind = "cleanup" | "deferred" | "effect" | "immediate" | "other";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow direct calls to the 'set' function of 'useState' in 'useEffect'",
    },
    messages: {
      NO_DIRECT_SET_STATE_IN_USE_EFFECT: "Do not call the 'set' function of 'useState' directly in 'useEffect'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = getESLintReactSettings(context.settings);
    const { useEffect: useEffectAlias = [], useState: useStateAlias = [] } = settings.additionalHooks ?? {};
    function isUseEffectCallWithAlias(node: TSESTree.CallExpression) {
      return isUseEffectCall(node, context) || useEffectAlias.some(F.flip(isReactHookCallWithNameLoose)(node));
    }
    function isUseStateCallWithAlias(node: TSESTree.CallExpression) {
      return isUseStateCall(node, context) || useStateAlias.some(F.flip(isReactHookCallWithNameLoose)(node));
    }
    function isEffectFunction(node: TSESTree.Node) {
      return node.parent?.type === NodeType.CallExpression
        && node.parent.callee !== node
        && isUseEffectCallWithAlias(node.parent);
    }
    function isCleanUpFunction(node: TSESTree.Node) {}
    function isSetStateCall(node: TSESTree.CallExpression) {
      const name = match(node.callee)
        // const [data, setData] = useState();
        // setData();
        .with({ type: NodeType.Identifier }, (n) => O.some(n.name))
        // const data = useState();
        // data[1]();
        .with({ type: NodeType.MemberExpression }, (n) => {
          if (!("name" in n.object)) return O.none();
          const initialScope = context.sourceCode.getScope(n);
          const property = getStaticValue(n.property, initialScope);
          if (property?.value === 1) return O.fromNullable(n.object.name);
          return O.none();
        })
        // const data = useState();
        // data.at(1)();
        .with({ type: NodeType.CallExpression }, (n) => {
          if (!is(NodeType.MemberExpression)(n.callee)) return O.none();
          if (!("name" in n.callee.object)) return O.none();
          const isAt = isMatching({
            type: NodeType.MemberExpression,
            property: {
              type: NodeType.Identifier,
              name: "at",
            },
          }, n.callee);
          const [index] = n.arguments;
          if (!isAt || !index) return O.none();
          const initialScope = context.sourceCode.getScope(n);
          const value = getStaticValue(index, initialScope);
          if (value?.value === 1) return O.fromNullable(n.callee.object.name);
          return O.none();
        })
        .otherwise(O.none);
      return F.pipe(
        name,
        O.flatMap(findVariable(context.sourceCode.getScope(node))),
        O.flatMap(getVariableInit(0)),
        O.filter(is(NodeType.CallExpression)),
        O.exists(isUseStateCallWithAlias),
      );
    }
    function getCallKind(node: TSESTree.CallExpression) {
      return match<TSESTree.CallExpression, CallKind>(node)
        .when(isSetStateCall, () => "setState")
        .when(isUseStateCallWithAlias, () => "setState")
        .when(isUseEffectCallWithAlias, () => "useEffect")
        .otherwise(() => "other");
    }
    function getFunctionKind(node: TSESTreeFunction) {
      return match<TSESTreeFunction, FunctionKind>(node)
        .when(isEffectFunction, () => "effect")
        .when(isCleanUpFunction, () => "cleanup")
        .when(isIIFE, () => "immediate")
        .otherwise(() => "other");
    }
    const useEffectCallRef = MutRef.make<TSESTree.CallExpression | null>(null);
    const callStack = MutList.make<TSESTree.CallExpression>();
    const functionStack = MutList.make<[node: TSESTreeFunction, kind: FunctionKind]>();
    const effectFunctionRef = MutRef.make<TSESTreeFunction | null>(null);
    const cleanUpFunctionRef = MutRef.make<TSESTreeFunction | null>(null);
    const setStateCalls = new Map<TSESTreeFunction, TSESTree.CallExpression[]>();
    const returnedFunctions = new Map<TSESTreeFunction, TSESTreeFunction[]>();
    const indirectFunctions = new Map<TSESTreeFunction, TSESTreeFunction[]>();
    const onUseEffectCallEnter = (node: TSESTree.CallExpression) => void MutRef.set(useEffectCallRef, node);
    const onEffectFunctionEnter = (node: TSESTreeFunction) => {
      // console.log("effect function enter", node);
    };
    // const onCleanUpFunctionEnter = (node: TSESTreeFunction) => {};
    // const onCleanUpFunctionExit = (node: TSESTreeFunction) => {};
    const onEffectFunctionExit = (node: TSESTreeFunction) => {};
    const onUseEffectCallExit = () => void MutRef.set(useEffectCallRef, null);
    /* eslint-disable perfectionist/sort-objects */
    return {
      CallExpression(node) {
        MutList.append(callStack, node);
        const isInUseEffectCall = MutRef.get(useEffectCallRef) !== null;
        const isInEffectFunction = MutRef.get(effectFunctionRef) !== null;
        const isInCleanUpFunction = MutRef.get(cleanUpFunctionRef) !== null;
        if (!isInUseEffectCall && !isInEffectFunction && !isInCleanUpFunction) return;
        const callKind = getCallKind(node);
        match(callKind)
          .with("setState", () => {
            context.report({
              node,
              messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT",
            });
          })
          .with("useEffect", () => {
            onUseEffectCallEnter(node);
            // console.log("use effect call", node);
          })
          .with("useState", () => {
            // console.log("use state call", node);
          })
          .with("other", () => {
          })
          .exhaustive();
      },
      ":function"(node: TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        MutList.append(functionStack, [node, functionKind]);
        match(functionKind)
          .with("effect", () => {
            MutRef.set(effectFunctionRef, node);
            onEffectFunctionEnter(node);
          })
          .with("cleanup", () => {
            MutRef.set(cleanUpFunctionRef, node);
          })
          .with("immediate", () => {})
          .otherwise(() => {});
      },
      ":function:exit"(node: TSESTreeFunction) {
        const effectFn = MutRef.get(effectFunctionRef);
        if (effectFn === node) {
          onEffectFunctionExit(node);
          MutRef.set(effectFunctionRef, null);
        }
        MutList.pop(functionStack);
      },
      "CallExpression:exit"(node) {
        MutList.pop(callStack);
        if (MutRef.get(useEffectCallRef) === node) {
          onUseEffectCallExit();
          MutRef.set(useEffectCallRef, null);
        }
      },
      "Program:exit"() {},
    };
    /* eslint-enable perfectionist/sort-objects */
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
