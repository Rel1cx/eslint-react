import { getElementNameOnJsxAndHtml } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { CamelCase } from "string-ts";

import { createRule, getAdditionalAttributes, getAttributeNodeAndStringValue } from "../utils";

export const RULE_NAME = "no-missing-iframe-sandbox";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const validTypes = [
  "",
  "allow-downloads",
  "allow-downloads-without-user-activation",
  "allow-forms",
  "allow-modals",
  "allow-orientation-lock",
  "allow-pointer-lock",
  "allow-popups",
  "allow-popups-to-escape-sandbox",
  "allow-presentation",
  "allow-same-origin",
  "allow-scripts",
  "allow-storage-access-by-user-activation",
  "allow-top-navigation",
  "allow-top-navigation-by-user-activation",
  "allow-top-navigation-to-custom-protocols",
] as const;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that 'iframe' component have an explicit 'sandbox' attribute",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMissingIframeSandbox: "Add missing 'sandbox' attribute on 'iframe' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = getSettingsFromContext(context);
    const polymorphicPropName = settings.polymorphicPropName;
    const additionalComponents = settings.additionalComponents.filter((c) => c.as === "iframe");
    return {
      JSXElement(node) {
        const [elementNameOnJsx, elementNameOnHtml] = getElementNameOnJsxAndHtml(
          node.openingElement,
          context,
          polymorphicPropName,
          additionalComponents,
        );
        if (elementNameOnHtml !== "iframe") return;

        const { attributeNode, attributeValue } = getAttributeNodeAndStringValue(
          "sandbox",
          node,
          context,
          getAdditionalAttributes(elementNameOnJsx, additionalComponents),
        );
        const hasValidSandboxValue = typeof attributeValue === "string"
          && attributeValue
            .split(" ")
            .every((value) => validTypes.some((valid) => valid === value));
        if (hasValidSandboxValue) return;
        context.report({
          messageId: "noMissingIframeSandbox",
          node: attributeNode ?? node.openingElement,
        });
      },
    };
  },
  defaultOptions: [],
});
