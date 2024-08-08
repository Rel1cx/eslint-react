import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

function resolveJSXMemberExpressions(object: TSESTree.JSXTagNameExpression, property: TSESTree.JSXIdentifier): string {
  if (object.type === AST_NODE_TYPES.JSXMemberExpression) {
    return `${resolveJSXMemberExpressions(object.object, object.property)}.${property.name}`;
  }
  if (object.type === AST_NODE_TYPES.JSXNamespacedName) {
    return `${object.namespace.name}:${object.name.name}.${property.name}`;
  }
  return `${object.name}.${property.name}`;
}

/**
 * Returns the tag name associated with a JSXOpeningElement.
 * @param node The visited JSXOpeningElement node object.
 * @returns The element's tag name.
 */
export function getElementName(
  node:
    | TSESTree.JSXOpeningElement
    | TSESTree.JSXOpeningFragment,
) {
  if (node.type === AST_NODE_TYPES.JSXOpeningFragment) {
    return "<>";
  }
  const { name } = node;
  if (name.type === AST_NODE_TYPES.JSXMemberExpression) {
    const { object, property } = name;
    return resolveJSXMemberExpressions(object, property);
  }
  if (name.type === AST_NODE_TYPES.JSXNamespacedName) {
    return `${name.namespace.name}:${name.name.name}`;
  }
  return name.name;
}
