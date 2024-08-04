import { NodeType } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

export function isThenCall(node: TSESTree.CallExpression) {
  return node.callee.type === NodeType.MemberExpression
    && node.callee.property.type === NodeType.Identifier
    && node.callee.property.name === "then";
}
