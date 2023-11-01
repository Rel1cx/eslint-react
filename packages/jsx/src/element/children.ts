import { NodeType } from "@eslint-react/ast";
import { type TSESTree } from "@typescript-eslint/types";

/**
 * Check if a `JSXElement` or `JSXFragment` has children
 * @param node The AST node to check
 * @param predicate A predicate to filter the children
 * @returns `true` if the node has children
 */
export function hasChildren(
  node: TSESTree.JSXElement | TSESTree.JSXFragment,
  predicate?: (node: TSESTree.JSXChild) => boolean,
) {
  if (typeof predicate === "function") {
    return node.children.some(predicate);
  }

  return node.children.length > 0;
}

/**
 * Check if a node is a child of a `JSXElement`
 * @param node The AST node to check
 * @returns `true` if the node is a child of a `JSXElement`
 */
export function isChildOfJSXElement(node: TSESTree.Node): node is
  & TSESTree.JSXElement
  & { parent: TSESTree.JSXElement }
{
  return node.parent?.type === NodeType.JSXElement
    && node.parent.children.some((child) => child === node);
}
