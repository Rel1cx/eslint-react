import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./node-type";

/**
 * Traverses up the AST tree until the predicate returns `true` or the root node is reached
 * @param node The AST node to start traversing from
 * @param predicate The predicate to check each node
 * @returns The first node that matches the predicate or `null` if no node matches
 */
export function traverseUp(node: TSESTree.Node, predicate: (node: TSESTree.Node) => boolean): O.Option<TSESTree.Node> {
  const { parent } = node;

  if (!parent || parent.type === NodeType.Program) {
    return O.none();
  }

  return predicate(parent)
    ? O.some(parent)
    : traverseUp(parent, predicate);
}

/**
 * Traverses up the AST tree until the predicate returns `true` or the root node is reached
 * @template T
 * @param node The AST node to start traversing from
 * @param predicate The predicate to check each node. **must be a type guard**
 * @returns The first node that matches the predicate or `null` if no node matches
 */
export function traverseUpGuard<T extends TSESTree.Node>(
  node: TSESTree.Node,
  predicate: (node: TSESTree.Node) => node is T,
): O.Option<T> {
  const { parent } = node;

  if (!parent || parent.type === NodeType.Program) {
    return O.none();
  }

  return predicate(parent)
    ? O.some(parent)
    : traverseUpGuard(parent, predicate);
}
