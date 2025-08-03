import type { RuleContext, RuleFeature, RuleSuggest } from "@eslint-react/kit";
import type { RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { createJsxElementResolver, createRule, resolveAttribute } from "../utils";

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
      const { attributes, domElementType } = resolver.resolve(node);
      if (domElementType !== "button") return;
      const typeAttribute = resolveAttribute(context, attributes, node, "type");
      if (typeAttribute.attributeValueString != null) return;
      if (typeAttribute.attribute == null) {
        context.report({
          messageId: "noMissingButtonType",
          node: node.openingElement,
          suggest: getSuggest((type) => (fixer: RuleFixer) => {
            return fixer.insertTextAfter(node.openingElement.name, ` ${typeAttribute.attributeName}="${type}"`);
          }),
        });
        return;
      }
      context.report({
        messageId: "noMissingButtonType",
        node: typeAttribute.attributeValue?.node ?? typeAttribute.attribute,
        suggest: getSuggest((type) => (fixer: RuleFixer) => {
          if (typeAttribute.attribute == null) return null;
          return fixer.replaceText(typeAttribute.attribute, `${typeAttribute.attributeName}="${type}"`);
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
