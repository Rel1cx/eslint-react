import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function getInstanceID(node: TSESTree.Node, prev?: TSESTree.Node) {
  switch (true) {
    case node.type === AST_NODE_TYPES.VariableDeclarator
      && node.init === prev:
      return O.some(node.id);
    case node.type === AST_NODE_TYPES.AssignmentExpression
      && node.right === prev:
      return O.some(node.left);
    case node.type === AST_NODE_TYPES.PropertyDefinition
      && node.value === prev:
      return O.some(node.key);
    case node.type === AST_NODE_TYPES.BlockStatement
      || node.type === AST_NODE_TYPES.Program
      || node.parent === node:
      return O.none();
    default:
      return getInstanceID(node.parent, node);
  }
}
