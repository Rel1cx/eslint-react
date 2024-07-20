import type { TSESTreeFunction } from "@eslint-react/ast";
import { getNestedIdentifiers, is, isFunction, isIIFE, NodeType } from "@eslint-react/ast";
import { isReactHookCallWithNameLoose, isUseLayoutEffectCall, isUseStateCall } from "@eslint-react/core";
import { getESLintReactSettings } from "@eslint-react/shared";
import { Chunk, F, MutList, MutRef, O } from "@eslint-react/tools";
import { findVariable, getVariableNode } from "@eslint-react/var";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
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
        O.flatMap(getVariableNode(0)),
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
          // const data = useState();
          // const index = 1;
          // data[index]();
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
    const functionStack = MutList.make<[node: TSESTreeFunction, kind: FunctionKind]>();
    const effectFunctionRef = MutRef.make<TSESTreeFunction | null>(null);
    const effectFunctionIdentifiers = MutRef.make(Chunk.empty<TSESTree.Identifier>());
    const indirectFunctionCalls = MutRef.make(Chunk.empty<TSESTree.CallExpression>());
    const indirectSetStateCalls = new WeakMap<TSESTreeFunction, Chunk.Chunk<TSESTree.CallExpression>>();
    const onEffectFunctionEnter = (node: TSESTreeFunction) => {
      MutRef.set(effectFunctionRef, node);
    };
    const onEffectFunctionExit = (node: TSESTreeFunction) => {
      MutRef.update(effectFunctionRef, (current) => (current === node ? null : current));
    };
    return {
      ":function"(node: TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        MutList.append(functionStack, [node, functionKind]);
        match(functionKind)
          .with("effect", () => {
            onEffectFunctionEnter(node);
          })
          .otherwise(F.constVoid);
      },
      ":function:exit"(node: TSESTreeFunction) {
        onEffectFunctionExit(node);
        MutList.pop(functionStack);
      },
      CallExpression(node) {
        const effectFn = MutRef.get(effectFunctionRef);
        const [parentFn, parentFnKind] = MutList.tail(functionStack) ?? [];
        if (parentFn?.async) return;
        const callKind = getCallKind(node);
        match(callKind)
          .with("setState", () => {
            if (!parentFn) return;
            if (parentFn !== effectFn && parentFnKind !== "immediate") {
              const calls = indirectSetStateCalls.get(parentFn) ?? Chunk.empty<TSESTree.CallExpression>();
              indirectSetStateCalls.set(parentFn, Chunk.append(calls, node));
              return;
            }
            context.report({
              messageId: "NO_DIRECT_SET_STATE_IN_USE_LAYOUT_EFFECT",
              node,
            });
          })
          .with("useLayoutEffect", () => {
            if (node.arguments.every(isFunction)) return;
            const identifiers = getNestedIdentifiers(node);
            MutRef.update(effectFunctionIdentifiers, Chunk.appendAll(Chunk.unsafeFromArray(identifiers)));
          })
          .with("other", () => {
            const isInEffectFunction = effectFn === parentFn;
            if (!isInEffectFunction) return;
            MutRef.update(indirectFunctionCalls, Chunk.append(node));
          })
          .otherwise(F.constVoid);
      },
      "Program:exit"() {
        const getSetStateCalls = (id: TSESTree.Identifier | string, initialScope: Scope.Scope) => {
          return F.pipe(
            findVariable(id, initialScope),
            O.flatMap(getVariableNode(0)),
            O.filter(isFunction),
            O.flatMapNullable((fn) => indirectSetStateCalls.get(fn as TSESTreeFunction)),
            O.map(Chunk.toReadonlyArray),
            O.getOrElse(() => []),
          );
        };
        for (const { callee } of Chunk.toReadonlyArray(MutRef.get(indirectFunctionCalls))) {
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
        for (const id of Chunk.toReadonlyArray(MutRef.get(effectFunctionIdentifiers))) {
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
