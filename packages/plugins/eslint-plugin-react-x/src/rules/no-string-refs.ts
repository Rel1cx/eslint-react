import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-string-refs";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function containsStringLiteral({ value }: TSESTree.JSXAttribute) {
  return value?.type === T.Literal && typeof value.value === "string";
}

function containsStringExpressionContainer({ value }: TSESTree.JSXAttribute) {
  if (value?.type !== T.JSXExpressionContainer) {
    return false;
  }
  if (value.expression.type === T.Literal) {
    return typeof value.expression.value === "string";
  }

  return value.expression.type === T.TemplateLiteral;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using deprecated string refs",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noStringRefs: "[Deprecated] Use callback refs instead.",
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
      if (node.name.name !== "ref") {
        return;
      }
      if (containsStringLiteral(node) || containsStringExpressionContainer(node)) {
        context.report({
          messageId: "noStringRefs",
          node,
        });
      }
    },
  };
}
