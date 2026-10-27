import { createRule } from "@/utils/create-rule";
import { removeJSXAttribute } from "@/utils/remove-jsx-attribute";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute, findCreateElementProp, hasMeaningfulChildren, parseCreateElementCall } from "@eslint-react/jsx";

export const RULE_NAME = "no-children-prop-with-children";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "remove-children-prop"
  | "remove-children-content";

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
      "remove-children-prop": "Remove the 'children' prop.",
      "remove-children-content": "Remove the nested children content.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    CallExpression(node) {
      const call = parseCreateElementCall(context, node);
      if (call == null) {
        return;
      }

      const prop = findCreateElementProp(context, call, "children");
      // `createElement(type, props, ...children)` treats arguments after the
      // props object as children content; without them there is no conflict
      if (prop == null || call.childrenArguments.length === 0) {
        return;
      }

      context.report({
        messageId: "default",
        node: prop,
      });
    },
    JSXElement(node) {
      const prop = findAttribute(node, "children");
      if (prop == null || !hasMeaningfulChildren(node)) {
        return;
      }

      context.report({
        messageId: "default",
        node: prop,
        suggest: [
          {
            fix(fixer) {
              return removeJSXAttribute(context, fixer, prop);
            },
            messageId: "remove-children-prop",
          },
          {
            fix(fixer) {
              const first = node.children.at(0);
              const last = node.children.at(-1);
              if (first == null || last == null) return [];
              return fixer.removeRange([first.range[0], last.range[1]]);
            },
            messageId: "remove-children-content",
          },
        ],
      });
    },
  };
}
