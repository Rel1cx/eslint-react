import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Find the parent node that satisfies the test function
 * @param node The AST node
 * @param test The test function
 * @returns The parent node that satisfies the test function or `null` if not found
 */
function findParentNode<A extends TSESTree.Node>(
  node: TSESTree.Node | null,
  test: (n: TSESTree.Node) => n is A,
): A | null;

/**
 * Find the parent node that satisfies the test function or `null` if not found
 * @param node The AST node
 * @param test The test function
 * @returns The parent node that satisfies the test function
 */
function findParentNode(node: TSESTree.Node | null, test: (node: TSESTree.Node) => boolean): TSESTree.Node | null;
function findParentNode<A extends TSESTree.Node>(
  node: TSESTree.Node | null,
  // tsl-ignore core/noRedundantTypeConstituents
  test: ((node: TSESTree.Node) => boolean) | ((n: TSESTree.Node) => n is A),
): TSESTree.Node | A | null {
  if (node == null) return null;
  let parent = node.parent;
  while (parent != null && parent.type !== AST.Program) {
    if (test(parent)) {
      return parent;
    }
    parent = parent.parent;
  }
  return null;
}

export { findParentNode };
