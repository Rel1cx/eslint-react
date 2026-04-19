import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function isEvalCall(node: TSESTree.CallExpression) {
  const callee = Extract.unwrap(node.callee);
  return callee.type === AST.Identifier && callee.name === "eval";
}

export function isIifeCall(node: TSESTreeFunction) {
  let parent: TSESTree.Node = node.parent;
  while (Check.isTypeExpression(parent) || parent.type === AST.ChainExpression) {
    parent = parent.parent;
  }
  return parent.type === AST.CallExpression && Extract.unwrap(parent.callee) === node;
}
