import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

import { getUnderlyingExpression } from "./expression-base";
import { isLiteral } from "./literal";

/**
 * Get all directive string literals from a program node
 * @param node The program AST node
 * @returns The array of directive string literals (e.g., "use strict")
 */
export function getProgramDirectives(node: TSESTree.Program): TSESTree.StringLiteral[] {
  const directives: TSESTree.StringLiteral[] = [];
  for (const stmt of node.body) {
    if (stmt.type !== T.ExpressionStatement) continue;
    const expr = getUnderlyingExpression(stmt.expression);
    if (!isLiteral(expr, "string")) continue;
    directives.push(expr);
  }
  return directives;
}
