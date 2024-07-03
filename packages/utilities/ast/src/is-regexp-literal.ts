import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./types";

export function isRegExpLiteral(node: TSESTree.Node): node is TSESTree.RegExpLiteral {
  return node.type === NodeType.Literal && "regex" in node;
}
