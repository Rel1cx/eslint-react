import { createJSXElementResolver } from "@/utils/create-jsx-element-resolver";
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
  | "default"
  | "suggest";

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
      default: `Using 'target="_blank"' on an external link without '{{rel}}' is a security risk.`,
      suggest: `Add '{{rel}}' to the link to prevent security risks.`,
    },
    schema,
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, Options>): RuleListener {
  const { allowReferrer = false } = context.options[0] ?? defaultOptions[0];
  const resolver = createJSXElementResolver(context);

  const requiredRelValue = allowReferrer ? "noopener" : "noreferrer noopener";
  const requiredRelAttribute = `rel="${requiredRelValue}"`;

  function buildSuggest(fix: ReportFixFunction): ReportDescriptor<MessageID>["suggest"] & {} {
    return [{
      data: { rel: requiredRelAttribute },
      fix,
      messageId: "suggest",
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
          messageId: "default",
          data: { rel: requiredRelAttribute },
          node: node.openingElement,
          suggest: buildSuggest((fixer) => fixer.insertTextAfter(node.openingElement.name, ` ${requiredRelAttribute}`)),
        });
        return;
      }

      const relValue = getAttributeStaticValue(context, node, "rel");
      if (isSafeRel(relValue, allowReferrer)) return;

      context.report({
        messageId: "default",
        data: { rel: requiredRelAttribute },
        node: relAttribute,
        suggest: buildSuggest((fixer) => fixer.replaceText(relAttribute, requiredRelAttribute)),
      });
    },
  };
}
