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
import { match } from "ts-pattern";

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
    const indirectFunctions = new Map<TSESTreeFunction, Chunk.Chunk<TSESTree.CallExpression>>();
    return {
      CallExpression(node) {
        const effectFunction = traverseUp(node, isEffectFunction);
        const parentFunction = traverseUpGuard(node, isFunction);
        if (O.isNone(effectFunction) || O.isNone(parentFunction)) return;
        const callScope = context.sourceCode.getScope(node);
        // if (scope.block !== effectFunction.value) return;
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
            const isAt = match(n.callee)
              .with(
                {
                  type: NodeType.MemberExpression,
                  property: {
                    type: NodeType.Identifier,
                    name: "at",
                  },
                },
                F.constTrue,
              )
              .otherwise(F.constFalse);
            if (!isAt) return O.none();
            const [index] = n.arguments;
            if (!index) return O.none();
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
        const isInEffectScope = parentFunction.value === effectFunction.value;
        const isInsideIIFE = parentFunction.value.type !== NodeType.FunctionDeclaration && isIIFE(parentFunction.value);
        const isIIFEInEffectScope = isInsideIIFE && O.exists(
          traverseUpGuard(parentFunction.value, isFunction),
          n => n === effectFunction.value,
        );
        const shouldReport = (isInEffectScope || isIIFEInEffectScope) && isUseStatCall;
        const shouldRecordSetCall = !isInsideIIFE && !isInEffectScope && isUseStatCall;
        const shouldRecordIndirectCall = !isInsideIIFE && isInEffectScope && !isUseStatCall;
        if (shouldReport) {
          context.report({
            data: {
              name: name.value,
            },
            messageId: "NO_DIRECT_SET_STATE_IN_USE_EFFECT",
            node,
          });
        }
        if (shouldRecordSetCall) {
          const chunk = indirectFunctions.get(parentFunction.value) ?? Chunk.empty();
          indirectFunctions.set(parentFunction.value, Chunk.append(chunk, node));
        }
        if (shouldRecordIndirectCall) {
          MutRef.update(indirectCalls, Chunk.append(node));
        }
      },
      "Program:exit"() {
        for (const call of Chunk.toReadonlyArray(MutRef.get(indirectCalls))) {
          if (!("name" in call.callee)) continue;
          const { name } = call.callee;
          const init = O.flatMap(findVariable(name, context.sourceCode.getScope(call)), getVariableInit(0));
          if (O.isNone(init) || !isFunction(init.value)) continue;
          const setFunctions = indirectFunctions.get(init.value);
          if (!setFunctions) continue;
          for (const setFunction of Chunk.toReadonlyArray(setFunctions)) {
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
