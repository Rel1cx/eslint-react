import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function getIdentifiersFromBinaryExpression(
  side:
    | TSESTree.BinaryExpression
    | TSESTree.BinaryExpression["left"]
    | TSESTree.BinaryExpression["right"],
): TSESTree.Identifier[] {
  if (side.type === T.Identifier) {
    return [side];
  }
  if (side.type === T.BinaryExpression) {
    return [
      ...getIdentifiersFromBinaryExpression(side.left),
      ...getIdentifiersFromBinaryExpression(side.right),
    ];
  }
  return [];
}
