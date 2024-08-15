/* eslint-disable perfectionist/sort-union-types */
import { F, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import type { TSESTreeFunction } from "./types";

export type FunctionInitPath =
  /**
   * function Comp() { return <div />; }
   */
  | readonly [TSESTree.FunctionDeclaration]
  /**
   * const Comp = () => <div />;
   * const Comp = function () { return <div />; };
   */
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTreeFunction,
  ]
  /**
   * const Comp = React.memo(() => <div />);
   * const Comp = React.forwardRef(() => <div />);
   */
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  /**
   * const Comp = React.memo(React.forwardRef(() => <div />));
   */
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.CallExpression,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  /**
   * const Comps = {
   *  TopNav() { return <div />; },
   *  SidPanel: () => <div />,
   * }
   */
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.ObjectExpression,
    TSESTree.Property,
    TSESTreeFunction,
  ]
  /**
   * const Comps = {
   *  TopNav: React.memo(() => <div />),
   *  SidPanel: React.forwardRef(() => <div />),
   * }
   */
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.ObjectExpression,
    TSESTree.Property,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  /**
   * const Comps = {
   * TopNav: React.memo(React.forwardRef(() => <div />)),
   * SidPanel: React.forwardRef(React.memo(() => <div />)),
   * }
   */
  | readonly [
    TSESTree.VariableDeclaration,
    TSESTree.VariableDeclarator,
    TSESTree.ObjectExpression,
    TSESTree.Property,
    TSESTree.CallExpression,
    TSESTree.CallExpression,
    TSESTreeFunction,
  ]
  /**
   * class Comp {
   *   TopNav() { return <div />; }
   * }
   */
  | readonly [
    TSESTree.ClassDeclaration,
    TSESTree.ClassBody,
    TSESTree.MethodDefinition,
    TSESTreeFunction,
  ]
  /**
   * class Comp {
   *   TopNav = () => <div />;
   * }
   */
  | readonly [
    TSESTree.ClassDeclaration,
    TSESTree.ClassBody,
    TSESTree.PropertyDefinition,
    TSESTreeFunction,
  ];

export function getFunctionInitPath(node: TSESTreeFunction): O.Option<FunctionInitPath> {
  const { parent } = node;
  if (node.type === AST_NODE_TYPES.FunctionDeclaration) return O.some([node]);
  if (parent.type === AST_NODE_TYPES.VariableDeclarator) {
    return O.some([
      parent.parent,
      parent,
      node,
    ]);
  }
  if (
    parent.type === AST_NODE_TYPES.CallExpression
    && parent.parent.type === AST_NODE_TYPES.VariableDeclarator
  ) {
    return O.some([
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ]);
  }
  if (
    parent.type === AST_NODE_TYPES.CallExpression
    && parent.parent.type === AST_NODE_TYPES.CallExpression
    && parent.parent.parent.type === AST_NODE_TYPES.VariableDeclarator
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
    parent.type === AST_NODE_TYPES.Property
    && parent.parent.type === AST_NODE_TYPES.ObjectExpression
    && parent.parent.parent.type === AST_NODE_TYPES.VariableDeclarator
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
    parent.type === AST_NODE_TYPES.MethodDefinition
    && parent.parent.parent.type === AST_NODE_TYPES.ClassDeclaration
  ) {
    return O.some([
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ]);
  }
  if (
    parent.type === AST_NODE_TYPES.PropertyDefinition
    && parent.parent.parent.type === AST_NODE_TYPES.ClassDeclaration
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

export function hasCallInFunctionInitPath(callName: string) {
  return (initPath: O.Option<FunctionInitPath>) => {
    return F.pipe(
      initPath,
      O.filter(p => p.length > 0),
      O.exists(nodes => {
        return nodes.some(
          // TODO: Re-evaluate dot notation callName
          // callName.includes(".")
          //   ? n => {
          //     const [objectName, propertyName] = callName.split(".");

          //     return "callee" in n
          //       && n.callee.type === AST_NODE_TYPES.MemberExpression
          //       && n.callee.object.type === AST_NODE_TYPES.Identifier
          //       && n.callee.object.name === objectName
          //       && n.callee.property.type === AST_NODE_TYPES.Identifier
          //       && n.callee.property.name === propertyName;
          //   }
          //   : n => {
          //     return "callee" in n
          //       && n.callee.type === AST_NODE_TYPES.Identifier
          //       && n.callee.name === callName;
          //   },
          n => {
            if (n.type !== AST_NODE_TYPES.CallExpression) return false;
            if (n.callee.type === AST_NODE_TYPES.Identifier) return n.callee.name === callName;
            return "property" in n.callee
              && "name" in n.callee.property
              && n.callee.property.name === callName;
          },
        );
      }),
    );
  };
}
