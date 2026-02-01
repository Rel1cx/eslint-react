import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Represents function expressions and declarations in TSESTree
 */
export type TSESTreeFunction =
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression;

/**
 * Represents all function-related types including TypeScript function types
 */
export type TSESTreeFunctionType =
  | TSESTree.TSCallSignatureDeclaration
  | TSESTree.TSConstructSignatureDeclaration
  | TSESTree.TSDeclareFunction
  | TSESTree.TSEmptyBodyFunctionExpression
  | TSESTree.TSFunctionType
  | TSESTree.TSMethodSignature
  | TSESTreeFunction;

/**
 * Represents class declarations and expressions in TSESTree
 */
export type TSESTreeClass = TSESTree.ClassDeclaration | TSESTree.ClassExpression;

/**
 * Represents method definitions and property definitions in classes
 */
export type TSESTreeMethodOrProperty = TSESTree.PropertyDefinition | TSESTree.MethodDefinition;

/**
 * Represents loop statements in TSESTree
 */
export type TSESTreeLoop =
  | TSESTree.DoWhileStatement
  | TSESTree.ForInStatement
  | TSESTree.ForOfStatement
  | TSESTree.ForStatement
  | TSESTree.WhileStatement;

/**
 * Represents TypeScript array and tuple types
 */
export type TSESTreeArrayTupleType = TSESTree.TSArrayType | TSESTree.TSTupleType;

/**
 * Represents property-like nodes in TSESTree
 */
export type TSESTreeProperty =
  | TSESTree.PropertyDefinition
  | TSESTree.TSIndexSignature
  | TSESTree.TSParameterProperty
  | TSESTree.TSPropertySignature;

/**
 * Represents all JSX-related nodes in TSESTree
 */
export type TSESTreeJSX =
  | TSESTree.JSXAttribute
  | TSESTree.JSXChild
  | TSESTree.JSXClosingElement
  | TSESTree.JSXClosingFragment
  | TSESTree.JSXElement
  | TSESTree.JSXEmptyExpression
  | TSESTree.JSXExpression
  | TSESTree.JSXExpressionContainer
  | TSESTree.JSXFragment
  | TSESTree.JSXIdentifier
  | TSESTree.JSXIdentifierToken
  | TSESTree.JSXMemberExpression
  | TSESTree.JSXNamespacedName
  | TSESTree.JSXOpeningElement
  | TSESTree.JSXOpeningFragment
  | TSESTree.JSXSpreadAttribute
  | TSESTree.JSXSpreadChild
  | TSESTree.JSXTagNameExpression
  | TSESTree.JSXText
  | TSESTree.JSXTextToken;

/**
 * Represents JSX attribute-like nodes (attributes and spread attributes)
 */
export type TSESTreeJSXAttributeLike = TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute;

/**
 * Represents destructuring patterns in variable declarations
 */
export type TSESTreeDestructuringPattern =
  | TSESTree.ArrayPattern
  | TSESTree.AssignmentPattern
  | TSESTree.ObjectPattern
  | TSESTree.RestElement;

/**
 * Represents TypeScript type declaration nodes
 */
export type TSESTreeTypeDeclaration =
  | TSESTree.TSInterfaceDeclaration
  | TSESTree.TSTypeAliasDeclaration;

/**
 * Represents TypeScript type expression nodes (type assertions, non-null expressions, etc.)
 */
export type TSESTreeTypeExpression =
  | TSESTree.TSAsExpression
  | TSESTree.TSNonNullExpression
  | TSESTree.TSSatisfiesExpression
  | TSESTree.TSTypeAssertion
  | TSESTree.TSInstantiationExpression;

/**
 * Represents TypeScript type assertion expressions (excluding instantiation expressions)
 */
export type TSESTreeTypeAssertionExpression =
  | TSESTree.TSAsExpression
  | TSESTree.TSNonNullExpression
  | TSESTree.TSSatisfiesExpression
  | TSESTree.TSTypeAssertion;
