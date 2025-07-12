import type { TSESTree } from "@typescript-eslint/types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { ASTUtils } from "@typescript-eslint/utils";

export const is = ASTUtils.isNodeOfType;

export const isOneOf = ASTUtils.isNodeOfTypes;

export const isFunction = isOneOf([
  T.ArrowFunctionExpression,
  T.FunctionDeclaration,
  T.FunctionExpression,
]);

export const isFunctionType = isOneOf([
  T.ArrowFunctionExpression,
  T.FunctionDeclaration,
  T.FunctionExpression,
  T.TSCallSignatureDeclaration,
  T.TSConstructSignatureDeclaration,
  T.TSDeclareFunction,
  T.TSEmptyBodyFunctionExpression,
  T.TSFunctionType,
  T.TSMethodSignature,
]);

export const isClass = isOneOf([T.ClassDeclaration, T.ClassExpression]);

export const isMethodOrProperty = isOneOf([
  T.PropertyDefinition,
  T.MethodDefinition,
]);

export const isProperty = isOneOf([
  T.PropertyDefinition,
  T.TSIndexSignature,
  T.TSParameterProperty,
  T.TSPropertySignature,
]);

export const isJSXElement = is(T.JSXElement);

export const isJSXFragment = is(T.JSXFragment);

export const isJSXTagNameExpression = isOneOf([
  T.JSXIdentifier,
  T.JSXMemberExpression,
  T.JSXNamespacedName,
]);

export const isJSX = isOneOf([
  T.JSXAttribute,
  T.JSXClosingElement,
  T.JSXClosingFragment,
  T.JSXElement,
  T.JSXEmptyExpression,
  T.JSXExpressionContainer,
  T.JSXFragment,
  T.JSXIdentifier,
  T.JSXMemberExpression,
  T.JSXNamespacedName,
  T.JSXOpeningElement,
  T.JSXOpeningFragment,
  T.JSXSpreadAttribute,
  T.JSXSpreadChild,
  T.JSXText,
]);

export const isLoop = isOneOf([
  T.DoWhileStatement,
  T.ForInStatement,
  T.ForOfStatement,
  T.ForStatement,
  T.WhileStatement,
]);

export const isTypeExpression = isOneOf([
  T.TSAsExpression,
  T.TSTypeAssertion,
  T.TSNonNullExpression,
  T.TSSatisfiesExpression,
  T.TSInstantiationExpression,
]);

export const isTypeAssertionExpression = isOneOf([
  T.TSAsExpression,
  T.TSTypeAssertion,
  T.TSNonNullExpression,
  T.TSSatisfiesExpression,
]);
