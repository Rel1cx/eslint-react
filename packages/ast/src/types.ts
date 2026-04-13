import type { TSESTree } from "@typescript-eslint/types";

export type Node = TSESTree.Node;
export type Program = TSESTree.Program;
export type Expression = TSESTree.Expression;
export type Statement = TSESTree.Statement;
export type Identifier = TSESTree.Identifier;

export type FunctionExpression =
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression;

export type ClassExpression =
  | TSESTree.ClassDeclaration
  | TSESTree.ClassExpression;

export type MethodOrPropertyDefinition =
  | TSESTree.PropertyDefinition
  | TSESTree.MethodDefinition;

export type JSXNode =
  | TSESTree.JSXAttribute
  | TSESTree.JSXChild
  | TSESTree.JSXClosingElement
  | TSESTree.JSXClosingFragment
  | TSESTree.JSXEmptyExpression
  | TSESTree.JSXIdentifierToken
  | TSESTree.JSXOpeningElement
  | TSESTree.JSXOpeningFragment
  | TSESTree.JSXSpreadAttribute
  | TSESTree.JSXTagNameExpression
  | TSESTree.JSXTextToken;

export type JSXElementLike = TSESTree.JSXElement | TSESTree.JSXFragment;
export type JSXAttributeLike = TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute;

export type Directive = TSESTree.ExpressionStatement & {
  directive: string;
  expression: TSESTree.StringLiteral;
};

export type TypeExpression =
  | TSESTree.TSAsExpression
  | TSESTree.TSTypeAssertion
  | TSESTree.TSNonNullExpression
  | TSESTree.TSSatisfiesExpression
  | TSESTree.TSInstantiationExpression;
