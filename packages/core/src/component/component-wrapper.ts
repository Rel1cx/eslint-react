import type { RuleContext } from "@eslint-react/kit";
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
  return isComponentWrapperCall(context, node) || isUseCallbackCall(context, node);
}
