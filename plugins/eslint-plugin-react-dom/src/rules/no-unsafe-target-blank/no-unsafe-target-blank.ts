import { createJsxElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { type ReportFixFunction, type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute, getAttributeStaticValue } from "@eslint-react/jsx";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
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
  const resolver = createJsxElementResolver(context);

  const requiredRelValue = allowReferrer ? "noopener" : "noreferrer noopener";
  const requiredRelAttribute = `rel="${requiredRelValue}"`;
  const reportMessageId: MessageID = allowReferrer ? "default-allow-referrer" : "default";
  const suggestionMessageId: MessageID = allowReferrer ? "add-rel-noopener" : "add-rel-noreferrer-noopener";

  function buildSuggest(fix: ReportFixFunction): ReportDescriptor<MessageID>["suggest"] & {} {
    return [{
      fix,
      messageId: suggestionMessageId,
    }];
  }

  return {
    JSXElement(node) {
      const { domElementType } = resolver.resolve(node);
      if (domElementType !== "a") return;
      if (getAttributeStaticValue(context, node, "target") !== "_blank") return;

      const hrefValue = getAttributeStaticValue(context, node, "href");
      if (!isExternalLinkLike(hrefValue)) return;

      const relAttribute = findAttribute(context, node, "rel");
      if (relAttribute == null) {
        context.report({
          messageId: reportMessageId,
          node: node.openingElement,
          suggest: buildSuggest((fixer) => fixer.insertTextAfter(node.openingElement.name, ` ${requiredRelAttribute}`)),
        });
        return;
      }

      const relValue = getAttributeStaticValue(context, node, "rel");
      if (isSafeRel(relValue, allowReferrer)) return;

      context.report({
        messageId: reportMessageId,
        node: relAttribute,
        suggest: buildSuggest((fixer) => fixer.replaceText(relAttribute, requiredRelAttribute)),
      });
    },
  };
}
