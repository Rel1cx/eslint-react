import type { TSESTree } from "@typescript-eslint/types";

/**
 * Check if a JSXElement or JSXFragment has children
 * @param node The AST node to check
 * @returns `true` if the node has children
 */
export function hasChildren(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  return node.children.length > 0;
}
