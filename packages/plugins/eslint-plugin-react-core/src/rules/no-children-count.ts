import { isChildrenCount } from "@eslint-react/core";
import { getPragmaFromContext } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-count";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'Children.count'",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_CHILDREN_COUNT: "Using 'Children.count' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const pragma = getPragmaFromContext(context);

    return {
      MemberExpression(node) {
        if (isChildrenCount(node, context, pragma)) {
          context.report({
            messageId: "NO_CHILDREN_COUNT",
            node: node.property,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
