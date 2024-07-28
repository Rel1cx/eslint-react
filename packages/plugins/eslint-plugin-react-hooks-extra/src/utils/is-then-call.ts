import { NodeType } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { isMatching } from "ts-pattern";

export function isThenCall(node: TSESTree.CallExpression) {
  if (node.callee.type !== NodeType.MemberExpression) return false;
  return isMatching({
    type: NodeType.Identifier,
    name: "then",
  }, node.callee.property);
}
