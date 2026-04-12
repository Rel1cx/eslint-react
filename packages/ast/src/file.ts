import type { TSESTree } from "@typescript-eslint/types";

import { isDirective } from "./node-is";

/**
 * Check if a directive with the given name exists in the file directives
 * @param node The program AST node
 * @param name The directive name to check (ex: "use strict", "use memo", "use no memo")
 * @returns True if the directive exists, false otherwise
 */
export function isFileHasDirective(node: TSESTree.Program, name: string): boolean {
  for (const stmt of node.body) {
    if (isDirective(stmt) && stmt.directive === name) {
      return true;
    }
  }
  return false;
}
