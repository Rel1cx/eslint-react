import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";

import { isFragment } from "./fragment";

/**
 * Check if a JSXElement or JSXFragment has children
 * @param node The AST node to check
 * @returns `true` if the node has children
 */
export function hasChildren(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  return node.children.length > 0;
}

export function isChildOfHtmlElement(node: TSESTree.Node) {
  return node.parent?.type === AST_NODE_TYPES.JSXElement
    && node.parent.openingElement.name.type === AST_NODE_TYPES.JSXIdentifier
    && /^[a-z]+$/u.test(node.parent.openingElement.name.name);
}

export function isChildOfComponentElement(node: TSESTree.Node, reactPragma: string, fragmentPragma: string) {
  return node.parent?.type === AST_NODE_TYPES.JSXElement
    && !isChildOfHtmlElement(node)
    && !isFragment(node.parent, reactPragma, fragmentPragma);
}
