import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { type VisitorKeys, visitorKeys as defaultVisitorKeys } from "@typescript-eslint/visitor-keys";

// Types

type NodePredicate = (node: TSESTree.Node) => boolean;
type Predicate<T extends TSESTree.Node> = (node: TSESTree.Node) => node is T;

/** Options for `simpleTraverse`. */
export type SimpleTraverseOptions = {
  /** Called for each visited node before its children are visited. */
  enter?: (node: TSESTree.Node, parent: TSESTree.Node | undefined) => void;
  /** Called for each visited node after its children are visited. */
  leave?: (node: TSESTree.Node, parent: TSESTree.Node | undefined) => void;
  /** Attach parent pointers to every visited node. */
  setParentPointers?: boolean;
  /** Visitor keys to use instead of the default ESTree keys (ex: to prune subtrees). */
  visitorKeys?: VisitorKeys;
};

// AST traversal

/**
 * Check if a value is a `TSESTree` node.
 * @param value The value to check.
 * @returns `true` when the value is a node.
 */
function isNode(value: unknown): value is TSESTree.Node & Record<string, unknown> {
  return typeof value === "object" && value != null && "type" in value && typeof value.type === "string";
}

/**
 * Walk the AST from `root`, calling `enter` before and `leave` after a node's children.
 *
 * This is a lightweight local equivalent of `simpleTraverse` from
 * `@typescript-eslint/typescript-estree`: it only depends on the visitor keys, so importing it does
 * not load the TypeScript compiler. Parent pointers are not attached unless `setParentPointers` is
 * enabled; the parent of each node is passed to `enter` and `leave` instead. Node types missing
 * from the visitor keys are not descended into, which allows pruning subtrees (ex: function or
 * class bodies) with a custom map.
 * @param root The root node to traverse.
 * @param options Traversal options.
 */
export function simpleTraverse(root: TSESTree.Node, options: SimpleTraverseOptions = {}): void {
  const { enter, leave, setParentPointers = false, visitorKeys = defaultVisitorKeys } = options;
  const visit = (node: unknown, parent: TSESTree.Node | undefined): void => {
    if (!isNode(node)) return;
    if (setParentPointers) {
      if (parent == null) {
        delete node.parent;
      } else {
        node.parent = parent;
      }
    }
    enter?.(node, parent);
    for (const key of visitorKeys[node.type] ?? []) {
      const child = node[key];
      if (Array.isArray(child)) {
        for (const item of child) visit(item, node);
      } else {
        visit(child, node);
      }
    }
    leave?.(node, parent);
  };
  visit(root, undefined);
}

// Ancestor search

/**
 * Walk up the AST from `node` to find the nearest ancestor matching a predicate.
 *
 * This function relies on the `parent` pointers attached by the parser or by
 * `simpleTraverse` with `setParentPointers` enabled.
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

// Try block helpers

/**
 * Find the nearest `TryStatement` whose `try` block (not `catch`/`finally`) encloses the given node.
 *
 * This function relies on the `parent` pointers attached by the parser or by
 * `simpleTraverse` with `setParentPointers` enabled.
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
