import { dual } from "@local/eff";
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

/**
 * Check whether a node is a `JSXAttribute` with the given name.
 *
 * Only plain identifier names are matched (ex: `className`); namespaced
 * attributes (ex: `xml:space`) do not match.
 *
 * Supports both data-first and data-last (curried) call styles:
 * - `isAttribute(node, "className")`
 * - `isAttribute("className")(node)`.
 * @param node The AST node to test.
 * @param name The attribute name to match (ex: "className").
 * @returns `true` when the node is a `JSXAttribute` named `name`.
 */
export const isAttribute: {
  (name: string): (node: TSESTree.Node) => node is TSESTree.JSXAttribute;
  (node: TSESTree.Node, name: string): node is TSESTree.JSXAttribute;
} = dual(2, (node: TSESTree.Node, name: string): node is TSESTree.JSXAttribute => {
  return node.type === AST.JSXAttribute && node.name.type === AST.JSXIdentifier && node.name.name === name;
});
