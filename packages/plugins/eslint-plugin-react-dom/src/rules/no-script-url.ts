import { resolveAttributeValue } from "@eslint-react/core";
import { RE_JAVASCRIPT_PROTOCOL, type RuleContext, type RuleFeature } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-script-url";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `javascript:` URLs as attribute values.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noScriptUrl: "Using a `javascript:` URL is a security risk and should be avoided.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXAttribute(node) {
      if (node.name.type !== T.JSXIdentifier || node.value == null) return;
      const value = resolveAttributeValue(context, node).toStatic();
      if (typeof value === "string" && RE_JAVASCRIPT_PROTOCOL.test(value)) {
        context.report({
          messageId: "noScriptUrl",
          node: node.value,
        });
      }
    },
  };
}
