import type { TSESTree } from "@typescript-eslint/types";

import { isTypeExpression } from "./is";
import type { TSESTreeTypeExpression } from "./types";

/**
 * Recursively get the inner expression until it's not a TypeExpression
 * @param node - The node to get the expression from
 * @returns The inner expression
 */
export function getEcmaExpression(node: TSESTree.Node): Exclude<
  TSESTree.Node,
  TSESTreeTypeExpression
> {
  if (isTypeExpression(node)) {
    return getEcmaExpression(node.expression);
  }
  return node;
}
