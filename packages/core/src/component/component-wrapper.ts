import * as AST from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isUseCallbackCall } from "../hook";
import { isForwardRefCall, isMemoCall } from "../utils";

/**
 * Check if the node is a call expression for a component wrapper
 * @param context The ESLint rule context
 * @param node The node to check
 * @returns `true` if the node is a call expression for a component wrapper
 */
export function isComponentWrapperCall(context: RuleContext, node: TSESTree.Node) {
  if (node.type !== T.CallExpression) return false;
  return isMemoCall(context, node) || isForwardRefCall(context, node);
}

/**
 * Check if the node is a call expression for a component wrapper loosely
 * @param context The ESLint rule context
 * @param node The node to check
 * @returns `true` if the node is a call expression for a component wrapper loosely
 */
export function isComponentWrapperCallLoose(context: RuleContext, node: TSESTree.Node) {
  if (node.type !== T.CallExpression) return false;
  return isComponentWrapperCall(context, node) || isUseCallbackCall(node);
}

/**
 * Check if the node is a callback function passed to a component wrapper
 * @param context The ESLint rule context
 * @param node The node to check
 * @returns `true` if the node is a callback function passed to a component wrapper
 */
export function isComponentWrapperCallback(context: RuleContext, node: TSESTree.Node) {
  if (!AST.isFunction(node)) return false;
  const parent = node.parent;
  if (parent.type !== T.CallExpression) return false;
  return isComponentWrapperCall(context, parent);
}

/**
 * Check if the node is a callback function passed to a component wrapper loosely
 * @param context The ESLint rule context
 * @param node The node to check
 * @returns `true` if the node is a callback function passed to a component wrapper loosely
 */
export function isComponentWrapperCallbackLoose(context: RuleContext, node: TSESTree.Node) {
  if (!AST.isFunction(node)) return false;
  const parent = node.parent;
  if (parent.type !== T.CallExpression) return false;
  return isComponentWrapperCallLoose(context, parent);
}
