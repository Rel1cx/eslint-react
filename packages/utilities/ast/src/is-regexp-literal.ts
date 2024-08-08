import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function isRegExpLiteral(node: TSESTree.Node): node is TSESTree.RegExpLiteral {
  return node.type === AST_NODE_TYPES.Literal && "regex" in node;
}
