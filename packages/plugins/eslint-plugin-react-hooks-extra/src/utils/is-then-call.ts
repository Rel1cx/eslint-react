import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isThenCall(node: TSESTree.CallExpression) {
  return node.callee.type === T.MemberExpression
    && node.callee.property.type === T.Identifier
    && node.callee.property.name === "then";
}
