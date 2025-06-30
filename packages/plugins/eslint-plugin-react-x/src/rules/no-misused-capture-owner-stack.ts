import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import { type RuleContext, type RuleFeature } from "@eslint-react/kit";
import { getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

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
      description: "Prevents incorrect usage of `captureOwnerStack`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      useNamespaceImport:
        "Don't use named imports of 'captureOwnerStack' in files that are bundled for development and production. Use a namespace import instead.",
      // eslint-disable-next-line perfectionist/sort-objects
      missingDevelopmentOnlyCheck:
        `Don't call 'captureOwnerStack' directly. Use 'if (process.env.NODE_ENV !== "production") {...}' to conditionally access it.`,
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("captureOwnerStack")) return {};
  const { importSource } = getSettingsFromContext(context);

  return {
    CallExpression(node) {
      if (!ER.isCaptureOwnerStackCall(context, node)) return;
      if (AST.findParentNode(node, isDevelopmentOnlyCheck) == null) {
        context.report({
          messageId: "missingDevelopmentOnlyCheck",
          node,
        });
      }
    },
    ImportDeclaration(node) {
      if (node.source.value !== importSource) return;
      for (const specifier of node.specifiers) {
        if (specifier.type !== T.ImportSpecifier) continue;
        if (specifier.imported.type !== T.Identifier) continue;
        if (specifier.imported.name === "captureOwnerStack") {
          context.report({
            messageId: "useNamespaceImport",
            node: specifier,
          });
        }
      }
    },
  };
}

function isDevelopmentOnlyCheck(node: TSESTree.Node) {
  if (node.type !== T.IfStatement) return false;
  if (AST.isProcessEnvNodeEnvCompare(node.test, "!==", "production")) return true;
  return false;
}
