import type { TSESTree } from "@typescript-eslint/types";

import { isTypeExpression } from "./node-is";
import type { TSESTreeTypeExpression } from "./node-types";

/**
 * Unwraps any type expressions to get the underlying JavaScript expression node.
 * Recursively processes nodes until a non-type expression is found.
 *
 * @param node The AST node to unwrap
 * @returns The underlying JavaScript expression node
 */
export function getUnderlyingExpression(node: TSESTree.Node): Exclude<
  TSESTree.Node,
  TSESTreeTypeExpression
> {
  if (isTypeExpression(node)) {
    return getUnderlyingExpression(node.expression);
  }
  return node;
}
