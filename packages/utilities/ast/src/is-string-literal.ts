import type { TSESTree } from "@typescript-eslint/types";
import { Predicate as Prd } from "effect";

import { NodeType } from "./types";

export function isStringLiteral(node: TSESTree.Node): node is TSESTree.StringLiteral {
  return node.type === NodeType.Literal && Prd.isString(node.value);
}
