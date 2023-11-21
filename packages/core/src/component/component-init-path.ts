import { NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";

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

export function hasCallInInitPath(callName: string) {
  return (initPath: O.Option<ExRComponentInitPath>) => {
    return F.pipe(
      initPath,
      O.filter(p => p.length > 0),
      O.flatMapNullable(p => p.find(n => n.type === NodeType.CallExpression)),
      O.filter(n => "callee" in n && n.callee.type === NodeType.Identifier && n.callee.name === callName),
      O.isSome,
    );
  };
}
