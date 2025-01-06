import * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isThisSetState(node: TSESTree.CallExpression) {
  const { callee } = node;
  return (
    callee.type === T.MemberExpression
    && AST.isThisExpression(callee.object)
    && callee.property.type === T.Identifier
    && callee.property.name === "setState"
  );
}
