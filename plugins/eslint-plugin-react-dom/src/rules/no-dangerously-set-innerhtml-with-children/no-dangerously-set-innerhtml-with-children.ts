import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { findAttribute, hasAttribute, isWhitespace } from "@eslint-react/jsx";

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

const DSIH = "dangerouslySetInnerHTML";

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: if the file doesn't contain `dangerouslySetInnerHTML`, we don't need to do anything
  if (!context.sourceCode.text.includes(DSIH)) {
    return {};
  }

  return merge(
    {
      JSXElement(node) {
        // Check if the element has the 'dangerouslySetInnerHTML' prop. If not, we can stop
        if (!hasAttribute(context, node, DSIH)) return;
        // Check for a 'children' prop or actual child nodes that are not just whitespace
        const childrenPropOrNode = findAttribute(context, node, "children")
          ?? node.children.find((child) => !isWhitespace(child));
        // If no children are found, the rule passes
        if (childrenPropOrNode == null) return;
        // If both 'dangerouslySetInnerHTML' and children are present, report an error
        context.report({
          messageId: "default",
          node: childrenPropOrNode,
        });
      },
    },
  );
}
