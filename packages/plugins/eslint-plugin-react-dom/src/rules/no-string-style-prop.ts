import { getJsxAttribute, isJsxHostElement, resolveJsxAttributeValue } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

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
  return {
    JSXElement(node) {
      // This rule only applies to host elements (e.g., <div />, <span />), not custom components.
      if (!isJsxHostElement(context, node)) {
        return;
      }

      const findJsxAttribute = getJsxAttribute(
        context,
        node.openingElement.attributes,
        context.sourceCode.getScope(node),
      );

      // Find the 'style' attribute on the element.
      const styleAttr = findJsxAttribute("style");
      if (styleAttr == null) {
        return;
      }

      // Resolve the static value of the 'style' attribute.
      const styleValue = resolveJsxAttributeValue(context, styleAttr);
      const staticValue = styleValue.toStatic();

      // If the resolved value is a string, report an error.
      // e.g., <div style="color: red;" />
      if (typeof staticValue === "string") {
        context.report({
          messageId: "noStringStyleProp",
          node: styleValue.node ?? styleAttr,
        });
      }
    },
  };
}
