import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";

import { unit } from "@eslint-react/eff";

import { createJsxElementResolver, createRule, findCustomComponentProp } from "../utils";

export const RULE_NAME = "no-unsafe-target-blank";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isExternalLinkLike(value: string | unit) {
  if (value == null) return false;
  return value.startsWith("https://")
    || /^(?:\w+:|\/\/)/u.test(value);
}

function isSafeRel(value: string | unit) {
  if (value == null) return false;
  return value === "noreferrer"
    || /\bnoreferrer\b/u.test(value);
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: 'Disallow `target="_blank"` without `rel="noreferrer noopener"`.',
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnsafeTargetBlank:
        `Using 'target="_blank"' on an external link without 'rel="noreferrer noopener"' is a security risk.`,
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
    JSXElement(node: TSESTree.JSXElement) {
      const { attributes, domElementType } = resolver.resolve(node);
      if (domElementType !== "a") return;
      const elementScope = context.sourceCode.getScope(node);

      const getAttributeStringValue = (name: string) => {
        const customComponentProp = findCustomComponentProp(name, attributes);
        const propNameOnJsx = customComponentProp?.name ?? name;
        const attributeNode = ER.getAttribute(
          context,
          propNameOnJsx,
          node.openingElement.attributes,
          elementScope,
        );
        if (attributeNode == null) return customComponentProp?.defaultValue;
        const attributeValue = ER.getAttributeValue(context, attributeNode, propNameOnJsx);
        if (attributeValue.kind === "some" && typeof attributeValue.value === "string") {
          return attributeValue.value;
        }
        return unit;
      };

      if (getAttributeStringValue("target") !== "_blank") {
        return;
      }
      if (!isExternalLinkLike(getAttributeStringValue("href"))) {
        return;
      }
      if (isSafeRel(getAttributeStringValue("rel"))) {
        return;
      }
      context.report({
        messageId: "noUnsafeTargetBlank",
        node,
      });
    },
  };
}
