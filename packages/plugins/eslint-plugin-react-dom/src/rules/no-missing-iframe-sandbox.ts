import { getJsxAttribute, resolveJsxAttributeValue } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createJsxElementResolver, createRule } from "../utils";

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
      description: "Enforces an explicit 'sandbox' attribute for 'iframe' elements.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      addIframeSandbox: "Add 'sandbox' prop with value '{{value}}'.",
      noMissingIframeSandbox: "Add missing 'sandbox' prop on 'iframe' component.",
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
      // If the element is not an iframe, we don't need to do anything
      if (domElementType !== "iframe") return;

      // Find the 'sandbox' prop on the iframe element.
      const sandboxProp = getJsxAttribute(context, node)("sandbox");

      // If the 'sandbox' prop is missing, report an error
      if (sandboxProp == null) {
        context.report({
          messageId: "noMissingIframeSandbox",
          node: node.openingElement,
          suggest: [{
            messageId: "addIframeSandbox",
            data: { value: "" },
            fix(fixer) {
              // Suggest adding a 'sandbox' attribute
              return fixer.insertTextAfter(node.openingElement.name, ` sandbox=""`);
            },
          }],
        });
        return;
      }

      // Resolve the value of the 'sandbox' attribute
      const sandboxValue = resolveJsxAttributeValue(context, sandboxProp);
      // If the value is a static string, the prop is correctly used
      if (typeof sandboxValue.toStatic("sandbox") === "string") return;

      // If the value is not a static string (e.g., a variable), report an error
      context.report({
        messageId: "noMissingIframeSandbox",
        node: sandboxValue.node ?? sandboxProp,
        suggest: [
          {
            messageId: "addIframeSandbox",
            data: { value: "" },
            fix(fixer) {
              // Do not try to fix spread attributes
              if (sandboxValue.kind.startsWith("spread")) return null;
              // Suggest replacing the prop with a valid one
              return fixer.replaceText(sandboxProp, `sandbox=""`);
            },
          },
        ],
      });
    },
  };
}
