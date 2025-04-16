import type { TSESTreeFunction } from "./ast-node";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isEmptyFunction(node: TSESTreeFunction) {
  return node.body.type === T.BlockStatement
    && node.body.body.length === 0;
}
