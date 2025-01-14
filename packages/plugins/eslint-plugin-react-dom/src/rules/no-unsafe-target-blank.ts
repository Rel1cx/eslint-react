import { getElementNameOnJsxAndHtml } from "@eslint-react/core";
import type { _ } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule, getAdditionalAttributes, getAttributeNodeAndStringValue } from "../utils";

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
        const [elementNameOnJsx, elementNameOnHtml] = getElementNameOnJsxAndHtml(
          node.openingElement,
          context,
          polymorphicPropName,
          additionalComponents,
        );

        if (elementNameOnHtml !== "a") return;

        const getAttributeValue = (name: string) => {
          return getAttributeNodeAndStringValue(
            name,
            node,
            context,
            getAdditionalAttributes(elementNameOnJsx, additionalComponents),
          ).attributeValue;
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
