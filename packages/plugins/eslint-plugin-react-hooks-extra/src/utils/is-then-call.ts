import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function isThenCall(node: TSESTree.CallExpression) {
  return node.callee.type === AST_NODE_TYPES.MemberExpression
    && node.callee.property.type === AST_NODE_TYPES.Identifier
    && node.callee.property.name === "then";
}
