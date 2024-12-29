import { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

/**
 * Traverses up the AST tree until the predicate returns `true` or the stop node is reached
 * @param node The AST node to start traversing from
 * @param stopNode The AST node to stop traversing at
 * @param predicate The predicate to check each node
 * @returns The first node that matches the predicate or `null` if no node matches
 */
export function traverseUpStop(
  node: TSESTree.Node,
  stopNode: TSESTree.Node,
  predicate: (node: TSESTree.Node) => boolean,
): O.Option<TSESTree.Node> {
  const { parent } = node;
  if (!parent || parent === stopNode || parent.type === AST_NODE_TYPES.Program) return O.none();

  return predicate(parent)
    ? O.some(parent)
    : traverseUpStop(parent, stopNode, predicate);
}
