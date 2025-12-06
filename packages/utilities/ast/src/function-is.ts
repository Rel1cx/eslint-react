import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import type { TSESTreeFunction } from "./node-types";

export function isFunctionEmpty(node: TSESTreeFunction) {
  return node.body.type === T.BlockStatement
    && node.body.body.length === 0;
}

export function isFunctionImmediatelyInvoked(node: TSESTreeFunction) {
  return node.type !== T.FunctionDeclaration
    && node.parent.type === T.CallExpression
    && node.parent.callee === node;
}
