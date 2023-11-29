import { Pred } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./node-type";

export function isRegExpLiteral(node: TSESTree.Node): node is TSESTree.RegExpLiteral {
  return node.type === NodeType.Literal && "regex" in node;
}

export function isStringLiteral(node: TSESTree.Node | null | undefined): node is TSESTree.StringLiteral {
  return node?.type === NodeType.Literal && Pred.isString(node.value);
}
