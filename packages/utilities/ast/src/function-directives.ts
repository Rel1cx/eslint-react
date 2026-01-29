import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

import { getUnderlyingExpression } from "./expression-base";
import { isLiteral } from "./literal";
import type { TSESTreeFunction } from "./types";

/**
 * Get all directive string literals from a function node
 * @param node The function AST node
 * @returns The array of directive string literals (e.g., "use memo", "use no memo")
 */
export function getFunctionDirectives(node: TSESTreeFunction): TSESTree.StringLiteral[] {
  const directives: TSESTree.StringLiteral[] = [];
  if (node.body.type !== T.BlockStatement) return directives;
  for (const stmt of node.body.body) {
    if (stmt.type !== T.ExpressionStatement) continue;
    const expr = getUnderlyingExpression(stmt.expression);
    if (!isLiteral(expr, "string")) continue;
    directives.push(expr);
  }
  return directives;
}
