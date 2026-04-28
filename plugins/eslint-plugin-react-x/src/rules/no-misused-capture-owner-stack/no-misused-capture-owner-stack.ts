import { Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { createRule } from "../../utils/create-rule";

import { isDevelopmentOnlyCheck } from "./lib";

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

  return merge(
    {
      CallExpression(node) {
        // Check if the call is to `captureOwnerStack`
        if (!core.isCaptureOwnerStackCall(context, node)) return;
        // Check if the call is wrapped in a development-only conditional block
        if (Traverse.findParent(node, isDevelopmentOnlyCheck) == null) {
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
