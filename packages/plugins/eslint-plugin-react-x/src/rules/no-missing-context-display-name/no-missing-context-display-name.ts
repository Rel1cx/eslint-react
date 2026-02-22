import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { findEnclosingAssignmentTarget, isAssignmentTargetEqual } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "no-missing-context-display-name";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
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
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: if 'createContext' is not in the file, this rule doesn't apply
  if (!context.sourceCode.text.includes("createContext")) return {};
  // Stores all `React.createContext` call expressions
  const createCalls: TSESTree.CallExpression[] = [];
  // Stores all `displayName` assignment expressions
  const displayNameAssignments: TSESTree.AssignmentExpression[] = [];

  return defineRuleListener(
    {
      // Collect all `*.displayName = '...'` assignments
      [ast.SEL_DISPLAY_NAME_ASSIGNMENT_EXPRESSION](node: ast.DisplayNameAssignmentExpression) {
        displayNameAssignments.push(node);
      },
      // Collect all `createContext()` calls
      CallExpression(node) {
        if (!core.isCreateContextCall(context, node)) return;
        createCalls.push(node);
      },
      "Program:exit"() {
        for (const call of createCalls) {
          // Get the variable identifier for the context
          const id = findEnclosingAssignmentTarget(call);
          if (id == null) {
            // Report an error if the context is not assigned to a variable
            context.report({
              messageId: "default",
              node: call,
            });
            continue;
          }
          // Check if a `displayName` is assigned to this context variable
          const hasDisplayNameAssignment = displayNameAssignments
            .some((node) => {
              const left = node.left;
              if (left.type !== AST.MemberExpression) return false;
              const object = left.object;
              // Check if the object in the assignment matches the context's identifier
              return isAssignmentTargetEqual(context, id, object);
            });
          // If no `displayName` is found, report an error and provide a fix
          if (!hasDisplayNameAssignment) {
            context.report({
              messageId: "default",
              node: id,
              fix(fixer) {
                // Ensure the fix is applied correctly
                if (id.type !== AST.Identifier || id.parent !== call.parent) return [];
                // Insert `ContextName.displayName = "ContextName";` after the creation
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
            });
          }
        }
      },
    },
  );
}
