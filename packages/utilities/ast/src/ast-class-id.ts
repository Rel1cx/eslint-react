import type { TSESTree } from "@typescript-eslint/types";
import type { TSESTreeClass } from "./ast-node-types";
import { unit } from "@eslint-react/eff";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function getClassId(node: TSESTreeClass): TSESTree.Identifier | unit {
  if (node.id != null) return node.id;
  if (node.parent.type === T.VariableDeclarator && node.parent.id.type === T.Identifier) {
    return node.parent.id;
  }
  return unit;
}
