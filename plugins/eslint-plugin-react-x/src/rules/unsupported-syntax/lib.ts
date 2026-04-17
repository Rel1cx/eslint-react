import type { TSESTreeFunction } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function isEvalCall(node: TSESTree.CallExpression) {
  return node.callee.type === AST.Identifier && node.callee.name === "eval";
}

export function isIifeCall(node: TSESTreeFunction) {
  return node.parent.type === AST.CallExpression && node.parent.callee === node;
}
