import * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isUseEffectCallLoose } from "./hook-is";

/**
 * Determines if the node is the setup function of a useEffect hook
 * (the first argument passed to useEffect)
 * @param node The node to check
 */
export function isFunctionOfUseEffectSetup(node: TSESTree.Node | unit) {
  if (node == null) return false;
  return node.parent?.type === T.CallExpression
    && node.parent.callee !== node
    && node.parent.callee.type === T.Identifier
    && node.parent.arguments.at(0) === node
    && isUseEffectCallLoose(node.parent);
}

/**
 * Determines if the node is part of a useEffect cleanup function
 * (the function returned by the setup function of useEffect)
 * @param node The node to check
 */
export function isFunctionOfUseEffectCleanup(node: TSESTree.Node | unit) {
  if (node == null) return false;
  // Find the parent return statement
  const pReturn = AST.findParentNode(node, AST.is(T.ReturnStatement));
  // Find the nearest parent function
  const pFunction = AST.findParentNode(node, AST.isFunction);
  // Find the function containing the return statement
  const pFunctionOfReturn = AST.findParentNode(pReturn, AST.isFunction);
  // Ensure the node is in the same function as the return statement
  if (pFunction !== pFunctionOfReturn) return false;
  // Check if this function is a useEffect setup function
  return isFunctionOfUseEffectSetup(pFunction);
}
