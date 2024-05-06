import { isChildrenMap } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-map";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'Children.map'",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_CHILDREN_MAP: "Using 'Children.map' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      MemberExpression(node) {
        if (isChildrenMap(node, context)) {
          context.report({
            messageId: "NO_CHILDREN_MAP",
            node: node.property,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
