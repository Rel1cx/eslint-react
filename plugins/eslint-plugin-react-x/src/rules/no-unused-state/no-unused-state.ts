/* tsl-ignore dx/no-duplicate-imports */
import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

export const RULE_NAME = "no-unused-state";

export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Warns about state variables that are defined but never used.",
    },
    messages: {
      default: "State variable '{{name}}' is defined but never used.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create: (context) => create(buildRichContext(context)),
  defaultOptions: [],
});

export function create(context: RichContext<MessageID, []>): RuleListener {
  const { additionalStateHooks } = context.settings;
  const stateEntries: { name: string; node: TSESTree.Identifier }[] = [];

  return {
    CallExpression(node: TSESTree.CallExpression) {
      if (!core.isUseStateLikeCall(node, additionalStateHooks)) return;
      const { parent } = node;
      if (parent.type !== AST.VariableDeclarator || parent.id.type !== AST.ArrayPattern) return;

      const [stateEl] = parent.id.elements;
      if (stateEl?.type !== AST.Identifier) return;

      stateEntries.push({ name: stateEl.name, node: stateEl });
    },
    "Program:exit"() {
      for (const { name, node } of stateEntries) {
        const scope = context.src.getScope(node);
        const variable = findVariable(scope, name);
        if (variable == null) continue;

        let hasRead = false;
        for (const ref of variable.references) {
          if (ref.isWrite()) continue;
          if (ref.identifier === node) continue;
          hasRead = true;
          break;
        }

        if (!hasRead) {
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
