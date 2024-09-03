import { AST_NODE_TYPES } from "@typescript-eslint/types";

import type { TSESTreeFunction } from "./types";

export function isEmptyFunction(node: TSESTreeFunction) {
  return node.body.type === AST_NODE_TYPES.BlockStatement
    && node.body.body.length === 0;
}
