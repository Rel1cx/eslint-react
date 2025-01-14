import { getElementNameOnJsxAndHtml } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { CamelCase } from "string-ts";

import { createRule, getAdditionalAttributes, getAttributeNodeAndStringValue } from "../utils";

export const RULE_NAME = "no-missing-button-type";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that button component have an explicit 'type' attribute",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMissingButtonType: "Add missing 'type' attribute on 'button' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = getSettingsFromContext(context);
    const polymorphicPropName = settings.polymorphicPropName;
    const additionalComponents = settings.additionalComponents.filter((c) => c.as === "button");
    return {
      JSXElement(node) {
        const [elementNameOnJsx, elementNameOnHtml] = getElementNameOnJsxAndHtml(
          node.openingElement,
          context,
          polymorphicPropName,
          additionalComponents,
        );
        if (elementNameOnHtml !== "button") return;

        const { attributeNode, attributeValue } = getAttributeNodeAndStringValue(
          "type",
          node,
          context,
          getAdditionalAttributes(elementNameOnJsx, additionalComponents),
        );
        if (typeof attributeValue !== "string") {
          context.report({
            messageId: "noMissingButtonType",
            node: attributeNode ?? node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
