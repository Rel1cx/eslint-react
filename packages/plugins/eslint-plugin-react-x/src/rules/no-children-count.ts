import { isChildrenCount } from "@eslint-react/core";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-count";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'Children.count'",
    },
    messages: {
      noChildrenCount: "Using 'Children.count' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      MemberExpression(node) {
        if (isChildrenCount(node, context)) {
          context.report({
            messageId: "noChildrenCount",
            node: node.property,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
