import * as AST from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isCreateElementCall } from "../utils";

/**
 * Determines whether inside `createElement`'s props.
 * @param node The AST node to check
 * @param context The rule context
 * @returns `true` if the node is inside createElement's props
 */
export function isInsideCreateElementProps(
  node: TSESTree.Node,
  context: RuleContext,
) {
  const call = AST.findParentNode(node, isCreateElementCall(context));
  if (call == null) return false;
  const prop = AST.findParentNode(node, AST.is(T.ObjectExpression));
  if (prop == null) return false;
  return prop === call.arguments[1];
}

/**
 * Determines whether inside `createElement`'s children.
 * @param node The AST node to check
 * @param context The rule context
 * @returns `true` if the node is inside createElement's children
 */
export function isChildrenOfCreateElement(
  node: TSESTree.Node,
  context: RuleContext,
) {
  const parent = node.parent;
  if (parent == null || parent.type !== T.CallExpression) return false;
  if (!isCreateElementCall(parent, context)) return false;
  return parent.arguments
    .slice(2)
    .some((arg) => arg === node);
}
