import * as AST from "@eslint-react/ast";
import type { RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-complex-conditional-rendering";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow complex conditional rendering",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noComplexConditionalRendering:
        "Avoid complex conditional rendering. Extract the logic into separate elements or components.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const visitorFunction = (node: TSESTree.Node): void => {
      const jsxExpContainer = node.parent?.parent;
      if (!AST.is(T.JSXExpressionContainer)(jsxExpContainer)) {
        return;
      }
      if (!AST.isOneOf([T.JSXElement, T.JSXFragment])(jsxExpContainer.parent)) {
        return;
      }
      if (!jsxExpContainer.parent.children.includes(jsxExpContainer)) {
        return;
      }
      context.report({
        messageId: "noComplexConditionalRendering",
        node: jsxExpContainer,
      });
    };
    return {
      "JSXExpressionContainer > ConditionalExpression > ConditionalExpression": visitorFunction,
      "JSXExpressionContainer > ConditionalExpression > LogicalExpression": visitorFunction,
      "JSXExpressionContainer > LogicalExpression > ConditionalExpression": visitorFunction,
      "JSXExpressionContainer > LogicalExpression[operator='&&'] > LogicalExpression[operator='||']": visitorFunction,
      "JSXExpressionContainer > LogicalExpression[operator='||'] > LogicalExpression[operator='&&']": visitorFunction,
    };
  },
  defaultOptions: [],
});
