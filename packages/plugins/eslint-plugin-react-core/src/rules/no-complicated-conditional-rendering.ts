import { is, isOneOf, NodeType } from "@eslint-react/ast";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";
export const RULE_NAME = "no-complicated-conditional-rendering";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    deprecated: true,
    docs: {
      description: "disallow complicated conditional rendering",
      requiresTypeChecking: true,
    },
    messages: {
      NO_COMPLICATED_CONDITIONAL_RENDERING:
        "Avoid complicated conditional rendering. Extract the logic into separate elements or components.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    function check(node: TSESTree.Node) {
      const jsxExpContainer = node.parent?.parent;
      if (!is(NodeType.JSXExpressionContainer)(jsxExpContainer)) return;
      if (!isOneOf([NodeType.JSXElement, NodeType.JSXFragment])(jsxExpContainer.parent)) return;
      if (!jsxExpContainer.parent.children.includes(jsxExpContainer)) return;
      context.report({ messageId: "NO_COMPLICATED_CONDITIONAL_RENDERING", node: jsxExpContainer });
    }

    return {
      "JSXExpressionContainer > ConditionalExpression > ConditionalExpression": check,
      "JSXExpressionContainer > ConditionalExpression > LogicalExpression": check,
      "JSXExpressionContainer > LogicalExpression > ConditionalExpression": check,
      "JSXExpressionContainer > LogicalExpression[operator='&&'] > LogicalExpression[operator='||']": check,
      "JSXExpressionContainer > LogicalExpression[operator='||'] > LogicalExpression[operator='&&']": check,
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
