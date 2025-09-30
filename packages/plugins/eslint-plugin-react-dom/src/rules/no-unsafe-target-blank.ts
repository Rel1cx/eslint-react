import { getJsxAttribute, resolveJsxAttributeValue } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createJsxElementResolver, createRule } from "../utils";

export const RULE_NAME = "no-unsafe-target-blank";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME> | RuleSuggestMessageID;

export type RuleSuggestMessageID = "addRelNoreferrerNoopener";

/**
 * Checks if a value appears to be an external link.
 * External links typically start with http(s):// or have protocol-relative format.
 * @param value - The value to check
 * @returns Whether the value represents an external link
 */
function isExternalLinkLike(value: unknown): boolean {
  if (typeof value !== "string") return false;

  return value.startsWith("https://") || /^(?:\w+:|\/\/)/u.test(value);
}

/**
 * Checks if a rel attribute value contains the necessary security attributes.
 * At minimum, it should contain "noreferrer".
 * @param value - The rel attribute value to check
 * @returns Whether the rel value is considered secure
 */
function isSafeRel(value: unknown): boolean {
  if (typeof value !== "string") return false;

  return value === "noreferrer" || /\bnoreferrer\b/u.test(value);
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
      // Only process anchor tags (<a>)
      const { domElementType } = resolver.resolve(node);
      if (domElementType !== "a") return;

      // Get access to the component attributes
      const findAttribute = getJsxAttribute(
        context,
        node.openingElement.attributes,
        context.sourceCode.getScope(node),
      );

      // Check if target="_blank" is present
      const targetAttribute = findAttribute("target");
      if (targetAttribute == null) return;

      const targetAttributeValue = resolveJsxAttributeValue(context, targetAttribute).toStatic("target");
      if (targetAttributeValue !== "_blank") return;

      // Check if href points to an external resource
      const hrefAttribute = findAttribute("href");
      if (hrefAttribute == null) return;

      const hrefAttributeValue = resolveJsxAttributeValue(context, hrefAttribute).toStatic("href");
      if (!isExternalLinkLike(hrefAttributeValue)) return;

      // Check if rel attribute exists and is secure
      const relAttribute = findAttribute("rel");

      // No rel attribute case - suggest adding one
      if (relAttribute == null) {
        context.report({
          messageId: "noUnsafeTargetBlank",
          node: node.openingElement,
          suggest: [{
            messageId: "addRelNoreferrerNoopener",
            fix(fixer) {
              return fixer.insertTextAfter(
                node.openingElement.name,
                ` rel="noreferrer noopener"`,
              );
            },
          }],
        });
        return;
      }

      // Check if existing rel attribute is secure
      const relAttributeValue = resolveJsxAttributeValue(context, relAttribute).toStatic("rel");
      if (isSafeRel(relAttributeValue)) return;

      // Existing rel attribute is not secure - suggest replacing it
      context.report({
        messageId: "noUnsafeTargetBlank",
        node: relAttribute,
        suggest: [{
          messageId: "addRelNoreferrerNoopener",
          fix(fixer) {
            return fixer.replaceText(relAttribute, `rel="noreferrer noopener"`);
          },
        }],
      });
    },
  };
}
