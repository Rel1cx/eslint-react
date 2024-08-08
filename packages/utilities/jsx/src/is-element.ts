import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { hasProp } from "./has-prop";

export function isKeyedElement(node: TSESTree.Node, context: RuleContext) {
  return node.type === AST_NODE_TYPES.JSXElement
    && hasProp(node.openingElement.attributes, "key", context, context.sourceCode.getScope(node));
}

/**
 * Check if a node is a `JSXElement` of `User-Defined Component` type
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXElement` of `User-Defined Component` type
 */
export function isUserDefinedElement(node: TSESTree.Node) {
  return node.type === AST_NODE_TYPES.JSXElement
    && node.openingElement.name.type === AST_NODE_TYPES.JSXIdentifier
    && /^[A-Z]/u.test(node.openingElement.name.name);
}

/**
 * Check if a node is a `JSXFragment` of `Built-in Component` type
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXFragment` of `Built-in Component` type
 */
export function isBuiltInElement(node: TSESTree.Node) {
  return node.type === AST_NODE_TYPES.JSXElement
    && node.openingElement.name.type === AST_NODE_TYPES.JSXIdentifier
    && node.openingElement.name.name.toLowerCase() === node.openingElement.name.name
    && /^[a-z]/u.test(node.openingElement.name.name);
}
