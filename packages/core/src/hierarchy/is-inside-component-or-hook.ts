import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import { findEnclosingComponentOrHook } from "./find-enclosing-component-or-hook";

/**
 * Check if a given AST node is inside a React component or hook
 * @param node The AST node to check
 * @returns True if the node is inside a component or hook, false otherwise
 */
export function isInsideComponentOrHook(node: TSESTree.Node | unit) {
  return findEnclosingComponentOrHook(node) != null;
}
