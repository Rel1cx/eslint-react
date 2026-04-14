import type { TSESTree } from "@typescript-eslint/types";

export type TSESTreeFunction =
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression;

export type TSESTreeClass =
  | TSESTree.ClassDeclaration
  | TSESTree.ClassExpression;

export type TSESTreeMethodOrPropertyDefinition =
  | TSESTree.PropertyDefinition
  | TSESTree.MethodDefinition;

export type TSESTreeJSX =
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

export type TSESTreeJSXElementLike = TSESTree.JSXElement | TSESTree.JSXFragment;
export type TSESTreeJSXAttributeLike = TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute;

export type TSESTreeDirective = TSESTree.ExpressionStatement & {
  directive: string;
  expression: TSESTree.StringLiteral;
};

export type TSESTreeTypeExpression =
  | TSESTree.TSAsExpression
  | TSESTree.TSTypeAssertion
  | TSESTree.TSNonNullExpression
  | TSESTree.TSSatisfiesExpression
  | TSESTree.TSInstantiationExpression;
