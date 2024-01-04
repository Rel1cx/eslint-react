import { is, isOneOf, NodeType } from "@eslint-react/ast";
import { type TSESTree } from "@typescript-eslint/types";

export const isFragment = (
  node: TSESTree.Node,
  pragma: string,
  fragment: string,
): node is TSESTree.JSXElement | TSESTree.JSXFragment => {
  if (!isOneOf([NodeType.JSXElement, NodeType.JSXFragment])(node)) return false;

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
  if (name.type === NodeType.JSXIdentifier && name.name === fragment) return true;

  // <Pragma.Fragment>
  return name.type === NodeType.JSXMemberExpression
    && name.object.type === NodeType.JSXIdentifier
    && name.object.name === pragma
    && name.property.name === fragment;
}
