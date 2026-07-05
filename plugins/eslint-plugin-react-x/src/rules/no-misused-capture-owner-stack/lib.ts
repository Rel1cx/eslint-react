import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, isMatching } from "ts-pattern";

/**
 * Check if the given node is a member expression that accesses `process.env.NODE_ENV`
 * @param context The rule context
 * @param node The AST node
 * @returns True if the node is a member expression that accesses `process.env.NODE_ENV`, false otherwise
 */
export function isProcessEnvNodeEnv(context: RuleContext, node: TSESTree.Node | null): node is TSESTree.Node {
  return node != null && core.isAPI("process.env.NODE_ENV")(context, node);
}

/**
 * Check if the given node is a binary expression that compares `process.env.NODE_ENV` with a string literal.
 * @param context The rule context
 * @param node The AST node
 * @param operator The operator used in the comparison
 * @param value The string literal value to compare against
 * @returns True if the node is a binary expression that compares `process.env.NODE_ENV` with the specified value, false otherwise
 */
export function isProcessEnvNodeEnvCompare(
  context: RuleContext,
  node: TSESTree.Node | null,
  operator: "===" | "!==",
  value: "development" | "production",
): node is TSESTree.BinaryExpression {
  if (node == null) return false;
  if (node.type !== AST.BinaryExpression) return false;
  if (node.operator !== operator) return false;
  const isStringLiteral = isMatching({ type: AST.Literal, value: P.string });
  if (isProcessEnvNodeEnv(context, node.left) && isStringLiteral(node.right)) {
    return node.right.value === value;
  }
  if (isStringLiteral(node.left) && isProcessEnvNodeEnv(context, node.right)) {
    return node.left.value === value;
  }
  return false;
}

// Helper function to check if a node is a development-only `if` statement
export function isDevelopmentOnlyCheck(context: RuleContext, node: TSESTree.Node): node is TSESTree.IfStatement {
  if (node.type !== AST.IfStatement) return false;
  return isProcessEnvNodeEnvCompare(context, node.test, "!==", "production");
}
