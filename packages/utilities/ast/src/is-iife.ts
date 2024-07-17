import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./types";

export function isIIFE(node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression) {
  return node.parent.type === NodeType.CallExpression && node.parent.callee === node;
}
