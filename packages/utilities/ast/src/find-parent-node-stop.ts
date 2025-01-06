import { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Find the first parent node that satisfies the test and stops at the stop node
 * @param node The node to start searching
 * @param stopNode The node to stop searching
 * @param predicate The test function
 * @returns The first parent node that satisfies the test
 */
export function findParentNodeStop(
  node: TSESTree.Node,
  stopNode: TSESTree.Node,
  predicate: (node: TSESTree.Node) => boolean,
): O.Option<TSESTree.Node> {
  let parent = node.parent;
  while (parent && parent !== stopNode && parent.type !== T.Program) {
    if (predicate(parent)) {
      return O.some(parent);
    }
    parent = parent.parent;
  }
  return O.none();
}
