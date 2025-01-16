import { _ } from "@eslint-react/eff";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

/**
 * Find the parent node that satisfies the test function
 * @param node The AST node
 * @param test The test function
 * @returns The parent node that satisfies the test function or `_` if not found
 */
function findParentNode<A extends TSESTree.Node>(node: TSESTree.Node | _, test: (n: TSESTree.Node) => n is A): A | _;
/**
 * Find the parent node that satisfies the test function or `_` if not found
 * @param node The AST node
 * @param test The test function
 * @returns The parent node that satisfies the test function
 */
function findParentNode(node: TSESTree.Node | _, test: (node: TSESTree.Node) => boolean): TSESTree.Node | _;
function findParentNode<A extends TSESTree.Node>(
  node: TSESTree.Node | _,
  test: ((node: TSESTree.Node) => boolean) | ((n: TSESTree.Node) => n is A),
): TSESTree.Node | A | _ {
  if (node == null) return _;
  let parent = node.parent;
  while (parent != null && parent.type !== T.Program) {
    if (test(parent)) {
      return parent;
    }
    parent = parent.parent;
  }
  return _;
}

export { findParentNode };
