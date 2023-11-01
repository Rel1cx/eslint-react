import { NodeType } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/types";

import { findPropInAttributes } from "./prop";
import { isLineBreak } from "./textnode";

/**
 * Check if a `JSXElement` or `JSXFragment` has children
 * @param node The AST node to check
 * @param context The ESLint rule context
 * @param includeTextNode If `true`, consider `textnode` as children
 * @param includeLineBreak If `true`, consider `linebreak` as children
 * @param includeChildrenProp If `true`, consider `children` prop as children
 * @returns `true` if the node has children
 */
export function hasChildren(
  node: TSESTree.JSXElement | TSESTree.JSXFragment,
  context: RuleContext,
  includeTextNode = true,
  includeLineBreak = true,
  includeChildrenProp = true,
) {
  if (node.children.length === 0) {
    return includeChildrenProp
      && node.type === NodeType.JSXElement
      && O.isSome(findPropInAttributes(node.openingElement.attributes, context)("children"));
  }

  const checkTextNode = includeTextNode
    ? (node: TSESTree.JSXChild) => node.type !== NodeType.JSXText
    : F.constTrue;

  const checkLineBreak = includeLineBreak
    ? isLineBreak
    : F.constTrue;

  return node.children.some((child) =>
    child.type !== NodeType.JSXText
    && checkTextNode(child)
    && checkLineBreak(child)
  );
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
