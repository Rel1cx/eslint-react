import { createRule } from "@/utils/create-rule";
import { findCreateElementChildrenProp } from "@/utils/find-create-element-children-prop";
import { removeJsxAttribute } from "@/utils/remove-jsx-attribute";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute, hasChildren } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

export const RULE_NAME = "no-children-prop-with-children";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "removeChildrenContent"
  | "removeChildrenProp";

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    CallExpression(node) {
      const childrenProp = findCreateElementChildrenProp(context, node);
      if (childrenProp == null) return;

      // `createElement(type, props, ...children)` treats arguments after the
      // props object as children content; without them there is no conflict
      if (node.arguments[2] == null) return;

      context.report({
        messageId: "default",
        node: childrenProp,
      });
    },
    JSXElement(node) {
      const childrenProp = findAttribute(context, node, "children");
      if (childrenProp == null || !hasChildren(node)) return;

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
            fix: (fixer) => removeJsxAttribute(context, fixer, childrenProp),
            messageId: "removeChildrenProp",
          },
          {
            fix(fixer) {
              const first = node.children.at(0);
              const last = node.children.at(-1);
              if (first == null || last == null) return [];
              return fixer.removeRange([first.range[0], last.range[1]]);
            },
            messageId: "removeChildrenContent",
          },
        ],
      });
    },
  };
}
