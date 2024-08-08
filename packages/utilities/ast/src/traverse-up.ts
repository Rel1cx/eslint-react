import { F, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

/**
 * Traverses up the AST tree until the predicate returns `true` or the root node is reached
 * @param node The AST node to start traversing from
 * @param predicate The predicate to check each node
 * @returns The first node that matches the predicate or `null` if no node matches
 */
export const traverseUp: {
  (node: TSESTree.Node, predicate: (node: TSESTree.Node) => boolean): O.Option<TSESTree.Node>;
  (predicate: (node: TSESTree.Node) => boolean): (node: TSESTree.Node) => O.Option<TSESTree.Node>;
} = F.dual(2, (node: TSESTree.Node, predicate: (node: TSESTree.Node) => boolean): O.Option<TSESTree.Node> => {
  const { parent } = node;
  if (!parent || parent.type === AST_NODE_TYPES.Program) return O.none();

  return predicate(parent)
    ? O.some(parent)
    : traverseUp(parent, predicate);
});
