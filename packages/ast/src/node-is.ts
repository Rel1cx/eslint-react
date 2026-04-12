import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { ASTUtils } from "@typescript-eslint/utils";

import type { TSESTreeDirective } from "./node-types";

/**
 * Type guard to check if a node is of a specific AST node type
 * @param nodeType The AST node type to check against
 * @returns A type guard function that narrows the node type
 */
export const is = ASTUtils.isNodeOfType;

/**
 * Type guard to check if a node is one of multiple AST node types
 * @param nodeTypes Array of AST node types to check against
 * @returns A type guard function that narrows the node type
 */
export const isOneOf = ASTUtils.isNodeOfTypes;

/**
 * Check if a node is a function (arrow, declaration, or expression)
 * @param node The node to check
 * @returns True if the node is a function
 */
export const isFunction = isOneOf([
  AST.ArrowFunctionExpression,
  AST.FunctionDeclaration,
  AST.FunctionExpression,
]);

/**
 * Check if a node is a class declaration or expression
 * @param node The node to check
 * @returns True if the node is a class
 */
export const isClass = isOneOf([AST.ClassDeclaration, AST.ClassExpression]);

/**
 * Check if a node is a method or property definition
 * @param node The node to check
 * @returns True if the node is a method or property definition
 */
export const isMethodOrProperty = isOneOf([
  AST.PropertyDefinition,
  AST.MethodDefinition,
]);

/**
 * Check if a node is a property-like node (including TypeScript property signatures)
 * @param node The node to check
 * @returns True if the node is a property
 */
export const isProperty = isOneOf([
  AST.PropertyDefinition,
  AST.TSIndexSignature,
  AST.TSParameterProperty,
  AST.TSPropertySignature,
]);

/**
 * Check if a node is a JSX element
 * @param node The node to check
 * @returns True if the node is a JSX element
 */
export const isJSXElement = is(AST.JSXElement);

/**
 * Check if a node is a JSX element or JSX fragment
 */
export const isJSXElementLike = isOneOf([AST.JSXElement, AST.JSXFragment]);

/**
 * Check if a node is a JSX tag name expression (identifier, member expression, or namespaced name)
 * @param node The node to check
 * @returns True if the node is a JSX tag name expression
 */
export const isJSXTagNameExpression = isOneOf([
  AST.JSXIdentifier,
  AST.JSXMemberExpression,
  AST.JSXNamespacedName,
]);

/**
 * Check if a node is a JSX-related node
 * Note: This runtime guard includes JSXExpressionContainer which is commonly needed
 * for AST traversals but not included in the TSESTreeJSX type union.
 * @param node The node to check
 * @returns True if the node is a JSX node
 * @see TSESTreeJSX
 */
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

/**
 * Check if a node is a TypeScript type expression
 * @param node The node to check
 * @returns True if the node is a type expression
 */
export const isTypeExpression = isOneOf([
  AST.TSAsExpression,
  AST.TSTypeAssertion,
  AST.TSNonNullExpression,
  AST.TSSatisfiesExpression,
  AST.TSInstantiationExpression,
]);

/**
 * Check if a node is a TypeScript type assertion expression
 * @param node The node to check
 * @returns True if the node is a type assertion expression
 */
export const isTypeAssertionExpression = isOneOf([
  AST.TSAsExpression,
  AST.TSTypeAssertion,
  AST.TSNonNullExpression,
  AST.TSSatisfiesExpression,
]);

/**
 * Check if a node is a directive expression statement
 * @param node The node to check
 * @returns True if the node is a directive, false otherwise
 */
export function isDirective(node: TSESTree.Node): node is TSESTreeDirective {
  return node.type === AST.ExpressionStatement && node.directive != null;
}
