import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import type { TSESTreeFunction } from "./types";

export function isFunctionEmpty(node: TSESTreeFunction) {
  return node.body.type === AST.BlockStatement
    && node.body.body.length === 0;
}

export function isFunctionImmediatelyInvoked(node: TSESTreeFunction) {
  return node.type !== AST.FunctionDeclaration
    && node.parent.type === AST.CallExpression
    && node.parent.callee === node;
}
