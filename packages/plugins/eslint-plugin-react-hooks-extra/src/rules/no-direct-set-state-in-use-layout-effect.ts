import type { TSESTreeFunction } from "@eslint-react/ast";
import { is, isFunction, isIIFE, NodeType, traverseUp } from "@eslint-react/ast";
import { isReactHookCallWithNameLoose, isUseLayoutEffectCall, isUseStateCall } from "@eslint-react/core";
import { getESLintReactSettings } from "@eslint-react/shared";
import { F, MutList, MutRef, O } from "@eslint-react/tools";
import { findVariable, getVariableInit } from "@eslint-react/var";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ConstantCase } from "string-ts";
import { isMatching, match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-direct-set-state-in-use-layout-effect";

export type MessageID = ConstantCase<typeof RULE_NAME>;

type CallKind = "other" | "setState" | "then" | "useLayoutEffect" | "useState";
type FunctionKind = "cleanup" | "deferred" | "effect" | "immediate" | "other";

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
    const settings = getESLintReactSettings(context.settings);
    const { useLayoutEffect: useLayoutEffectAlias = [], useState: useStateAlias = [] } = settings.additionalHooks ?? {};
    function isUseLayoutEffectCallWithAlias(node: TSESTree.CallExpression) {
      return isUseLayoutEffectCall(node, context)
        || useLayoutEffectAlias.some(F.flip(isReactHookCallWithNameLoose)(node));
    }
    function isUseStateCallWithAlias(node: TSESTree.CallExpression) {
      return isUseStateCall(node, context) || useStateAlias.some(F.flip(isReactHookCallWithNameLoose)(node));
    }
    function isEffectFunction(node: TSESTree.Node) {
      return node.parent?.type === NodeType.CallExpression
        && node.parent.callee !== node
        && isUseLayoutEffectCallWithAlias(node.parent);
    }
    function isCleanUpFunction(_: TSESTree.Node) {}
    function isFromUseStateCall(id: TSESTree.Identifier | TSESTree.MemberExpression) {
      return F.pipe(
        match(id)
          .with({ type: NodeType.Identifier }, (n) => O.some(n.name))
          .with({
            type: NodeType.MemberExpression,
            object: { type: NodeType.Identifier },
          }, (n) => O.some(n.object.name))
          .otherwise(O.none),
        O.flatMap(findVariable(context.sourceCode.getScope(id))),
        O.flatMap(getVariableInit(0)),
        O.filter(is(NodeType.CallExpression)),
        O.exists(isUseStateCallWithAlias),
      );
    }
    function isSetStateCall(node: TSESTree.CallExpression) {
      const id = match(node.callee)
        // const [data, setData] = useState();
        // setData();
        .with({ type: NodeType.Identifier }, O.some)
        // const data = useState();
        // data[1]();
        .with({ type: NodeType.MemberExpression }, (n) => {
          if (!("name" in n.object)) return O.none();
          const initialScope = context.sourceCode.getScope(n);
          const property = getStaticValue(n.property, initialScope);
          if (property?.value === 1) return O.fromNullable(n.object);
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
          if (value?.value === 1) return O.fromNullable(n.callee.object);
          return O.none();
        })
        .otherwise(O.none);
      return O.exists(id, isFromUseStateCall);
    }
    function isThenCall(node: TSESTree.CallExpression) {
      if (node.callee.type !== NodeType.MemberExpression) return false;
      return isMatching({
        type: NodeType.Identifier,
        name: "then",
      }, node.callee.property);
    }
    function getCallKind(node: TSESTree.CallExpression) {
      return match<TSESTree.CallExpression, CallKind>(node)
        .when(isThenCall, () => "then")
        .when(isSetStateCall, () => "setState")
        .when(isUseStateCallWithAlias, () => "useState")
        .when(isUseLayoutEffectCallWithAlias, () => "useLayoutEffect")
        .otherwise(() => "other");
    }
    function getFunctionKind(node: TSESTreeFunction) {
      return match<TSESTreeFunction, FunctionKind>(node)
        .when(isEffectFunction, () => "effect")
        .when(isCleanUpFunction, () => "cleanup")
        .when(isIIFE, () => "immediate")
        .otherwise(() => "other");
    }
    const useLayoutEffectCallRef = MutRef.make<TSESTree.CallExpression | null>(null);
    const callStack = MutList.make<TSESTree.CallExpression>();
    const functionStack = MutList.make<[node: TSESTreeFunction, kind: FunctionKind]>();
    const effectFunctionRef = MutRef.make<TSESTreeFunction | null>(null);
    const cleanUpFunctionRef = MutRef.make<TSESTreeFunction | null>(null);
    const indirectFunctionCalls: TSESTree.CallExpression[] = [];
    const indirectSetStateCalls = new Map<TSESTreeFunction, TSESTree.CallExpression[]>();
    const onUseLayoutEffectCallEnter = (node: TSESTree.CallExpression) => void MutRef.set(useLayoutEffectCallRef, node);
    const onEffectFunctionEnter = (_: TSESTreeFunction) => {};
    const onEffectFunctionExit = (_: TSESTreeFunction) => {};
    const onUseLayoutEffectCallExit = () => void MutRef.set(useLayoutEffectCallRef, null);
    /* eslint-disable perfectionist/sort-objects */
    return {
      Identifier(node) {
        const isInUseLayoutEffectCall = MutRef.get(useLayoutEffectCallRef) !== null;
        const parentFn = MutList.tail(functionStack)?.[0];
        const useLayoutEffectCall = MutRef.get(useLayoutEffectCallRef);
        const isEffectFunction = useLayoutEffectCall && O.isSome(traverseUp(useLayoutEffectCall, n => n === parentFn));
        if (isFromUseStateCall(node) && isInUseLayoutEffectCall && isEffectFunction) {
          context.report({
            node,
            messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT",
          });
        }
      },
      CallExpression(node) {
        MutList.append(callStack, node);
        const callKind = getCallKind(node);
        match(callKind)
          .with("setState", () => {
            const effectFn = MutRef.get(effectFunctionRef);
            const [parentFn, parentFnKind] = MutList.tail(functionStack) ?? [];
            if (!parentFn) return;
            if (parentFn !== effectFn && parentFnKind !== "immediate") {
              indirectSetStateCalls.set(parentFn, [...indirectSetStateCalls.get(parentFn) ?? [], node]);
              return;
            }
            context.report({
              node,
              messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT",
            });
          })
          .with("useLayoutEffect", () => {
            onUseLayoutEffectCallEnter(node);
            // console.log("use effect call", node);
          })
          .with("useState", () => {
            // console.log("use state call", node);
          })
          .with("then", () => {
          })
          .with("other", () => {
            indirectFunctionCalls.push(node);
          })
          .exhaustive();
      },
      ":function"(node: TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        MutList.append(functionStack, [node, functionKind]);
        match(functionKind)
          // .with("immediate", () => {})
          .with("effect", () => {
            MutRef.set(effectFunctionRef, node);
            onEffectFunctionEnter(node);
          })
          .with("cleanup", () => {
            MutRef.set(cleanUpFunctionRef, node);
          })
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
        if (MutRef.get(useLayoutEffectCallRef) === node) {
          onUseLayoutEffectCallExit();
          MutRef.set(useLayoutEffectCallRef, null);
        }
      },
      "Program:exit"() {
        for (const call of indirectFunctionCalls) {
          if (!("name" in call.callee)) continue;
          const { name } = call.callee;
          const setStateCalls = F.pipe(
            findVariable(name, context.sourceCode.getScope(call)),
            O.flatMap(getVariableInit(0)),
            O.filter(isFunction),
            O.flatMapNullable((init) => indirectSetStateCalls.get(init as TSESTreeFunction)),
            O.getOrElse(() => []),
          );
          for (const setStateCall of setStateCalls) {
            context.report({
              data: {
                name,
              },
              messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT",
              node: setStateCall,
            });
          }
        }
      },
    };
    /* eslint-enable perfectionist/sort-objects */
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
