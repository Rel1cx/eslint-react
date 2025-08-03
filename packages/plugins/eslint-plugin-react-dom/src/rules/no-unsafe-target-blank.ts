import type { unit } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";

import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import type { CamelCase } from "string-ts";
import { createJsxElementResolver, createRule, resolveAttribute } from "../utils";

export const RULE_NAME = "no-unsafe-target-blank";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME> | RuleSuggestMessageID;

export type RuleSuggestMessageID = "addRelNoreferrerNoopener";

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
    fixable: "code",
    hasSuggestions: true,
    messages: {
      addRelNoreferrerNoopener: `Add 'rel="noreferrer noopener"' to the link to prevent security risks.`,
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
      const targetAttribute = resolveAttribute(context, attributes, node, "target");
      if (targetAttribute.attributeValueString !== "_blank") {
        return;
      }
      const hrefAttribute = resolveAttribute(context, attributes, node, "href");
      if (!isExternalLinkLike(hrefAttribute.attributeValueString)) {
        return;
      }
      const relAttribute = resolveAttribute(context, attributes, node, "rel");
      if (isSafeRel(relAttribute.attributeValueString)) {
        return;
      }
      if (relAttribute.attribute == null) {
        context.report({
          messageId: "noUnsafeTargetBlank",
          node: node.openingElement,
          suggest: [{
            messageId: "addRelNoreferrerNoopener",
            fix(fixer) {
              return fixer.insertTextAfter(
                node.openingElement.name,
                ` ${relAttribute.attributeName}="noreferrer noopener"`,
              );
            },
          }],
        });
        return;
      }
      context.report({
        messageId: "noUnsafeTargetBlank",
        node: relAttribute.attributeValue?.node ?? relAttribute.attribute,
        suggest: [{
          messageId: "addRelNoreferrerNoopener",
          fix(fixer) {
            if (relAttribute.attribute == null) return null;
            return fixer.replaceText(relAttribute.attribute, `${relAttribute.attributeName}="noreferrer noopener"`);
          },
        }],
      });
    },
  };
}
