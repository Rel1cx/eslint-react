import { F, O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Find the first parent node that satisfies the test
 * @param node The node to start searching
 * @param predicate The type guard function
 * @returns The first parent node that satisfies the test
 */
export const findParentNodeGuard: {
  <T extends TSESTree.Node>(node: TSESTree.Node, predicate: (node: TSESTree.Node) => node is T): O.Option<T>;
  <T extends TSESTree.Node>(predicate: (node: TSESTree.Node) => node is T): (node: TSESTree.Node) => O.Option<T>;
} = F.dual(2, <T extends TSESTree.Node>(
  node: TSESTree.Node,
  predicate: (node: TSESTree.Node) => node is T,
): O.Option<T> => {
  let parent = node.parent;
  while (parent) {
    if (predicate(parent)) {
      return O.some(parent);
    }
    parent = parent.parent;
  }
  return O.none();
});
