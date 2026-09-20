import { createJsxElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute, resolveAttributeValue } from "@eslint-react/jsx";
import { isUnsafeSandboxCombination } from "./lib";

export const RULE_NAME = "no-unsafe-iframe-sandbox";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

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
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const resolver = createJsxElementResolver(context);

  return {
    JSXElement(node) {
      const { domElementType } = resolver.resolve(node);
      if (domElementType !== "iframe") return;

      const sandboxProp = findAttribute(context, node, "sandbox");
      if (sandboxProp == null) return;

      // Resolve the value of the 'sandbox' attribute; for spread attributes
      // the named property is extracted automatically
      const sandboxValue = resolveAttributeValue(context, sandboxProp, "sandbox");
      if (!isUnsafeSandboxCombination(sandboxValue.toStatic())) return;

      context.report({
        messageId: "default",
        node: sandboxValue.node ?? sandboxProp,
      });
    },
  };
}
