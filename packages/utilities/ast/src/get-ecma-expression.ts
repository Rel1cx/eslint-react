import type { TSESTree } from "@typescript-eslint/types";

import { isTsOnlyExpression } from "./is";
import type { TSESTreeTSOnlyExpression } from "./types";

/**
 * Recursively get the inner expression until it's not a TSOnlyExpression
 * @param node - The node to get the expression from
 * @returns The inner expression
 */
export function getEcmaExpression(node: TSESTree.Node): Exclude<
  TSESTree.Node,
  TSESTreeTSOnlyExpression
> {
  if (isTsOnlyExpression(node)) {
    return getEcmaExpression(node.expression);
  }
  return node;
}
