import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isOneOf } from "./ast-node-is";

/**
 * Check if a node is multiline
 * @param node The AST node to check
 * @returns  `true` if the node is multiline
 */
export function isMultiLine(node: TSESTree.Node) {
  return node.loc.start.line !== node.loc.end.line;
}

/**
 * Check if a node is a line break
 * @param node The AST node to check
 * @returns boolean
 */
export function isLineBreak(node: TSESTree.Node) {
  return isOneOf([T.Literal, T.JSXText])(node)
    && typeof node.value === "string"
    && node.value.trim() === ""
    && isMultiLine(node);
}
