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
 * Checks if the sandbox attribute value contains an unsafe combination.
 * @param value The value of the sandbox attribute.
 * @returns `true` if the value is a string and contains an unsafe combination, `false` otherwise.
 */
function isUnsafeSandboxCombination(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }
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
      if (resolver.resolve(node).domElementType !== "iframe") {
        return;
      }
      const sandboxProp = getJsxAttribute(context, node)("sandbox");
      if (sandboxProp == null) {
        return;
      }

      const sandboxValue = resolveJsxAttributeValue(context, sandboxProp);
      const sandboxValueStatic = sandboxValue.toStatic("sandbox");

      if (isUnsafeSandboxCombination(sandboxValueStatic)) {
        context.report({
          messageId: "noUnsafeIframeSandbox",
          node: sandboxValue.node ?? sandboxProp,
        });
      }
    },
  };
}
