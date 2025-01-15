import type { _ } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule, findCustomComponent, findCustomComponentProp, getElementNameOnJsxAndDom } from "../utils";

export const RULE_NAME = "no-unsafe-target-blank";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isExternalLinkLike(value: string | _) {
  if (value == null) return false;
  return value.startsWith("https://")
    || /^(?:\w+:|\/\/)/u.test(value);
}

function isSafeRel(value: string | _) {
  if (value == null) return false;
  return value === "noreferrer"
    || /\bnoreferrer\b/u.test(value);
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: `disallow 'target="_blank"' on an external link without 'rel="noreferrer noopener"'`,
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnsafeTargetBlank:
        `Using 'target="_blank"' on an external link without 'rel="noreferrer noopener"' is a security risk.`,
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = getSettingsFromContext(context);
    const polymorphicPropName = settings.polymorphicPropName;
    const additionalComponents = settings.additionalComponents.filter((c) => c.as === "a");

    return {
      JSXElement(node: TSESTree.JSXElement) {
        const [elementNameOnJsx, elementNameOnDom] = getElementNameOnJsxAndDom(
          node.openingElement,
          context,
          polymorphicPropName,
          additionalComponents,
        );
        if (elementNameOnDom !== "a") return;
        const elementScope = context.sourceCode.getScope(node);
        const customComponent = findCustomComponent(elementNameOnJsx, additionalComponents);

        const getAttributeValue = (name: string) => {
          const customComponentProp = findCustomComponentProp(name, customComponent?.props ?? []);
          const propNameOnJsx = customComponentProp?.name ?? name;
          const attributeNode = JSX.getAttributeNode(
            propNameOnJsx,
            elementScope,
            node.openingElement.attributes,
          );
          if (attributeNode == null) return customComponentProp?.defaultValue;
          const attributeScope = context.sourceCode.getScope(attributeNode);
          const attributeStaticValue = JSX.getAttributeStaticValue(attributeNode, attributeScope);
          return JSX.toResolvedAttributeValue(propNameOnJsx, attributeStaticValue);
        };

        if (getAttributeValue("target") !== "_blank") {
          return;
        }
        if (!isExternalLinkLike(getAttributeValue("href"))) {
          return;
        }
        if (isSafeRel(getAttributeValue("rel"))) {
          return;
        }
        context.report({
          messageId: "noUnsafeTargetBlank",
          node,
        });
      },
    };
  },
  defaultOptions: [],
});
