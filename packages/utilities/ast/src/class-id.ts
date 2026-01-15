import { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import type { TSESTreeClass } from "./types";

export function getClassId(node: TSESTreeClass): TSESTree.BindingName | unit {
  if (node.id != null) return node.id;
  if (node.parent.type === T.VariableDeclarator) {
    return node.parent.id;
  }
  return unit;
}
