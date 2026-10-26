import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute } from "@eslint-react/jsx";

export const RULE_NAME = "no-dangerously-set-innerhtml";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows DOM elements from using 'dangerouslySetInnerHTML'.",
    },
    messages: {
      default: "Using 'dangerouslySetInnerHTML' may have security implications.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `dangerouslySetInnerHTML` is not present in the file
  if (!context.sourceCode.text.includes("dangerouslySetInnerHTML")) return {};

  return {
    JSXElement(node) {
      const match = findAttribute(context, node, "dangerouslySetInnerHTML");
      if (match == null) return;
      context.report({
        messageId: "default",
        node: match.attribute,
      });
    },
  };
}
