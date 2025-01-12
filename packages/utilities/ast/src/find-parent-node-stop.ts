import { _ } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Find the first parent node that satisfies the test and stops at the stop node
 * @param node The node to start searching
 * @param stopNode The node to stop searching
 * @param predicate The test function
 * @returns The first parent node that satisfies the test or undefined if not found
 */
export function findParentNodeStop(
  node: TSESTree.Node | _,
  stopNode: TSESTree.Node,
  predicate: (node: TSESTree.Node) => boolean,
): TSESTree.Node | _ {
  if (node === _) return _;
  let parent = node.parent;
  while (parent && parent !== stopNode && parent.type !== T.Program) {
    if (predicate(parent)) {
      return parent;
    }
    parent = parent.parent;
  }
  return _;
}
