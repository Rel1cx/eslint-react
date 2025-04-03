import type { _ } from "@eslint-react/eff";
import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";
import { isJsxFragmentElement } from "./is-jsx-element";

/**
 * Check if a node is a `JSXFragment` or a `Fragment` element
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXFragment` or a `Fragment` element
 */
export function isJsxFragment(node: TSESTree.Node | null | _) {
  if (node == null) return false;
  return node.type === AST_NODE_TYPES.JSXFragment || isJsxFragmentElement(node);
}
