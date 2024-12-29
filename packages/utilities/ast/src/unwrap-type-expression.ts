import type { TSESTree } from "@typescript-eslint/types";

import { isTypeOnlyExpression } from "./is";

export function unwrapTypeExpression(node: TSESTree.Node): TSESTree.Node {
  if (isTypeOnlyExpression(node)) return unwrapTypeExpression(node.expression);
  return node;
}
