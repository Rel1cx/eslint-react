import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { ASTUtils } from "@typescript-eslint/utils";
import type { TSESTreeDirective } from "./types";

// Base guards
export const is = ASTUtils.isNodeOfType;
export const isOneOf = ASTUtils.isNodeOfTypes;

// Directive check
export function isDirective(name: string) {
  return (node: TSESTree.Node): node is TSESTreeDirective => node.type === AST.ExpressionStatement && node.directive === name;
}

// Identifier check
export function isIdentifier(name: string) {
  return (node: TSESTree.Node): node is TSESTree.Identifier => node.type === AST.Identifier && node.name === name;
}

// Checks whether the given node is string literal or not
export function isStringLiteral(node: TSESTree.Node): node is TSESTree.StringLiteral {
  return node.type === AST.Literal && typeof node.value === "string";
}

// Composite type guards

export const isClass = isOneOf([AST.ClassDeclaration, AST.ClassExpression]);

export const isFunction = isOneOf([
  AST.ArrowFunctionExpression,
  AST.FunctionDeclaration,
  AST.FunctionExpression,
]);

export const isProperty = isOneOf([
  AST.PropertyDefinition,
  AST.TSIndexSignature,
  AST.TSParameterProperty,
  AST.TSPropertySignature,
]);

export const isPropertyOrMethod = isOneOf([
  AST.PropertyDefinition,
  AST.MethodDefinition,
]);

// JSX guards
export const isJSXElement = is(AST.JSXElement);
export const isJSXFragment = is(AST.JSXFragment);
export const isJSXElementOrFragment = isOneOf([AST.JSXElement, AST.JSXFragment]);
export const isJSXTagNameExpression = isOneOf([
  AST.JSXIdentifier,
  AST.JSXMemberExpression,
  AST.JSXNamespacedName,
]);

export const isJSX = isOneOf([
  AST.JSXAttribute,
  AST.JSXClosingElement,
  AST.JSXClosingFragment,
  AST.JSXElement,
  AST.JSXEmptyExpression,
  AST.JSXExpressionContainer,
  AST.JSXFragment,
  AST.JSXIdentifier,
  AST.JSXMemberExpression,
  AST.JSXNamespacedName,
  AST.JSXOpeningElement,
  AST.JSXOpeningFragment,
  AST.JSXSpreadAttribute,
  AST.JSXSpreadChild,
  AST.JSXText,
]);

// TypeScript type guards
export const isTypeExpression = isOneOf([
  AST.TSAsExpression,
  AST.TSTypeAssertion,
  AST.TSNonNullExpression,
  AST.TSSatisfiesExpression,
  AST.TSInstantiationExpression,
]);

export const isTypeAssertionExpression = isOneOf([
  AST.TSAsExpression,
  AST.TSTypeAssertion,
  AST.TSNonNullExpression,
  AST.TSSatisfiesExpression,
]);
