import { NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";

import type { ExRComponentInitPath } from "../types";

export function getComponentInitPath(node: TSESTreeFunction): O.Option<ExRComponentInitPath> {
  const { parent } = node;

  if (node.type === NodeType.FunctionDeclaration) {
    return O.some([node]);
  }

  if (
    parent.type === NodeType.VariableDeclarator
    && parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some([
      parent.parent,
      parent,
      node,
    ]);
  }

  if (
    parent.type === NodeType.CallExpression
    && parent.parent.type === NodeType.VariableDeclarator
    && parent.parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some([
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ]);
  }

  if (
    parent.type === NodeType.CallExpression
    && parent.parent.type === NodeType.CallExpression
    && parent.parent.parent.type === NodeType.VariableDeclarator
    && parent.parent.parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some([
      parent.parent.parent.parent,
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ]);
  }

  if (
    parent.type === NodeType.Property
    && parent.parent.type === NodeType.ObjectExpression
    && parent.parent.parent.type === NodeType.VariableDeclarator
    && parent.parent.parent.parent.type === NodeType.VariableDeclaration
  ) {
    return O.some([
      parent.parent.parent.parent,
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ]);
  }

  if (
    parent.type === NodeType.MethodDefinition
    && parent.parent.type === NodeType.ClassBody
    && parent.parent.parent.type === NodeType.ClassDeclaration
  ) {
    return O.some([
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ]);
  }

  if (
    parent.type === NodeType.PropertyDefinition
    && parent.parent.type === NodeType.ClassBody
    && parent.parent.parent.type === NodeType.ClassDeclaration
  ) {
    return O.some([
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ]);
  }

  return O.none();
}
