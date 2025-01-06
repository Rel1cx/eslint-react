import { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function getTopLevelIdentifier(node: TSESTree.Node): O.Option<TSESTree.Identifier> {
  switch (node.type) {
    case T.Identifier:
      return O.some(node);
    case T.MemberExpression:
      return getTopLevelIdentifier(node.object);
    default:
      return O.none();
  }
}
