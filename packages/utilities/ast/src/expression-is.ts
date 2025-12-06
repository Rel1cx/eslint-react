import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { getUnderlyingExpression } from "./expression-base";

/**
 * Checks if the given expression is a 'this' expression.
 * Unwraps any type expressions before checking.
 *
 * @param node The expression node to check
 * @returns true if the expression is a ThisExpression, false otherwise
 */
export function isThisExpression(node: TSESTree.Expression) {
  return getUnderlyingExpression(node).type === T.ThisExpression;
}
