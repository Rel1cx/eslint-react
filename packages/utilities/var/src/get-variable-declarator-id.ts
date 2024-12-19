import { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function getVariableDeclaratorID(
  node: TSESTree.Node,
  prev?: TSESTree.Node,
): O.Option<TSESTree.BindingName | TSESTree.Expression> {
  switch (true) {
    case node.type === AST_NODE_TYPES.VariableDeclarator
      && node.init === prev:
      return O.some(node.id);
    case node.type === AST_NODE_TYPES.AssignmentExpression
      && node.right === prev:
      return O.some(node.left);
    case node.type === AST_NODE_TYPES.BlockStatement
      || node.type === AST_NODE_TYPES.Program
      || node.parent === node:
      return O.none();
    default:
      return getVariableDeclaratorID(node.parent, node);
  }
}
