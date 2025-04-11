import type { _ } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isLiteral } from "./is-literal";
import { isProcessEnvNodeEnv } from "./is-process-env-node-env";

/**
 * Check if the given node is a binary expression that compares `process.env.NODE_ENV` with a string literal
 * @param node The AST node
 * @param operator The operator used in the comparison
 * @param value The string literal value to compare against
 * @returns True if the node is a binary expression that compares `process.env.NODE_ENV` with the specified value, false otherwise
 */
export function isProcessEnvNodeEnvCompare(
  node: TSESTree.Node | null | _,
  operator: "===" | "!==",
  value: "development" | "production",
): node is TSESTree.BinaryExpression {
  if (node == null) return false;
  if (node.type !== T.BinaryExpression) return false;
  if (node.operator !== operator) return false;
  if (isProcessEnvNodeEnv(node.left) && isLiteral(node.right, "string")) {
    return node.right.value === value;
  }
  if (isLiteral(node.left, "string") && isProcessEnvNodeEnv(node.right)) {
    return node.left.value === value;
  }
  return false;
}
