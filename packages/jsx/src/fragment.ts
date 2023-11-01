import { is, isOneOf, NodeType } from "@eslint-react/ast";
import { type TSESTree } from "@typescript-eslint/types";

import { isLiteral, isPaddingSpaces } from "./textnode";

export const isFragment = (
  node: TSESTree.Node,
  pragma: string,
  fragment: string,
): node is TSESTree.JSXElement | TSESTree.JSXFragment => {
  if (!isOneOf([NodeType.JSXElement, NodeType.JSXFragment])(node)) {
    return false;
  }

  return isFragmentSyntax(node) || isFragmentElement(node, pragma, fragment);
};

/**
 * Check if a node is `<></>`
 */
export const isFragmentSyntax = is(NodeType.JSXFragment);

/**
 * Check if a node is `<Fragment></Fragment>` or `<Pragma.Fragment></Pragma.Fragment>`
 * @param node
 * @param pragma
 * @param fragment
 */
export function isFragmentElement(node: TSESTree.JSXElement, pragma: string, fragment: string) {
  const { name } = node.openingElement;

  // <Fragment>
  if (name.type === NodeType.JSXIdentifier && name.name === fragment) {
    return true;
  }

  // <Pragma.Fragment>
  return name.type === NodeType.JSXMemberExpression
    && name.object.type === NodeType.JSXIdentifier
    && name.object.name === pragma
    && name.property.name === fragment;
}

/**
 * Check if a JSXElement or JSXFragment has only one literal child and is not a child
 * @param node The AST node to check
 * @returns `true` if the node has only one literal child and is not a child
 * @example Somehow fragment like this is useful: <Foo content={<>ee eeee eeee ...</>} />
 */
export function isFragmentWithOnlyTextAndIsNotChild(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  return node.children.length === 1
    && isLiteral(node.children[0])
    && !(node.parent.type === NodeType.JSXElement || node.parent.type === NodeType.JSXFragment);
}

function containsCallExpression(node: TSESTree.Node) {
  return node.type === NodeType.JSXExpressionContainer
    && node.expression.type === NodeType.CallExpression;
}

/**
 * Check if a JSXElement or JSXFragment has less than two non-padding children and the first child is not a call expression
 * @param node The AST node to check
 * @returns boolean
 */
export function isFragmentHasLessThanTwoChildren(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  const nonPaddingChildren = node.children.filter(
    (child) => !isPaddingSpaces(child),
  );

  if (nonPaddingChildren.length === 1) {
    return !containsCallExpression(nonPaddingChildren[0] as TSESTree.Node);
  }

  return nonPaddingChildren.length === 0;
}

export function isFragmentWithSingleExpression(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  const children = node.children.filter((child) => !isPaddingSpaces(child));

  return (
    children.length === 1
    && children[0]?.type === NodeType.JSXExpressionContainer
  );
}
