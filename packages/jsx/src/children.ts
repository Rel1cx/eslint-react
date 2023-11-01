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

export function isChildOfBuiltinComponentElement(node: TSESTree.Node) {
  return node.parent?.type === AST_NODE_TYPES.JSXElement
    && node.parent.openingElement.name.type === AST_NODE_TYPES.JSXIdentifier
    && /^[a-z]+$/u.test(node.parent.openingElement.name.name);
}

export function isChildOfUserDefinedComponentElement(node: TSESTree.Node, pragma: string, fragment: string) {
  return node.parent?.type === AST_NODE_TYPES.JSXElement
    && !isChildOfBuiltinComponentElement(node)
    && !isFragment(node.parent, pragma, fragment);
}
