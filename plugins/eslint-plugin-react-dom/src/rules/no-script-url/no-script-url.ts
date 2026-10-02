import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { resolveAttributeValue } from "@eslint-react/jsx";
import { RE_JAVASCRIPT_PROTOCOL } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { P, isMatching } from "ts-pattern";

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXAttribute(node) {
      if (node.name.type !== AST.JSXIdentifier || node.value == null) return;
      const value = resolveAttributeValue(context, node).toStatic();
      if (isMatching(P.string, value) && RE_JAVASCRIPT_PROTOCOL.test(value)) {
        context.report({
          messageId: "default",
          node: node.value,
        });
      }
    },
  };
}
