/* eslint-disable perfectionist/sort-union-types */
import { NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export type ExRComponentInitPath =
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
      O.exists(nodes => {
        return nodes.some(
          callName.includes(".")
            ? n => {
              const [objectName, propertyName] = callName.split(".");

              return "callee" in n
                && n.callee.type === NodeType.MemberExpression
                && n.callee.object.type === NodeType.Identifier
                && n.callee.object.name === objectName
                && n.callee.property.type === NodeType.Identifier
                && n.callee.property.name === propertyName;
            }
            : n => {
              return "callee" in n
                && n.callee.type === NodeType.Identifier
                && n.callee.name === callName;
            },
        );
      }),
    );
  };
}
