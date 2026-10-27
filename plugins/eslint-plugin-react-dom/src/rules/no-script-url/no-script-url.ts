import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getAttributeStaticValue, getAttributeValue } from "@eslint-react/jsx";
import { RE_JAVASCRIPT_PROTOCOL } from "@eslint-react/shared";
import { isString } from "@local/eff";

export const RULE_NAME = "no-script-url";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows 'javascript:' URLs as attribute values.",
    },
    messages: {
      default: "Using a `javascript:` URL is a security risk and should be avoided.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXAttribute(node) {
      if (node.value == null) {
        return;
      }

      const value = getAttributeStaticValue(context, getAttributeValue(node));
      if (isString(value) && RE_JAVASCRIPT_PROTOCOL.test(value)) {
        context.report({
          messageId: "default",
          node: node.value,
        });
      }
    },
  };
}
