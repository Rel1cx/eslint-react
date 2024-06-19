import { isChildrenToArray } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-to-array";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'Children.toArray'",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_CHILDREN_TO_ARRAY:
        "Using 'Children.toArray' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      MemberExpression(node) {
        if (isChildrenToArray(node, context)) {
          context.report({
            messageId: "NO_CHILDREN_TO_ARRAY",
            node: node.property,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
