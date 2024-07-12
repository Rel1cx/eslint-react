import { NodeType } from "@eslint-react/ast";
import { Pred } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-string-refs";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function containsStringLiteral({ value }: TSESTree.JSXAttribute) {
  return value?.type === NodeType.Literal && Pred.isString(value.value);
}

function containsStringExpressionContainer({ value }: TSESTree.JSXAttribute) {
  if (value?.type !== NodeType.JSXExpressionContainer) return false;
  if (value.expression.type === NodeType.Literal) return Pred.isString(value.expression.value);

  return value.expression.type === NodeType.TemplateLiteral;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using deprecated string refs",
    },
    messages: {
      NO_STRING_REFS: "[Deprecated] Use callback refs instead.",
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
            messageId: "NO_STRING_REFS",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
