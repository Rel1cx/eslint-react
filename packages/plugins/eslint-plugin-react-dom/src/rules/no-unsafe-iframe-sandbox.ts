import { getJsxAttribute, resolveJsxAttributeValue } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createJsxElementResolver, createRule } from "../utils";

export const RULE_NAME = "no-unsafe-iframe-sandbox";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const UNSAFE_SANDBOX_VALUES = ["allow-scripts", "allow-same-origin"] as const;

/**
 * Checks if the sandbox attribute value contains an unsafe combination
 * An iframe with both "allow-scripts" and "allow-same-origin" can remove its sandbox attribute,
 * making it as insecure as an iframe without any sandboxing
 * @param value The value of the sandbox attribute
 * @returns `true` if the value is a string and contains an unsafe combination, `false` otherwise
 */
function isUnsafeSandboxCombination(value: unknown): value is string {
  // The value must be a string to be processed
  if (typeof value !== "string") {
    return false;
  }
  // Check if the value includes both "allow-scripts" and "allow-same-origin"
  return UNSAFE_SANDBOX_VALUES.every((v) => value.includes(v));
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnsafeIframeSandbox: "Unsafe 'sandbox' attribute value on 'iframe' component.",
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
      const sandboxProp = getJsxAttribute(context, node)("sandbox");
      // If there's no 'sandbox' attribute, there's nothing to check
      if (sandboxProp == null) {
        return;
      }

      // 3. Resolve the static value of the 'sandbox' attribute
      const sandboxValue = resolveJsxAttributeValue(context, sandboxProp);
      const sandboxValueStatic = sandboxValue.toStatic("sandbox");

      // 4. Check if the 'sandbox' value has the unsafe combination
      if (isUnsafeSandboxCombination(sandboxValueStatic)) {
        // If it's unsafe, report an error
        context.report({
          messageId: "noUnsafeIframeSandbox",
          node: sandboxValue.node ?? sandboxProp,
        });
      }
    },
  };
}
