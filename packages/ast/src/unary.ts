import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./node-type";

export function getNestedUnaryOperators(
  node: TSESTree.UnaryExpression,
  seen = [],
): TSESTree.UnaryExpression["operator"][] {
  const { operator } = node;
  const { argument } = node;

  if (argument.type === NodeType.UnaryExpression) {
    return [...seen, operator, ...getNestedUnaryOperators(argument, seen)];
  }

  return [...seen, operator];
}
