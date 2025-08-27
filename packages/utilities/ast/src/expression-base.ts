import type { TSESTree } from "@typescript-eslint/types";
import { isTypeExpression, type TSESTreeTypeExpression } from "./node";

/**
 * Unwraps any type expressions to get the underlying JavaScript expression node.
 * Recursively processes nodes until a non-type expression is found.
 *
 * @param node - The AST node to unwrap
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
