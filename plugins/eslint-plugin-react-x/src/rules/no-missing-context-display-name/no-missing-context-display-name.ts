import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolveEnclosingAssignmentTarget } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-missing-context-display-name";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforces that all contexts have a 'displayName' that can be used in DevTools.",
    },
    fixable: "code",
    messages: {
      default: "Add missing 'displayName' for context.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: if 'createContext' is not in the file, this rule doesn't apply
  if (!context.sourceCode.text.includes("createContext")) return {};
  const createCalls: TSESTree.CallExpression[] = [];
  const displayNameAssignments: TSESTree.AssignmentExpression[] = [];

  return {
    CallExpression(node) {
      if (!core.isCreateContextCall(context, node)) return;
      createCalls.push(node);
    },
    [core.SEL_FUNCTION_DISPLAY_NAME_ASSIGNMENT](node: core.FunctionDisplayNameAssignment) {
      displayNameAssignments.push(node);
    },
    "Program:exit"() {
      for (const call of createCalls) {
        const id = resolveEnclosingAssignmentTarget(call);
        if (id == null) {
          context.report({
            messageId: "default",
            node: call,
          });
          continue;
        }
        const hasDisplayNameAssignment = displayNameAssignments
          .some((node) => {
            const left = node.left;
            if (left.type !== AST.MemberExpression) return false;
            const object = left.object;
            return isAssignmentTargetEqual(context, id, object);
          });
        if (!hasDisplayNameAssignment) {
          context.report({
            fix(fixer) {
              // Only insert when the context is bound directly to the call result
              if (id.type !== AST.Identifier || id.parent !== call.parent) return [];
              return fixer.insertTextAfter(
                context.sourceCode.getTokenAfter(call) ?? call,
                [
                  "\n",
                  id.name,
                  ".",
                  "displayName",
                  " ",
                  "=",
                  " ",
                  JSON.stringify(id.name),
                  ";",
                ].join(""),
              );
            },
            messageId: "default",
            node: id,
          });
        }
      }
    },
  };
}
