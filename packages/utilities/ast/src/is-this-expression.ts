import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isTypeExpression } from "./is";

export function isThisExpression(node: TSESTree.Expression) {
  if (isTypeExpression(node)) return isThisExpression(node.expression);
  return node.type === T.ThisExpression;
}
