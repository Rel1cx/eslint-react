import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { createJsxElementResolver, createRule } from "../../utils";

export const RULE_NAME = "no-unsafe-target-blank";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = "default" | RuleSuggestMessageID;

export type RuleSuggestMessageID = "addRelNoreferrerNoopener";

/**
 * Check if a value appears to be an external link.
 * External links typically start with http(s):// or have protocol-relative format.
 * @param value The value to check
 * @returns Whether the value represents an external link
 */
function isExternalLinkLike(value: unknown): boolean {
  if (typeof value !== "string") return false;

  return value.startsWith("https://") || /^(?:\w+:|\/\/)/u.test(value);
}

/**
 * Check if a rel prop value contains the necessary security attributes.
 * At minimum, it should contain "noreferrer".
 * @param value The rel prop value to check
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
      description: "Disallows 'target=\"_blank\"' without 'rel=\"noreferrer noopener\"'.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      addRelNoreferrerNoopener: `Add 'rel="noreferrer noopener"' to the link to prevent security risks.`,
      default: `Using 'target="_blank"' on an external link without 'rel="noreferrer noopener"' is a security risk.`,
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const resolver = createJsxElementResolver(context);

  return defineRuleListener(
    {
      JSXElement(node: TSESTree.JSXElement) {
        // Only process anchor tags (<a>)
        const { domElementType } = resolver.resolve(node);
        if (domElementType !== "a") return;

        // Get access to the component attributes
        const findAttribute = core.getJsxAttribute(context, node);

        // Check if target="_blank" is present
        const targetProp = findAttribute("target");
        if (targetProp == null) return;

        const targetValue = core.resolveJsxAttributeValue(context, targetProp).toStatic("target");
        if (targetValue !== "_blank") return;

        // Check if href points to an external resource
        const hrefProp = findAttribute("href");
        if (hrefProp == null) return;

        const hrefValue = core.resolveJsxAttributeValue(context, hrefProp).toStatic("href");
        if (!isExternalLinkLike(hrefValue)) return;

        // Check if rel prop exists and is secure
        const relProp = findAttribute("rel");

        // No rel prop case - suggest adding one
        if (relProp == null) {
          context.report({
            messageId: "default",
            node: node.openingElement,
            suggest: [{
              fix(fixer) {
                return fixer.insertTextAfter(
                  node.openingElement.name,
                  ` rel="noreferrer noopener"`,
                );
              },
              messageId: "addRelNoreferrerNoopener",
            }],
          });
          return;
        }

        // Check if existing rel prop is secure
        const relValue = core.resolveJsxAttributeValue(context, relProp).toStatic("rel");
        if (isSafeRel(relValue)) return;

        // Existing rel prop is not secure - suggest replacing it
        context.report({
          messageId: "default",
          node: relProp,
          suggest: [{
            fix(fixer) {
              return fixer.replaceText(relProp, `rel="noreferrer noopener"`);
            },
            messageId: "addRelNoreferrerNoopener",
          }],
        });
      },
    },
  );
}
