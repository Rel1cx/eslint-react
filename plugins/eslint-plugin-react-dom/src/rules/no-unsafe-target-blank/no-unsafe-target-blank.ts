import { createJsxElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute, getAttributeStaticValue } from "@eslint-react/jsx";
import { isExternalLinkLike, isSafeRel } from "./lib";

export const RULE_NAME = "no-unsafe-target-blank";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "addRelNoreferrerNoopener"
  | "default";

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const resolver = createJsxElementResolver(context);

  return {
    JSXElement(node) {
      const { domElementType } = resolver.resolve(node);
      if (domElementType !== "a") return;

      const targetValue = getAttributeStaticValue(context, node, "target");
      if (targetValue !== "_blank") return;

      const hrefValue = getAttributeStaticValue(context, node, "href");
      if (!isExternalLinkLike(hrefValue)) return;

      const relProp = findAttribute(context, node, "rel");
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

      const relValue = getAttributeStaticValue(context, node, "rel");
      if (isSafeRel(relValue)) return;

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
  };
}
