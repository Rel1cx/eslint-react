import { createRule } from "@/utils/create-rule";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener } from "@eslint-react/eslint";
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
  create: (context) => create(buildRichContext(context)),
  defaultOptions: [],
});

export function create(context: RichContext<MessageID, []>): RuleListener {
  // Fast path: skip if `dangerouslySetInnerHTML` is not present in the file
  if (!context.hasText("dangerouslySetInnerHTML")) return {};
  return {
    JSXElement(node) {
      // Check if the element has the 'dangerouslySetInnerHTML' prop
      const dsihProp = findAttribute(context._, node, "dangerouslySetInnerHTML");
      // If the prop is not found, do nothing
      if (dsihProp == null) return;
      // If the prop is found, report an error
      context.report({
        messageId: "default",
        node: dsihProp,
      });
    },
  };
}
