import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { isRefLikeName } from "./ref-name";

export function isRefId(node: TSESTree.Expression | TSESTree.PrivateIdentifier) {
  return node.type === AST.Identifier && isRefLikeName(node.name);
}
