import type { TSESTree } from "@typescript-eslint/types";
import { Predicate as Prd } from "effect";

import { NodeType } from "../node";

export function isRegExpLiteral(node: TSESTree.Node): node is TSESTree.RegExpLiteral {
  return node.type === NodeType.Literal && "regex" in node;
}

export function isStringLiteral(node: TSESTree.Node): node is TSESTree.StringLiteral {
  return node.type === NodeType.Literal && Prd.isString(node.value);
}
