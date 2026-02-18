import { unit } from "@eslint-react/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { getUnderlyingExpression } from "./expression-base";
import { isTypeExpression } from "./node-is";

/**
 * Get the name of a property from a node
 * Handles identifiers, private identifiers, literals, and template literals
 * @param node The node to get the property name from
 * @returns The property name or unit if not determinable
 */
export function getPropertyName(node: TSESTree.Node): string | unit {
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
    return node.quasis[0]?.value.raw;
  }
  return unit;
}
