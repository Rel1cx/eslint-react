import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createJsxElementResolver, createRule, resolveAttribute } from "../utils";

export const RULE_NAME = "no-string-style-prop";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows the use of string style prop.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noStringStyleProp: "Do not use string style prop. Use an object instead.",
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
      const { attributes } = resolver.resolve(node);
      const {
        attribute,
        attributeName,
        attributeValue,
        attributeValueString,
      } = resolveAttribute(context, attributes, node, "style");
      if (attributeName !== "style") return;
      if (attribute == null || attributeValue?.node == null) return;
      if (attributeValueString == null) return;
      context.report({
        messageId: "noStringStyleProp",
        node: attributeValue.node,
      });
    },
  };
}
