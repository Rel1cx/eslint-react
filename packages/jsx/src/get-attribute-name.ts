import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Get the stringified name of a `JSXAttribute` node.
 *
 * Handles both simple identifiers and namespaced names:
 * - `className` -> `"className"`
 * - `aria-label` -> `"aria-label"`
 * - `xml:space` -> `"xml:space"`.
 * @param node A `JSXAttribute` AST node.
 * @returns The attribute name as a plain string.
 */
export function getAttributeName(node: TSESTree.JSXAttribute): string {
  if (node.name.type === AST.JSXIdentifier) {
    return node.name.name;
  }
  return node.name.namespace.name + ":" + node.name.name.name;
}
