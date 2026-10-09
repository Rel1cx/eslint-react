import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

type Predicate<T extends TSESTree.Node> = (node: TSESTree.Node) => node is T;
type NodePredicate = (node: TSESTree.Node) => boolean;

/**
 * Walk up the AST from `node` to find the nearest ancestor matching a predicate.
 * @param node The starting node for the upward search.
 * @param test The predicate a candidate ancestor must satisfy.
 * @param stop An optional predicate that aborts the search when it returns `true`.
 * @returns The first matching ancestor, or `null` when none is found.
 */
export function findParent<T extends TSESTree.Node>(node: TSESTree.Node | null, test: Predicate<T>, stop?: NodePredicate): T | null;
export function findParent(node: TSESTree.Node | null, test: NodePredicate, stop?: NodePredicate): TSESTree.Node | null;
export function findParent(node: TSESTree.Node | null, test: NodePredicate, stop?: NodePredicate): TSESTree.Node | null {
  if (node == null) return null;
  let current = node.parent;
  while (current != null) {
    if (stop?.(current) ?? false) return null;
    if (test(current)) return current;
    if (current.type === AST.Program) return null;
    current = current.parent;
  }
  return null;
}

/**
 * Check whether `node` has an ancestor matching a predicate.
 * @param node The starting node for the upward search.
 * @param test The predicate a candidate ancestor must satisfy.
 * @param stop An optional predicate that aborts the search when it returns `true`.
 * @returns `true` when a matching ancestor exists.
 */
export function hasParent<T extends TSESTree.Node>(node: TSESTree.Node | null, test: Predicate<T>, stop?: NodePredicate): boolean;
export function hasParent(node: TSESTree.Node | null, test: NodePredicate, stop?: NodePredicate): boolean;
export function hasParent(node: TSESTree.Node | null, test: NodePredicate, stop?: NodePredicate): boolean {
  return findParent(node, test, stop) != null;
}

/**
 * Find the nearest `TryStatement` whose `try` block (not `catch`/`finally`) encloses the given node.
 * @param node The node to check.
 * @returns The enclosing `TryStatement`, or `null` when none is found.
 */
export function findEnclosingTryBlock(node: TSESTree.Node): TSESTree.TryStatement | null {
  const parent = node.parent;
  if (parent == null || parent.type === AST.Program) return null;
  if (parent.type === AST.TryStatement && node === parent.block) return parent;
  return findEnclosingTryBlock(parent);
}

/**
 * Check whether the given node is enclosed by the `try` block (not `catch`/`finally`) of a `TryStatement`.
 * @param node The node to check.
 * @returns `true` when an enclosing `try` block exists.
 */
export function hasEnclosingTryBlock(node: TSESTree.Node): boolean {
  return findEnclosingTryBlock(node) != null;
}
