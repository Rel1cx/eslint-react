import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isTypeOnlyExpression } from "./is";

export function isThisExpression(node: TSESTree.Expression) {
  if (isTypeOnlyExpression(node)) {
    return isThisExpression(node.expression);
  }

  return node.type === AST_NODE_TYPES.ThisExpression;
}
