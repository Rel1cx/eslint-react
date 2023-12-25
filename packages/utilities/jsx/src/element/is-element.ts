import { NodeType } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Check if a node is a `JSXElement` of `User-Defined Component` type
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXElement` of `User-Defined Component` type
 */
export function isJSXElementOfUserDefinedComponent(node: TSESTree.JSXElement) {
  return node.openingElement.name.type === NodeType.JSXIdentifier
    && /^[A-Z]/u.test(node.openingElement.name.name);
}

/**
 * Check if a node is a `JSXFragment` of `Built-in Component` type
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXFragment` of `Built-in Component` type
 */
export function isJSXElementOfBuiltinComponent(node: TSESTree.JSXElement) {
  return node.openingElement.name.type === NodeType.JSXIdentifier
    && node.openingElement.name.name.toLowerCase() === node.openingElement.name.name
    && /^[a-z]/u.test(node.openingElement.name.name);
}
