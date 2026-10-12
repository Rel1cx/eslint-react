import { createRule } from "@/utils/create-rule";
import { resolveNamingTarget } from "@/utils/resolve-naming-target";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";

export const RULE_NAME = "context-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "invalid-context-name";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforces identifier names assigned from `createContext` calls to be a valid component name with the suffix `Context`.",
    },
    messages: {
      "invalid-context-name": "A context name must be a valid component name with the suffix 'Context'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `createContext` is not present in the file
  if (!context.sourceCode.text.includes("createContext")) return {};
  return {
    CallExpression(node) {
      if (!core.isCreateContextCall(context, node)) return;
      const target = resolveNamingTarget(node);
      if (target == null) return;
      const [id, name] = target;
      if (core.isFunctionComponentName(name) && name.endsWith("Context")) return;
      context.report({
        messageId: "invalid-context-name",
        node: id,
      });
    },
  };
}
