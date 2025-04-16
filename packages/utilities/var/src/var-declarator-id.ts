import type { TSESTree } from "@typescript-eslint/types";
import { _ } from "@eslint-react/eff";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function getVariableDeclaratorId(
  node: TSESTree.Node | _,
  prev?: TSESTree.Node,
): TSESTree.BindingName | TSESTree.Expression | _ {
  if (node == null) return _;
  switch (true) {
    case node.type === T.VariableDeclarator
      && node.init === prev:
      return node.id;
    case node.type === T.AssignmentExpression
      && node.right === prev:
      return node.left;
    case node.type === T.BlockStatement
      || node.type === T.Program
      || node.parent === node:
      return _;
    default:
      return getVariableDeclaratorId(node.parent, node);
  }
}
