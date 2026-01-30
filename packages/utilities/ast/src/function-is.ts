import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import type { TSESTreeFunction } from "./types";

/**
 * Check if a function is empty
 * @param node The function node to check
 * @returns True if the function is empty, false otherwise
 */
export function isFunctionEmpty(node: TSESTreeFunction) {
  return node.body.type === AST.BlockStatement
    && node.body.body.length === 0;
}

/**
 * Check if a function is immediately invoked
 * @param node The function node to check
 * @returns True if the function is immediately invoked, false otherwise
 */
export function isFunctionImmediatelyInvoked(node: TSESTreeFunction) {
  return node.type !== AST.FunctionDeclaration
    && node.parent.type === AST.CallExpression
    && node.parent.callee === node;
}
