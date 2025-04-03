import type { _ } from "@eslint-react/eff";
import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";
import { isFragmentElement } from "./is-kind-of-element";

/**
 * Check if a node is a `JSXFragment` or a `Fragment` element
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXFragment` or a `Fragment` element
 */
export function isJSXFragmentLike(node: TSESTree.Node | null | _) {
  if (node == null) return false;
  return node.type === AST_NODE_TYPES.JSXFragment || isFragmentElement(node);
}
