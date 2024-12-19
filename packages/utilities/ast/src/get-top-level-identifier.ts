import { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function getTopLevelIdentifier(node: TSESTree.Node): O.Option<TSESTree.Identifier> {
  switch (node.type) {
    case AST_NODE_TYPES.Identifier:
      return O.some(node);
    case AST_NODE_TYPES.MemberExpression:
      return getTopLevelIdentifier(node.object);
    default:
      return O.none();
  }
}
