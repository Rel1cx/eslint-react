import { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function getVariableDeclaratorID(
  node: TSESTree.Node,
  prev?: TSESTree.Node,
): O.Option<TSESTree.BindingName | TSESTree.Expression> {
  switch (true) {
    case node.type === T.VariableDeclarator
      && node.init === prev:
      return O.some(node.id);
    case node.type === T.AssignmentExpression
      && node.right === prev:
      return O.some(node.left);
    case node.type === T.BlockStatement
      || node.type === T.Program
      || node.parent === node:
      return O.none();
    default:
      return getVariableDeclaratorID(node.parent, node);
  }
}
