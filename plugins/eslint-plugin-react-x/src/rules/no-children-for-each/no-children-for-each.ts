import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";

export const RULE_NAME = "no-children-for-each";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallows the use of 'Children.forEach' from the 'react' package.",
    },
    messages: {
      default: "Using 'Children.forEach' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return merge(
    {
      MemberExpression(node) {
        if (core.isChildrenForEach(context, node)) {
          context.report({
            messageId: "default",
            node: node.property,
          });
        }
      },
    },
  );
}
