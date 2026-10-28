import type { TSESTree } from "@typescript-eslint/types";

// Directive

/** An expression statement that is a directive (ex: `"use strict"`). */
export type TSESTreeDirective = TSESTree.ExpressionStatement & {
  directive: string;
  expression: TSESTree.StringLiteral;
};

// Function and class unions

/** Union of class-like node types. */
export type TSESTreeClass =
  | TSESTree.ClassDeclaration
  | TSESTree.ClassExpression;

/** Union of function-like node types. */
export type TSESTreeFunction =
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression;

/** Union of function-like and class-like node types. */
export type TSESTreeFunctionOrClass =
  | TSESTreeClass
  | TSESTreeFunction;

/**
 * Union of `MethodDefinition` and `PropertyDefinition` node types.
 *
 * Abstract and accessor member definitions are not included.
 */
export type TSESTreeMethodOrPropertyDefinition =
  | TSESTree.MethodDefinition
  | TSESTree.PropertyDefinition;

// JSX unions

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

/** Union of JSX attribute-like node types (attribute or spread attribute). */
export type TSESTreeJSXAttributeLike = TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute;

/** Union of JSX element-like node types (element or fragment). */
export type TSESTreeJSXElementLike = TSESTree.JSXElement | TSESTree.JSXFragment;

// TypeScript unions

/** Union of TypeScript type expression node types. */
export type TSESTreeTypeExpression =
  | TSESTree.TSAsExpression
  | TSESTree.TSInstantiationExpression
  | TSESTree.TSNonNullExpression
  | TSESTree.TSSatisfiesExpression
  | TSESTree.TSTypeAssertion;

/** Union of expression node types that wrap another expression (TypeScript type expressions and chain expressions) — the nodes `Extract.unwrap` strips. */
export type TSESTreeTypeOrChainExpression = TSESTree.ChainExpression | TSESTreeTypeExpression;
