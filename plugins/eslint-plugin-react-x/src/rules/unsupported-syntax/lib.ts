import { Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function isEvalCall(node: TSESTree.CallExpression) {
  const callee = Extract.unwrap(node.callee);
  return callee.type === AST.Identifier && callee.name === "eval";
}

export function isIifeCall(node: TSESTreeFunction) {
  const parent = Extract.unwrap(node.parent);
  return parent.type === AST.CallExpression && parent.callee === node;
}
