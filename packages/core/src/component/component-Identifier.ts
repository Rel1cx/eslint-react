/* eslint-disable filenames-simple/naming-convention */
import { isOneOf, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export function getComponentIdentifier(node: TSESTreeFunction): O.Option<TSESTree.Identifier | TSESTree.Identifier[]> {
  const { id, parent } = node;

  if (node.type === NodeType.FunctionDeclaration) {
    return O.fromNullable(id);
  }

  if (
    parent.type === NodeType.VariableDeclarator
    && parent.id.type === NodeType.Identifier
    && parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some(parent.id);
  }

  if (
    parent.type === NodeType.CallExpression
    && parent.parent.type === NodeType.VariableDeclarator
    && parent.parent.id.type === NodeType.Identifier
    && parent.parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some(parent.parent.id);
  }

  if (
    parent.type === NodeType.CallExpression
    && parent.parent.type === NodeType.CallExpression
    && parent.parent.parent.type === NodeType.VariableDeclarator
    && parent.parent.parent.id.type === NodeType.Identifier
    && parent.parent.parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some(parent.parent.parent.id);
  }

  if (
    parent.type === NodeType.Property
    && parent.key.type === NodeType.Identifier
    && parent.parent.type === NodeType.ObjectExpression
    && parent.parent.parent.type === NodeType.VariableDeclarator
    && parent.parent.parent.id.type === NodeType.Identifier
    && parent.parent.parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some([parent.parent.parent.id, parent.key]);
  }

  if (
    isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(parent)
    && parent.key.type === NodeType.Identifier
    && parent.parent.type === NodeType.ClassBody
    && parent.parent.parent.type === NodeType.ClassDeclaration
    && parent.parent.parent.id?.type === NodeType.Identifier
  ) {
    return O.some([parent.parent.parent.id, parent.key]);
  }

  return O.none();
}
