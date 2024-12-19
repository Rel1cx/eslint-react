import { F, O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

/**
 * Traverses up the AST tree until the predicate returns `true` or the root node is reached
 * @template T
 * @param node The AST node to start traversing from
 * @param predicate The predicate to check each node. **must be a type guard**
 * @returns The first node that matches the predicate or `null` if no node matches
 */
export const traverseUpGuard: {
  <T extends TSESTree.Node>(node: TSESTree.Node, predicate: (node: TSESTree.Node) => node is T): O.Option<T>;
  <T extends TSESTree.Node>(predicate: (node: TSESTree.Node) => node is T): (node: TSESTree.Node) => O.Option<T>;
} = F.dual(2, <T extends TSESTree.Node>(
  node: TSESTree.Node,
  predicate: (node: TSESTree.Node) => node is T,
): O.Option<T> => {
  const { parent } = node;
  if (!parent || parent.type === AST_NODE_TYPES.Program) return O.none();

  return predicate(parent)
    ? O.some(parent)
    : traverseUpGuard(parent, predicate);
});
