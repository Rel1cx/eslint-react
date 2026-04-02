import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check whether a node is a JSX text node.
 *
 * Returns `true` for both `JSXText` nodes and `Literal` nodes that appear
 * as direct children of a JSX element (the parser may represent inline text
 * with either node type depending on context).
 *
 * @param node - The AST node to test.
 * @returns `true` when `node` is a `JSXText` or `Literal`.
 */
export function isJsxText(
  node: TSESTree.Node | null,
): node is TSESTree.JSXText | TSESTree.Literal {
  if (node == null) return false;
  return node.type === AST.JSXText || node.type === AST.Literal;
}
