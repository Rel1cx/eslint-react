import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { isDirective } from "./directive-is";
import { getUnderlyingExpression } from "./expression-base";

/**
 * Get all directive string literals from a program node
 * @param node The program AST node
 * @returns The array of directive string literals (e.g., "use strict")
 */
export function getFileDirectives(node: TSESTree.Program): TSESTree.StringLiteral[] {
  const directives: TSESTree.StringLiteral[] = [];
  for (const stmt of node.body) {
    if (stmt.type !== AST.ExpressionStatement) continue;
    const expr = getUnderlyingExpression(stmt.expression);
    if (!isDirective(expr)) continue;
    directives.push(expr);
  }
  return directives;
}
