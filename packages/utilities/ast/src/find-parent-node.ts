import { _, dual } from "@eslint-react/eff";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

/**
 * Find the first parent node that satisfies the test
 * @param node The node to start searching
 * @param test The test function
 * @returns The first parent node that satisfies the test or undefined if not found
 */
export const findParentNode: {
  (node: TSESTree.Node | _, test: (node: TSESTree.Node) => boolean): TSESTree.Node | _;
  (test: (node: TSESTree.Node) => boolean): (node: TSESTree.Node) => TSESTree.Node | _;
} = dual(2, (node: TSESTree.Node | _, test: (node: TSESTree.Node) => boolean): TSESTree.Node | _ => {
  if (node == null) return _;
  let parent = node.parent;
  while (parent != null && parent.type !== T.Program) {
    if (test(parent)) {
      return parent;
    }
    parent = parent.parent;
  }
  return _;
});
