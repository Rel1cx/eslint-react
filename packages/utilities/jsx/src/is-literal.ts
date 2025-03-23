import type { TSESTree } from "@typescript-eslint/types";
import * as AST from "@eslint-react/ast";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Check if a node is a Literal or JSXText
 * @param node The AST node to check
 * @returns boolean `true` if the node is a Literal or JSXText
 */
export const isLiteral = AST.isOneOf([T.Literal, T.JSXText]);

/**
 * Check if a Literal or JSXText node is whitespace
 * @param node The AST node to check
 * @returns boolean `true` if the node is whitespace
 */
export function isWhiteSpace(node: TSESTree.JSXText | TSESTree.Literal) {
  return typeof node.value === "string" && node.value.trim() === "";
}

/**
 * Check if a Literal or JSXText node is a line break
 * @param node The AST node to check
 * @returns boolean
 */
export function isLineBreak(node: TSESTree.Node) {
  return isLiteral(node)
    && isWhiteSpace(node)
    && AST.isMultiLine(node);
}

/**
 * Check if a Literal or JSXText node is padding spaces
 * @param node The AST node to check
 * @returns boolean
 */
export function isPaddingSpaces(node: TSESTree.Node) {
  return isLiteral(node)
    && isWhiteSpace(node)
    && node.raw.includes("\n");
}
