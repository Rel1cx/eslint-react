import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { getUnderlyingExpression } from "./expression-base";

/**
 * Check if the given expression is a 'this' expression
 * Unwraps any type expressions before checking
 *
 * @param node The expression node to check
 * @returns True if the expression is a 'this' expression, false otherwise
 */
export function isThisExpressionLoose(node: TSESTree.Expression) {
  return getUnderlyingExpression(node).type === AST.ThisExpression;
}
