import { or } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { ASTUtils } from "@typescript-eslint/utils";

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
 * Check if a node is a function type (including TypeScript function types)
 * @param node The node to check
 * @returns True if the node is a function type
 */
export const isFunctionType = isOneOf([
  AST.ArrowFunctionExpression,
  AST.FunctionDeclaration,
  AST.FunctionExpression,
  AST.TSCallSignatureDeclaration,
  AST.TSConstructSignatureDeclaration,
  AST.TSDeclareFunction,
  AST.TSEmptyBodyFunctionExpression,
  AST.TSFunctionType,
  AST.TSMethodSignature,
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
 * Check if a node is a JSX fragment
 * @param node The node to check
 * @returns True if the node is a JSX fragment
 */
export const isJSXFragment = is(AST.JSXFragment);

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
 * @param node The node to check
 * @returns True if the node is a JSX node
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
 * Check if a node is a loop statement
 * @param node The node to check
 * @returns True if the node is a loop
 */
export const isLoop = isOneOf([
  AST.DoWhileStatement,
  AST.ForInStatement,
  AST.ForOfStatement,
  AST.ForStatement,
  AST.WhileStatement,
]);

/**
 * Check if a node is a control flow statement (loop, if, or switch)
 * @param node The node to check
 * @returns True if the node is a control flow statement
 */
export const isControlFlow = or(
  isLoop,
  isOneOf([
    AST.IfStatement,
    AST.SwitchStatement,
  ]),
);

/**
 * Check if a node is a conditional expression or control flow statement
 * @param node The node to check
 * @returns True if the node is conditional
 */
export const isConditional = or(
  isControlFlow,
  isOneOf([
    AST.LogicalExpression,
    AST.ConditionalExpression,
  ]),
);

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
