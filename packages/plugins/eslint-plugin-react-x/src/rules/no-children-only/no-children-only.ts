import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createRule } from "../../utils";

export const RULE_NAME = "no-children-only";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallows the use of 'Children.only' from the 'react' package.",
    },
    messages: {
      default: "Using 'Children.only' is uncommon and can lead to fragile code. Use alternatives instead.",
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
        if (core.isChildrenOnly(context, node)) {
          context.report({
            messageId: "default",
            node: node.property,
          });
        }
      },
    },
  );
}
