import { createJsxElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute, getAttributeStaticValue } from "@eslint-react/jsx";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { isExternalLinkLike, isSafeRel } from "./lib";

export const RULE_NAME = "no-unsafe-target-blank";

export const RULE_FEATURES = [
  "CFG",
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "add-rel-noopener"
  | "add-rel-noreferrer-noopener"
  | "default"
  | "default-allow-referrer";

type Options = readonly [
  | null
  | {
    allowReferrer?: boolean;
  },
];

export const defaultOptions = [
  {
    allowReferrer: false,
  },
] as const satisfies Options;

const schema = [
  {
    type: "object",
    additionalProperties: false,
    properties: {
      allowReferrer: {
        type: "boolean",
        description: "Allow 'rel=\"noopener\"' without 'noreferrer' so referrer information is preserved.",
        default: false,
      },
    },
  },
] as const satisfies JSONSchema4[];

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    defaultOptions: [...defaultOptions],
    docs: {
      description: "Disallows 'target=\"_blank\"' without 'rel=\"noreferrer noopener\"'.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      "add-rel-noopener": `Add 'rel="noopener"' to the link to prevent security risks.`,
      "add-rel-noreferrer-noopener": `Add 'rel="noreferrer noopener"' to the link to prevent security risks.`,
      default: `Using 'target="_blank"' on an external link without 'rel="noreferrer noopener"' is a security risk.`,
      "default-allow-referrer": `Using 'target="_blank"' on an external link without 'rel="noopener"' is a security risk.`,
    },
    schema,
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, Options>): RuleListener {
  const { allowReferrer = false } = context.options[0] ?? defaultOptions[0];
  const safeRel = `rel="${allowReferrer ? "noopener" : "noreferrer noopener"}"`;
  const messageId = allowReferrer ? "default-allow-referrer" : "default";
  const suggestionMessageId = allowReferrer ? "add-rel-noopener" : "add-rel-noreferrer-noopener";
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
          messageId,
          node: node.openingElement,
          suggest: [{
            fix(fixer) {
              return fixer.insertTextAfter(
                node.openingElement.name,
                ` ${safeRel}`,
              );
            },
            messageId: suggestionMessageId,
          }],
        });
        return;
      }

      const relValue = getAttributeStaticValue(context, node, "rel");
      if (isSafeRel(relValue, allowReferrer)) return;

      context.report({
        messageId,
        node: relProp,
        suggest: [{
          fix(fixer) {
            return fixer.replaceText(relProp, safeRel);
          },
          messageId: suggestionMessageId,
        }],
      });
    },
  };
}
