import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { toString } from "./to-string";

/**
 * Get the string representation of a JSX element's type.
 *
 * - `<div>`              -> `"div"`
 * - `<Foo.Bar>`          -> `"Foo.Bar"`
 * - `<React.Fragment>`   -> `"React.Fragment"`
 * - `<></>`              -> `""`
 *
 * @param node - A `JSXElement` or `JSXFragment` node.
 * @returns The fully-qualified element type string.
 */
export function getElementType(node: TSESTreeJSXElementLike): string {
  if (node.type === AST.JSXFragment) {
    return "";
  }
  return toString(node.openingElement.name);
}

/**
 * Get the **self name** (last dot-separated segment) of a JSX element type.
 *
 * - `<Foo.Bar.Baz>`  -> `"Baz"`
 * - `<div>`           -> `"div"`
 * - `<></>`           -> `""`
 *
 * @param node - A `JSXElement` or `JSXFragment` node.
 * @returns The last segment of the element type, or `""` for fragments.
 */
export function getElementSelfName(node: TSESTreeJSXElementLike): string {
  return getElementType(node).split(".").at(-1) ?? "";
}
