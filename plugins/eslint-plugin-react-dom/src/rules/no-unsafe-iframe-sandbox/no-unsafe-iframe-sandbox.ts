import { createJSXElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { getAttributeReportNode } from "@/utils/get-attribute-report-node";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getAttributeValue, resolveAttributeStaticValue } from "@eslint-react/jsx";
import { isString } from "@local/eff";

export const RULE_NAME = "no-unsafe-iframe-sandbox";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export const UNSAFE_SANDBOX_VALUES = ["allow-scripts", "allow-same-origin"] as const;

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that the 'sandbox' attribute for 'iframe' elements is not set to unsafe combinations.",
    },
    messages: {
      default: "Unsafe 'sandbox' attribute value on 'iframe' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const resolver = createJSXElementResolver(context);

  return {
    JSXElement(node) {
      const { domElementType } = resolver.resolve(node);
      if (domElementType !== "iframe") return;

      const sandboxValue = getAttributeValue(node, "sandbox");
      if (sandboxValue == null) return;
      const value = resolveAttributeStaticValue(context, sandboxValue);
      if (!isString(value) || !UNSAFE_SANDBOX_VALUES.every((a) => value.includes(a))) return;

      const reportNode = getAttributeReportNode(sandboxValue);

      context.report({
        messageId: "default",
        node: reportNode,
      });
    },
  };
}
