import type { TSESTreeFunction } from "./ast-node-types";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isEmptyFunction(node: TSESTreeFunction) {
  return node.body.type === T.BlockStatement
    && node.body.body.length === 0;
}

export function isImmediatelyInvokedFunction(node: TSESTreeFunction) {
  return node.type !== T.FunctionDeclaration
    && node.parent.type === T.CallExpression
    && node.parent.callee === node;
}
