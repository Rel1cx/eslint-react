import { createJSXElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { type ReportFixFunction, type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getAttributeStaticValue, getAttributeStaticValueByName, getAttributeValueByName } from "@eslint-react/jsx";
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
  {
    allowReferrer?: boolean;
  }?,
];

const schema: [JSONSchema4] = [
  {
    type: "object",
    additionalProperties: false,
    properties: {
      allowReferrer: {
        type: "boolean",
        description: "Allow 'rel=\"noopener\"' without 'noreferrer' so referrer information is preserved.",
      },
    },
  },
];

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    defaultOptions: [{}],
    docs: {
      description: "Disallows 'target=\"_blank\"' without 'rel=\"noreferrer\"'.",
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
  const options = context.options[0] ?? {};
  const allowReferrer = options.allowReferrer ?? false;

  const resolver = createJSXElementResolver(context);
  const requiredRelValue = allowReferrer ? "noopener" : "noreferrer";
  const requiredRelAttribute = `rel="${requiredRelValue}"`;

  return {
    JSXElement(node) {
      const { domElementType } = resolver.resolve(node);
      if (domElementType !== "a") {
        return;
      }
      if (getAttributeStaticValueByName(context, node, "target") !== "_blank") {
        return;
      }

      const hrefValue = getAttributeStaticValueByName(context, node, "href");
      if (!isExternalLinkLike(hrefValue)) {
        return;
      }

      const relValue = getAttributeValueByName(node, "rel");
      if (relValue == null) {
        // Append after the last attribute so a spread attribute cannot override the suggestion.
        const lastAttribute = node.openingElement.attributes.at(-1);

        context.report({
          messageId: "default",
          data: { rel: requiredRelAttribute },
          node: node.openingElement,
          suggest: buildSuggest(requiredRelAttribute, (fixer) => fixer.insertTextAfter(lastAttribute ?? node.openingElement.name, ` ${requiredRelAttribute}`)),
        });
        return;
      }

      const relAttribute = relValue.attribute;
      if (isSafeRel(getAttributeStaticValue(context, relValue), allowReferrer)) {
        return;
      }

      context.report({
        messageId: "default",
        data: { rel: requiredRelAttribute },
        node: relAttribute,
        suggest: buildSuggest(requiredRelAttribute, (fixer) => fixer.replaceText(relAttribute, requiredRelAttribute)),
      });
    },
  };
}

/**
 * Build the suggestion descriptor for adding or replacing the `rel` attribute.
 * @param relAttribute The `rel` attribute text to suggest.
 * @param fix The fix function to apply.
 * @returns The suggestion descriptor array.
 */
function buildSuggest(relAttribute: string, fix: ReportFixFunction): ReportDescriptor<MessageID>["suggest"] & {} {
  return [{
    data: { rel: relAttribute },
    fix,
    messageId: "suggest",
  }];
}
