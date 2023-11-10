import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./node-type";

/**
 * Get all unary operators in a nested unary expression.
 * @param node The node to get the operators from.
 * @returns All unary operators in a nested unary expression.
 */
export function getNestedUnaryOperators(node: TSESTree.UnaryExpression): TSESTree.UnaryExpression["operator"][] {
  const { operator } = node;
  const { argument } = node;

  if (argument.type === NodeType.UnaryExpression) {
    return [operator, ...getNestedUnaryOperators(argument)];
  }

  return [operator];
}
