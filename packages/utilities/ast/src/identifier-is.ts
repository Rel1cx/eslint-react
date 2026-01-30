import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

export function isNaN(node: TSESTree.Node | null | unit): node is TSESTree.Identifier {
  return node != null
    && node.type === AST.Identifier
    && node.name === "NaN";
}

export function isUndefined(node: TSESTree.Node | null | unit): node is TSESTree.Identifier {
  return node != null
    && node.type === AST.Identifier
    && node.name === "undefined";
}
