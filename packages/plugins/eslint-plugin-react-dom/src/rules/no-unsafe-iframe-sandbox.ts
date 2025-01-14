import { getElementNameOnJsxAndHtml } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { CamelCase } from "string-ts";

import { createRule, getAdditionalAttributes, getAttributeNodeAndStringValue } from "../utils";

export const RULE_NAME = "no-unsafe-iframe-sandbox";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const unsafeCombinations = [
  ["allow-scripts", "allow-same-origin"],
] as const;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that add the 'sandbox' attribute internally.
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow unsafe iframe 'sandbox' attribute combinations",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnsafeIframeSandbox: "Unsafe 'sandbox' attribute value on 'iframe' component.",
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
        if (attributeValue == null) return;
        if (!unsafeCombinations.some((c) => c.every((v) => attributeValue.includes(v)))) return;
        context.report({
          messageId: "noUnsafeIframeSandbox",
          node: attributeNode ?? node.openingElement,
        });
      },
    };
  },
  defaultOptions: [],
});
