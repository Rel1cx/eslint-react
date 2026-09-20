import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute, hasAttribute, isPaddingWhitespace } from "@eslint-react/jsx";

export const RULE_NAME = "no-dangerously-set-innerhtml-with-children";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows DOM elements from using 'dangerouslySetInnerHTML' and 'children' at the same time.",
    },
    messages: {
      default: "A DOM component cannot use both children and 'dangerouslySetInnerHTML'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `dangerouslySetInnerHTML` is not present in the file
  if (!context.sourceCode.text.includes("dangerouslySetInnerHTML")) return {};

  return {
    JSXElement(node) {
      if (!hasAttribute(context, node, "dangerouslySetInnerHTML")) return;
      // Look for a 'children' prop or a child node that is not just whitespace
      const fact = findAttribute(context, node, "children") ?? node.children.find((child) => !isPaddingWhitespace(child));
      if (fact == null) return;
      context.report({
        messageId: "default",
        node: fact,
      });
    },
  };
}
