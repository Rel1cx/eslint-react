/* eslint-disable jsdoc/require-param */
import type { TSESTree } from "@typescript-eslint/types";
import { unit } from "@eslint-react/eff";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/** @internal */
export function getInstanceId(node: TSESTree.Node, prev?: TSESTree.Node) {
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
      return unit;
    default:
      return getInstanceId(node.parent, node);
  }
}
