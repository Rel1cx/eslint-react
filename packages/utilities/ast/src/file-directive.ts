import type { TSESTree } from "@typescript-eslint/types";

import { isDirective } from "./directive-is";
import type { TSESTreeDirective } from "./types";

/**
 * Get all directive expression statements from the top of a program AST node
 * @param node The program AST node
 * @returns The array of directive string literals (e.g., "use strict")
 */
export function getFileDirectives(node: TSESTree.Program): TSESTreeDirective[] {
  const directives: TSESTreeDirective[] = [];
  for (const stmt of node.body) {
    if (!isDirective(stmt)) continue;
    directives.push(stmt);
  }
  return directives;
}
