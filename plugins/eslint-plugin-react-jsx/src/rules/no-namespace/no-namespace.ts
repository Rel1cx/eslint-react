import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getElementFullType } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

export const RULE_NAME = "no-namespace";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow JSX namespace syntax, as React does not support them.",
    },
    messages: {
      default: "A React component '{{name}}' must not be in a namespace, as React does not support them.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    // Visitor for JSX elements
    JSXElement(node) {
      const { name } = node.openingElement;
      if (name.type !== AST.JSXNamespacedName) {
        return;
      }
      context.report({
        data: {
          name: getElementFullType(node),
        },
        messageId: "default",
        node: name,
      });
    },
  };
}
