import { isOneOf, NodeType, traverseUp } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { Option as O } from "effect";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-component-did-update";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isThisSetState(node: TSESTree.CallExpression) {
  const { callee } = node;

  return (
    callee.type === NodeType.MemberExpression
    && callee.object.type === NodeType.ThisExpression
    && callee.property.type === NodeType.Identifier
    && callee.property.name === "setState"
  );
}

function isComponentDidUpdate(node: TSESTree.Node) {
  return isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node)
    && node.key.type === NodeType.Identifier
    && node.key.name === "componentDidUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'setState' in 'componentDidUpdate'",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_SET_STATE_IN_COMPONENT_DID_UPDATE:
        "Do not call `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        if (!isThisSetState(node)) return;
        const maybeParentClass = traverseUp(node, isOneOf([NodeType.ClassDeclaration, NodeType.ClassExpression]));
        if (O.isNone(maybeParentClass)) return;
        const parentClass = maybeParentClass.value;
        if (!isClassComponent(parentClass)) return;
        const maybeParentMethod = traverseUp(node, isComponentDidUpdate);
        if (O.isNone(maybeParentMethod)) return;
        const parentMethod = maybeParentMethod.value;
        if (parentMethod.parent !== parentClass.body) return;
        if (context.sourceCode.getScope(node).upper !== context.sourceCode.getScope(parentMethod)) return;
        context.report({
          messageId: "NO_SET_STATE_IN_COMPONENT_DID_UPDATE",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
