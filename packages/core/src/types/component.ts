import type { TSESTreeClass, TSESTreeFunction } from "@eslint-react/ast";
import { JSXValueCheckHint } from "@eslint-react/jsx";
import type { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export type ExRComponentFlag = bigint;

/* eslint-disable perfectionist/sort-objects, perfectionist/sort-union-types */
export const ExRComponentFlag = {
  None: 0n,
  Memo: 1n << 0n,
  ForwardRef: 1n << 1n,
  // Reserved for future use
  // CreateElement: 1n << 2n,
  // Reserved for future use
  // hasHooks: 1n << 3n,
  // Reserved for future use
  // Async: 1n << 4n,
};

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

export type ExRComponentKind = "class" | "function";

export type ExRComponentCollectorHint = bigint;

/**
 * hints for component collector
 */
export const ExRComponentCollectorHint = {
  ...JSXValueCheckHint,
  // 1n << 0n - 1n << 63n are reserved for JSXValueCheckHint
  // Skip function component created by React.memo
  SkipMemo: 1n << 64n,
  // Skip function component created by React.forwardRef
  SkipForwardRef: 1n << 65n,
  // Skip function component defined in map function callback
  SkipMapCallback: 1n << 66n,
  // Skip function component defined on object method
  SkipObjectMethod: 1n << 67n,
  // Skip function component defined on class method
  SkipClassMethod: 1n << 68n,
  // Skip function component defined on class property
  SkipClassProperty: 1n << 69n,
} as const;
/* eslint-enable perfectionist/sort-objects, perfectionist/sort-union-types */

export const defaultComponentCollectorHint = ExRComponentCollectorHint.SkipStringLiteral
  | ExRComponentCollectorHint.SkipNumberLiteral;

export type ExRFunctionComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier | TSESTree.Identifier[]>;
  kind: "function";
  node: TSESTreeFunction;
  name: O.Option<string>;
  flag: ExRComponentFlag;
  hint: ExRComponentCollectorHint;
  initPath: O.Option<ExRComponentInitPath>;
  displayName: O.Option<string>;
};

export type ExRClassComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier>;
  kind: "class";
  node: TSESTreeClass;
  name: O.Option<string>;
  displayName: O.Option<string>;
};

export type ExRComponent = ExRClassComponent | ExRFunctionComponent;
