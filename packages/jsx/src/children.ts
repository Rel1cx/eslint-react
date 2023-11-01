import { O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";

import { findPropInAttributes } from "./prop";
import { isLineBreak } from "./textnode";

/**
 * Check if a `JSXElement` or `JSXFragment` has children
 * @param node The AST node to check
 * @param context The ESLint rule context
 * @param includeTextNode If `true`, consider `textnode` as children
 * @param includeChildrenProp If `true`, consider `children` prop as children
 * @returns `true` if the node has children
 */
export function hasChildren(
  node: TSESTree.JSXElement | TSESTree.JSXFragment,
  context: RuleContext,
  includeTextNode = true,
  includeChildrenProp = true,
) {
  if (node.children.length === 0) {
    return includeChildrenProp
      && node.type === AST_NODE_TYPES.JSXElement
      && O.isSome(findPropInAttributes(node.openingElement.attributes, context)("children"));
  }

  if (includeTextNode) {
    return node.children.some((child) => child.type === AST_NODE_TYPES.JSXText && !isLineBreak(child));
  }

  return true;
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
  return node.parent?.type === AST_NODE_TYPES.JSXElement
    && node.parent.children.some((child) => child === node);
}
