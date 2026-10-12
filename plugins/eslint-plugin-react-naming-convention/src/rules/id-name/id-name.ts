import { createRule } from "@/utils/create-rule";
import { resolveNamingTarget } from "@/utils/resolve-naming-target";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "id-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "invalid-id-name";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforces identifier names assigned from 'useId' calls to be either 'id' or end with 'Id'.",
    },
    messages: {
      "invalid-id-name": "An identifier assigned from 'useId' must be named 'id' or end with 'Id'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("useId")) return {};
  return {
    CallExpression(node: TSESTree.CallExpression) {
      if (!core.isUseIdCall(context, node)) return;
      const target = resolveNamingTarget(node);
      if (target == null) return;
      const [id, name] = target;
      if (name.endsWith("Id") || name === "id") return;
      context.report({
        messageId: "invalid-id-name",
        node: id,
      });
    },
  };
}
