import type { TSESTree } from "@typescript-eslint/types";

/** Union of function-like node types. */
export type TSESTreeFunction =
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression;

/** Union of class-like node types. */
export type TSESTreeClass =
  | TSESTree.ClassDeclaration
  | TSESTree.ClassExpression;

/** Union of method and property definition node types. */
export type TSESTreeMethodOrPropertyDefinition =
  | TSESTree.PropertyDefinition
  | TSESTree.MethodDefinition;

/** Union of all JSX-related node types. */
export type TSESTreeJSX =
  | TSESTree.JSXAttribute
  | TSESTree.JSXClosingElement
  | TSESTree.JSXClosingFragment
  | TSESTree.JSXElement
  | TSESTree.JSXEmptyExpression
  | TSESTree.JSXExpressionContainer
  | TSESTree.JSXFragment
  | TSESTree.JSXIdentifier
  | TSESTree.JSXMemberExpression
  | TSESTree.JSXNamespacedName
  | TSESTree.JSXOpeningElement
  | TSESTree.JSXOpeningFragment
  | TSESTree.JSXSpreadAttribute
  | TSESTree.JSXSpreadChild
  | TSESTree.JSXText;

/** Union of JSX element-like node types (element or fragment). */
export type TSESTreeJSXElementLike = TSESTree.JSXElement | TSESTree.JSXFragment;

/** Union of JSX attribute-like node types (attribute or spread attribute). */
export type TSESTreeJSXAttributeLike = TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute;

/** An expression statement that is a directive (ex: `"use strict"`). */
export type TSESTreeDirective = TSESTree.ExpressionStatement & {
  directive: string;
  expression: TSESTree.StringLiteral;
};

/** Union of TypeScript type expression node types. */
export type TSESTreeTypeExpression =
  | TSESTree.TSAsExpression
  | TSESTree.TSTypeAssertion
  | TSESTree.TSNonNullExpression
  | TSESTree.TSSatisfiesExpression
  | TSESTree.TSInstantiationExpression;
