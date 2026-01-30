import { unit } from "@eslint-react/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Find the parent node that satisfies the test function
 * @param node The AST node
 * @param test The test function
 * @returns The parent node that satisfies the test function or `_` if not found
 */
function findParentNode<A extends TSESTree.Node>(
  node: TSESTree.Node | unit,
  test: (n: TSESTree.Node) => n is A,
): A | unit;
/**
 * Find the parent node that satisfies the test function or `_` if not found
 * @param node The AST node
 * @param test The test function
 * @returns The parent node that satisfies the test function
 */
function findParentNode(node: TSESTree.Node | unit, test: (node: TSESTree.Node) => boolean): TSESTree.Node | unit;
function findParentNode<A extends TSESTree.Node>(
  node: TSESTree.Node | unit,
  test: ((node: TSESTree.Node) => boolean) | ((n: TSESTree.Node) => n is A),
): TSESTree.Node | A | unit {
  if (node == null) return unit;
  let parent = node.parent;
  while (parent != null && parent.type !== AST.Program) {
    if (test(parent)) {
      return parent;
    }
    parent = parent.parent;
  }
  return unit;
}

export { findParentNode };
