import { _ } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function getInstanceID(node: TSESTree.Node, prev?: TSESTree.Node) {
  switch (true) {
    case node.type === T.VariableDeclarator
      && node.init === prev:
      return node.id;
    case node.type === T.AssignmentExpression
      && node.right === prev:
      return node.left;
    case node.type === T.PropertyDefinition
      && node.value === prev:
      return node.key;
    case node.type === T.BlockStatement
      || node.type === T.Program
      || node.parent === node:
      return _;
    default:
      return getInstanceID(node.parent, node);
  }
}
