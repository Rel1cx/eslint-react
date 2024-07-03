import { getPropName } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "avoid-shorthand-boolean";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce boolean attributes notation in JSX",
    },
    messages: {
      AVOID_SHORTHAND_BOOLEAN: "Avoid using shorthand boolean attribute '{{propName}}'",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXAttribute(node) {
        const { value } = node;
        const propName = getPropName(node);
        if (value === null) {
          context.report({
            data: {
              propName,
            },
            messageId: "AVOID_SHORTHAND_BOOLEAN",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
