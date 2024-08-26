import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function getIdentifiersFromBinaryExpression(
  side:
    | TSESTree.BinaryExpression
    | TSESTree.BinaryExpression["left"]
    | TSESTree.BinaryExpression["right"],
): TSESTree.Identifier[] {
  if (side.type === AST_NODE_TYPES.Identifier) return [side];
  if (side.type === AST_NODE_TYPES.BinaryExpression) {
    return [
      ...getIdentifiersFromBinaryExpression(side.left),
      ...getIdentifiersFromBinaryExpression(side.right),
    ];
  }
  return [];
}
