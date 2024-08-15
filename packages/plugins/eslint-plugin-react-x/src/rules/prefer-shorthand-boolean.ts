import { getPropName } from "@eslint-react/jsx";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-shorthand-boolean";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce using shorthand boolean attributes",
    },
    messages: {
      preferShorthandBoolean: "Use shorthand boolean attribute '{{propName}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXAttribute(node) {
        const { value } = node;
        const propName = getPropName(node);
        const hasValueTrue = value?.type === AST_NODE_TYPES.JSXExpressionContainer
          && value.expression.type === AST_NODE_TYPES.Literal
          && value.expression.value === true;
        if (!hasValueTrue) return;
        context.report({
          messageId: "preferShorthandBoolean",
          node,
          data: {
            propName,
          },
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
