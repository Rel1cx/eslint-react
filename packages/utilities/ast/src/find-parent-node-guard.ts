import { _, dual } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Find the first parent node that satisfies the test
 * @param node The node to start searching
 * @param predicate The type guard function
 * @returns The first parent node that satisfies the test or undefined if not found
 */
export const findParentNodeGuard: {
  <T extends TSESTree.Node>(node: TSESTree.Node | _, predicate: (node: TSESTree.Node) => node is T): T | _;
  <T extends TSESTree.Node>(predicate: (node: TSESTree.Node) => node is T): (node: TSESTree.Node | _) => T | _;
} = dual(2, <T extends TSESTree.Node>(
  node: TSESTree.Node | _,
  predicate: (node: TSESTree.Node) => node is T,
): T | _ => {
  if (node === _) return _;
  let parent = node.parent;
  while (parent) {
    if (predicate(parent)) {
      return parent;
    }
    parent = parent.parent;
  }
  return _;
});
