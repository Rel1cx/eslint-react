import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { CamelCase } from "string-ts";

import { createRule, findCustomComponent, findCustomComponentProp, getElementNameOnJsxAndDom } from "../utils";

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

function hasValidSandBox(value: unknown) {
  return typeof value === "string"
    && value
      .split(" ")
      .every((value) => validTypes.some((valid) => valid === value));
}

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
        const [elementNameOnJsx, elementNameOnDom] = getElementNameOnJsxAndDom(
          context,
          node,
          polymorphicPropName,
          additionalComponents,
        );

        if (elementNameOnDom !== "iframe") return;

        const elementScope = context.sourceCode.getScope(node);
        const customComponent = findCustomComponent(elementNameOnJsx, additionalComponents);
        const customComponentProp = findCustomComponentProp("sandbox", customComponent?.attributes ?? []);
        const propNameOnJsx = customComponentProp?.name ?? "sandbox";
        const attributeNode = JSX.getAttribute(
          propNameOnJsx,
          node.openingElement.attributes,
          elementScope,
        );
        if (attributeNode != null) {
          const attributeScope = context.sourceCode.getScope(attributeNode);
          const attributeValue = JSX.getAttributeValue(attributeNode, propNameOnJsx, attributeScope);
          if (attributeValue.kind === "some" && hasValidSandBox(attributeValue.value)) return;
          context.report({
            messageId: "noMissingIframeSandbox",
            node: attributeNode,
          });
          return;
        }
        if (!hasValidSandBox(customComponentProp?.defaultValue)) {
          context.report({
            messageId: "noMissingIframeSandbox",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
