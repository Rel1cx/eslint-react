import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { createRule } from "../utils";

export const RULE_NAME = "no-string-style-prop";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows the use of string style prop.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noStringStyleProp: "Do not use string style prop. Use an object instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXAttribute(node) {
      if (node.name.name !== "style") return;
      const styleText = getAttributeValueText(context, node.value);
      if (styleText == null) return;
      context.report({
        messageId: "noStringStyleProp",
        node,
      });
    },
  };
}

function getAttributeValueText(context: RuleContext, node: TSESTree.JSXAttribute["value"]) {
  if (node == null) return null;
  switch (true) {
    case node.type === T.Literal
      && typeof node.value === "string":
      return context.sourceCode.getText(node);
    case node.type === T.JSXExpressionContainer
      && node.expression.type === T.Literal
      && typeof node.expression.value === "string":
      return context.sourceCode.getText(node.expression);
    case node.type === T.JSXExpressionContainer
      && node.expression.type === T.TemplateLiteral:
      return context.sourceCode.getText(node.expression);
    default:
      return null;
  }
}
