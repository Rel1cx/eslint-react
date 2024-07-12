import { Pred } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./types";

export function isStringLiteral(node: TSESTree.Node): node is TSESTree.StringLiteral {
  return node.type === NodeType.Literal && Pred.isString(node.value);
}
