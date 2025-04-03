import type { _ } from "@eslint-react/eff";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

/**
 * Check if a node is a `JSXText` or a `Literal` node
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXText` or a `Literal` node
 */
export function isJSXTextLike(node: TSESTree.Node | null | _): node is TSESTree.JSXText | TSESTree.Literal {
  if (node == null) return false;
  return node.type === T.JSXText || node.type === T.Literal;
}
