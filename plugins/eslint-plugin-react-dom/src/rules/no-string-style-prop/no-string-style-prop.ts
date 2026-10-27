import { createRule } from "@/utils/create-rule";
import { getAttributeReportNode } from "@/utils/get-attribute-report-node";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getAttributeStaticValue, getAttributeValueByName, isHostElement } from "@eslint-react/jsx";
import { isString } from "@local/eff";

export const RULE_NAME = "no-string-style-prop";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows the use of string style prop in JSX. Use an object instead.",
    },
    messages: {
      default: "Do not use string style prop. Use an object instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXElement(node) {
      // This rule only applies to host elements (ex: <div />, <span />), not custom components
      if (!isHostElement(node)) {
        return;
      }

      const styleValue = getAttributeValueByName(node, "style");
      if (styleValue == null) {
        return;
      }
      if (!isString(getAttributeStaticValue(context, styleValue))) {
        return;
      }

      context.report({
        messageId: "default",
        node: getAttributeReportNode(styleValue),
      });
    },
  };
}
