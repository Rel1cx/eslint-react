import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { createRule } from "../utils";

export const RULE_NAME = "no-misused-capture-owner-stack";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "useNamespaceImport"
  | "missingDevelopmentOnlyCheck";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents incorrect usage of 'captureOwnerStack'.",
    },
    messages: {
      missingDevelopmentOnlyCheck:
        `Don't call 'captureOwnerStack' directly. Use 'if (process.env.NODE_ENV !== "production") {...}' to conditionally access it.`,
      useNamespaceImport:
        "Don't use named imports of 'captureOwnerStack' in files that are bundled for development and production. Use a namespace import instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `captureOwnerStack` is not present in the file
  if (!context.sourceCode.text.includes("captureOwnerStack")) return {};
  const { importSource } = getSettingsFromContext(context);

  return defineRuleListener(
    {
      CallExpression(node) {
        // Check if the call is to `captureOwnerStack`
        if (!core.isCaptureOwnerStackCall(context, node)) return;
        // Check if the call is wrapped in a development-only conditional block
        if (ast.findParentNode(node, isDevelopmentOnlyCheck) == null) {
          context.report({
            messageId: "missingDevelopmentOnlyCheck",
            node,
          });
        }
      },
      ImportDeclaration(node) {
        // Check if the import is from the configured source
        if (node.source.value !== importSource) return;
        // Iterate over import specifiers to find named imports of `captureOwnerStack`
        for (const specifier of node.specifiers) {
          if (specifier.type !== AST.ImportSpecifier) continue;
          if (specifier.imported.type !== AST.Identifier) continue;
          if (specifier.imported.name === "captureOwnerStack") {
            context.report({
              messageId: "useNamespaceImport",
              node: specifier,
            });
          }
        }
      },
    },
  );
}

// Helper function to check if a node is a development-only `if` statement
function isDevelopmentOnlyCheck(node: TSESTree.Node) {
  if (node.type !== AST.IfStatement) return false;
  return ast.isProcessEnvNodeEnvCompare(node.test, "!==", "production");
}
