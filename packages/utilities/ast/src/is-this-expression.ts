import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function isThisExpression(node: TSESTree.Expression) {
  if (node.type === AST_NODE_TYPES.TSAsExpression) {
    return isThisExpression(node.expression);
  }

  return node.type === AST_NODE_TYPES.ThisExpression;
}
