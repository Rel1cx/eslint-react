import * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

/**
 * Check if the given node is a member expression that accesses `process.env.NODE_ENV`
 * @param node The AST node
 * @returns True if the node is a member expression that accesses `process.env.NODE_ENV`, false otherwise
 */
export function isProcessEnvNodeEnv(node: TSESTree.Node | null | unit): node is TSESTree.MemberExpression {
  return node != null
    && node.type === T.MemberExpression
    && node.object.type === T.MemberExpression
    && node.object.object.type === T.Identifier
    && node.object.object.name === "process"
    && node.object.property.type === T.Identifier
    && node.object.property.name === "env"
    && node.property.type === T.Identifier
    && node.property.name === "NODE_ENV";
}

/**
 * Check if the given node is a binary expression that compares `process.env.NODE_ENV` with a string literal
 * @param node The AST node
 * @param operator The operator used in the comparison
 * @param value The string literal value to compare against
 * @returns True if the node is a binary expression that compares `process.env.NODE_ENV` with the specified value, false otherwise
 */
export function isProcessEnvNodeEnvCompare(
  node: TSESTree.Node | null | unit,
  operator: "===" | "!==",
  value: "development" | "production",
): node is TSESTree.BinaryExpression {
  if (node == null) return false;
  if (node.type !== T.BinaryExpression) return false;
  if (node.operator !== operator) return false;
  if (isProcessEnvNodeEnv(node.left) && AST.isLiteral(node.right, "string")) {
    return node.right.value === value;
  }
  if (AST.isLiteral(node.left, "string") && isProcessEnvNodeEnv(node.right)) {
    return node.left.value === value;
  }
  return false;
}

/**
 * Checks if the given node is a `vi.mock`.
 * @param node The node to check
 * @returns `true` if the node is a `vi.mock`, otherwise `false`.
 * @internal
 */
export function isViMock(node: TSESTree.Node | null | unit): node is TSESTree.MemberExpression {
  return node != null
    && node.type === T.MemberExpression
    && node.object.type === T.Identifier
    && node.object.name === "vi"
    && node.property.type === T.Identifier
    && node.property.name === "mock";
}

/**
 * Checks if the given node is a `vi.mock` callback.
 * @param node The node to check
 * @returns `true` if the node is a `vi.mock` callback, otherwise `false`.
 * @internal
 */
export function isViMockCallback(node: TSESTree.Node | null | unit) {
  return node != null
    && AST.isFunction(node)
    && node.parent.type === T.CallExpression
    && isViMock(node.parent.callee)
    && node.parent.arguments[1] === node;
}
