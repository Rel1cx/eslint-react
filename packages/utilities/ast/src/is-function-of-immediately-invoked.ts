import { AST_NODE_TYPES } from "@typescript-eslint/types";

import type { TSESTreeFunction } from "./types";

export function isFunctionOfImmediatelyInvoked(node: TSESTreeFunction): boolean {
  return node.type !== AST_NODE_TYPES.FunctionDeclaration
    && node.parent.type === AST_NODE_TYPES.CallExpression
    && node.parent.callee === node;
}
