import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isOneOf } from "./is";
import { isMultiLine } from "./is-multi-line";

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
