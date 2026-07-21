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
