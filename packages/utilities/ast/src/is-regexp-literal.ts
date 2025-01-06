import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isRegExpLiteral(node: TSESTree.Node): node is TSESTree.RegExpLiteral {
  return node.type === T.Literal && "regex" in node;
}
