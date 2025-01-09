import { F, O } from "@eslint-react/eff";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

/**
 * Find the first parent node that satisfies the test
 * @param node The node to start searching
 * @param test The test function
 * @returns The first parent node that satisfies the test
 */
export const findParentNode: {
  (node: TSESTree.Node, test: (node: TSESTree.Node) => boolean): O.Option<TSESTree.Node>;
  (test: (node: TSESTree.Node) => boolean): (node: TSESTree.Node) => O.Option<TSESTree.Node>;
} = F.dual(2, (node: TSESTree.Node, test: (node: TSESTree.Node) => boolean): O.Option<TSESTree.Node> => {
  let parent = node.parent;
  while (parent != null && parent.type !== T.Program) {
    if (test(parent)) {
      return O.some(parent);
    }
    parent = parent.parent;
  }
  return O.none();
});
