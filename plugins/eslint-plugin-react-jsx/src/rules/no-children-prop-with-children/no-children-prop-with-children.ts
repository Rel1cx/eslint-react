import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { findAttribute, hasChildren } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { getChildrenContentRange, getPropRemovalRange } from "./lib";

import { createRule } from "@/utils/create-rule";

export const RULE_NAME = "no-children-prop-with-children";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = "default" | RuleSuggestMessageID;

export type RuleSuggestMessageID =
  | "removeChildrenProp"
  | "removeChildrenContent";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows passing 'children' as a prop when children are also passed as nested content.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      default: "Do not pass 'children' as a prop when the element already has children content.",
      removeChildrenContent: "Remove the nested children content.",
      removeChildrenProp: "Remove the 'children' prop.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return merge({
    JSXElement(node) {
      const childrenProp = findAttribute(context, node, "children");
      if (childrenProp == null) return;
      if (!hasChildren(node)) return;

      // If children comes from a spread attribute we cannot safely remove
      // just the `children` key from it, so report without suggestions.
      if (childrenProp.type !== AST.JSXAttribute) {
        context.report({ messageId: "default", node: childrenProp });
        return;
      }

      context.report({
        messageId: "default",
        node: childrenProp,
        suggest: [
          {
            fix(fixer) {
              const [start, end] = getPropRemovalRange(context, childrenProp);
              return fixer.removeRange([start, end]);
            },
            messageId: "removeChildrenProp",
          },
          {
            fix(fixer) {
              const range = getChildrenContentRange(node);
              if (range == null) return [];
              return fixer.removeRange(range);
            },
            messageId: "removeChildrenContent",
          },
        ],
      });
    },
  });
}
