import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isDirective } from "./directive-is";
import type { TSESTreeDirective, TSESTreeFunction } from "./types";

/**
 * Get all directive string literals from a function node
 * @param node The function AST node
 * @returns The array of directive string literals (e.g., "use memo", "use no memo")
 */
export function getFunctionDirectives(node: TSESTreeFunction): TSESTreeDirective[] {
  const directives: TSESTreeDirective[] = [];
  if (node.body.type !== AST.BlockStatement) return directives;
  for (const stmt of node.body.body) {
    if (!isDirective(stmt)) continue;
    directives.push(stmt);
  }
  return directives;
}
