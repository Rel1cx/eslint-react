import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import {
  type RuleContext,
  type RuleFeature,
  defineRuleListener,
  getSettingsFromContext,
} from "@eslint-react/shared";
import type { ScopeVariable } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

import { createRule } from "../../utils";

export const RULE_NAME = "prefer-set-state-callback";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforces using the callback form of a 'useState' setter when the update references the corresponding state variable, to prevent stale state bugs.",
    },
    messages: {
      default:
        "Use the callback form of '{{name}}' to ensure the update is based on the latest state.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const { additionalStateHooks } = getSettingsFromContext(context);

  if (!/use\w*State/u.test(context.sourceCode.text)) return {};

  const setterToStateVar = new Map<ScopeVariable, ScopeVariable>();

  function isUseStateCall(node: TSESTree.Node): boolean {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

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

      // Check setter calls
      if (node.callee.type !== AST.Identifier) return;
      const scope = context.sourceCode.getScope(node);
      const callerVar = findVariable(scope, node.callee.name);
      if (callerVar == null || !setterToStateVar.has(callerVar)) return;

      const stateVar = setterToStateVar.get(callerVar)!;
      const arg = node.arguments[0];
      if (arg == null) return;

      // Already using callback form — OK
      if (ast.isFunction(arg)) return;

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
          messageId: "default",
          node,
        });
      }
    },
  });
}
