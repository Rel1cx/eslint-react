import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function isEvalCall(node: TSESTree.CallExpression) {
  return Check.isIdentifier("eval")(Extract.unwrap(node.callee));
}

export function isIifeCall(node: TSESTreeFunction) {
  let parent: TSESTree.Node = node.parent;
  while (Check.isTypeExpression(parent) || parent.type === AST.ChainExpression) {
    parent = parent.parent;
  }
  return parent.type === AST.CallExpression && Extract.unwrap(parent.callee) === node;
}
