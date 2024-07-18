import type { TSESTreeFunction } from "@eslint-react/ast";
import { is, isFunction, isIIFE, NodeType, traverseUp, traverseUpGuard } from "@eslint-react/ast";
import { isReactHookCallWithNameLoose, isUseEffectCall, isUseStateCall } from "@eslint-react/core";
import { getESLintReactSettings } from "@eslint-react/shared";
import { Chunk, F, MutRef, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { findVariable, getVariableInit } from "@eslint-react/var";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ConstantCase } from "string-ts";
import { isMatching, match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-direct-set-state-in-use-effect";

export type MessageID = ConstantCase<typeof RULE_NAME>;

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
    function isUseEffectCallWithAlias(node: TSESTree.CallExpression, context: RuleContext) {
      return isUseEffectCall(node, context) || useEffectAlias.some(F.flip(isReactHookCallWithNameLoose)(node));
    }
    function isUseStateCallWithAlias(node: TSESTree.CallExpression, context: RuleContext) {
      return isUseStateCall(node, context) || useStateAlias.some(F.flip(isReactHookCallWithNameLoose)(node));
    }
    function isEffectFunction(node: TSESTree.Node) {
      return node.parent?.type === NodeType.CallExpression
        && isUseEffectCallWithAlias(node.parent, context);
    }
    // TODO: support detecting effect cleanup functions as well or add a separate rule for that called `no-direct-set-state-in-use-effect-cleanup`
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function isCleanUpFunction(node: TSESTree.Node) {}
    const indirectCalls = MutRef.make(Chunk.empty<TSESTree.CallExpression>());
    // const returnedFunctions = MutRef.make(Chunk.empty<TSESTreeFunction>());
    const indirectFunctions = new Map<TSESTreeFunction, Chunk.Chunk<TSESTree.CallExpression>>();
    return {
      CallExpression(node) {
        const maybeEffectFn = traverseUp(node, isEffectFunction);
        const maybeParentFn = traverseUpGuard(node, isFunction);
        // const maybeNearestReturn = traverseUp(node, is(NodeType.ReturnStatement));
        if (O.isNone(maybeEffectFn) || O.isNone(maybeParentFn)) return;
        const effectFn = maybeEffectFn.value;
        const parentFn = maybeParentFn.value;
        const callScope = context.sourceCode.getScope(node);
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
        if (O.isNone(name)) return;
        const isUseStatCall = F.pipe(
          name,
          O.flatMap(findVariable(callScope)),
          O.flatMap(getVariableInit(0)),
          O.filter(is(NodeType.CallExpression)),
          O.exists(name => isUseStateCallWithAlias(name, context)),
        );
        const isInEffectScope = parentFn === effectFn;
        const isInIIFEScope = parentFn.type !== NodeType.FunctionDeclaration && isIIFE(parentFn);
        const willExecuteByEffectFn = isInEffectScope
          || (isInIIFEScope && O.exists(traverseUpGuard(parentFn, isFunction), n => n === effectFn));
        const willReturnByEffectFn = F.pipe(
          parentFn,
          traverseUpGuard(is(NodeType.ReturnStatement)),
          O.flatMap(traverseUp(isFunction)),
          O.exists(n => n === effectFn),
        );
        if ((willExecuteByEffectFn || willReturnByEffectFn) && isUseStatCall) {
          context.report({
            data: {
              name: name.value,
            },
            messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT",
            node,
          });
        }
        const shouldMarkSetCall = !isInEffectScope && isUseStatCall;
        const shouldMarkIndirectCall = isInEffectScope && !isUseStatCall;
        if (shouldMarkSetCall) {
          const chunk = indirectFunctions.get(parentFn) ?? Chunk.empty();
          indirectFunctions.set(parentFn, Chunk.append(chunk, node));
        }
        if (shouldMarkIndirectCall) {
          MutRef.update(indirectCalls, Chunk.append(node));
        }
      },
      "Program:exit"() {
        for (const call of Chunk.toReadonlyArray(MutRef.get(indirectCalls))) {
          if (!("name" in call.callee)) continue;
          const { name } = call.callee;
          const setFunctions = F.pipe(
            findVariable(name, context.sourceCode.getScope(call)),
            O.flatMap(getVariableInit(0)),
            O.filter(isFunction),
            O.flatMapNullable((init) => indirectFunctions.get(init as TSESTreeFunction)),
            O.map(Chunk.toReadonlyArray),
            O.getOrElse(() => []),
          );
          for (const setFunction of setFunctions) {
            context.report({
              data: {
                name,
              },
              messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT",
              node: setFunction,
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
