import { findParent } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Walk **up** the AST from `node` to find the nearest ancestor that is a
 * `JSXAttribute` and (optionally) passes a predicate.
 *
 * This is useful when a rule visitor enters a deeply‑nested node (e.g. a
 * `Literal` inside an expression container) and needs to know which JSX
 * attribute it belongs to.
 *
 * @param node - The starting node for the upward search.
 * @param test - Optional predicate to filter candidate `JSXAttribute` nodes.
 *               When omitted every `JSXAttribute` ancestor matches.
 * @returns The first matching `JSXAttribute` ancestor, or `null` if none is
 *          found before reaching the root.
 *
 * @example
 * ```ts
 * // Inside a Literal visitor, find the owning attribute:
 * const attr = findParentAttribute(literalNode);
 * if (attr != null) {
 *   console.log(getAttributeName(attr));
 * }
 * ```
 */
export function findParentAttribute(
  node: TSESTree.Node,
  test: (node: TSESTree.JSXAttribute) => boolean = () => true,
): TSESTree.JSXAttribute | null {
  const guard = (n: TSESTree.Node): n is TSESTree.JSXAttribute => {
    return n.type === AST.JSXAttribute && test(n);
  };
  return findParent(node, guard);
}
