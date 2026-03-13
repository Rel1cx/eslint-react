import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import type { ScopeVariable } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

import { createRule } from "../../utils";

export const RULE_NAME = "unstable-rules-of-state";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "noReferenceToState";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces the Rules of State.",
    },
    messages: {
      noReferenceToState: "Do not reference '{{name}}' directly; use the updater function form instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const { additionalStateHooks } = getSettingsFromContext(context);

  const setterToStateVar = new Map<ScopeVariable, ScopeVariable>();

  function isUseStateCall(node: TSESTree.Node): boolean {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  const pendingCalls: { callerVar: ScopeVariable; node: TSESTree.CallExpression }[] = [];

  return defineRuleListener({
    CallExpression(node) {
      // Register useState pairs
      if (isUseStateCall(node)) {
        const { parent } = node;
        if (
          parent.type === AST.VariableDeclarator
          && parent.id.type === AST.ArrayPattern
        ) {
          const [stateEl, setterEl] = parent.id.elements;
          if (
            stateEl?.type === AST.Identifier
            && setterEl?.type === AST.Identifier
          ) {
            const scope = context.sourceCode.getScope(node);
            const stateVar = findVariable(scope, stateEl.name);
            const setterVar = findVariable(scope, setterEl.name);
            if (stateVar != null && setterVar != null) {
              setterToStateVar.set(setterVar, stateVar);
            }
          }
        }
        return;
      }

      // Queue potential setter calls for deferred checking at Program:exit,
      // so that useState pairs declared after the setter call are still detected.
      if (node.callee.type !== AST.Identifier) return;
      const scope = context.sourceCode.getScope(node);
      const callerVar = findVariable(scope, node.callee.name);
      if (callerVar != null) {
        pendingCalls.push({ callerVar, node });
      }
    },
    "Program:exit"() {
      for (const { callerVar, node } of pendingCalls) {
        if (!setterToStateVar.has(callerVar)) continue;
        const stateVar = setterToStateVar.get(callerVar)!;
        const arg = node.arguments[0];
        if (arg == null) continue;

        // Already using callback form — OK
        if (ast.isFunction(arg)) continue;

        // Check if the argument contains a reference to the state variable
        const [argStart, argEnd] = arg.range!;
        const hasStateRef = stateVar.references.some(
          (ref) =>
            argStart <= ref.identifier.range![0]
            && ref.identifier.range![1] <= argEnd,
        );

        if (hasStateRef) {
          context.report({
            data: { name: context.sourceCode.getText(node.callee) },
            messageId: "noReferenceToState",
            node,
          });
        }
      }
    },
  });
}
