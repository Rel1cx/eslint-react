import type { TSESTree } from "@typescript-eslint/types";
import * as R from "remeda";

import { NodeType } from "./types";

export function isStringLiteral(node: TSESTree.Node): node is TSESTree.StringLiteral {
  return node.type === NodeType.Literal && R.isString(node.value);
}
