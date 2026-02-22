import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createRule } from "../../utils";

export const RULE_NAME = "no-children-to-array";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows the use of 'Children.toArray' from the 'react' package.",
    },
    messages: {
      default: "Using 'Children.toArray' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return defineRuleListener(
    {
      MemberExpression(node) {
        if (core.isChildrenToArray(context, node)) {
          context.report({
            messageId: "default",
            node: node.property,
          });
        }
      },
    },
  );
}
