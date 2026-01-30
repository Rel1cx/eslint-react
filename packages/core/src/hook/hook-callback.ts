import * as ast from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { isUseEffectLikeCall } from "./hook-is";

/**
 * Determine if a node is the setup function passed to a useEffect-like hook
 * @param node The AST node to check
 */
export function isUseEffectSetupCallback(node: TSESTree.Node | unit) {
  if (node == null) return false;
  // Check if node is the first argument of a CallExpression that is a useEffect-like hook
  return node.parent?.type === AST.CallExpression
    && node.parent.arguments.at(0) === node
    && isUseEffectLikeCall(node.parent);
}

/**
 * Determine if a node is the cleanup function returned by a useEffect-like hook's setup function.
 * @param node The AST node to check
 */
export function isUseEffectCleanupCallback(node: TSESTree.Node | unit) {
  if (node == null) return false;

  // Find the return statement returning this node
  const pReturn = ast.findParentNode(node, ast.is(AST.ReturnStatement));

  // Find the function scope containing the node
  const pFunction = ast.findParentNode(node, ast.isFunction);

  // Find the function scope containing the return statement
  const pFunctionOfReturn = ast.findParentNode(pReturn, ast.isFunction);

  // Verify the node and the return statement belong to the same function scope
  if (pFunction !== pFunctionOfReturn) return false;

  // Check if that parent function is itself a useEffect setup function
  return isUseEffectSetupCallback(pFunction);
}
