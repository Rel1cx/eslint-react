import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { isTypeExpression } from "./node-is";
import { getUnderlyingExpression } from "./node-unwrap";

/**
 * Get the name of a property from a node
 * Handles identifiers, private identifiers, literals, and template literals
 * @param node The node to get the property name from
 * @returns The property name or null if not determinable
 */
export function getPropertyName(node: TSESTree.Node): string | null {
  if (isTypeExpression(node)) {
    return getPropertyName(getUnderlyingExpression(node));
  }
  if (node.type === AST.Identifier || node.type === AST.PrivateIdentifier) {
    return node.name;
  }
  if (node.type === AST.Literal) {
    return String(node.value);
  }
  if (node.type === AST.TemplateLiteral && node.expressions.length === 0) {
    return node.quasis[0]?.value.raw ?? null;
  }
  return null;
}
