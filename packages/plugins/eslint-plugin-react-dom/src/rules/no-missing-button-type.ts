import { getAttribute, resolveAttributeValue } from "@eslint-react/core";
import type { RuleContext, RuleFeature, RuleSuggest } from "@eslint-react/kit";
import type { RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";
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
      const { domElementType } = resolver.resolve(node);
      if (domElementType !== "button") return;
      const getAttributeEx = getAttribute(context, node.openingElement.attributes, context.sourceCode.getScope(node));
      const typeAttribute = getAttributeEx("type");
      if (typeAttribute == null) {
        context.report({
          messageId: "noMissingButtonType",
          node: node.openingElement,
          suggest: getSuggest((type) => (fixer: RuleFixer) => {
            return fixer.insertTextAfter(node.openingElement.name, ` type="${type}"`);
          }),
        });
        return;
      }
      if (typeof resolveAttributeValue(context, typeAttribute).toStatic("type") === "string") return;
      context.report({
        messageId: "noMissingButtonType",
        node: typeAttribute,
        suggest: getSuggest((type) => (fixer: RuleFixer) => {
          return fixer.replaceText(typeAttribute, `type="${type}"`);
        }),
      });
    },
  };
}

function getSuggest(getFix: (type: string) => RuleSuggest["fix"]): RuleSuggest<MessageID>[] {
  return BUTTON_TYPES.map((type) => ({
    messageId: "addButtonType",
    data: { type },
    fix: getFix(type),
  }));
}
