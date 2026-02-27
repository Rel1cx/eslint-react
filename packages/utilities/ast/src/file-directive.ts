import type { TSESTree } from "@typescript-eslint/types";

import { isDirective } from "./directive-is";
import type { TSESTreeDirective } from "./node-types";

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

/**
 * Check if a directive with the given name exists in the file or function directives
 * @param node The program or function AST node
 * @param name The directive name to check (e.g., "use strict", "use memo", "use no memo")
 * @returns True if the directive exists, false otherwise
 */
export function isDirectiveInFile(node: TSESTree.Program, name: string): boolean {
  return getFileDirectives(node).some((d) => d.directive === name);
}
