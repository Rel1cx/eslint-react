import * as core from "@eslint-react/core";
import { RE_JAVASCRIPT_PROTOCOL, type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { createRule } from "../../utils";

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
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return defineRuleListener(
    {
      JSXAttribute(node) {
        if (node.name.type !== AST.JSXIdentifier || node.value == null) return;
        const value = core.resolveJsxAttributeValue(context, node).toStatic();
        if (typeof value === "string" && RE_JAVASCRIPT_PROTOCOL.test(value)) {
          context.report({
            messageId: "default",
            node: node.value,
          });
        }
      },
    },
  );
}
