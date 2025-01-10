import { _ } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

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

export function getFunctionInitPath(node: TSESTreeFunction): FunctionInitPath | _ {
  const { parent } = node;
  if (node.type === T.FunctionDeclaration) {
    return [node] as const;
  }
  if (parent.type === T.VariableDeclarator) {
    return [
      parent.parent,
      parent,
      node,
    ] as const;
  }
  if (
    parent.type === T.CallExpression
    && parent.parent.type === T.VariableDeclarator
  ) {
    return [
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ] as const;
  }
  if (
    parent.type === T.CallExpression
    && parent.parent.type === T.CallExpression
    && parent.parent.parent.type === T.VariableDeclarator
  ) {
    return [
      parent.parent.parent.parent,
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ] as const;
  }
  if (
    parent.type === T.Property
    && parent.parent.type === T.ObjectExpression
    && parent.parent.parent.type === T.VariableDeclarator
  ) {
    return [
      parent.parent.parent.parent,
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ] as const;
  }
  if (
    parent.type === T.MethodDefinition
    && parent.parent.parent.type === T.ClassDeclaration
  ) {
    return [
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ] as const;
  }
  if (
    parent.type === T.PropertyDefinition
    && parent.parent.parent.type === T.ClassDeclaration
  ) {
    return [
      parent.parent.parent,
      parent.parent,
      parent,
      node,
    ] as const;
  }
  return _;
}

export function hasCallInFunctionInitPath(callName: string) {
  return (initPath: FunctionInitPath) => {
    return initPath
      .some((n) => {
        if (n.type !== T.CallExpression) {
          return false;
        }
        switch (n.callee.type) {
          case T.Identifier:
            return n.callee.name === callName;
          case T.MemberExpression:
            return "name" in n.callee.property && n.callee.property.name === callName;
          default:
            return false;
        }
      });
  };
}
