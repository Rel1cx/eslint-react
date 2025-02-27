import type { TSESTree } from "@typescript-eslint/types";

import { isTsOnlyExpression } from "./is";
import type { TSESTreeTSOnlyExpression } from "./types";

/**
 * Gets the ecma expression from a TS expression.
 * @param node The TS expression.
 * @returns The ecma expression within the TS expression.
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
