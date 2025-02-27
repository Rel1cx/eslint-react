import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { getEcmaExpression } from "./get-ecma-expression";

export function isThisExpression(node: TSESTree.Expression) {
  return getEcmaExpression(node).type === T.ThisExpression;
}
