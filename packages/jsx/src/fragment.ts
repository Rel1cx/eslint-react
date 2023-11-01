import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";

import { isLiteral, isPaddingSpaces } from "./textnode";

export function isFragment(node: TSESTree.JSXElement, reactPragma: string, fragmentPragma: string) {
  const { name } = node.openingElement;

  // <Fragment>
  if (name.type === AST_NODE_TYPES.JSXIdentifier && name.name === fragmentPragma) {
    return true;
  }

  // <React.Fragment>
  return name.type === AST_NODE_TYPES.JSXMemberExpression
    && name.object.type === AST_NODE_TYPES.JSXIdentifier
    && name.object.name === reactPragma
    && name.property.name === fragmentPragma;
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
    && !(node.parent.type === AST_NODE_TYPES.JSXElement || node.parent.type === AST_NODE_TYPES.JSXFragment);
}

function containsCallExpression(node: TSESTree.Node) {
  return node.type === AST_NODE_TYPES.JSXExpressionContainer
    && node.expression.type === AST_NODE_TYPES.CallExpression;
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
    && children[0]?.type === AST_NODE_TYPES.JSXExpressionContainer
  );
}
