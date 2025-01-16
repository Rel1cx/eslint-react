import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { getElementName } from "./get-element-name";
import { hasAttribute } from "./has-attribute";

/**
 * Check if a node is a Fragment element
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXElement` of `Fragment` type
 */
export function isFragmentElement(node: TSESTree.Node) {
  if (node.type !== T.JSXElement) return false;
  return getElementName(node)
    .split(".")
    .at(-1) === "Fragment";
}

/**
 * Check if a node has a `key` prop
 * @param node The AST node to check
 * @param initialScope The initial scope to start searching for the `key` attribute
 * @returns `true` if the node is a `JSXElement` of `Keyed Component` type
 */
export function isKeyedElement(node: TSESTree.Node, initialScope?: Scope) {
  return node.type === T.JSXElement
    && hasAttribute("key", node.openingElement.attributes, initialScope);
}

/**
 * Check if a node is a `JSXFragment` of `Built-in Component` type
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXFragment` of `Built-in Component` type
 */
export function isBuiltInElement(node: TSESTree.Node) {
  return node.type === T.JSXElement
    && node.openingElement.name.type === T.JSXIdentifier
    && node.openingElement.name.name.toLowerCase() === node.openingElement.name.name
    && /^[a-z]/u.test(node.openingElement.name.name);
}

/**
 * Check if a node is a `JSXElement` of `User-Defined Component` type
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXElement` of `User-Defined Component` type
 */
export function isUserDefinedElement(node: TSESTree.Node) {
  return node.type === T.JSXElement
    && node.openingElement.name.type === T.JSXIdentifier
    && /^[A-Z]/u.test(node.openingElement.name.name);
}
