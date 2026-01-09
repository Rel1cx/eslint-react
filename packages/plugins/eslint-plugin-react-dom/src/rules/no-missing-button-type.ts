import { getJsxAttribute } from "@eslint-react/core";
import type { RuleContext, RuleFeature, RuleSuggest } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createJsxElementResolver, createRule } from "../utils";

export const RULE_NAME = "no-missing-button-type";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export const BUTTON_TYPES = ["button", "submit", "reset"] as const;

export type MessageID = CamelCase<typeof RULE_NAME> | RuleSuggestMessageID;

export type RuleSuggestMessageID = "addButtonType";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces an explicit 'type' attribute for 'button' elements.",
    },
    hasSuggestions: true,
    messages: {
      addButtonType: "Add 'type' attribute with value '{{type}}'.",
      noMissingButtonType: "Add missing 'type' attribute on 'button' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const resolver = createJsxElementResolver(context);

  return {
    JSXElement(node) {
      // Resolve the JSX element to its corresponding DOM element type
      // If it's not a '<button>', skip it
      if (resolver.resolve(node).domElementType !== "button") {
        return;
      }

      // Check if the 'type' attribute already exists on the button element
      if (getJsxAttribute(context, node)("type") != null) {
        return;
      }

      // If the 'type' attribute is missing, report an error
      context.report({
        messageId: "noMissingButtonType",
        node: node.openingElement,
        // Provide suggestions to automatically fix the issue
        suggest: BUTTON_TYPES.map((type): RuleSuggest<MessageID> => ({
          messageId: "addButtonType",
          data: { type },
          // The fix function inserts the 'type' attribute with a suggested value
          fix: (fixer) => fixer.insertTextAfter(node.openingElement.name, ` type="${type}"`),
        })),
      });
    },
  };
}
