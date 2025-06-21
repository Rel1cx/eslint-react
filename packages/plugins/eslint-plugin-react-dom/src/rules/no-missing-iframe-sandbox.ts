import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";

import { createJsxElementResolver, createRule, findCustomComponentProp } from "../utils";

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
      const customComponentProp = findCustomComponentProp("sandbox", attributes);
      const propNameOnJsx = customComponentProp?.name ?? "sandbox";
      const attributeNode = ER.getAttribute(
        context,
        propNameOnJsx,
        node.openingElement.attributes,
        context.sourceCode.getScope(node),
      );
      if (attributeNode != null) {
        const attributeValue = ER.getAttributeValue(
          context,
          attributeNode,
          propNameOnJsx,
        );
        if (attributeValue.kind !== "some" || typeof attributeValue.value !== "string") {
          context.report({
            messageId: "noMissingIframeSandbox",
            node: attributeNode,
            suggest: [
              {
                messageId: "addIframeSandbox",
                data: { value: "" },
                fix(fixer) {
                  return fixer.replaceText(attributeNode, `${propNameOnJsx}=""`);
                },
              },
            ],
          });
        }
        return;
      }
      if (typeof customComponentProp?.defaultValue !== "string") {
        context.report({
          messageId: "noMissingIframeSandbox",
          node,
          suggest: [
            {
              messageId: "addIframeSandbox",
              data: { value: "" },
              fix(fixer) {
                return fixer.insertTextAfter(node.openingElement.name, ` ${propNameOnJsx}=""`);
              },
            },
          ],
        });
      }
    },
  };
}
