import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as JSX from "@eslint-react/jsx";
import { getSettingsFromContext } from "@eslint-react/shared";

import { createRule, findCustomComponent, findCustomComponentProp, getElementTypeOnJsxAndDom } from "../utils";

export const RULE_NAME = "no-missing-iframe-sandbox";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

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
      description: "Enforces explicit `sandbox` attribute for `iframe` elements.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMissingIframeSandbox: "Add missing 'sandbox' attribute on 'iframe' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const settings = getSettingsFromContext(context);
  const polymorphicPropName = settings.polymorphicPropName;
  const additionalComponents = settings.additionalComponents.filter((c) => c.as === "iframe");
  return {
    JSXElement(node) {
      const [elementNameOnJsx, elementNameOnDom] = getElementTypeOnJsxAndDom(
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
}
