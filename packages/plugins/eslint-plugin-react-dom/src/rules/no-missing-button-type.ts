import { getJsxAttribute } from "@eslint-react/core";
import type { RuleContext, RuleFeature, RuleSuggest } from "@eslint-react/kit";
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
      description: "Enforces explicit `type` attribute for `button` elements.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
      if (resolver.resolve(node).domElementType !== "button") {
        return;
      }

      if (getJsxAttribute(context, node)("type") != null) {
        return;
      }

      context.report({
        messageId: "noMissingButtonType",
        node: node.openingElement,
        suggest: BUTTON_TYPES.map((type): RuleSuggest<MessageID> => ({
          messageId: "addButtonType",
          data: { type },
          fix: (fixer) => fixer.insertTextAfter(node.openingElement.name, ` type="${type}"`),
        })),
      });
    },
  };
}
