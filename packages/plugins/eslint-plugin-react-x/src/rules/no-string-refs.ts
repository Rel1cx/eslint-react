import { isString } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-string-refs";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function containsStringLiteral({ value }: TSESTree.JSXAttribute) {
  return value?.type === AST_NODE_TYPES.Literal && isString(value.value);
}

function containsStringExpressionContainer({ value }: TSESTree.JSXAttribute) {
  if (value?.type !== AST_NODE_TYPES.JSXExpressionContainer) return false;
  if (value.expression.type === AST_NODE_TYPES.Literal) return isString(value.expression.value);

  return value.expression.type === AST_NODE_TYPES.TemplateLiteral;
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
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== "ref") return;
        if (containsStringLiteral(node) || containsStringExpressionContainer(node)) {
          context.report({
            messageId: "noStringRefs",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
