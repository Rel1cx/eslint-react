import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";

export const RULE_NAME = "no-clone-element";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallows 'cloneElement'.",
    },
    messages: {
      default: "Using 'cloneElement' is uncommon and can lead to fragile code. Use alternatives instead.",
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
      CallExpression(node) {
        if (core.isCloneElementCall(context, node)) {
          context.report({
            messageId: "default",
            node,
          });
        }
      },
    },
  );
}
