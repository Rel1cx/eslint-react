import { is, NodeType, traverseUp } from "@eslint-react/ast";
import { isReactHookCallWithNameLoose, isUseEffectCall, isUseStateCall } from "@eslint-react/core";
import { getESLintReactSettings } from "@eslint-react/shared";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { findVariable, getVariableInit } from "@eslint-react/var";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-use-effect";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow direct calls to the 'set' function of 'useState' in 'useEffect'.",
    },
    messages: {
      NO_SET_STATE_IN_USE_EFFECT: "Do not call the set function of 'useState' directly in 'useEffect'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = getESLintReactSettings(context.settings);
    const { useEffect: useEffectAlias = [], useState: useStateAlias = [] } = settings.additionalHooks ?? {};
    function isUseEffectCallWithAlias(node: TSESTree.CallExpression, context: RuleContext) {
      return (isUseEffectCall(node, context) || useEffectAlias.some(F.flip(isReactHookCallWithNameLoose)(node)));
    }
    function isUseStateCallWithAlias(node: TSESTree.CallExpression, context: RuleContext) {
      return (isUseStateCall(node, context) || useStateAlias.some(F.flip(isReactHookCallWithNameLoose)(node)));
    }
    return {
      CallExpression(node) {
        const effectFunction = traverseUp(
          node,
          (n) =>
            n.parent?.type === NodeType.CallExpression
            && isUseEffectCallWithAlias(n.parent, context),
        );
        // TODO: support detecting effect cleanup functions as well or add a separate rule for that called `no-set-state-in-use-effect-cleanup`
        if (O.isNone(effectFunction)) return;
        const scope = context.sourceCode.getScope(node);
        if (scope.block !== effectFunction.value) return;
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
        F.pipe(
          name,
          O.flatMap(findVariable(scope)),
          O.flatMap(getVariableInit(0)),
          O.filter(is(NodeType.CallExpression)),
          O.filter(name => isUseStateCallWithAlias(name, context)),
          O.map(name => ({
            data: {
              setState: name,
            },
            messageId: "NO_SET_STATE_IN_USE_EFFECT",
            node,
          } as const)),
          O.map(context.report),
        );
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
