import { NodeType } from "@eslint-react/ast";
import { getPropName } from "@eslint-react/jsx";
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
        const hasValueTrue = value?.type === NodeType.JSXExpressionContainer
          && value.expression.type === NodeType.Literal
          && value.expression.value === true;
        if (!hasValueTrue) return;
        context.report({
          data: {
            propName,
          },
          messageId: "preferShorthandBoolean",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
