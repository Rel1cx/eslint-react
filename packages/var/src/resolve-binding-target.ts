import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * The result of {@link resolveBindingTarget}: an `AssignmentPattern` unwraps to its
 * binding, while every other node is returned as is; `null` stays `null`.
 */
export type BindingTarget<T extends null | TSESTree.Node> = T extends null ? null
  : T extends TSESTree.AssignmentPattern ? TSESTree.BindingName
  : T;

/**
 * Resolve the binding target of a pattern element, property value, or parameter:
 * `AssignmentPattern` defaults unwrap to their left side, other nodes pass through.
 * @param node The node to resolve.
 * @returns The binding target, or `null` when `node` is `null`.
 */
export function resolveBindingTarget<T extends null | TSESTree.Node>(node: T): BindingTarget<T>;
export function resolveBindingTarget(node: null | TSESTree.Node): null | TSESTree.Node {
  if (node == null) return null;
  if (node.type === AST.AssignmentPattern) return node.left;
  return node;
}
