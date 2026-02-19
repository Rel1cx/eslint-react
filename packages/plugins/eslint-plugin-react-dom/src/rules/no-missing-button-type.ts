import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleSuggest, defineRuleListener } from "@eslint-react/shared";

import { createJsxElementResolver, createRule } from "../utils";

export const RULE_NAME = "no-missing-button-type";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export const BUTTON_TYPES = ["button", "submit", "reset"] as const;

export type MessageID =
  | "addTypeAttribute"
  | "missingTypeAttribute";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces an explicit 'type' attribute for 'button' elements.",
    },
    hasSuggestions: true,
    messages: {
      addTypeAttribute: "Add type attribute with value '{{ type }}'.",
      missingTypeAttribute: "Missing an explicit type attribute for button.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const resolver = createJsxElementResolver(context);

  return defineRuleListener(
    {
      JSXElement(node) {
        // Resolve the JSX element to its corresponding DOM element type
        // If it's not a '<button>', skip it
        if (resolver.resolve(node).domElementType !== "button") {
          return;
        }

        // Check if the 'type' attribute already exists on the button element
        if (core.getJsxAttribute(context, node)("type") != null) {
          return;
        }

        // If the 'type' attribute is missing, report an error
        context.report({
          messageId: "missingTypeAttribute",
          node: node.openingElement,
          // Provide suggestions to automatically fix the issue
          suggest: BUTTON_TYPES.map((type): RuleSuggest<MessageID> => ({
            messageId: "addTypeAttribute",
            data: { type },
            // The fix function inserts the 'type' attribute with a suggested value
            fix: (fixer) => fixer.insertTextAfter(node.openingElement.name, ` type="${type}"`),
          })),
        });
      },
    },
  );
}
