import { getAttribute, resolveAttributeValue } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createJsxElementResolver, createRule } from "../utils";

export const RULE_NAME = "no-unsafe-iframe-sandbox";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const unsafeSandboxValues = [
  ["allow-scripts", "allow-same-origin"],
] as const;

function isSafeSandbox(value: unknown): value is string {
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
      const { domElementType } = resolver.resolve(node);
      if (domElementType !== "iframe") return;
      const getAttributeEx = getAttribute(context, node.openingElement.attributes, context.sourceCode.getScope(node));
      const sandboxAttribute = getAttributeEx("sandbox");
      if (sandboxAttribute == null) return;
      const sandboxValue = resolveAttributeValue(context, sandboxAttribute);
      const sandboxValueStatic = sandboxValue.toStatic("sandbox");
      if (!isSafeSandbox(sandboxValueStatic)) {
        context.report({
          messageId: "noUnsafeIframeSandbox",
          node: sandboxValue.node ?? sandboxAttribute,
        });
      }
    },
  };
}
