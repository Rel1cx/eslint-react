import { createRule } from "@/utils/create-rule";
import { Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

export const RULE_NAME = "no-unused-state";

export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Warns about state variables that are defined but never used, or only used in effects.",
    },
    messages: {
      default: "State variable '{{name}}' is defined but never used, or only used in effects.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const { additionalEffectHooks, additionalStateHooks } = getSettingsFromContext(context);
  const stateEntries: { name: string; node: TSESTree.Identifier }[] = [];

  return {
    CallExpression(node: TSESTree.CallExpression) {
      if (!core.isUseStateLikeCall(node, additionalStateHooks)) return;
      const { parent } = node;
      if (parent?.type !== AST.VariableDeclarator || parent.id.type !== AST.ArrayPattern) return;

      const [stateEl] = parent.id.elements;
      if (stateEl?.type !== AST.Identifier) return;

      stateEntries.push({ name: stateEl.name, node: stateEl });
    },
    "Program:exit"() {
      for (const { name, node } of stateEntries) {
        const scope = context.sourceCode.getScope(node);
        const variable = findVariable(scope, name);
        if (variable == null) continue;

        let hasNonEffectRead = false;
        for (const ref of variable.references) {
          if (ref.isWrite()) continue;
          if (ref.identifier === node) continue;
          if (Traverse.findParent(ref.identifier, (n) => core.isUseEffectLikeCall(n, additionalEffectHooks)) == null) {
            hasNonEffectRead = true;
            break;
          }
        }

        if (!hasNonEffectRead) {
          context.report({
            data: { name },
            messageId: "default",
            node,
          });
        }
      }
    },
  };
}
