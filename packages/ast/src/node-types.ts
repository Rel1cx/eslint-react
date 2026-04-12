import type { TSESTree } from "@typescript-eslint/types";

/**
 * Represents function expressions and declarations in TSESTree
 */
export type TSESTreeFunction =
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression;

/**
 * Represents class declarations and expressions in TSESTree
 */
export type TSESTreeClass = TSESTree.ClassDeclaration | TSESTree.ClassExpression;

/**
 * Represents method definitions and property definitions in classes
 */
export type TSESTreeMethodOrProperty = TSESTree.PropertyDefinition | TSESTree.MethodDefinition;

/**
 * Represents all JSX-related nodes in TSESTree
 * Note: This type is for type-level operations. The isJSX() runtime guard in node-is.ts
 * has a slightly different set of nodes as it includes JSXExpressionContainer which is
 * commonly needed for runtime checks but not included in this type union.
 */
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

export type TSESTreeJSXElementLike =
  | TSESTree.JSXElement
  | TSESTree.JSXFragment;

/**
 * Represents JSX attribute-like nodes (attributes and spread attributes)
 */
export type TSESTreeJSXAttributeLike =
  | TSESTree.JSXAttribute
  | TSESTree.JSXSpreadAttribute;

/**
 * Represents a directive expression statement in TSESTree (ex: "use strict";)
 */
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
