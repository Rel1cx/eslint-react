import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

type Predicate<T extends TSESTree.Node> = (node: TSESTree.Node) => node is T;
type NodePredicate = (node: TSESTree.Node) => boolean;
export function findParent<T extends TSESTree.Node>(node: TSESTree.Node | null, test: Predicate<T>): T | null;
export function findParent(node: TSESTree.Node | null, test: NodePredicate): TSESTree.Node | null;
export function findParent(node: TSESTree.Node | null, test: NodePredicate): TSESTree.Node | null {
  if (node == null) return null;
  let parent = node.parent;
  while (parent?.type !== AST.Program) {
    if (parent == null) return null;
    if (test(parent)) return parent;
    parent = parent.parent;
  }
  return null;
}
