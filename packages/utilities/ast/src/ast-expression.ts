import type { TSESTree } from "@typescript-eslint/types";
import type { TSESTreeTypeExpression } from "./ast-node";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { is, isTypeExpression } from "./ast-is";

/**
 * Recursively get the inner expression until it's not a TypeExpression
 * @param node - The node to get the expression from
 * @returns The inner expression
 */
export function getJSExpression(node: TSESTree.Node): Exclude<
  TSESTree.Node,
  TSESTreeTypeExpression
> {
  if (isTypeExpression(node)) {
    return getJSExpression(node.expression);
  }
  return node;
}

export function isThisExpression(node: TSESTree.Expression) {
  return getJSExpression(node).type === T.ThisExpression;
}
