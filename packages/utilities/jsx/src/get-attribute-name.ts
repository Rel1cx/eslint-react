import type { TSESTree } from "@typescript-eslint/types";

import { toString } from "./to-string";

/**
 * Get the stringified name of a `JSXAttribute` node.
 *
 * Handles both simple identifiers and namespaced names:
 *
 * - `className`   -> `"className"`
 * - `aria-label`  -> `"aria-label"`
 * - `xml:space`   -> `"xml:space"`
 *
 * @param node - A `JSXAttribute` AST node.
 * @returns The attribute name as a plain string.
 *
 * @example
 * ```ts
 * import { getAttributeName } from "@eslint-react/jsx";
 *
 * // Inside a rule visitor:
 * JSXAttribute(node) {
 *   const name = getAttributeName(node); // "className"
 * }
 * ```
 */
export function getAttributeName(node: TSESTree.JSXAttribute): string {
  return toString(node.name);
}
