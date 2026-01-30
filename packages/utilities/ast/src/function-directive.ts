import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { isDirective } from "./directive-is";
import { getUnderlyingExpression } from "./expression-base";
import type { TSESTreeFunction } from "./types";

/**
 * Get all directive string literals from a function node
 * @param node The function AST node
 * @returns The array of directive string literals (e.g., "use memo", "use no memo")
 */
export function getFunctionDirectives(node: TSESTreeFunction): TSESTree.StringLiteral[] {
  const directives: TSESTree.StringLiteral[] = [];
  if (node.body.type !== AST.BlockStatement) return directives;
  for (const stmt of node.body.body) {
    if (stmt.type !== AST.ExpressionStatement) continue;
    const expr = getUnderlyingExpression(stmt.expression);
    if (!isDirective(expr)) continue;
    directives.push(expr);
  }
  return directives;
}
