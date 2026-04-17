import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

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
export function getElementFullType(node: TSESTreeJSXElementLike): string {
  if (node.type === AST.JSXFragment) {
    return "";
  }
  function getQualifiedName(
    node:
      | TSESTree.JSXIdentifier
      | TSESTree.JSXNamespacedName
      | TSESTree.JSXMemberExpression,
  ): string {
    if (node.type === AST.JSXIdentifier) {
      return node.name;
    }

    if (node.type === AST.JSXNamespacedName) {
      return node.namespace.name + ":" + node.name.name;
    }

    return (getQualifiedName(node.object) + "." + getQualifiedName(node.property));
  }
  return getQualifiedName(node.openingElement.name);
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
export function getElementSelfType(node: TSESTreeJSXElementLike): string {
  return getElementFullType(node).split(".").at(-1) ?? "";
}
