import * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function isThisSetState(node: TSESTree.CallExpression) {
  const { callee } = node;
  return (
    callee.type === AST_NODE_TYPES.MemberExpression
    && AST.isThisExpression(callee.object)
    && callee.property.type === AST_NODE_TYPES.Identifier
    && callee.property.name === "setState"
  );
}
