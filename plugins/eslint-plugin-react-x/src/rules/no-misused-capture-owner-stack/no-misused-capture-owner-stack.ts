import { createRule } from "@/utils/create-rule";
import { Check, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { isDevelopmentOnlyCheck } from "./lib";

export const RULE_NAME = "no-misused-capture-owner-stack";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "use-namespace-import"
  | "missing-development-only-check";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents incorrect usage of 'captureOwnerStack'.",
    },
    messages: {
      "missing-development-only-check":
        `Don't call 'captureOwnerStack' directly. Use 'if (process.env.NODE_ENV !== "production") {...}' to conditionally access it.`,
      "use-namespace-import":
        "Don't use named imports of 'captureOwnerStack' in files that are bundled for development and production. Use a namespace import instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `captureOwnerStack` is not present in the file
  if (!context.sourceCode.text.includes("captureOwnerStack")) return {};
  const { importSource } = getSettingsFromContext(context);

  return {
    CallExpression(node) {
      // Check if the call is to `captureOwnerStack`
      if (!core.isCaptureOwnerStackCall(context, node)) return;
      // Check if the call is wrapped in a development-only conditional block
      if (Traverse.findParent(node, (n) => isDevelopmentOnlyCheck(context, n)) == null) {
        context.report({
          messageId: "missing-development-only-check",
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
        if (!Check.isIdentifier(specifier.imported, "captureOwnerStack")) continue;
        context.report({
          messageId: "use-namespace-import",
          node: specifier,
        });
      }
    },
  };
}
