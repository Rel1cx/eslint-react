import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createJsxElementResolver, createRule, resolveAttribute } from "../utils";

export const RULE_NAME = "no-missing-iframe-sandbox";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME> | RuleSuggestMessageID;

export type RuleSuggestMessageID = "addIframeSandbox";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces explicit `sandbox` attribute for `iframe` elements.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      addIframeSandbox: "Add 'sandbox' attribute with value '{{value}}'.",
      noMissingIframeSandbox: "Add missing 'sandbox' attribute on 'iframe' component.",
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
      if (domElementType !== "iframe") return;
      const sandboxAttribute = resolveAttribute(context, attributes, node, "sandbox");
      if (sandboxAttribute.attributeValueString != null) return;
      if (sandboxAttribute.attribute == null) {
        context.report({
          messageId: "noMissingIframeSandbox",
          node: node.openingElement,
          suggest: [{
            messageId: "addIframeSandbox",
            data: { value: "" },
            fix(fixer) {
              return fixer.insertTextAfter(node.openingElement.name, ` ${sandboxAttribute.attributeName}=""`);
            },
          }],
        });
        return;
      }
      context.report({
        messageId: "noMissingIframeSandbox",
        node: sandboxAttribute.attributeValue?.node ?? sandboxAttribute.attribute,
        suggest: [{
          messageId: "addIframeSandbox",
          data: { value: "" },
          fix(fixer) {
            if (sandboxAttribute.attribute == null) return null;
            return fixer.replaceText(sandboxAttribute.attribute, `${sandboxAttribute.attributeName}=""`);
          },
        }],
      });
    },
  };
}
