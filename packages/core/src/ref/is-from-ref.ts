/* eslint-disable jsdoc/require-returns-check */
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Checks whether a given node is derived from a ref.
 * @todo Implement the function logic
 * @param node The AST node to check
 * @param initialScope The initial scope to start the search from
 * @returns True if the node is derived from a ref, false otherwise
 */
export function isFromRef(node: TSESTree.Node, initialScope: Scope) {}
