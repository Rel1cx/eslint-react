import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isOneOf } from "./is";

/**
 * Check if a node spans multiple lines
 * @param node The AST node to check
 * @returns `true` if the node spans multiple lines, `false` otherwise
 */
export function isMultiLine(node: TSESTree.Node) {
  return node.loc.start.line !== node.loc.end.line;
}

/**
 * Check if a node is a line break (whitespace spanning multiple lines)
 * @param node The AST node to check
 * @returns `true` if the node is a line break, `false` otherwise
 */
export function isLineBreak(node: TSESTree.Node) {
  return isOneOf([AST.Literal, AST.JSXText])(node)
    && typeof node.value === "string"
    && node.value.trim() === ""
    && isMultiLine(node);
}
