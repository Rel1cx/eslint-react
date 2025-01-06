import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import type { TSESTreeFunction } from "./types";

export function isFunctionOfImmediatelyInvoked(node: TSESTreeFunction): boolean {
  return node.type !== T.FunctionDeclaration
    && node.parent.type === T.CallExpression
    && node.parent.callee === node;
}
