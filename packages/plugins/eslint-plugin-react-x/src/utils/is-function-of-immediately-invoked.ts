import type * as AST from "@eslint-react/ast";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isFunctionOfImmediatelyInvoked(node: AST.TSESTreeFunction): boolean {
  return node.type !== T.FunctionDeclaration
    && node.parent.type === T.CallExpression
    && node.parent.callee === node;
}
