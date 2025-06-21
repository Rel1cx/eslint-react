import type { unit } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";

import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { createJsxElementResolver, createRule, resolveAttribute } from "../utils";

export const RULE_NAME = "no-unsafe-iframe-sandbox";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const unsafeSandboxValues = [
  ["allow-scripts", "allow-same-origin"],
] as const;

function isSafeSandbox(value: string | unit): value is string {
  if (typeof value !== "string") return false;
  return !unsafeSandboxValues.some((values) => {
    return values.every((v) => value.includes(v));
  });
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
      const { attributes, domElementType } = resolver.resolve(node);
      if (domElementType !== "iframe") return;
      const sandboxAttribute = resolveAttribute(context, attributes, node, "sandbox");
      if (!isSafeSandbox(sandboxAttribute.attributeValueString)) {
        context.report({
          messageId: "noUnsafeIframeSandbox",
          node: sandboxAttribute.attributeValue?.node ?? sandboxAttribute.attribute ?? node,
        });
      }
    },
  };
}
