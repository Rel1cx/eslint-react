import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { findAttribute, getAttributeStaticValue } from "@eslint-react/jsx";
import type { TSESTree } from "@typescript-eslint/types";

import { createJsxElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { isExternalLinkLike, isSafeRel } from "./lib";

export const RULE_NAME = "no-unsafe-target-blank";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = "default" | RuleSuggestMessageID;

export type RuleSuggestMessageID = "addRelNoreferrerNoopener";

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

  return merge(
    {
      JSXElement(node: TSESTree.JSXElement) {
        // Only process anchor tags (<a>)
        const { domElementType } = resolver.resolve(node);
        if (domElementType !== "a") return;

        // Check if target="_blank" is present
        const targetValueString = getAttributeStaticValue(context, node, "target");
        if (targetValueString !== "_blank") return;

        // Check if href points to an external resource
        const hrefValueString = getAttributeStaticValue(context, node, "href");
        if (!isExternalLinkLike(hrefValueString)) return;

        // Check if rel prop exists and is secure
        const relProp = findAttribute(context, node, "rel");

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
        const relValueString = getAttributeStaticValue(context, node, "rel");
        if (isSafeRel(relValueString)) return;

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
