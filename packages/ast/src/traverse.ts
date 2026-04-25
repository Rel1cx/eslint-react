import type { TSESTree } from "@typescript-eslint/types";

type Predicate<T extends TSESTree.Node> = (node: TSESTree.Node) => node is T;
type NodePredicate = (node: TSESTree.Node) => boolean;
export function findParent<T extends TSESTree.Node>(node: TSESTree.Node | null, test: Predicate<T>): T | null;
export function findParent(node: TSESTree.Node | null, test: NodePredicate): TSESTree.Node | null;
export function findParent(node: TSESTree.Node | null, test: NodePredicate): TSESTree.Node | null {
  if (node == null) return null;
  let current = node.parent;
  while (current != null) {
    if (test(current)) return current;
    if (current.type === "Program") return null;
    current = current.parent;
  }
  return null;
}
