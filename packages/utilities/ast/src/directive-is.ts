import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { isDirectiveName } from "./directive-name";
import { isLiteral } from "./literal-is";
import type { TSESTreeDirective, TSESTreeDirectiveLike } from "./node-types";

/**
 * Check if a node is a directive expression statement
 * @param node The node to check
 * @returns True if the node is a directive, false otherwise
 */
export function isDirective(node: TSESTree.Node): node is TSESTreeDirective {
  return node.type === AST.ExpressionStatement && node.directive != null;
}

/**
 * Check if a node is a directive-like expression statement
 * @param node The node to check
 * @returns True if the node is a directive, false otherwise
 */
export function isDirectiveLike(node: TSESTree.Node): node is TSESTreeDirectiveLike {
  return node.type === AST.ExpressionStatement
    && isLiteral(node.expression, "string")
    && isDirectiveName(node.expression.value);
}
