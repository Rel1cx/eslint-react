import type { TSESTree } from "@typescript-eslint/types";

import { isTypeExpression } from "./is";

export function unwrapTypeExpression(node: TSESTree.Node): TSESTree.Node {
  if (isTypeExpression(node)) {
    return unwrapTypeExpression(node.expression);
  }
  return node;
}
