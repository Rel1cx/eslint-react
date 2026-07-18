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
      // 1. Resolve the JSX element to see if it's a DOM 'iframe'. If not, we don't need to check it
      if (resolver.resolve(node).domElementType !== "iframe") {
        return;
      }
      // 2. Get the 'sandbox' attribute from the 'iframe' element
      const sandboxProp = findAttribute(context, node, "sandbox");
      // If there's no 'sandbox' attribute, there's nothing to check
      if (sandboxProp == null) {
        return;
      }

      // 3. Resolve the static value of the 'sandbox' attribute; for spread
      // attributes the named property is extracted automatically
      const sandboxValue = resolveAttributeValue(context, sandboxProp, "sandbox");

      // 4. Check if the 'sandbox' value has the unsafe combination
      if (isUnsafeSandboxCombination(sandboxValue.toStatic())) {
        // If it's unsafe, report an error
        context.report({
          messageId: "default",
          node: sandboxValue.node ?? sandboxProp,
        });
      }
    },
  };
}
