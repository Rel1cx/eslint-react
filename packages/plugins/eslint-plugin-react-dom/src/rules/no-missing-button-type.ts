import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { CamelCase } from "string-ts";

import { createRule, findCustomComponent, findCustomComponentProp, getElementNameOnJsxAndDom } from "../utils";

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
        const [elementNameOnJsx, elementNameOnDom] = getElementNameOnJsxAndDom(
          node.openingElement,
          context,
          polymorphicPropName,
          additionalComponents,
        );

        if (elementNameOnDom !== "button") return;

        const elementScope = context.sourceCode.getScope(node);
        const customComponent = findCustomComponent(elementNameOnJsx, additionalComponents);
        const customComponentProp = findCustomComponentProp("type", customComponent?.props ?? []);
        const propNameOnJsx = customComponentProp?.name ?? "type";
        const attributeNode = JSX.getAttributeNode(
          propNameOnJsx,
          elementScope,
          node.openingElement.attributes,
        );
        if (attributeNode != null) {
          const attributeScope = context.sourceCode.getScope(attributeNode);
          const attributeStaticValue = JSX.getAttributeStaticValue(attributeNode, attributeScope);
          const attributeStringValue = JSX.toResolvedAttributeValue(propNameOnJsx, attributeStaticValue);
          if (typeof attributeStringValue !== "string") {
            context.report({
              messageId: "noMissingButtonType",
              node: attributeNode,
            });
          }
          return;
        }
        if (typeof customComponentProp?.defaultValue !== "string") {
          context.report({
            messageId: "noMissingButtonType",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
