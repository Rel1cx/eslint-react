/* tsl-ignore dx/no-duplicate-imports */
import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener } from "@eslint-react/eslint";

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
  create: (context) => create(buildRichContext(context)),
  defaultOptions: [],
});

export function create(context: RichContext<MessageID, []>): RuleListener {
  return {
    MemberExpression(node) {
      if (core.isChildrenForEach(context, node)) {
        context.report({
          messageId: "default",
          node: node.property,
        });
      }
    },
  };
}
