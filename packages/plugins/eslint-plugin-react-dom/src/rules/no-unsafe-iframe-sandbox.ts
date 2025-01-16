import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { CamelCase } from "string-ts";

import { createRule, findCustomComponent, findCustomComponentProp, getElementNameOnJsxAndDom } from "../utils";

export const RULE_NAME = "no-unsafe-iframe-sandbox";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const unsafeSandboxValues = [
  ["allow-scripts", "allow-same-origin"],
] as const;

function hasSafeSandbox(value: unknown) {
  if (typeof value !== "string") return false;
  return !unsafeSandboxValues.some((values) => {
    return values.every((v) => value.includes(v));
  });
}

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
        const [elementNameOnJsx, elementNameOnDom] = getElementNameOnJsxAndDom(
          node,
          context,
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
          if (attributeValue.kind === "some" && !hasSafeSandbox(attributeValue.value)) {
            context.report({
              messageId: "noUnsafeIframeSandbox",
              node: attributeNode,
            });
            return;
          }
        }
        if (customComponentProp?.defaultValue == null) return;
        if (!hasSafeSandbox(customComponentProp.defaultValue)) {
          context.report({
            messageId: "noUnsafeIframeSandbox",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
